"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useColleges } from "@/hooks/useColleges";
import CollegeCard from "@/components/colleges/CollegeCard";
import { College } from "@/types";
import CollegeTable from "@/components/colleges/CollegeTable";
import CollegeFilters, { FilterState } from "@/components/colleges/CollegeFilters";
import CollegeSearch from "@/components/colleges/CollegeSearch";
import { Grid, List, Landmark, Loader2, Sparkles, GraduationCap, Search } from "lucide-react";

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-32 flex-grow">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground mt-4 font-semibold">Loading search tools...</span>
      </div>
    }>
      <CollegesList />
    </Suspense>
  );
}

function CollegesList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") || "";
  const initialType = searchParams.get("type") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialState = searchParams.get("state") || "";
  const initialMaxFees = searchParams.get("maxFees") || "";
  const initialSortBy = searchParams.get("sortBy") || "rating";

  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState<FilterState>({
    type: initialType,
    category: initialCategory,
    state: initialState,
    maxFees: initialMaxFees,
    sortBy: initialSortBy,
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: colleges, isLoading, isError, error } = useColleges({
    search,
    ...filters,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filters.type) params.set("type", filters.type);
    if (filters.category) params.set("category", filters.category);
    if (filters.state) params.set("state", filters.state);
    if (filters.maxFees) params.set("maxFees", filters.maxFees);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);

    router.replace(`/colleges?${params.toString()}`);
  }, [search, filters, router]);

  const handleClearFilters = () => {
    setSearch("");
    setFilters({
      type: "",
      category: "",
      state: "",
      maxFees: "",
      sortBy: "rating",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── Hero Header ─── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 px-4 py-14 sm:py-16">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-violet-400/10 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <GraduationCap className="h-5 w-5 text-indigo-300" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Explore Colleges
              </h1>
              <p className="text-indigo-300/80 text-sm mt-0.5">
                Discover {colleges?.length || 30}+ institutions across India
              </p>
            </div>
          </div>

          {/* Search Bar in Hero */}
          <div className="mt-6 max-w-3xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-indigo-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by college name, city, state, or stream..."
                className="w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 pl-12 pr-4 py-4 text-white placeholder:text-indigo-300/50 text-sm outline-none focus:bg-white/15 focus:border-indigo-400/40 transition-all shadow-lg"
              />
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["IIT", "NIT", "AIIMS", "IIM", "BITS", "NLU"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearch(tag)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                    search === tag
                      ? "bg-indigo-500 border-indigo-400 text-white"
                      : "border-white/15 bg-white/5 text-indigo-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fadeInUp">
        {/* Top Bar: Result count + view toggle */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {!isLoading && colleges && (
              <p className="text-sm text-slate-500">
                <span className="font-bold text-slate-800">{colleges.length}</span> colleges found
                {search && <span> for &ldquo;<span className="font-semibold text-indigo-600">{search}</span>&rdquo;</span>}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl p-1 bg-white shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:bg-slate-50"
              }`}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:bg-slate-50"
              }`}
              title="Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filter + Listing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start w-full">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 lg:sticky lg:top-6 z-20">
            <CollegeFilters
              filters={filters}
              onChange={setFilters}
              onClear={handleClearFilters}
            />
          </div>

          {/* Listing Results */}
          <div className="lg:col-span-3 w-full flex flex-col min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 flex-1">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-indigo-200/50 animate-ping" />
                  <Loader2 className="h-10 w-10 animate-spin text-indigo-600 relative" />
                </div>
                <span className="text-sm text-slate-500 mt-6 font-medium">Loading colleges...</span>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center p-10 bg-red-50 text-red-600 rounded-2xl border border-red-200 text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                  <Landmark className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-base">Error Loading Data</h3>
                <p className="text-xs mt-1 text-red-500">{(error as any).message || "An unexpected error occurred."}</p>
              </div>
            ) : !colleges || colleges.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-16 bg-white rounded-2xl border border-slate-200 flex-1 shadow-sm">
                <div className="rounded-full bg-slate-100 p-5 text-slate-400 mb-4">
                  <Landmark className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No colleges match your criteria</h3>
                <p className="text-sm text-slate-500 mt-2 max-w-xs leading-relaxed">
                  Try widening your search, clearing filters, or raising the maximum fees limit.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4 flex-1">
                <div className="text-xs font-medium text-slate-400 mb-3 flex items-center justify-between">
                  <span>Showing {colleges.length} results</span>
                  <span className="flex items-center gap-1 text-[10px] text-indigo-500 uppercase tracking-wider font-semibold">
                    <Sparkles className="h-3 w-3 fill-current" />
                    <span>Live Results</span>
                  </span>
                </div>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {colleges.map((college: College) => (
                      <CollegeCard key={college.id} college={college} />
                    ))}
                  </div>
                ) : (
                  <CollegeTable colleges={colleges} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
