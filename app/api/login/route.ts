import { axiosInstance } from "@/lib/api/axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Calling mock API to get token
    const res = await axiosInstance.post("https://reqres.in/api/login", {
      email,
      password,
    });

    const token = res.data.token;

    // Set HttpOnly cookie
    const response = NextResponse.json(
      { success: true, token },
      { status: 200 }
    );

    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }
}
