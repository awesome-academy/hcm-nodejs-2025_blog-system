import api from "../api/apiClient";
import { handleAxiosError } from "../utils/handleError";

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post("/v1/reset/forgot-password", { email });
    return response.data;
  } catch (err) {
    throw handleAxiosError(err, "forgotPass.forgot_password_failed");
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await api.post("/v1/reset/reset-password", {
      token,
      new_password: newPassword,
    });
    return response.data;
  } catch (err) {
    throw handleAxiosError(err, "auth.reset_password_failed");
  }
};
