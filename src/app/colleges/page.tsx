"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useColleges } from "@/hooks/useColleges";
import CollegeCard from "@/components/colleges/CollegeCard";
import { College } from "@/types";
import CollegeTable from "@/components/colleges/CollegeTable";
import CollegeFilters, { FilterState } from "@/components/colleges/CollegeFilters";
import CollegeSearch from "@/components/colleges/CollegeSearch";
import { Grid, List, Landmark, Loader2, Sparkles } from "lucide-react";

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

  // Parse initial query params from URL
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

  // Fetch filtered colleges using react-query hook
  const { data: colleges, isLoading, isError, error } = useColleges({
    search,
    ...filters,
  });

  // Sync state back to URL query parameters for shareability
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 flex flex-col animate-fadeInUp">
      {/* Title Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">Explore Colleges</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Use the search and filter panel below to find the perfect matching institutions.
        </p>
      </div>

      {/* Search & Toggle row */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full">
        <div className="flex-1 w-full">
          <CollegeSearch value={search} onChange={setSearch} />
        </div>
        
        {/* Grid/List View Toggles */}
        <div className="flex items-center gap-1.5 border border-border rounded-xl p-1 bg-card self-end sm:self-auto shadow-xs">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            }`}
            title="Grid View"
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            }`}
            title="Table View"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main filter + listing layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start w-full">
        {/* Sidebar filters */}
        <div className="lg:col-span-1 lg:sticky lg:top-20 z-20">
          <CollegeFilters
            filters={filters}
            onChange={setFilters}
            onClear={handleClearFilters}
          />
        </div>

        {/* Listing Results */}
        <div className="lg:col-span-3 w-full flex flex-col min-h-[300px]">
          {isLoading ? (
            // Loading Skeletons
            <div className="flex flex-col items-center justify-center py-20 flex-1">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground mt-4 font-semibold">Loading colleges...</span>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center p-8 bg-destructive/10 text-destructive rounded-xl border border-destructive/20 text-center">
              <h3 className="font-bold text-base">Error Loading Data</h3>
              <p className="text-xs mt-1">{(error as any).message || "An unexpected error occurred."}</p>
            </div>
          ) : !colleges || colleges.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center text-center p-16 bg-card rounded-xl border border-border flex-1">
              <div className="rounded-full bg-muted p-4 text-muted-foreground mb-4">
                <Landmark className="h-8 w-8" />
              </div>
              <h3 className="text-base font-bold text-foreground">No colleges match your criteria</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
                Try widening your search parameter, clearing filters, or raising the maximum fees limit.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow hover:bg-primary/95 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            // Actual Listing View
            <div className="space-y-4 flex-1">
              <div className="text-xs font-bold text-muted-foreground mb-2 flex items-center justify-between">
                <span>Showing {colleges.length} colleges found</span>
                <span className="flex items-center gap-1 text-[10px] text-accent uppercase tracking-wider">
                  <Sparkles className="h-3 w-3 fill-current" />
                  <span>Matches Sync</span>
                </span>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}
