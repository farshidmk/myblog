import { prisma } from "@/lib/prisma";
import { checkIsAuthenticated } from "@/app/api/utils/checkIsAuthenticated";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await checkIsAuthenticated(request);
  const categories = await prisma.spyGameWordCategory.findMany();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const data = await request.json();
  const category = await prisma.spyGameWordCategory.create({
    data: {
      name: data.name,
    },
  });
  return NextResponse.json(category);
}
