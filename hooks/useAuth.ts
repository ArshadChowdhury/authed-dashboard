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
  const {
    user,
    isAuthenticated,
    setUser,
    setToken,
    logout: logoutStore,
  } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      return await authApi.loginInternal(credentials);
    },
    onSuccess: () => {
      toast.success("Login successful! Redirecting...");
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/dashboard");
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
    mutationFn: async () => {
      return await authApi.logout();
    },
    onSuccess: () => {
      logoutStore();
      queryClient.clear();
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    },
    onError: () => {
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
