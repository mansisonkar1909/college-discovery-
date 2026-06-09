import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ collegeId: string }> }
) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { collegeId } = await params;
    await prisma.savedCollege.create({
      data: { userId, collegeId },
    });
    return NextResponse.json({ saved: true });
  } catch {
    return NextResponse.json({ error: "Already saved" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ collegeId: string }> }
) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { collegeId } = await params;
  await prisma.savedCollege.delete({
    where: {
      userId_collegeId: { userId, collegeId },
    },
  });
  return NextResponse.json({ saved: false });
}