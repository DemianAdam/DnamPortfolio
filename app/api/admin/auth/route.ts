// app/api/admin/auth/route.ts
import { SignJWT, importPKCS8 } from "jose";
import { apiHandler } from "@/lib/api/apiHandler";
import { AppError } from "@/lib/errors/AppError";
import { ERROR_CODE } from "@/lib/errors/registry";

const CONVEX_SITE_URL = process.env.NEXT_PUBLIC_CONVEX_URL!.replace(/.cloud$/, ".site");

export const POST = apiHandler(
  { auth: false },
  async ({ request }) => {
    const adminKey = request.headers.get("X-Admin-Key");
    const adminId = request.headers.get("X-Admin-Id");

    if (adminKey !== process.env.ADMIN_API_KEY || !adminId) {
      throw new AppError(ERROR_CODE.AUTH.UNAUTHENTICATED); // or a forbidden error
    }

    const privateKey = await importPKCS8(
      process.env.CONVEX_AUTH_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      "RS256"
    );

    const token = await new SignJWT({ sub: "admin-service", adminId })
      .setProtectedHeader({ alg: "RS256" })
      .setIssuedAt()
      .setIssuer(CONVEX_SITE_URL)
      .setAudience("convex")
      .setExpirationTime("1h")
      .sign(privateKey);

    return { Token: token };
  }
);