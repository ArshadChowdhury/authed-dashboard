"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";
import { useAuthStore } from "@/store/authStore";

export const useUser = () => {
  const { setUser } = useAuthStore();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    // onSuccess: (data) => {
    //   setUser(data);
    // },
    // onError: () => {
    //   setUser(null);
    // },
  });

  return {
    user,
    isLoading,
    error,
  };
};
