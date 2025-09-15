import api from "../api/apiClient";
import { handleAxiosError } from "../utils/handleError";

import type {
  UpdateProfileFormData,
  ChangePasswordFormData,
} from "../types/user.type";

export const getUserProfile = async () => {
  try {
    const res = await api.get("/v1/users/profile");
    return res.data.data;
  } catch (err) {
    throw handleAxiosError(err, "user.fetch_profile_failed");
  }
};

export const updateUserProfile = async (data: UpdateProfileFormData) => {
  try {
    const formData = new FormData();

    if (data.fullName) formData.append("fullName", data.fullName);
    if (data.penName) formData.append("penName", data.penName);
    if (data.bio) formData.append("bio", data.bio);
    if (data.avatarUrl) formData.append("avatarUrl", data.avatarUrl);
    if (data.file) formData.append("file", data.file);

    const res = await api.patch("/v1/users/profile", formData);
    return res.data;
  } catch (err) {
    throw handleAxiosError(err, "user.update_profile_failed");
  }
};

export const changePassword = async (data: ChangePasswordFormData) => {
  try {
    const res = await api.patch("/v1/users/profile/password", data);
    return res.data;
  } catch (err) {
    throw handleAxiosError(err, "user.change_password_failed");
  }
};
