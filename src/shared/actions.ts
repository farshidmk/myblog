"use server";

import { prisma } from "@/lib/prisma";
import { saltAndHashPassword } from "./saltAndHashPassword";
import { signIn } from "@/auth";
import { signInSchema } from "@/app/auth/auth-validation";

export async function signUp({
  name,
  password,
  username,
}: {
  name: string;
  password: string;
  username: string;
}) {
  const hashPassword = await saltAndHashPassword(password);
  const newUser = await prisma.user.create({
    data: {
      username,
      name,
      password: hashPassword,
    },
  });
  return newUser;
}

export async function getUserByUsernameFromDb(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return user;
}

export async function credentialsLogin(password: string, username: string) {
  try {
    const { username: usernameValid, password: passwordValid } =
      await signInSchema.parseAsync({
        username,
        password,
      });

    const res = signIn("credentials", {
      username: usernameValid,
      password: passwordValid,
      redirect: false,
    });
    return res;
  } catch (error) {
    return { error: "خطا!!" };
  }
}
