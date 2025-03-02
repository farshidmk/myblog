import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import {
  isPasswordMatch,
  saltAndHashPassword,
} from "./shared/saltAndHashPassword";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { signInSchema } from "./app/auth/auth-validation";
import { getUserByUsernameFromDb } from "./shared/actions";
import { ZodError } from "zod";
import { User } from "@prisma/client";
import GitHub from "next-auth/providers/github";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing github oauth credentials");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },

      authorize: async ({ username, password }) => {
        try {
          const user = await prisma.user.findFirst({
            where: {
              username: username!,
            },
          });
          const isMatched = await isPasswordMatch(
            String(password),
            String(user?.password)
          );
          console.log("---------", isMatched, user);
          if (isMatched) {
            return user;
          }
          return null;
          // return {
          //   name: "teststet",
          //   email: "testset@asdfasd.com",
          //   id: "123123",
          // };
          // if (isMatched) {
          // } else {
          //   return null;
          // }
          // return new AuthError("نام کاربری یا رمز عبور اشتباه است.");
        } catch (error) {
          return null;
          // return new AuthError("نام کاربری یا رمز عبور اشتباه است.");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: any) {
      session.user.id = token.id;
      return session;
    },
    //   async session(props: any) {
    //     console.log({ props });
    //     const { session, user } = props;
    //     if (session && user) {
    //       session.user.id = user.id;
    //     }
    //     return session;
    //   },
  },
});
