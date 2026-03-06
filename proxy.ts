import { auth } from "@/auth";
import { NextResponse } from "next/server";


export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  console.log("proxy");
  console.log("SESSION IN MIDDLEWARE:", session);
  console.log(pathname);

  console.log(req.url)
  if (!session) {
    return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${pathname}`, req.url));
  }

  const rolePath = `/${session.role}`;

  if (pathname.startsWith(rolePath)) {
    if (pathname === rolePath) {
      const dashboardPath = `${rolePath}/dashboard`;
      return NextResponse.redirect(
        new URL(dashboardPath, req.url)
      );
    }

  } else {
    return NextResponse.redirect(
      new URL(rolePath, req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/student/:path*"],
};