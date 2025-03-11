import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const words = await prisma.spyGameWord.findMany();
  return NextResponse.json(words);
}

export async function POST(request: Request) {
  const data = await request.json();
  const word = await prisma.spyGameWord.create({
    data: {
      word: data.word,
      categoryId: data.categoryId,
    },
  });
  return NextResponse.json(word);
}
