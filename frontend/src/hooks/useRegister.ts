import type { RegisterFormData } from "../types/register.type";
import { register } from "../services/registerService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { t } = useTranslation("register");
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await register(data);
      toast.success(t("register_success"));
      navigate("/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return { handleRegister };
};
