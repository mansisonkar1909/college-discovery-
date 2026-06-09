import Link from "next/link";
import { GraduationCap, Search, GitCompare, Bookmark, ArrowRight, Star, TrendingUp, Users } from "lucide-react";

export default function HomePage() {
  const stats = [
    { icon: GraduationCap, label: "Colleges Listed", value: "500+" },
    { icon: Users, label: "Students Helped", value: "10K+" },
    { icon: TrendingUp, label: "Placement Data", value: "Real-time" },
  ];

  const categories = [
    { name: "Engineering", emoji: "⚙️", count: "180+ colleges" },
    { name: "Medical", emoji: "🏥", count: "60+ colleges" },
    { name: "Management", emoji: "💼", count: "90+ colleges" },
    { name: "Arts", emoji: "🎨", count: "120+ colleges" },
    { name: "Science", emoji: "🔬", count: "40+ colleges" },
    { name: "Law", emoji: "⚖️", count: "30+ colleges" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 px-4 py-24 sm:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-indigo-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-1.5 text-sm text-indigo-300">
            <Star className="h-3.5 w-3.5 fill-indigo-300" />
            India&apos;s smartest college discovery platform
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Find Your{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent">
              Dream College
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-indigo-200 leading-relaxed">
            Search, filter, and compare top Indian colleges across engineering, medical, management and more.
            Make informed decisions with real placement data and student reviews.
          </p>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl">
            <Link
              href="/colleges"
              className="flex items-center gap-3 w-full rounded-2xl bg-white px-5 py-4 text-left shadow-2xl hover:shadow-indigo-500/25 transition-shadow group"
            >
              <Search className="h-5 w-5 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
              <span className="flex-1 text-sm sm:text-base text-slate-400">Search colleges by name, city, or stream...</span>
              <span className="hidden sm:flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white">
                Search <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["IIT", "NIT", "AIIMS", "IIM", "BITS"].map((tag) => (
              <Link
                key={tag}
                href={`/colleges?search=${tag}`}
                className="rounded-full border border-indigo-400/30 bg-white/5 px-4 py-1.5 text-sm text-indigo-200 hover:bg-white/10 hover:text-white transition-all"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-100 bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-3 gap-6">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <div className="text-sm text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Browse by Category</h2>
            <p className="mt-2 text-slate-500">Find colleges that match your stream and interests</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(({ name, emoji, count }) => (
              <Link
                key={name}
                href={`/colleges?category=${name}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 transition-all"
              >
                <span className="text-3xl">{emoji}</span>
                <div>
                  <div className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors text-sm">{name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{count}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-indigo-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Everything You Need</h2>
            <p className="mt-2 text-slate-500">Tools to make the right college decision</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Smart Search & Filter",
                desc: "Filter by fees, rating, state, type, and placement. Find exactly what you're looking for.",
              },
              {
                icon: GitCompare,
                title: "Side-by-Side Compare",
                desc: "Compare up to 3 colleges at once with color-coded metrics. See who wins at a glance.",
              },
              {
                icon: Bookmark,
                title: "Save & Revisit",
                desc: "Shortlist your favourite colleges and come back anytime. Never lose track again.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-sm border border-indigo-100">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to find your college?</h2>
          <p className="text-slate-500 mb-8">Browse hundreds of colleges with detailed data on fees, placements, and courses.</p>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 font-semibold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
          >
            Browse All Colleges <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50 px-4 py-8 text-center text-sm text-slate-400">
        © 2025 EduFind. Built with Next.js, Prisma &amp; TailwindCSS.
      </footer>
    </main>
  );
}