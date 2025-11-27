"use client";

import UserProfile from "@/components/UserProfile";
import { useUser } from "@/hooks/useUser";

export default function DashboardPage() {
  const user = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <UserProfile initialUser={user} />
    </div>
  );
}
