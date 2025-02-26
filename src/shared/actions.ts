"use server";

import { prisma } from "@/lib/prisma";
import { saltAndHashPassword } from "./saltAndHashPassword";

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

export async function getUserFromDb(password: string, username: string) {
  const hashPassword = await saltAndHashPassword(password);
  const user = await prisma.user.findFirst({
    where: {
      username,
      password: hashPassword,
    },
  });
  return user;
}
