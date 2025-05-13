import { GameSettingCategoryWithWordsCount } from "@/app/games/settings/gameSetting-type";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allCategories = await prisma.gameWordCategory.findMany({
      include: {
        _count: {
          select: {
            words: true,
          },
        },
      },
    });

    const formattedAllCategories: GameSettingCategoryWithWordsCount[] =
      allCategories.map((category) => ({
        id: category.id,
        name: category.name,
        wordsCount: category._count.words,
      }));
    return NextResponse.json(formattedAllCategories);
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}
