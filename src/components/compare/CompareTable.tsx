"use client";

import Link from "next/link";
import { College } from "@/types";
import { useCompareStore } from "@/store/compareStore";
import SaveButton from "@/components/saved/SaveButton";
import { Star, X, Landmark, DollarSign, Award, Users, BookOpen, Construction, Globe, TrendingUp } from "lucide-react";

interface CompareTableProps {
  colleges: College[];
}

export default function CompareTable({ colleges }: CompareTableProps) {
  const { removeFromCompare } = useCompareStore();

  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (colleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 bg-card rounded-xl border border-border mt-6">
        <div className="rounded-full bg-muted p-4 text-muted-foreground mb-4">
          <Landmark className="h-10 w-10" />
        </div>
        <h3 className="text-lg font-bold text-foreground">No colleges selected</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-1">
          Select up to 3 colleges from the explore page to compare them side-by-side.
        </p>
        <Link
          href="/colleges"
          className="mt-6 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary/95 transition-all"
        >
          Explore Colleges
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-sm mt-6">
      <div className="min-w-[800px] divide-y divide-border">
        {/* Header Row (Images & Quick Info) */}
        <div className="grid grid-cols-4 bg-muted/30">
          <div className="p-6 flex items-end">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Comparison Metrics</h3>
          </div>
          {colleges.map((college) => (
            <div key={college.id} className="relative p-6 border-l border-border flex flex-col items-center text-center group">
              {/* Quick Remove */}
              <button
                onClick={() => removeFromCompare(college.id)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-destructive p-1 rounded-full hover:bg-muted transition-colors z-10"
                title="Remove"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Logo / Thumbnail */}
              <div className="h-16 w-16 overflow-hidden rounded-xl border-2 border-card bg-white p-1.5 shadow-sm mb-4">
                {college.imageUrl ? (
                  <img src={college.imageUrl} alt="" className="h-full w-full object-contain" />
                ) : (
                  <div className="h-full w-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                    {college.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Title & Info */}
              <Link href={`/colleges/${college.id}`} className="font-bold text-foreground hover:text-primary transition-colors line-clamp-2 px-2 text-sm leading-snug">
                {college.name}
              </Link>
              {college.state && (
                <span className="text-xs text-muted-foreground mt-1">State: {college.state}</span>
              )}

              {/* Save Trigger */}
              <div className="mt-3 flex items-center gap-1.5">
                <SaveButton collegeId={college.id} showText className="text-[11px] font-bold px-3 py-1" />
              </div>
            </div>
          ))}
          {/* Pad columns if less than 3 colleges */}
          {colleges.length < 3 && 
            Array.from({ length: 3 - colleges.length }).map((_, idx) => (
              <div key={`empty-col-${idx}`} className="p-6 border-l border-border flex flex-col items-center justify-center text-center bg-muted/10">
                <span className="text-xs text-muted-foreground italic">Slot Empty</span>
                <Link href="/colleges" className="text-[11px] font-bold text-primary hover:underline mt-2">
                  + Add College
                </Link>
              </div>
            ))
          }
        </div>

        {/* Institution Type */}
        <div className="grid grid-cols-4 items-center">
          <div className="p-4 pl-6 text-xs font-bold text-muted-foreground flex items-center gap-2">
            <Landmark className="h-4 w-4 text-primary" />
            <span>Type</span>
          </div>
          {colleges.map((college) => (
            <div key={college.id} className="p-4 border-l border-border text-sm text-foreground font-semibold uppercase">
              {college.type}
            </div>
          ))}
          {colleges.length < 3 && Array.from({ length: 3 - colleges.length }).map((_, idx) => (
            <div key={`type-empty-${idx}`} className="p-4 border-l border-border bg-muted/5" />
          ))}
        </div>

        {/* Category */}
        <div className="grid grid-cols-4 items-center">
          <div className="p-4 pl-6 text-xs font-bold text-muted-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>Category</span>
          </div>
          {colleges.map((college) => (
            <div key={college.id} className="p-4 border-l border-border text-sm text-foreground">
              {college.category ?? "N/A"}
            </div>
          ))}
          {colleges.length < 3 && Array.from({ length: 3 - colleges.length }).map((_, idx) => (
            <div key={`cat-empty-${idx}`} className="p-4 border-l border-border bg-muted/5" />
          ))}
        </div>

        {/* Annual Fees */}
        <div className="grid grid-cols-4 items-center">
          <div className="p-4 pl-6 text-xs font-bold text-muted-foreground flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-emerald-600" />
            <span>Annual Fees</span>
          </div>
          {colleges.map((college) => (
            <div key={college.id} className="p-4 border-l border-border text-sm font-bold text-emerald-600">
              {formatCurrency(college.annualFees)}
            </div>
          ))}
          {colleges.length < 3 && Array.from({ length: 3 - colleges.length }).map((_, idx) => (
            <div key={`tuition-out-empty-${idx}`} className="p-4 border-l border-border bg-muted/5" />
          ))}
        </div>

        {/* Average Package */}
        <div className="grid grid-cols-4 items-center">
          <div className="p-4 pl-6 text-xs font-bold text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span>Avg. Placement Package</span>
          </div>
          {colleges.map((college) => (
            <div key={college.id} className="p-4 border-l border-border text-sm font-bold text-foreground">
              {formatCurrency(college.avgPackage)}
            </div>
          ))}
          {colleges.length < 3 && Array.from({ length: 3 - colleges.length }).map((_, idx) => (
            <div key={`pkg-empty-${idx}`} className="p-4 border-l border-border bg-muted/5" />
          ))}
        </div>

        {/* National Ranking */}
        <div className="grid grid-cols-4 items-center">
          <div className="p-4 pl-6 text-xs font-bold text-muted-foreground flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-500" />
            <span>National Rank</span>
          </div>
          {colleges.map((college) => (
            <div key={college.id} className="p-4 border-l border-border text-sm font-bold text-foreground">
              #{college.ranking ?? "N/A"}
            </div>
          ))}
          {colleges.length < 3 && Array.from({ length: 3 - colleges.length }).map((_, idx) => (
            <div key={`rank-empty-${idx}`} className="p-4 border-l border-border bg-muted/5" />
          ))}
        </div>

        {/* Rating */}
        <div className="grid grid-cols-4 items-center">
          <div className="p-4 pl-6 text-xs font-bold text-muted-foreground flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            <span>User Rating</span>
          </div>
          {colleges.map((college) => (
            <div key={college.id} className="p-4 border-l border-border text-sm font-bold text-foreground flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{college.rating.toFixed(1)} / 5.0</span>
            </div>
          ))}
          {colleges.length < 3 && Array.from({ length: 3 - colleges.length }).map((_, idx) => (
            <div key={`rating-empty-${idx}`} className="p-4 border-l border-border bg-muted/5" />
          ))}
        </div>

        {/* Programs */}
        <div className="grid grid-cols-4">
          <div className="p-4 pl-6 text-xs font-bold text-muted-foreground flex items-center gap-2 pt-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>Academic Programs</span>
          </div>
          {colleges.map((college) => (
            <div key={college.id} className="p-4 border-l border-border flex flex-wrap gap-1.5 pt-6 align-top">
              {college.programs && college.programs.map((program) => (
                <span key={program} className="rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground animate-fadeInUp">
                  {program}
                </span>
              ))}
            </div>
          ))}
          {colleges.length < 3 && Array.from({ length: 3 - colleges.length }).map((_, idx) => (
            <div key={`prog-empty-${idx}`} className="p-4 border-l border-border bg-muted/5" />
          ))}
        </div>

        {/* Facilities */}
        <div className="grid grid-cols-4">
          <div className="p-4 pl-6 text-xs font-bold text-muted-foreground flex items-center gap-2 pt-6">
            <Construction className="h-4 w-4 text-accent" />
            <span>Facilities</span>
          </div>
          {colleges.map((college) => (
            <div key={college.id} className="p-4 border-l border-border flex flex-wrap gap-1.5 pt-6 align-top">
              {college.facilities && college.facilities.map((fac) => (
                <span key={fac} className="rounded bg-accent/5 px-2 py-0.5 text-[10px] font-semibold text-accent-foreground animate-fadeInUp">
                  {fac}
                </span>
              ))}
            </div>
          ))}
          {colleges.length < 3 && Array.from({ length: 3 - colleges.length }).map((_, idx) => (
            <div key={`fac-empty-${idx}`} className="p-4 border-l border-border bg-muted/5" />
          ))}
        </div>

        {/* Website */}
        <div className="grid grid-cols-4 items-center">
          <div className="p-4 pl-6 text-xs font-bold text-muted-foreground flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <span>Website</span>
          </div>
          {colleges.map((college) => (
            <div key={college.id} className="p-4 border-l border-border text-sm text-foreground">
              {college.website ? (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Visit website</span>
                  <Globe className="h-3 w-3" />
                </a>
              ) : (
                "N/A"
              )}
            </div>
          ))}
          {colleges.length < 3 && Array.from({ length: 3 - colleges.length }).map((_, idx) => (
            <div key={`web-empty-${idx}`} className="p-4 border-l border-border bg-muted/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
