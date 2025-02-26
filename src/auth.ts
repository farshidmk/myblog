import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "./shared/saltAndHashPassword";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { signInSchema } from "./app/auth/auth-validation";
import { getUserFromDb } from "./shared/actions";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },

      //   async authorize(credentials, req) {
      //     const user = await prisma.user.findUnique({
      //       where: { username: String(credentials?.username) },
      //     });

      //     // if (user && validatePassword(user, credentials!.password)) {
      //     //   return {
      //     //     id: user.id,
      //     //     name: user.name,
      //     //     email: user.email,
      //     //     nsid: user.nsid,
      //     //     image: user.image,
      //     //     location: user.location,
      //     //   }
      //     // }
      //     // Return null if user data could not be retrieved
      //     return null;
      //   },
      authorize: async (credentials, req) => {
        console.log({ credentials });

        const { username, password } = await signInSchema.parseAsync(
          credentials
        );
        // logic to salt and hash password
        //   const pwHash = saltAndHashPassword(password);

        // logic to verify if the user exists
        //   const user = await getUserFromDb(username, password);
        const user = null;
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("اطلاعات کاربری اشتباه است");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
