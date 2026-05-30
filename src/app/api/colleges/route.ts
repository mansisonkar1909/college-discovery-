import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { collegeQuerySchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());
    const query = collegeQuerySchema.parse(params);

    const where: any = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { city: { contains: query.search, mode: "insensitive" } },
        { state: { contains: query.search, mode: "insensitive" } },
        { category: { contains: query.search, mode: "insensitive" } },
      ];
    }

    if (query.category) where.category = query.category;
    if (query.state) where.state = query.state;
    if (query.type) where.type = query.type;
    if (query.minRating) where.rating = { gte: query.minRating };
    if (query.minFees || query.maxFees) {
      where.annualFees = {};
      if (query.minFees) where.annualFees.gte = query.minFees;
      if (query.maxFees) where.annualFees.lte = query.maxFees;
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        select: {
          id: true,
          name: true,
          slug: true,
          location: true,
          city: true,
          state: true,
          type: true,
          category: true,
          ranking: true,
          rating: true,
          totalReviews: true,
          annualFees: true,
          placementRate: true,
          avgPackage: true,
          imageUrl: true,
          accreditation: true,
        },
        orderBy: query.sortBy
          ? { [query.sortBy]: query.sortOrder ?? "asc" }
          : { ranking: "asc" },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      prisma.college.count({ where }),
    ]);

    return NextResponse.json({
      colleges,
      pagination: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}