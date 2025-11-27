"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/lib/api/auth.api";
import { LoginRequest } from "@/lib/types/types";
import toast from "react-hot-toast";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, logout: logoutStore } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      return await authApi.loginInternal(credentials);
    },
    onSuccess: async () => {
      toast.success("Login successful !!");
      router.push("/dashboard");
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.refresh();
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.error || "Login failed. Please try again.";
      toast.error(message);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    // Use the updated API function
    mutationFn: async () => {
      // The API call clears the cookie on the server
      return await authApi.logout();
    },
    onSuccess: () => {
      // 1. Clear client-side state (e.g., Zustand/Redux store)
      logoutStore();

      // 2. Invalidate and clear the entire TanStack Query cache
      //    (e.g., user profile, settings, etc., which now need re-fetching)
      queryClient.clear();

      // 3. Notify the user
      toast.success("Logged out successfully!");

      // 4. Navigate the user to the login page
      router.push("/login");

      // 5. Hard refresh the route state to ensure any server-side dependencies
      //    (like layout components reading the logged-in state) are re-evaluated.
      //    This is crucial in Next.js when authorization changes.
      router.refresh();
    },
    onError: (error) => {
      // Handle API errors gracefully
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    },
  });

  // Fetch user data
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated,
    retry: false,
    // onSuccess: (data: any) => {
    //   setUser(data);
    // },
    // onError: () => {
    //   logoutStore();
    //   router.push("/login");
    // },
  });

  return {
    user: userData || user,
    isAuthenticated,
    isLoadingUser,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
};
