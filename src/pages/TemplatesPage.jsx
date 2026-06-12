import { useState } from 'react'
import Container from '../components/Container'
import Footer from '../sections/Footer'
const templates = [
  {
    id: 1,
    name: 'Fashion Store',
    category: 'E-commerce',
    price: '£199',
    rating: 4.7,
    badge: null,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
  },
  {
    id: 2,
    name: 'Photographer',
    category: 'Photography',
    price: '£199',
    rating: 4.8,
    badge: null,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80',
  },
  {
    id: 3,
    name: 'Startup Landing',
    category: 'Business',
    price: '£199',
    rating: 4.7,
    badge: null,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  },
  {
    id: 4,
    name: 'Restaurant',
    category: 'Food & Dining',
    price: '£199',
    rating: 4.6,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
  {
    id: 5,
    name: 'Coffee Shop',
    category: 'Food & Dining',
    price: '£199',
    rating: 4.5,
    badge: null,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
  },
  {
    id: 6,
    name: 'Wedding',
    category: 'Events',
    price: '£199',
    rating: 4.9,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  },
  {
    id: 7,
    name: 'Portfolio',
    category: 'Creative',
    price: '£199',
    rating: 4.6,
    badge: null,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  },
  {
    id: 8,
    name: 'SaaS Product',
    category: 'Business',
    price: '£199',
    rating: 4.8,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
]

const categories = ['All', 'E-commerce', 'Photography', 'Business', 'Food & Dining', 'Events', 'Creative']

function TemplateCard({ template }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white"
      style={{ borderColor: '#efefef', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div
        className="relative overflow-hidden"
        style={{ height: 220 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={template.image}
          alt={template.name}
          className="h-full w-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        {/* Dark overlay on hover */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300"
          style={{
            background: 'rgba(0,0,0,0.55)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <button
            className="rounded-full px-6 py-2.5 text-sm font-semibold transition hover:bg-gray-100"
            style={{ background: '#fff', color: '#14132a' }}
          >
            Preview
          </button>
          <button
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition"
            style={{ background: '#6c5ce7' }}
          >
            Use Template
          </button>
        </div>

        {/* Badge */}
        {template.badge && (
          <div
            className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white"
            style={{ background: template.badge === 'New' ? '#22c97c' : '#6c5ce7' }}
          >
            {template.badge}
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <p className="text-sm font-semibold" style={{ color: '#14132a' }}>{template.name}</p>
          <p className="text-xs" style={{ color: '#aaa' }}>{template.category}</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: '#f0faf5', color: '#22c97c' }}
          >
            {template.price}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: '#888' }}>
            ★ {template.rating}
          </span>
        </div>
      </div>
    </div>
  )
}

function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? templates
    : templates.filter((t) => t.category === activeCategory)

  return (
    <div className="min-h-screen bg-white pt-20">
      <Container className="py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em]" style={{ color: '#14132a' }}>
            Browse Templates
          </h1>
          <p className="mt-2 text-base" style={{ color: '#888' }}>
            Professional templates to launch your site in minutes.
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition"
              style={
                activeCategory === cat
                  ? { background: '#6c5ce7', color: '#fff' }
                  : { background: '#f5f4ff', color: '#6c5ce7' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="mb-6 text-sm" style={{ color: '#aaa' }}>
          Showing {filtered.length} templates
        </p>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </Container>
      <Footer />
    </div>
  )
}

export default TemplatesPage