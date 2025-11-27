import { NextResponse } from "next/server";

export async function POST() {
  // Create a simple success response. The status 200 (OK) signals success to the client.
  const response = NextResponse.json(
    { message: "Logout successful !" },
    { status: 200 }
  );

  // Clear the cookie
  response.cookies.set({
    name: "auth_token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 0, // This is the crucial step that deletes the cookie
  });

  return response;
}
