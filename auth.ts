import { ConvexAdapter } from "@/app/ConvexAdapter";
import { fetchQuery } from "convex/nextjs";
import { SignJWT, importPKCS8 } from "jose";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { api } from "./convex/_generated/api";
import { Role } from "./convex/user/roles";
const CONVEX_SITE_URL = process.env.NEXT_PUBLIC_CONVEX_URL!.replace(
  /.cloud$/,
  ".site",
);
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: ConvexAdapter,
  callbacks: {
    async session({ session }) {
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

      const user = await fetchQuery(api.auth.user.queries.getUser, {
        id: session.userId,
        secret: process.env.CONVEX_AUTH_ADAPTER_SECRET!
      })

      return { ...session, convexToken, role: user?.role };
    },
  },
});

declare module "next-auth" {
  interface Session {
    convexToken: string;
    role: Role
  }
}