import type { RegisterFormData, LoginFormData } from "../types/auth.type";
import { register, login } from "../services/authService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { jwtDecode } from "jwt-decode";

export const useAuthForm = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  //AuthContext
  const { loginContext, logoutContext } = useAuthContext();

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await register(data);
      toast.success(t("register_success"));
      navigate("/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      loginContext(response.data.access_token);
      const decoded: { sub: string; username: string; role: string } =
        jwtDecode(response.data.access_token);
      toast.success(t("login_success"));

      if (decoded.role === "admin") {
        navigate("/admin/users");
      } else {
        navigate("/home");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleLogout = () => {
    logoutContext();
    navigate("/home");
  };

  return { handleRegister, handleLogin, handleLogout };
};
