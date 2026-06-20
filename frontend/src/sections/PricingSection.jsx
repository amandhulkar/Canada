import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'
import Container from '../components/Container'
import PrimaryButton from '../components/PrimaryButton'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { pricingPlans } from '../assets/siteData'

function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardName, setCardName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("currentUser")) || {}
  const userName = user.fullName || user.name || ""

  useEffect(() => {
    if (selectedPlan && !cardName) {
      setCardName(userName)
    }
  }, [selectedPlan, userName])

  const handleChoosePlan = (plan) => {
    const isLoggedIn = !!localStorage.getItem("currentUser")
    if (!isLoggedIn) {
      navigate('/signup')
    } else {
      setSelectedPlan(plan)
    }
  }

  const handleClose = () => {
    setSelectedPlan(null)
    setIsProcessing(false)
    setIsSuccess(false)
    setCardNumber('')
    setExpiry('')
    setCvc('')
  }

  const handlePay = (e) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      setTimeout(() => {
        // Upgrade plan dynamically
        const updatedUser = { ...user, plan: selectedPlan.name }
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))

        handleClose()
        navigate('/dashboard')
      }, 2000)
    }, 1500)
  }

  return (
    <section id="pricing" className="section-shell">
      <Container>
        <SectionHeading
          kicker="Pricing"
          title="Simple plans for teams growing into a more mature operating rhythm."
          description="Choose the setup that fits your current stage, then scale into more capability as your team and experimentation needs expand."
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.06}>
              <article
                className={`glass-panel h-full rounded-[1.9rem] p-7 ${
                  plan.featured ? 'border-gradient bg-white' : ''
                }`}
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted">{plan.name}</p>
                    <div className="mt-4 flex items-end gap-2 text-ink">
                      <span className="text-4xl font-semibold tracking-[-0.04em]">{plan.price}</span>
                      {plan.cadence ? <span className="pb-1 text-muted">{plan.cadence}</span> : null}
                    </div>
                  </div>
                  {plan.featured ? (
                    <span className="rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-purple">
                      Most popular
                    </span>
                  ) : null}
                </div>
                <p className="leading-8 text-muted">{plan.summary}</p>
                <div className="my-7 h-px bg-line" />
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-ink">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <FiCheck className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <PrimaryButton
                  onClick={() => handleChoosePlan(plan)}
                  variant={plan.featured ? 'primary' : 'ghost'}
                  className="mt-8 w-full cursor-pointer"
                >
                  Choose {plan.name}
                </PrimaryButton>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Checkout Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8 max-w-md w-full shadow-2xl relative overflow-hidden transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95">
            {isSuccess ? (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-3xl mb-4 animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                  Subscription Activated!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  Thank you for upgrading to the <span className="font-semibold text-indigo-600 dark:text-indigo-400">{selectedPlan.name}</span> plan.
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Redirecting you to the dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handlePay} className="flex flex-col gap-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Subscription Checkout
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Complete your payment details to activate the plan.
                  </p>
                </div>

                {/* Plan Summary */}
                <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {selectedPlan.name} Plan
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Billed monthly
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {selectedPlan.price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedPlan.cadence}
                    </span>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="flex flex-col gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        // Format: 16 digits maximum formatted as groups of 4
                        const limitedVal = val.substring(0, 16);
                        const parts = [];
                        for (let i = 0; i < limitedVal.length; i += 4) {
                          parts.push(limitedVal.substring(i, i + 4));
                        }
                        setCardNumber(parts.join(' '));
                      }}
                      placeholder="0000 0000 0000 0000"
                      className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          const limitedVal = val.substring(0, 4);
                          if (limitedVal.length >= 3) {
                            setExpiry(limitedVal.substring(0, 2) + '/' + limitedVal.substring(2));
                          } else {
                            setExpiry(limitedVal);
                          }
                        }}
                        className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        required
                        maxLength="3"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                        placeholder="•••"
                        className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-sm font-medium px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="text-sm font-semibold px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md disabled:opacity-50 transition flex items-center justify-center gap-2 min-w-[120px] cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Processing...
                      </>
                    ) : (
                      "Pay & Upgrade"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default PricingSection

