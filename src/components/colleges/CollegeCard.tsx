"use client";

import Link from "next/link";
import { College } from "@/types";
import { useCompareStore } from "@/store/compareStore";
import SaveButton from "@/components/saved/SaveButton";
import { MapPin, School, Landmark, Star, Check, Award, TrendingUp } from "lucide-react";

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompareStore();
  const comparing = isInCompare(college.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
  };

  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Banner / Image & Overlay */}
      <div className="relative h-44 w-full overflow-hidden bg-muted">
        {college.imageUrl ? (
          <img
            src={college.imageUrl}
            alt={college.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-primary/30 to-accent/30" />
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-xs">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{college.rating.toFixed(1)}</span>
        </div>

        {/* Save Button */}
        <div className="absolute top-3 right-3 z-10">
          <SaveButton collegeId={college.id} className="bg-black/40 hover:bg-black/60 text-white" />
        </div>

        {/* Type Badge */}
        <div className="absolute bottom-3 right-3 rounded-md bg-primary px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
          {college.type}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-5">
        {/* Category Badge */}
        {college.category && (
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            {college.category}
          </span>
        )}

        {/* Title */}
        <Link href={`/colleges/${college.id}`} className="hover:text-primary transition-colors">
          <h3 className="text-base font-bold text-foreground line-clamp-1">{college.name}</h3>
        </Link>

        {/* Location */}
        {college.state && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span>State: {college.state}</span>
          </div>
        )}

        {/* Description */}
        {college.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-3 leading-relaxed">
            {college.description}
          </p>
        )}

        {/* Grid Stats */}
        <div className="grid grid-cols-2 gap-3 border-t border-border mt-4 pt-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-secondary p-1.5 text-primary">
              <School className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground leading-none">Annual Fees</span>
              <span className="text-xs font-bold text-foreground mt-0.5">
                {formatCurrency(college.annualFees)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-secondary p-1.5 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground leading-none">Avg. Package</span>
              <span className="text-xs font-bold text-foreground mt-0.5">
                {formatCurrency(college.avgPackage)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-secondary p-1.5 text-amber-500">
              <Award className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground leading-none">National Rank</span>
              <span className="text-xs font-bold text-foreground mt-0.5">
                #{college.ranking ?? "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-secondary p-1.5 text-indigo-600">
              <Landmark className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground leading-none">Established</span>
              <span className="text-xs font-bold text-foreground mt-0.5">
                {college.established ?? "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex items-center gap-2 mt-5 border-t border-border pt-4">
          <button
            onClick={handleCompareToggle}
            className={`flex-1 flex items-center justify-center gap-1 rounded-lg py-2 text-xs font-semibold border transition-all duration-200 ${
              comparing
                ? "bg-accent/10 border-accent text-accent hover:bg-accent/20"
                : "bg-background border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {comparing ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Comparing</span>
              </>
            ) : (
              <span>Add to Compare</span>
            )}
          </button>
          
          <Link
            href={`/colleges/${college.id}`}
            className="flex-1 flex items-center justify-center rounded-lg bg-primary py-2 text-xs font-semibold text-white hover:bg-primary/95 text-center shadow-xs transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
