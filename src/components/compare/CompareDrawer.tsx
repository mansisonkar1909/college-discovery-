"use client";

import Link from "next/link";
import { useCompareStore } from "@/store/compareStore";
import { X, GitCompare, ArrowRight, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CompareDrawer() {
  const { compareList, removeFromCompare, clearCompare } = useCompareStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:px-8 bg-card border-t border-border shadow-2xl glass animate-fadeInUp">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Info */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <GitCompare className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Compare Colleges</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Select up to 3 colleges to compare side-by-side. ({compareList.length} selected)
            </p>
          </div>
        </div>

        {/* Center Thumbnails */}
        <div className="flex items-center gap-3 overflow-x-auto py-1 max-w-full">
          {compareList.map((college) => (
            <div
              key={college.id}
              className="relative flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 flex-shrink-0 group"
            >
              <div className="h-6 w-6 overflow-hidden rounded-md border border-border bg-white p-0.5">
                {college.imageUrl ? (
                  <img src={college.imageUrl} alt="" className="h-full w-full object-contain" />
                ) : (
                  <div className="h-full w-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[10px]">
                    {college.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-xs font-semibold text-foreground line-clamp-1 max-w-[120px]">
                {college.name}
              </span>
              <button
                onClick={() => removeFromCompare(college.id)}
                className="text-muted-foreground hover:text-destructive p-0.5 rounded-full hover:bg-muted"
                title="Remove"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-[10px] font-bold text-muted-foreground hover:text-destructive flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-destructive/5 transition-colors"
              title="Clear all"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          )}
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
          <Link
            href="/compare"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-accent/90 transition-all hover:scale-102"
          >
            <span>Compare Now</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
