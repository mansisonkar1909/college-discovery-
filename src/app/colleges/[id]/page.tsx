"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useCollege } from "@/hooks/useColleges";
import { useCompareStore } from "@/store/compareStore";
import SaveButton from "@/components/saved/SaveButton";
import {
  MapPin,
  Calendar,
  Globe,
  Star,
  Award,
  School,
  Check,
  ChevronRight,
  BookOpen,
  Construction,
  Landmark,
  ArrowLeft,
  Loader2,
  TrendingUp,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CollegeDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { data: college, isLoading, isError } = useCollege(id);
  const { addToCompare, removeFromCompare, isInCompare } = useCompareStore();

  const [activeTab, setActiveTab] = useState<"overview" | "academics" | "facilities">("overview");

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 flex-grow">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground mt-4 font-semibold">Loading college details...</span>
      </div>
    );
  }

  if (isError || !college) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center flex-grow">
        <div className="rounded-full bg-destructive/10 p-4 text-destructive inline-block mb-4">
          <Landmark className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-bold text-foreground">College Details Not Found</h2>
        <p className="text-sm text-muted-foreground mt-1">
          The college ID is invalid or could not be loaded from the database.
        </p>
        <Link
          href="/colleges"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary/95 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Explore</span>
        </Link>
      </div>
    );
  }

  const comparing = isInCompare(college.id);

  const handleCompareToggle = () => {
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
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  const formatPackage = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "N/A";
    return `₹${value} LPA`;
  };

  // Parse JSON strings from DB into arrays
  const programs: string[] = (() => {
    try {
      if (Array.isArray(college.programs)) return college.programs;
      if (typeof college.programs === "string") return JSON.parse(college.programs);
      return [];
    } catch { return []; }
  })();

  const facilities: string[] = (() => {
    try {
      if (Array.isArray(college.facilities)) return college.facilities;
      if (typeof college.facilities === "string") return JSON.parse(college.facilities);
      return [];
    } catch { return []; }
  })();

  return (
    <div className="w-full pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-muted/40 border-b border-border py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/colleges" className="hover:text-primary transition-colors">Colleges</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold line-clamp-1">{college.name}</span>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative h-60 md:h-80 w-full overflow-hidden bg-muted">
        {college.imageUrl ? (
          <img
            src={college.imageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-primary/30 to-accent/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Profile Header overlap container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 -mt-16 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-card border border-border p-6 rounded-2xl shadow-md">
          <div className="flex flex-col md:flex-row gap-5 items-center md:items-end">
            {/* Logo Thumbnail */}
            <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-card bg-white p-2 shadow-md">
              {college.imageUrl ? (
                <img
                  src={college.imageUrl}
                  alt={`${college.name} logo`}
                  className="h-full w-full object-contain rounded-xl"
                />
              ) : (
                <div className="h-full w-full rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-3xl">
                  {college.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Title / Meta */}
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary uppercase tracking-wider mb-2">
                {college.type} Institution
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-foreground">{college.name}</h1>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 mt-2 text-xs text-muted-foreground">
                {college.state && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>State: {college.state}</span>
                  </span>
                )}
                {college.established && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Est. {college.established}</span>
                  </span>
                )}
                {college.website && (
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>Visit website</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Action triggers */}
          <div className="flex justify-center md:justify-end items-center gap-3">
            {/* Save Bookmark */}
            <SaveButton collegeId={college.id} showText className="px-4 py-2 border border-border" />

            {/* Compare Toggle */}
            <button
              onClick={handleCompareToggle}
              className={`flex items-center justify-center gap-1 rounded-full px-5 py-2 text-xs font-semibold border transition-all duration-200 ${
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
          </div>
        </div>
      </div>

      {/* Main Grid Layout (Tab details + Sidebar Stats) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Trigger Header */}
            <div className="flex border-b border-border bg-card rounded-xl p-1 border shadow-xs">
              {(["overview", "academics", "facilities"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 rounded-lg py-2.5 text-xs font-bold capitalize transition-all ${
                    activeTab === tab
                      ? "bg-primary text-white shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-xs min-h-[250px] animate-fadeInUp">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Institution Overview</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {college.description || "No overview available for this institution."}
                  </p>
                  
                  <div className="bg-secondary/40 rounded-xl p-4 border border-border mt-6">
                    <h4 className="text-xs font-bold text-foreground uppercase mb-2">Highlights</h4>
                    <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside">
                      <li>Offers {programs.length} premium academic majors</li>
                      {facilities.length > 0 && (
                        <li>Features modern campus facilities such as {facilities[0]} and {facilities[1]}</li>
                      )}
                      {college.state && (
                        <li>Located in the state of {college.state}</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "academics" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Popular Majors & Programs</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    The institution offers a diverse array of academic majors. The following programs are highly sought-after and popular among undergraduates:
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {programs.map((program: string) => (
                      <div key={program} className="rounded-full bg-secondary text-secondary-foreground border border-border px-3.5 py-1.5 text-xs font-semibold shadow-xs">
                        {program}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "facilities" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Construction className="h-5 w-5 text-accent" />
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Campus Facilities</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Students enjoy access to state-of-the-art facilities across the campus for housing, sports, research, and recreation:
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {facilities.map((facility: string) => (
                      <div key={facility} className="rounded-full bg-accent/5 text-accent border border-accent/10 px-3.5 py-1.5 text-xs font-semibold shadow-xs">
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Stats Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-border pb-3 mb-4">
                Key Metrics
              </h3>

              <div className="space-y-5">
                {/* Annual Fees */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                      <School className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground font-semibold">Annual Fees</span>
                      <span className="text-xs text-muted-foreground mt-0.5">Academic charges</span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-600">{formatCurrency(college.annualFees)}</span>
                </div>

                {/* Avg Placement Package */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                      <TrendingUp className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground font-semibold">Avg. Package</span>
                      <span className="text-xs text-muted-foreground mt-0.5">Placement details</span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-600">{formatPackage(college.avgPackage)}</span>
                </div>

                {/* User Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500">
                      <Star className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground font-semibold">User Rating</span>
                      <span className="text-xs text-muted-foreground mt-0.5">Student review score</span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-foreground flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{college.rating.toFixed(1)}</span>
                  </span>
                </div>

                {/* Ranking */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500">
                      <Award className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground font-semibold">National Rank</span>
                      <span className="text-xs text-muted-foreground mt-0.5">National Rank classification</span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-foreground">#{college.ranking ?? "N/A"}</span>
                </div>

                {/* Category */}
                {college.category && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <BookOpen className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground font-semibold">Stream / Category</span>
                        <span className="text-xs text-muted-foreground mt-0.5">Primary vertical</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-foreground">{college.category}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
