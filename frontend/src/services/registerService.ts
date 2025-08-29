import api from "../api/apiClient";
import type { RegisterFormData } from "../types/register.type";
import { handleAxiosError } from "../utils/handleError";

export const register = async (data: RegisterFormData) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "auth.register_failed");
  }
};
