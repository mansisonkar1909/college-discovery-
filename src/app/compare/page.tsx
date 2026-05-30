"use client";

import CompareTable from "@/components/compare/CompareTable";
import { useCompareStore } from "@/store/compareStore";
import { useQuery } from "@tanstack/react-query";
import { GitCompare, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { College } from "@/types";

export default function ComparePage() {
  const compareList = useCompareStore((state) => state.compareList);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const ids = compareList.map((c) => c.id).join(",");

  // Fetch full details of the compared colleges from the server
  const { data: colleges, isLoading } = useQuery({
    queryKey: ["compareCollegesData", ids],
    queryFn: async (): Promise<College[]> => {
      if (!ids) return [];
      const res = await fetch(`/api/compare?ids=${ids}`);
      if (!res.ok) throw new Error("Failed to fetch comparison details");
      return res.json();
    },
    enabled: !!ids && mounted,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex flex-col">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          <GitCompare className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Compare Colleges</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Compare tuition fees, rankings, placement records, majors, and campus facilities side-by-side.
          </p>
        </div>
      </div>

      {!mounted ? (
        <div className="py-20 text-center text-muted-foreground">Loading comparison cart...</div>
      ) : compareList.length === 0 ? (
        <CompareTable colleges={[]} />
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 flex-grow">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground mt-3">Loading comparison details...</span>
        </div>
      ) : (
        <CompareTable colleges={colleges || []} />
      )}
    </div>
  );
}
