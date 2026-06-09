import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { College } from "@/types";

export function useSaved() {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["savedColleges"],
    queryFn: async (): Promise<College[]> => {
      const res = await fetch("/api/saved");
      if (!res.ok) throw new Error("Failed to fetch saved colleges");
      return res.json();
    },
    enabled: !!session,
  });
}

export function useToggleSave() {
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (collegeId: string) => {
      const res = await fetch(`/api/saved/${collegeId}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to save college");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedColleges"] });
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: async (collegeId: string) => {
      const res = await fetch(`/api/saved/${collegeId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to unsave college");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedColleges"] });
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });

  return {
    save: saveMutation.mutate,
    unsave: unsaveMutation.mutate,
    isSaving: saveMutation.isPending,
    isUnsaving: unsaveMutation.isPending,
  };
}
