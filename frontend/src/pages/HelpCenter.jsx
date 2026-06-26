import { useMemo, useState } from "react";
import { FiChevronDown, FiMail, FiPhone, FiSearch } from "react-icons/fi";
import Container from "../components/Container";
import Footer from "../sections/Footer";
import { contactDetails, pricingPlans } from "../assets/siteData";

const categories = [
  {
    label: "Templates",
    description: "Browse templates, preview them, and use a template for a project.",
  },
  {
    label: "Dashboard",
    description: "Manage projects, services, settings, roles, invoices, teams, and clients based on your plan.",
  },
  {
    label: "Plans & access",
    description: "Understand Plus, Pro, and Business access before choosing a plan.",
  },
  {
    label: "Support",
    description: "How to reach 17219296 Canada Inc. for help.",
  },
];

const articles = [
  {
    title: "What is FindTemplates?",
    category: "Templates",
    answer:
      "FindTemplates helps agencies, freelancers, and growing businesses launch professional websites from ready templates and manage client work from one dashboard.",
  },
  {
    title: "How do I browse templates?",
    category: "Templates",
    answer:
      "Open the Templates page from the navigation or footer. You can filter templates by category and preview a template before using it.",
  },
  {
    title: "How do I use a template?",
    category: "Templates",
    answer:
      "Open a template preview and click Use This Template. If sign-in is required, sign in first, then the project opens in the dashboard so you can customize it.",
  },
  {
    title: "What can I manage in the dashboard?",
    category: "Dashboard",
    answer:
      "Depending on your access, the dashboard includes pages such as Projects, Settings, Support Info, Access/Role, Services, Invoices, Team, Clients, and Reports.",
  },
  {
    title: "How do team members get access?",
    category: "Dashboard",
    answer:
      "An admin can add team members from the Team page, set their role, and share their sign-in email and password.",
  },
  {
    title: "Which plans are available?",
    category: "Plans & access",
    answer: `FindTemplates currently shows ${pricingPlans.map((plan) => `${plan.name} (${plan.price}${plan.cadence})`).join(", ")}. Each plan gives different dashboard and template access.`,
  },
  {
    title: "What is included in the Plus plan?",
    category: "Plans & access",
    answer:
      "Plus includes access to Projects, Settings, Support Info, Access/Role, and Services pages.",
  },
  {
    title: "What is included in the Pro plan?",
    category: "Plans & access",
    answer:
      "Pro includes Projects, Settings, Support Info, Access/Role, Services, Invoices, Team page access, and access to any 4 templates.",
  },
  {
    title: "What is included in the Business plan?",
    category: "Plans & access",
    answer:
      "Business includes complete dashboard access, Projects, Settings, Support Info, Access/Role, Services, Invoices, Team, Clients, Reports, all templates, and priority support.",
  },
  {
    title: "How can I contact support?",
    category: "Support",
    answer:
      "You can contact 17219296 Canada Inc. by phone at (519) 535-1270 or by using the contact details listed on this page.",
  },
];

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openArticle, setOpenArticle] = useState(articles[0].title);

  const filteredArticles = useMemo(() => {
    const search = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
      const matchesSearch =
        !search ||
        article.title.toLowerCase().includes(search) ||
        article.category.toLowerCase().includes(search) ||
        article.answer.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [query, selectedCategory]);

  const scrollToArticles = () => {
    document.getElementById("help-articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setQuery("");
    setOpenArticle("");
    setTimeout(scrollToArticles, 0);
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#14132a]">
      <section className="border-b border-[#e7e8f0] bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6c5ce7]">FindTemplates Help Center</p>
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#14132a] sm:text-5xl">
              Get help with templates, dashboard access, and support.
            </h1>
            <p className="mt-5 text-base leading-7 text-[#6f7280]">
              Real help articles based on the current FindTemplates website and dashboard features.
            </p>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#e3e4ee] bg-[#f8f8fc] p-2 shadow-sm">
              <FiSearch className="ml-3 shrink-0 text-[#6c5ce7]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && scrollToArticles()}
                placeholder="Search templates, plans, dashboard..."
                className="min-w-0 flex-1 bg-transparent text-sm text-[#14132a] outline-none placeholder:text-[#9ca0af]"
              />
              <button
                onClick={scrollToArticles}
                className="rounded-xl bg-[#6c5ce7] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5b4bd6]"
              >
                Search
              </button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const active = selectedCategory === category.label;

              return (
                <button
                  key={category.label}
                  onClick={() => selectCategory(category.label)}
                  className={`rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                    active ? "border-[#6c5ce7] shadow-lg" : "border-[#e5e6ef]"
                  }`}
                >
                  <div className="text-sm font-bold text-[#14132a]">{category.label}</div>
                  <p className="mt-2 text-sm leading-6 text-[#737684]">{category.description}</p>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="help-articles" className="pb-14 scroll-mt-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#6c5ce7]">Articles</p>
                  <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#14132a]">
                    {selectedCategory === "All" ? "Common questions" : selectedCategory}
                  </h2>
                </div>
                {(selectedCategory !== "All" || query) && (
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setQuery("");
                      setOpenArticle(articles[0].title);
                    }}
                    className="rounded-full border border-[#dedfed] bg-white px-4 py-2 text-sm font-semibold text-[#6c5ce7] transition hover:border-[#6c5ce7]"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#e5e6ef] bg-white shadow-sm">
                {filteredArticles.length === 0 ? (
                  <div className="p-6 text-sm text-[#737684]">No matching help article found.</div>
                ) : (
                  filteredArticles.map((article, index) => {
                    const isOpen = openArticle === article.title;

                    return (
                      <div key={article.title} className={index < filteredArticles.length - 1 ? "border-b border-[#ececf4]" : ""}>
                        <button
                          onClick={() => setOpenArticle(isOpen ? "" : article.title)}
                          className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-[#fafaff]"
                        >
                          <div>
                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#6c5ce7]">{article.category}</span>
                            <p className="mt-1 font-semibold text-[#14132a]">{article.title}</p>
                          </div>
                          <FiChevronDown className={`shrink-0 text-[#6c5ce7] transition ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && <p className="px-5 pb-5 text-sm leading-7 text-[#686b78]">{article.answer}</p>}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-[#e5e6ef] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#14132a]">Current plans</h3>
                <div className="mt-4 space-y-3">
                  {pricingPlans.map((plan) => (
                    <div key={plan.name} className="rounded-xl bg-[#f8f8fc] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-[#14132a]">{plan.name}</p>
                        <p className="font-bold text-[#6c5ce7]">{plan.price}</p>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-[#737684]">{plan.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#e5e6ef] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#14132a]">Contact support</h3>
                <p className="mt-2 text-sm leading-6 text-[#737684]">
                  Use the real company details listed on FindTemplates.
                </p>
                <div className="mt-4 space-y-3 text-sm text-[#555967]">
                  {contactDetails.map((detail) => (
                    <div key={detail.title}>
                      <p className="font-semibold text-[#14132a]">{detail.title}</p>
                      <p className="mt-1 leading-6">{detail.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <a
                    href="tel:+15195351270"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6c5ce7] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5b4bd6]"
                  >
                    <FiPhone /> Call support
                  </a>
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dedfed] bg-white px-4 py-3 text-sm font-semibold text-[#6c5ce7] transition hover:border-[#6c5ce7]"
                  >
                    <FiMail /> Contact page
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
