import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idsString = searchParams.get("ids");

    if (!idsString) {
      return NextResponse.json([]);
    }

    const ids = idsString.split(",").filter(Boolean);

    if (ids.length === 0) {
      return NextResponse.json([]);
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: { in: ids },
      },
    });

    const parsedColleges = colleges.map((college) => ({
      ...college,
      programs: college.programs ? JSON.parse(college.programs) : [],
      facilities: college.facilities ? JSON.parse(college.facilities) : [],
    }));

    return NextResponse.json(parsedColleges);
  } catch (error: any) {
    console.error("GET /api/compare error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch compare details" },
      { status: 500 }
    );
  }
}
