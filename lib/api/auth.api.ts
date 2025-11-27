import { axiosInstance } from "./axios";
import { LoginRequest, LoginResponse, User, ApiResponse } from "../types/types";

export const authApi = {
  // Login with reqres.in
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>(
      "/login",
      credentials
    );
    return data;
  },

  // Login through internal API (sets HttpOnly cookie)
  loginInternal: async (
    credentials: LoginRequest
  ): Promise<{ success: boolean }> => {
    const { data } = await axiosInstance.post("/api/login", credentials);
    return data;
  },

  // Logout
  logout: async (): Promise<{ success: boolean }> => {
    const { data } = await axiosInstance.post("/api/logout");
    return data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const { data } = await axiosInstance.get<ApiResponse<User>>("/user/2");
    return data.data;
  },
};
