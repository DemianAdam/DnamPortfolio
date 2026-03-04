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

  console.log(pathname === rolePath);

  if (pathname.startsWith(rolePath)) {
    if (pathname === rolePath) {
      const dashboardPath = `${rolePath}/dashboard`;
      return NextResponse.redirect(
        new URL(dashboardPath, req.url)
      );
    }

  } else {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/student/:path*"],
};