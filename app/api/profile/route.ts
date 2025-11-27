import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { axiosInstance } from "@/lib/api/axios";

export async function GET() {
  try {
    // Read HttpOnly cookie
    const token = (await cookies()).get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    // Simulate authenticated API call
    const res = await axiosInstance.get(
      `${process.env.BACKEND_DUMMY_URL}/users/2`
    );

    const user = res.data.data;

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("PROFILE API ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
