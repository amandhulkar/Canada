import { useState } from 'react'
import Container from '../components/Container'
import FAQItem from '../components/FAQItem'
import SectionHeading from '../components/SectionHeading'
import { faqs } from '../assets/siteData'

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section-shell">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          kicker="FAQ"
          title="Common questions from teams exploring a more product-led growth workflow."
          description="If you are evaluating fit, here are the questions we hear most often before onboarding begins."
        />

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default FAQSection
