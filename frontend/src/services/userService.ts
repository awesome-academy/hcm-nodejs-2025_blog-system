import api from "../api/apiClient";
import { handleAxiosError } from "../utils/handleError";
import type {
  UpdateProfileFormData,
  ChangePasswordFormData,
} from "../types/user.type";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const getUserProfile = async () => {
  try {
    const res = await api.get(ENDPOINTS.USERS.PROFILE);
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

    const res = await api.patch(ENDPOINTS.USERS.PROFILE, formData);
    return res.data;
  } catch (err) {
    throw handleAxiosError(err, "user.update_profile_failed");
  }
};

export const changePassword = async (data: ChangePasswordFormData) => {
  try {
    const res = await api.patch(ENDPOINTS.USERS.CHANGE_PASSWORD, data);
    return res.data;
  } catch (err) {
    throw handleAxiosError(err, "user.change_password_failed");
  }
};
