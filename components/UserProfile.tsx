"use client";

import { LogOut, User as UserIcon, Mail, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/lib/types/types";
import Image from "next/image";

interface UserProfileProps {
  initialUser: User | any;
}

export default function UserProfile({ initialUser }: UserProfileProps) {
  const { user, logout, isLoggingOut } = useAuth();

  // Use initialUser from server, fallback to store user
  const displayUser: any = user || initialUser;

  if (!displayUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <button
            onClick={() => logout()}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="w-5 h-5" />
                Logout
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-linear-to-br from-indigo-500 to-purple-600 h-32"></div>

          <div className="px-8 pt-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
              <Image
                priority
                src={displayUser?.avatar || "/placeholder_image.jpg"}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                height={300}
                width={300}
                alt={`${displayUser.first_name} ${displayUser.last_name}`}
              />

              <div className="text-center sm:text-left mb-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {displayUser.first_name} {displayUser.last_name}
                </h2>
                <p className="text-gray-600 mt-1 flex items-center gap-2 justify-center sm:justify-start">
                  <Mail className="w-4 h-4" />
                  {displayUser.email}
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-2">
                  User ID
                </h3>
                <p className="text-3xl font-bold text-blue-900">
                  {displayUser.id}
                </p>
              </div>

              <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <h3 className="text-sm font-semibold text-green-900 uppercase tracking-wide mb-2">
                  First Name
                </h3>
                <p className="text-2xl font-bold text-green-900">
                  {displayUser.first_name}
                </p>
              </div>

              <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <h3 className="text-sm font-semibold text-purple-900 uppercase tracking-wide mb-2">
                  Last Name
                </h3>
                <p className="text-2xl font-bold text-purple-900">
                  {displayUser.last_name}
                </p>
              </div>
            </div>

            <div className="my-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Full Name:</span>
                  <span className="text-gray-900 font-semibold">
                    {displayUser.first_name} {displayUser.last_name}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">
                    Email Address:
                  </span>
                  <span className="text-gray-900 font-semibold">
                    {displayUser.email}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">
                    Account Status:
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
