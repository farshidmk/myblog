import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 *
 * @returns get all categories for words
 */

export async function GET() {
  try {
    const data = await prisma.gameWordCategory.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات" },
      { status: 400 }
    );
  }
}
