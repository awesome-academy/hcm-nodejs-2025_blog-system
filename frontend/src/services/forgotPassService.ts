import api from "../api/apiClient";
import { handleAxiosError } from "../utils/handleError";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  } catch (err) {
    throw handleAxiosError(err, "forgotPass.forgot_password_failed");
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await api.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      new_password: newPassword,
    });
    return response.data;
  } catch (err) {
    throw handleAxiosError(err, "auth.reset_password_failed");
  }
};
