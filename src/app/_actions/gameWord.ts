"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { GameSettingCategoryWithWordsCount } from "../games/settings/gameSetting-type";
import { GameWordCategory } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createGameWordCategory(
  categoryName: string
): Promise<ActionResponse<GameWordCategory>> {
  try {
    const { name } = await wordCategoryValidation.parse({
      name: categoryName,
    });

    const res = await prisma.gameWordCategory.create({
      data: {
        name,
      },
    });
    revalidatePath("/games/settings");
    return { success: true, data: res };
  } catch (error) {
    console.log({ error });
    if (error instanceof z.ZodError) {
      return {
        success: false,
        // errors: Object.values(error.flatten().fieldErrors).map(e => e?.join(" , ")) ,
        errors: [],
      };
    }
    return {
      success: false,
      errors: ["خطا در ذخیره اطلاعات"],
    };
  }
}

export async function getAllGameWordCategory() {
  try {
    const res = await prisma.gameWordCategory.findMany({
      include: {
        _count: {
          select: {
            words: true,
          },
        },
      },
    });
    const mappedResult: GameSettingCategoryWithWordsCount[] = res.map(
      (category) => ({
        id: category.id,
        name: category.name,
        wordsCount: category._count.words,
      })
    );
    return mappedResult;
  } catch (error) {
    console.log({ error });
    return { error: "خطا در داده" };
  }
}

const wordCategoryValidation = z.object({
  name: z.string().min(2, "نام دسته بندی حداقل باید 2 حرف باشد"),
});
