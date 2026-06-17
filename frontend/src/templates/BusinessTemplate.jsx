

function BusinessTemplate({ data = {} }) {
  const {
    heroImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    heroTitle = "Welcome to Our Website",
    heroSubtitle = "Your tagline goes here",
    aboutText = "Tell your story here.",
  } = data;

  const brandName = heroTitle.split(" ").slice(0, 2).join(" ");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans">

      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <span className="text-[#E91E8C] font-bold text-xl tracking-tight">
          {brandName}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Home",     id: "home"     },
            { label: "About",    id: "about"    },
            { label: "Services", id: "services" },
            { label: "Contact",  id: "contact"  },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-gray-500 text-sm font-medium hover:text-[#E91E8C] transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("contact")}
          className="text-sm font-semibold px-5 py-2 rounded-full text-white hover:opacity-90 transition"
          style={{ background: "#E91E8C" }}
        >
          Get Started
        </button>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="relative h-[480px] overflow-hidden">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 max-w-3xl">
            {heroTitle}
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl">
            {heroSubtitle}
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={() => scrollTo("services")}
              className="px-8 py-3 rounded-full font-semibold text-white text-sm hover:opacity-90 transition"
              style={{ background: "#E91E8C" }}
            >
              Explore
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="px-8 py-3 rounded-full font-semibold text-white text-sm border-2 border-white hover:bg-white hover:text-gray-900 transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="bg-[#F0F2F8] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#E91E8C] font-semibold text-sm uppercase tracking-widest mb-3">
            About Us
          </p>
          <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-6">
            Who We Are
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            {aboutText}
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#E91E8C] font-semibold text-sm uppercase tracking-widest mb-2 text-center">
            What We Offer
          </p>
          <h2 className="text-2xl font-extrabold text-[#1A1A2E] text-center mb-10">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "Fast Delivery",    desc: "Quick turnaround on all orders and projects." },
              { icon: "🎨", title: "Premium Quality",  desc: "Crafted with attention to every detail."       },
              { icon: "💬", title: "24/7 Support",     desc: "We're always here when you need us."           },
            ].map((f) => (
              <div key={f.title} className="bg-[#F0F2F8] rounded-2xl p-6 text-center hover:shadow-md transition">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#1A1A2E] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 text-center" style={{ background: "#E91E8C" }}>
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          Join thousands of happy customers today.
        </p>
        <button
          onClick={() => scrollTo("contact")}
          className="bg-white font-bold px-10 py-3 rounded-full text-sm hover:scale-105 transition"
          style={{ color: "#E91E8C" }}
        >
          Contact Us Now
        </button>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="bg-[#F0F2F8] py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#E91E8C] font-semibold text-sm uppercase tracking-widest mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-6">
            Contact Us
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm text-left space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              className="w-full py-3 rounded-lg font-semibold text-white text-sm hover:opacity-90 transition"
              style={{ background: "#E91E8C" }}
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1A1A2E] text-white/50 text-sm text-center py-6">
        © 2026 {brandName}. All rights reserved.
      </footer>

    </div>
  );
}

export default BusinessTemplate;