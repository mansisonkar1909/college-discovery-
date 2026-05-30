import { useQuery } from "@tanstack/react-query";

export function useColleges(params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  return useQuery({
    queryKey: ["colleges", params],
    queryFn: async () => {
      const res = await fetch(`/api/colleges?${query}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime: 30_000,
  });
}

export function useCollege(slug: string) {
  return useQuery({
    queryKey: ["college", slug],
    queryFn: async () => {
      const res = await fetch(`/api/colleges/${slug}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });
}

export function useCompare(ids: string[]) {
  return useQuery({
    queryKey: ["compare", ids],
    queryFn: async () => {
      const res = await fetch(`/api/compare?ids=${ids.join(",")}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: ids.length >= 2,
  });
}