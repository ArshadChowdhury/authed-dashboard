import { axiosInstance } from "./axios";
import { LoginRequest, LoginResponse, User, ApiResponse } from "../types/types";

export const authApi = {
  // Login
  loginInternal: async (
    credentials: LoginRequest
  ): Promise<{ success: boolean }> => {
    const { data } = await axiosInstance.post("api/login", credentials);
    return data;
  },

  // Logout
  logout: async (): Promise<{ success: boolean }> => {
    const { data } = await axiosInstance.post("api/logout");
    return data;
  },

  // Get current user
  getCurrentUser: async (): Promise<{ success: boolean }> => {
    const { data } = await axiosInstance.get("api/profile");
    return data.user;
  },
};
