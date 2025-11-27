import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect(
    new URL(
      "/login",
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    )
  );

  // Clear the cookie
  response.cookies.set({
    name: "auth_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 0, // deletes the cookie
  });

  return response;
}
