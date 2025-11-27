import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

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
    const res = await axios.get("https://reqres.in/api/users/2", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
