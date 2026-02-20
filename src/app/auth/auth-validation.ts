import { z } from "zod";

export const signUpValidation = z.object({
  email: z.string().email("Email is invalid"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number"),
});

export const signInSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
