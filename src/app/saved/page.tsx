"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSaved } from "@/hooks/useSaved";
import CollegeCard from "@/components/colleges/CollegeCard";
import { Bookmark, Lock, Loader2, Landmark } from "lucide-react";

export default function SavedPage() {
  const { data: session, status } = useSession();
  const { data: savedColleges, isLoading } = useSaved();

  // 1. Loading session state
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-32 flex-grow">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground mt-4 font-semibold">Verifying session...</span>
      </div>
    );
  }

  // 2. Unauthenticated state
  if (!session) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center flex-grow flex flex-col items-center justify-center">
        <div className="rounded-full bg-accent/10 p-4 text-accent mb-4">
          <Lock className="h-10 w-10" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Access Restricted</h2>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Please sign in using the <strong>Sign In</strong> button in the navigation bar to access your bookmarks.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex flex-col">
      {/* Title Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          <Bookmark className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Saved Colleges</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Keep track of your bookmarked schools. Toggling the heart icon updates this list in real time.
          </p>
        </div>
      </div>

      {/* Bookmarks Display */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 flex-grow">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground mt-3">Loading bookmarks...</span>
        </div>
      ) : !savedColleges || savedColleges.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-card rounded-xl border border-border flex-grow">
          <div className="rounded-full bg-muted p-4 text-muted-foreground mb-4">
            <Bookmark className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-foreground">Your bookmark list is empty</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
            Click the heart icon on any college card to add it to your saved folder.
          </p>
          <Link
            href="/colleges"
            className="mt-6 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary/95 transition-all"
          >
            Explore Colleges
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}
    </div>
  );
}
