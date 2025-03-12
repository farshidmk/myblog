import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { isPasswordMatch } from "./shared/saltAndHashPassword";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
//   throw new Error("Missing github oauth credentials");
// }

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
          if (isMatched) {
            return user;
          }
          return null;
        } catch (error) {
          console.log(error);
          return null;
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
    //@ts-expect-error it's ok
    session({ session, token }: unknown) {
      session.user.id = token.id;
      return session;
    },
  },
});
