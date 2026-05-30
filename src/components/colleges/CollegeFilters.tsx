"use client";

import { SlidersHorizontal, RotateCcw, DollarSign, Map, Landmark, BarChart, BookOpen } from "lucide-react";

export interface FilterState {
  type: string;
  category: string;
  state: string;
  maxFees: string;
  sortBy: string;
}

interface CollegeFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}

const statesList = [
  { code: "", name: "All States" },
  { code: "Delhi", name: "Delhi" },
  { code: "Maharashtra", name: "Maharashtra" },
  { code: "Karnataka", name: "Karnataka" },
  { code: "Tamil Nadu", name: "Tamil Nadu" },
  { code: "Rajasthan", name: "Rajasthan" },
];

const categoryList = [
  { value: "", label: "All Streams" },
  { value: "Engineering", label: "Engineering" },
  { value: "Science", label: "Science" },
  { value: "Management", label: "Management" },
];

const sortOptions = [
  { value: "rating", label: "Highest Rating" },
  { value: "ranking", label: "Top Ranked (#)" },
  { value: "annualFees", label: "Annual Fees (Lowest)" },
  { value: "avgPackage", label: "Avg Placement Package" },
];

const typeOptions = [
  { value: "", label: "All" },
  { value: "GOVERNMENT", label: "Govt" },
  { value: "PRIVATE", label: "Private" },
  { value: "DEEMED", label: "Deemed" },
  { value: "AUTONOMOUS", label: "Autonomous" },
];

export default function CollegeFilters({ filters, onChange, onClear }: CollegeFiltersProps) {
  const handleTypeChange = (type: string) => {
    onChange({ ...filters, type });
  };

  const handleCategoryChange = (category: string) => {
    onChange({ ...filters, category });
  };

  const handleStateChange = (state: string) => {
    onChange({ ...filters, state });
  };

  const handleFeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, maxFees: e.target.value });
  };

  const handleSortChange = (sortBy: string) => {
    onChange({ ...filters, sortBy });
  };

  const formatCurrency = (val: string) => {
    if (!val) return "Any";
    const num = parseInt(val);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="w-full rounded-xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span>Filters</span>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-accent transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Sort By */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
            <BarChart className="h-3.5 w-3.5" />
            <span>Sort By</span>
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Institution Type */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
            <Landmark className="h-3.5 w-3.5" />
            <span>Institution Type</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleTypeChange(opt.value)}
                className={`rounded-lg py-1.5 text-[10px] font-bold border transition-all duration-200 ${
                  filters.type === opt.value
                    ? "bg-primary border-primary text-white"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category / Stream */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Stream / Category</span>
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {categoryList.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* State filter */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
            <Map className="h-3.5 w-3.5" />
            <span>Location (State)</span>
          </label>
          <select
            value={filters.state}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {statesList.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tuition range filter */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
            <label className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" />
              <span>Max Annual Fees</span>
            </label>
            <span className="font-bold text-primary">{formatCurrency(filters.maxFees)}</span>
          </div>
          <input
            type="range"
            min="20000"
            max="1200000"
            step="20000"
            value={filters.maxFees || "1200000"}
            onChange={handleFeesChange}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary focus:outline-none"
          />
          <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
            <span>$20,000</span>
            <span>$1,200,000+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
