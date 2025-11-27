"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";

export const useUser = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    user,
    isLoading,
    error,
  };
};
