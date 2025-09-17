import api from "../api/apiClient";
import type { RegisterFormData, LoginFormData } from "../types/auth.type";
import { handleAxiosError } from "../utils/handleError";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const register = async (data: RegisterFormData) => {
  try {
    const response = await api.post(ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "auth.register_failed");
  }
};

export const login = async (data: LoginFormData) => {
  try {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "auth.login_failed");
  }
};
