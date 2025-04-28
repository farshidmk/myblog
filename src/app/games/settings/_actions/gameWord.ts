"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { GameSettingCategoryWithWordsCount } from "../gameSetting-type";
import { Difficulty, GameWord, GameWordCategory } from "@prisma/client";
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

export async function EditGameWordCategory(
  categoryName: string,
  categoryId: string
): Promise<ActionResponse<GameWordCategory>> {
  try {
    const { name } = await wordCategoryValidation.parse({
      name: categoryName,
    });

    const findCategory = await prisma.gameWordCategory.findFirst({
      where: {
        id: categoryId,
      },
    });
    if (!findCategory) {
      return { success: false, errors: ["این دسته بندی وجود ندارد!"] };
    }
    const result = await prisma.gameWordCategory.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });
    revalidatePath("/games/settings");
    return { success: true, data: result };
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

/**
 * create word in category
 * @param word
 * @returns
 */
export async function createGameWord(
  gameWord: GameWord
): Promise<ActionResponse<GameWord>> {
  try {
    const { categoryId, difficulty, word } = await wordValidation.parse({
      categoryId: gameWord.categoryId,
      word: gameWord.word,
      difficulty: gameWord.difficulty,
    });

    const res = await prisma.gameWord.create({
      data: {
        categoryId,
        word,
        difficulty: difficulty as Difficulty,
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

export async function getAllGameWordByCategory(
  categoryId: string
): Promise<ActionResponse<GameWord[]>> {
  try {
    const res = await prisma.gameWord.findMany({
      where: {
        categoryId,
      },
    });
    // const mappedResult: GameSettingCategoryWithWordsCount[] = res.map(
    //   (category) => ({
    //     id: category.id,
    //     name: category.name,
    //     wordsCount: category._count.words,
    //   })
    // );
    return { success: true, data: res };
  } catch (error) {
    console.log({ error });
    return { success: false, errors: ["خطا در داده"] };
  }
}

export async function saveGameWord(
  data: Omit<GameWord, "id">
): Promise<ActionResponse<GameWord>> {
  try {
    const isExist = await prisma.gameWord.findFirst({
      where: {
        word: data.word,
      },
      select: {
        id: true,
        word: true,
        categoryId: true,
        difficulty: true,
        category: true,
      },
    });
    if (isExist) {
      const errorMsg = `کلمه مشابه با ${isExist.word}  در دسته بندی ${isExist.category.name} وجود دارد`;
      return { success: false, errors: [errorMsg] };
    }
    const res = await prisma.gameWord.create({
      data,
    });
    revalidatePath("/games/settings");
    return { success: true, data: res };
  } catch (error) {
    console.log({ error });
    return { success: false, errors: ["خطا در داده"] };
  }
}
export async function saveGameWord2(
  data: Omit<GameWord, "id">
): Promise<ActionResponse<GameWord>> {
  try {
    const isExist = await prisma.gameWord.findFirst({
      where: {
        word: data.word,
      },
      select: {
        id: true,
        word: true,
        categoryId: true,
        difficulty: true,
        category: true,
      },
    });
    if (isExist) {
      const errorMsg = `کلمه مشابه با ${isExist.word}  در دسته بندی ${isExist.category.name} وجود دارد`;
      return { success: false, errors: [errorMsg] };
    }
    const res = await prisma.gameWord.create({
      data,
    });
    revalidatePath("/games/settings");
    return { success: true, data: res };
  } catch (error) {
    console.log({ error });
    return { success: false, errors: ["خطا در داده"] };
  }
}

const wordCategoryValidation = z.object({
  name: z.string().min(2, "نام دسته بندی حداقل باید 2 حرف باشد"),
});

const wordValidation = z.object({
  word: z.string().min(2, "کلمه حداقل باید 2 حرف باشد"),
  categoryId: z.string().min(2, "دسته بندی را مشخص کنید"),
  difficulty: z.string().min(1, "سطح دشواری کلمه را مشخص کنید"),
});
