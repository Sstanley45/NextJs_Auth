import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //to access a path (the path you are)
  const path = request.nextUrl.pathname;
  //Now, some paths are public while some are not.
  //in this case the public paths are signup and login
  const isPublicPath = path === "login" || path === "/signup" || path === '/verifyEmail';

  //now, extract the token from the cookie
  const token = request.cookies.get("token")?.value || "";

  //condition if the user has token and is accessing a public route
  //redirect to a desired route..
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }
  //condition if the user is on a protected route and has not token
  //redirect to login route..
  if (!isPublicPath && !token) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup","/verifyEmail"],
};
