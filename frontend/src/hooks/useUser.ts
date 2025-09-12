import { useState, useEffect } from "react";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../services/userService";
import type {
  UpdateProfileFormData,
  ProfileFormValues,
  UserSerializer,
  ChangePasswordFormData,
} from "../types/user.type";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "./useAuthContext";

export const useUser = () => {
  const [user, setUser] = useState<UserSerializer | null>(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("user");
  const { token, logoutContext } = useAuthContext();

  const getUserProfileById = async () => {
    setLoading(true);
    try {
      const data = await getUserProfile();
      setUser(data);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfileById = async (
    values: ProfileFormValues
  ): Promise<boolean> => {
    try {
      const file = values.image?.[0]?.originFileObj;

      const payload: UpdateProfileFormData = {
        fullName: values.fullName,
        penName: values.penName,
        bio: values.bio,
        file,
      };

      await updateUserProfile(payload);
      toast.success(t("update_success"));
      await getUserProfileById();
      return true;
    } catch (err) {
      toast.error((err as Error).message);
      return false;
    }
  };

  const onChangePassword = async (
    values: ChangePasswordFormData
  ): Promise<boolean> => {
    try {
      const res = await changePassword(values);
      toast.success(res.data.message);
      logoutContext();
      return true;
    } catch (err) {
      toast.error((err as Error).message);
      return false;
    }
  };

  useEffect(() => {
    if (token) {
      getUserProfileById();
    }
  }, [token]);

  return {
    user,
    loading,
    getUserProfileById,
    updateProfileById,
    onChangePassword,
  };
};
