"use client";

import Link from "next/link";
import { College } from "@/types";
import { useCompareStore } from "@/store/compareStore";
import SaveButton from "@/components/saved/SaveButton";
import { Star, Check, ExternalLink } from "lucide-react";

interface CollegeTableProps {
  colleges: College[];
}

export default function CollegeTable({ colleges }: CollegeTableProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompareStore();

  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="px-6 py-4">College</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Annual Fees</th>
              <th className="px-6 py-4">Avg. Package</th>
              <th className="px-6 py-4">National Rank</th>
              <th className="px-6 py-4 text-center">Compare / Save</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {colleges.map((college) => {
              const comparing = isInCompare(college.id);
              return (
                <tr key={college.id} className="hover:bg-muted/30 transition-colors">
                  {/* College Name & Logo */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-white p-1">
                        {college.imageUrl ? (
                          <img
                            src={college.imageUrl}
                            alt={college.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="h-full w-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {college.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/colleges/${college.id}`}
                          className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                        >
                          <span>{college.name}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        {college.state && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            State: {college.state}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Institution Type */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-primary/15 text-primary px-2 py-1 text-xs font-semibold uppercase">
                      {college.type}
                    </span>
                  </td>

                  {/* Annual Fees */}
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {formatCurrency(college.annualFees)}
                  </td>

                  {/* Avg Package */}
                  <td className="px-6 py-4 text-foreground font-semibold">
                    {formatCurrency(college.avgPackage)}
                  </td>

                  {/* National Rank */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-foreground">#{college.ranking ?? "N/A"}</span>
                  </td>

                  {/* Compare / Save Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      {/* Compare toggle */}
                      <button
                        onClick={() => {
                          if (comparing) {
                            removeFromCompare(college.id);
                          } else {
                            addToCompare({
                              id: college.id,
                              name: college.name,
                              slug: college.slug,
                              imageUrl: college.imageUrl,
                            });
                          }
                        }}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-bold border transition-colors ${
                          comparing
                            ? "bg-accent/10 border-accent text-accent hover:bg-accent/20"
                            : "bg-background border-border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {comparing ? (
                          <span className="flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            <span>Added</span>
                          </span>
                        ) : (
                          <span>+ Compare</span>
                        )}
                      </button>

                      {/* Save Heart */}
                      <SaveButton collegeId={college.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
