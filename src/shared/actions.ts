"use server";

import { prisma } from "@/lib/prisma";
import { isPasswordMatch, saltAndHashPassword } from "./saltAndHashPassword";
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
  // const hashPassword = await saltAndHashPassword(password);
  // console.log("hashed password ===>", hashPassword);
  const user = await prisma.user.findFirst({
    where: {
      username,
      // password: "$2b$05$e2GWXtfG6UwOB202A4jj0Ows30ELrq7P1r4OhxyTgabCvI6VTTbBm",
      // password: hashPassword,
    },
  });
  return user;
}

export async function credentialsLogin(password: string, username: string) {
  const { username: usernameValid, password: passwordValid } =
    await signInSchema.parseAsync({
      username,
      password,
    });
  // logic to salt and hash password
  // const pwHash = await saltAndHashPassword(passwordValid);

  // logic to verify if the user exists
  // const user = await getUserByUsernameFromDb(usernameValid);
  // if (!user) {
  //   throw Error("کاربری با این مشخصات یافت نشد");
  // }
  // const isMatched = await isPasswordMatch(passwordValid);
  // check user password

  const res = signIn("credentials", {
    username,
    password,
    redirect: false,
  });
  return res;
}
