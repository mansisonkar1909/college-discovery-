import { z } from "zod";

export const collegeQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  state: z.string().optional(),
  type: z.enum(["GOVERNMENT", "PRIVATE", "DEEMED", "AUTONOMOUS"]).optional(),
  minFees: z.coerce.number().optional(),
  maxFees: z.coerce.number().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  sortBy: z.enum(["ranking", "rating", "annualFees", "avgPackage"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
});

export const compareQuerySchema = z.object({
  ids: z.string().transform((val) => val.split(",").filter(Boolean)),
});

export type CollegeQueryInput = z.infer<typeof collegeQuerySchema>;
