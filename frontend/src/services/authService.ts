import api from "../api/apiClient";
import type { RegisterFormData, LoginFormData } from "../types/auth.type";
import { handleAxiosError } from "../utils/handleError";

export const register = async (data: RegisterFormData) => {
  try {
    const response = await api.post("/v1/auth/register", data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "auth.register_failed");
  }
};

export const login = async (data: LoginFormData) => {
  try {
    const response = await api.post("/v1/auth/login", data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "auth.login_failed");
  }
};
