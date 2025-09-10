import { toast } from "react-toastify";
import { forgotPassword, resetPassword } from "../services/forgotPassService";

export const useForgotPass = () => {
  const handleForgotPassword = async (
    email: string,
    onSuccess?: () => void
  ) => {
    try {
      const res = await forgotPassword(email);
      toast.success(res.data.message);
      onSuccess?.();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleResetPassword = async (
    token: string,
    newPassword: string,
    onSuccess?: () => void
  ) => {
    try {
      const res = await resetPassword(token, newPassword);
      toast.success(res.data.message);
      onSuccess?.();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return {
    handleForgotPassword,
    handleResetPassword,
  };
};
