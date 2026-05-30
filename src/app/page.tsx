import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CollegeCard from "@/components/colleges/CollegeCard";
import { Search, Landmark, GitCompare, Bookmark, GraduationCap, Sparkles } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

async function getFeaturedColleges() {
  try {
    const colleges = await prisma.college.findMany({
      take: 3,
      orderBy: {
        rating: "desc",
      },
    });

    return colleges.map((college) => ({
      ...college,
      programs: college.programs ? JSON.parse(college.programs) : [],
      facilities: college.facilities ? JSON.parse(college.facilities) : [],
    }));
  } catch (err) {
    console.error("Error fetching featured colleges:", err);
    return [];
  }
}

export default async function HomePage() {
  const featured = await getFeaturedColleges();

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 py-20 text-white animate-fadeInUp">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground border border-indigo-500/20">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span>Explore Colleges Smarter</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent leading-none">
              Find the Perfect College for Your Future
            </h1>
            
            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Discover top universities, compare annual fees, review average packages, and bookmark your favorites in one place.
            </p>

            {/* Search Navigation Form */}
            <div className="w-full max-w-xl pt-4">
              <form action="/colleges" method="GET" className="relative flex items-center bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/20 shadow-lg focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200">
                <Search className="h-5 w-5 text-slate-400 ml-3.5 flex-shrink-0" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search by college name, category, state, or majors..."
                  className="w-full bg-transparent border-none outline-none pl-2.5 pr-4 py-3 text-sm text-white placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary/90 transition-all duration-200"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 w-full">
        <div className="grid grid-cols-3 rounded-xl border border-border bg-card p-6 shadow-md divide-x divide-border">
          <div className="flex flex-col items-center justify-center p-3 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-primary">6+</span>
            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">Colleges Seeded</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-accent">5+</span>
            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">States Covered</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">30+</span>
            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">Academic Majors</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20 w-full animate-fadeInUp">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-foreground">Why Use EduMatch?</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">Our comparison platform offers everything you need to research colleges efficiently.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col items-center text-center">
            <div className="rounded-full bg-primary/10 p-3 text-primary mb-4">
              <Landmark className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Detailed Directory</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Explore government and private universities with in-depth stats for annual fees, packages, and facilities.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col items-center text-center">
            <div className="rounded-full bg-accent/10 p-3 text-accent mb-4">
              <GitCompare className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Side-by-Side Compare</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Add up to 3 colleges into our compare tool to review rates, packages, and categories side-by-side.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col items-center text-center">
            <div className="rounded-full bg-indigo-500/10 p-3 text-indigo-600 mb-4">
              <Bookmark className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Save Bookmarks</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Sign in securely to bookmark colleges and keep track of your favorites.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Colleges Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-border pb-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">Highest Rated Colleges</h2>
            <p className="text-sm text-muted-foreground mt-1">Our featured selection based on student ratings.</p>
          </div>
          <Link
            href="/colleges"
            className="flex items-center gap-1 text-xs font-bold text-primary hover:underline mt-4 sm:mt-0"
          >
            <span>Explore All Colleges</span>
            <GraduationCap className="h-4 w-4" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((college: any) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-xl text-muted-foreground">
            No featured colleges found in the database.
          </div>
        )}
      </section>
    </div>
  );
}
