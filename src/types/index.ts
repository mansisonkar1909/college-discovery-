export interface College {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  category?: string | null;
  state?: string | null;
  type: string; // "GOVERNMENT" | "PRIVATE" | "DEEMED" | "AUTONOMOUS"
  annualFees?: number | null;
  avgPackage?: number | null;
  rating: number;
  ranking?: number | null;
  description?: string | null;
  established?: number | null;
  website?: string | null;
  programs: string[];
  facilities: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
}

export interface SavedCollege {
  userId: string;
  collegeId: string;
  createdAt: Date | string;
  college?: College;
}
