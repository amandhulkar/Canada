import { FiArrowUpRight } from 'react-icons/fi'
import Container from '../components/Container'
import PrimaryButton from '../components/PrimaryButton'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { contactDetails } from '../assets/siteData'

function ContactSection() {
  return (
    <section id="contact" className="section-shell pb-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading
            kicker="Contact"
            title="See how FindTemplates can bring more clarity and speed to your growth workflow."
            description="Get in touch with 17219296 Canada Inc. using the company details below, and share what your team is trying to improve."
          />

          <div className="grid gap-4">
            {contactDetails.map((detail) => {
              const Icon = detail.icon

              return (
                <div key={detail.title} className="glass-panel rounded-[1.75rem] p-5">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm uppercase tracking-[0.2em] text-muted">{detail.title}</div>
                      <div className="mt-1 text-lg font-medium text-ink">{detail.value}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border-gradient rounded-[2rem] bg-white p-7 shadow-soft sm:p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted">Get started</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink">Tell us about your growth goals</h3>
              </div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-blue">
                <FiArrowUpRight className="h-5 w-5" />
              </span>
            </div>

            <form className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-muted">
                  Name
                  <input
                    type="text"
                    placeholder="Your name"
                    className="rounded-2xl border border-line bg-canvas-soft px-4 py-3 text-ink outline-none transition placeholder:text-slate-400 focus:border-accent-blue"
                  />
                </label>
                <label className="grid gap-2 text-sm text-muted">
                  Company
                  <input
                    type="text"
                    placeholder="Company name"
                    className="rounded-2xl border border-line bg-canvas-soft px-4 py-3 text-ink outline-none transition placeholder:text-slate-400 focus:border-accent-blue"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm text-muted">
                Email
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="rounded-2xl border border-line bg-canvas-soft px-4 py-3 text-ink outline-none transition placeholder:text-slate-400 focus:border-accent-blue"
                />
              </label>
              <label className="grid gap-2 text-sm text-muted">
                Project goals
                <textarea
                  rows="5"
                  placeholder="What are you trying to improve, simplify, or launch next?"
                  className="rounded-2xl border border-line bg-canvas-soft px-4 py-3 text-ink outline-none transition placeholder:text-slate-400 focus:border-accent-blue"
                />
              </label>
              <PrimaryButton href="#contact" className="w-full sm:w-fit">
                Request a Demo
              </PrimaryButton>
            </form>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export default ContactSection
