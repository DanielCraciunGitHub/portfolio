import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")!;
  const subdomain = hostname.match(/^([^.]+)\./)?.[1];

  const pathname = request.nextUrl.pathname;

  if (pathname === "/" && subdomain?.startsWith("blog")) {
    return NextResponse.rewrite("https://blog.danielfullstack.com/blog");
  } else if (pathname === "/blog" && subdomain?.startsWith("www")) {
    return NextResponse.redirect("https://blog.danielfullstack.com");
  } else if (pathname.startsWith("/article") && subdomain?.startsWith("www")) {
    return NextResponse.redirect(`https://blog.danielfullstack.com${pathname}`);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/blog", "/article/:path*"],
};
