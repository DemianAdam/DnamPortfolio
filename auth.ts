import { ConvexAdapter } from "@/app/ConvexAdapter";

import { SignJWT, importPKCS8 } from "jose";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";


import Resend from "next-auth/providers/resend";
import { Role } from "./convex/user/types/role";
const CONVEX_SITE_URL = process.env.NEXT_PUBLIC_CONVEX_URL!.replace(
  /.cloud$/,
  ".site",
);
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    allowDangerousEmailAccountLinking: true,
  }), Resend({
    apiKey: process.env.AUTH_RESEND_KEY!,
    from: "onboarding@resend.dev"
  })],
  adapter: ConvexAdapter,
  callbacks: {
    async session({ session, user }) {
      const privateKey = await importPKCS8(
        process.env.CONVEX_AUTH_PRIVATE_KEY!,
        "RS256",
      );
      const convexToken = await new SignJWT({
        sub: session.userId,
      })
        .setProtectedHeader({ alg: "RS256" })
        .setIssuedAt()
        .setIssuer(CONVEX_SITE_URL)
        .setAudience("convex")
        .setExpirationTime("1h")
        .sign(privateKey);

      session.role = user.role
      return { ...session, convexToken };
    },

  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  },

});

declare module "next-auth" {
  interface Session {
    convexToken: string;
    role: Role
  }

  interface User {
    role: Role;
  }
}



