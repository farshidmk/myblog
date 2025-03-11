import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
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
