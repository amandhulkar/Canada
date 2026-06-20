import {
  FiActivity,
  FiAward,
  FiCode,
  FiLayers,
  FiMail,
  FiMapPin,
  FiPenTool,
  FiPhone,
  FiSearch,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi'

// export const navLinks = [
//   { label: 'Home', href: '#home' },
//   { label: 'Features', href: '#features' },
//   // { label: 'Customers', href: '#portfolio' },
//   // { label: 'About', href: '#about' },
//   { label: 'Pricing', href: '#pricing' },
//   // { label: 'Contact', href: '#contact' },
//   { label: "Help Center", href: "/help-center" },

// ]

export const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Help Center', href: '/help-center' },
]

export const footerNavLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Templates', href: '/templates' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  // { label: 'Help Center', href: '/help-center' },
]

export const trustedBrands = [
  'Northstar',
  'Aether Labs',
  'MetricFlow',
  'Luma Commerce',
  'NovaStack',
  'Peak Horizon',
]

export const heroMetrics = [
  { label: 'Revenue lift', value: '+184%' },
  { label: 'Qualified pipeline', value: '12.4K' },
  { label: 'Faster launches', value: '3.2x' },
]

export const services = [
  {
    title: 'Campaign command center',
    description:
      'Plan, launch, and optimize multi-channel campaigns from a single workflow built for modern growth teams.',
    icon: FiTrendingUp,
    outcome: 'Stay aligned across acquisition, creative, and reporting.',
  },
  {
    title: 'Insights & attribution',
    description:
      'See what is driving pipeline with clear dashboards, source-level tracking, and decision-ready reporting.',
    icon: FiSearch,
    outcome: 'Move faster with confident channel decisions.',
  },
  {
    title: 'Landing page system',
    description:
      'Launch premium conversion pages with reusable sections, fast edits, and built-in brand consistency.',
    icon: FiPenTool,
    outcome: 'Ship polished pages without slowing the team down.',
  },
  {
    title: 'Experiment workflows',
    description:
      'Structure tests across offers, messaging, and design so your team learns and improves every sprint.',
    icon: FiLayers,
    outcome: 'Turn scattered ideas into repeatable wins.',
  },
  {
    title: 'Audience orchestration',
    description:
      'Segment users, personalize journeys, and coordinate lifecycle touchpoints with more precision.',
    icon: FiTarget,
    outcome: 'Create journeys that feel timely and relevant.',
  },
  {
    title: 'Ops automation',
    description:
      'Reduce manual work with connected systems for briefs, approvals, handoffs, and performance reviews.',
    icon: FiCode,
    outcome: 'Give your team more time for strategic work.',
  },
]

export const aboutStats = [
  { label: 'Teams launched faster', value: '340+' },
  { label: 'Average retention', value: '18 months' },
  { label: 'Revenue influenced', value: '$82Cr+' },
  { label: 'Cross-functional specialists', value: '24' },
]

export const portfolioItems = [
  {
    name: 'Luma Commerce',
    category: 'Customer story',
    summary: 'Unified campaign execution, landing pages, and reporting into one clean operating layer for a growing ecommerce brand.',
    outcome: '3.4x blended ROAS in 90 days',
    tags: ['Paid media', 'Pages', 'Lifecycle'],
    gradient: 'from-[#f6f3ff] via-[#e8edff] to-[#e6f8ff]',
  },
  {
    name: 'Northstar SaaS',
    category: 'Customer story',
    summary: 'Helped the team tighten positioning and improve handoff between demand generation, product marketing, and sales.',
    outcome: '42% increase in demo conversion',
    tags: ['Messaging', 'Funnel', 'Ops'],
    gradient: 'from-[#eef3ff] via-[#ebe8ff] to-[#f8fbff]',
  },
  {
    name: 'Aether Labs',
    category: 'Customer story',
    summary: 'Created a launch-ready growth system that paired premium presentation with faster execution and cleaner reporting.',
    outcome: '$1.2Cr pipeline in launch quarter',
    tags: ['Launch', 'Analytics', 'Creative'],
    gradient: 'from-[#f0fbff] via-[#eef1ff] to-[#f7f2ff]',
  },
  {
    name: 'Peak Horizon',
    category: 'Customer story',
    summary: 'Simplified the user journey and improved the conversion path with clearer structure, better messaging, and faster iteration.',
    outcome: '61% stronger lead-to-close rate',
    tags: ['UX', 'Positioning', 'CRO'],
    gradient: 'from-[#f8f3ff] via-[#eff0ff] to-[#edf8ff]',
  },
]

export const reasons = [
  {
    title: 'Designed for modern teams',
    description:
      'Everything is built to help marketing, design, and growth stay aligned without adding process friction.',
    icon: FiShield,
  },
  {
    title: 'Fast by default',
    description:
      'From campaign setup to page launches, the interface keeps work moving with fewer blockers and cleaner handoffs.',
    icon: FiZap,
  },
  {
    title: 'Clarity in every metric',
    description:
      'Dashboards focus on the numbers that matter so teams can act quickly instead of getting buried in noise.',
    icon: FiActivity,
  },
  {
    title: 'Built to scale gracefully',
    description:
      'The system stays easy to use as your team, experiments, and reporting needs become more sophisticated.',
    icon: FiUsers,
  },
]

export const resultsStats = [
  { label: 'Average revenue lift', value: 184, suffix: '%' },
  { label: 'Faster launch cycles', value: 3.2, suffix: 'x', decimals: 1 },
  { label: 'Qualified leads generated', value: 12400, suffix: '+', compact: true },
  { label: 'Customer satisfaction', value: 94, suffix: '/100' },
]

export const testimonials = [
  {
    name: 'Ananya Mehta',
    role: 'Founder, Luma Commerce',
    quote:
      'Velora gave our team a cleaner system for launching pages, measuring results, and keeping creative aligned with growth goals. It feels premium, but more importantly it helps us move faster.',
  },
  {
    name: 'Raghav Batra',
    role: 'VP Marketing, Northstar SaaS',
    quote:
      'The product experience is calm, clear, and genuinely useful. Our team spends less time coordinating and more time improving conversion and pipeline quality.',
  },
  {
    name: 'Sara Menon',
    role: 'Co-Founder, Aether Labs',
    quote:
      'What stood out most was how polished everything felt without becoming complicated. It gave us the startup speed we needed with a much more mature customer experience.',
  },
]

// export const pricingPlans = [
//   {
//     name: 'Starter',
//     price: '$75K',
//     cadence: '/month',
//     summary: 'For lean teams that want a polished growth system, clear reporting, and faster page launches.',
//     features: ['Core campaign workspace', 'Landing page system', 'Weekly reporting', '2 active experiments'],
//   },
//   {
//     name: 'Growth',
//     price: '$1.5L',
//     cadence: '/month',
//     featured: true,
//     summary: 'For scaling companies that need deeper experimentation, multi-channel coordination, and stronger workflow visibility.',
//     features: ['Everything in Starter', 'Advanced attribution', 'Team collaboration', 'Priority optimization support'],
//   },
//   {
//     name: 'Scale+',
//     price: 'Custom',
//     cadence: '',
//     summary: 'For companies that need a tailored operating layer across performance, product marketing, and lifecycle execution.',
//     features: ['Custom implementation', 'Executive reporting', 'Workflow automation', 'Dedicated strategic support'],
//   },
// ]

export const pricingPlans = [
  {
    name: 'Plus',
    price: '$199',
    cadence: '/month',
    featured: false,
    summary:
      'Access dashboard pages including Projects, Settings, Support Info, Access/Role, and Services, billed every 30 days.',
    features: [
      'Projects page access',
      'Settings page access',
      'Support Info page access',
      'Access/Role page access',
      'Services page access',
    ],
  },
  {
    name: 'Pro',
    price: '$299',
    cadence: '/month',
    featured: false,
    summary:
      'Access dashboard pages including Projects, Settings, Support Info, Access/Role, Services, Invoices, and Team, plus any 4 templates, billed every 30 days.',
    features: [
      'Projects and Settings access',
      'Support Info and Access/Role access',
      'Services and Invoices access',
      'Team page access',
      'Access to any 4 templates',
    ],
  },
  {
    name: 'Business',
    price: '$399',
    cadence: '/month',
    featured: true,
    summary:
      'Complete dashboard access including Projects, Settings, Support Info, Access/Role, Services, Invoices, Team, Clients, and Reports, plus all 8 templates, billed every 30 days.',
    features: [
      'Complete dashboard access',
      'Projects, Settings, and Support Info',
      'Access/Role, Services, and Invoices',
      'Team, Clients, and Reports access',
      'Access to all 8 templates',
      'Priority support',
    ],
  },
]

export const faqs = [
  {
    question: 'Who is Velora best suited for?',
    answer:
      'Velora works best for startups and growth-stage teams that want a cleaner way to manage campaigns, landing pages, and performance visibility without stitching together too many tools.',
  },
  {
    question: 'Is this more of a service or a product experience?',
    answer:
      'The experience is designed to feel product-led: structured workflows, dashboards, reusable systems, and a cleaner operating model that supports execution at scale.',
  },
  {
    question: 'How quickly can teams get started?',
    answer:
      'Most teams can begin within 1-2 weeks depending on scope, onboarding complexity, and whether a launch timeline is already underway.',
  },
  {
    question: 'What makes the experience feel different?',
    answer:
      'It combines premium visual polish with practical workflow clarity, so the interface looks modern but still helps teams make faster, better decisions every week.',
  },
  {
    question: 'Can it support multiple stakeholders?',
    answer:
      'Yes. The structure is designed to keep leadership, growth, creative, and execution teams aligned through clearer visibility and shared operating patterns.',
  },
]

export const contactDetails = [
  {
    title: 'Company',
    value: '17219296 Canada Inc.',
    icon: FiMail,
  },
  {
    title: 'Phone',
    value: '(519) 535-1270',
    icon: FiPhone,
  },
  {
    title: 'Registered address',
    value: '195 Huntingford Trail, Woodstock, ON N4T 0M4, Canada',
    icon: FiMapPin,
  },
]

// export const footerLinks = ['Privacy', 'Terms', 'Careers']

export const footerLinks = ['Privacy']

export const highlights = [
  'Unified view of growth activity',
  'Premium pages that launch faster',
  'Cleaner execution for lean teams',
]

export const differentiators = [
  {
    title: 'Positioning built into the workflow',
    description: 'Keep narrative, pages, and performance aligned from the first campaign brief onward.',
    icon: FiAward,
  },
  {
    title: 'Growth systems that stay lightweight',
    description: 'Get more structure and clarity without turning your team into operators of a complicated stack.',
    icon: FiTrendingUp,
  },
]