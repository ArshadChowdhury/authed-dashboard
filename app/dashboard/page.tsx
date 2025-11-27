"use client";

import { redirect } from "next/navigation";
// import { getAuthToken } from "@/lib/auth";
import UserProfile from "@/components/UserProfile";
import { useUser } from "@/hooks/useUser";

export default function DashboardPage() {
  // const token = await getAuthToken();

  const token = "asdas";

  // if (!token) {
  //   redirect("/login");
  // }

  const user = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <UserProfile initialUser={user} />
    </div>
  );
}
