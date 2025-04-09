import { z } from "zod";

export const wordCategoryValidation = z.object({
  name: z.string().min(3, "category name must be at least 1 characters long"),
});
