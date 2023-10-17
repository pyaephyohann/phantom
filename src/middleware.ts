import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (
    path.includes("/") ||
    path.includes("/auth") ||
    path.includes("/api/order")
  ) {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isProtected =
    path.includes("/backoffice") || path.includes("/api/backoffice");

  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/auth/backoffice/signin", req.url));
  }
  return NextResponse.next();
}
