"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function createGameWordCategory(categoryName: string) {
  try {
    const { name } = await wordCategoryValidation.parseAsync({
      categoryName,
    });

    const res = await prisma.gameWordCategory.create({
      data: {
        name,
      },
    });
    console.log({ res });
    return res;
  } catch (error) {
    console.log({ error });
    return { error: "خطا در داده" };
  }
}

const wordCategoryValidation = z.object({
  name: z.string().min(3, "category name must be at least 1 characters long"),
});
