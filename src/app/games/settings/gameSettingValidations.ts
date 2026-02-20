import { Difficulty } from "@/types/game";
import { z } from "zod";

export const difficultyEnum = z.enum(["USER", "ADMIN", "MODERATOR"]);

export const wordCategoryValidation = z.object({
  name: z.string().min(3, "category name must be at least 1 characters long"),
});

export const wordValidation = z.object({
  word: z.string().min(3, "category name must be at least 1 characters long"),
  difficulty: z.nativeEnum(Difficulty),
  categoryId: z.string(),
  // difficulty: z.enum([Difficulty.easy, Difficulty.hard, Difficulty.medium]),
});
