"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface CollegeSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CollegeSearch({
  value,
  onChange,
  placeholder = "Search by college name, city, state, or majors...",
}: CollegeSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  // Sync with prop when prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, onChange]);

  return (
    <div className="relative w-full rounded-xl bg-card border border-border focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-xs duration-200">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
        <Search className="h-5 w-5" />
      </div>
      
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent pl-12 pr-10 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border-none"
      />
      
      {localValue && (
        <button
          onClick={() => setLocalValue("")}
          className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
