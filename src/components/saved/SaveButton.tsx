"use client";

import { useSession } from "next-auth/react";
import { useSaved, useToggleSave } from "@/hooks/useSaved";
import { Heart, Loader2 } from "lucide-react";

interface SaveButtonProps {
  collegeId: string;
  className?: string;
  showText?: boolean;
}

export default function SaveButton({ collegeId, className = "", showText = false }: SaveButtonProps) {
  const { data: session } = useSession();
  const { data: savedColleges, isLoading } = useSaved();
  const { save, unsave, isSaving, isUnsaving } = useToggleSave();

  const isSaved = savedColleges?.some((c) => c.id === collegeId) ?? false;
  const loading = isLoading || isSaving || isUnsaving;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      alert("Please sign in from the navbar to save colleges!");
      return;
    }

    if (isSaved) {
      unsave(collegeId);
    } else {
      save(collegeId);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
        isSaved
          ? "bg-accent/10 text-accent hover:bg-accent/20"
          : "bg-muted text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground"
      } ${className}`}
      title={isSaved ? "Remove from Saved" : "Save College"}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={`h-4 w-4 transition-transform duration-200 hover:scale-110 ${isSaved ? "fill-current" : ""}`} />
      )}
      {showText && (
        <span className="text-xs font-semibold">
          {isSaved ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
}
