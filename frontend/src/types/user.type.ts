import type {components } from "../types/api";

export type UserSerializer = components["schemas"]["UserSerializer"];

export interface UpdateProfileFormData {
  fullName?: string;
  avatarUrl?: string;
  penName?: string;
  bio?: string;
  file?: File;
}

export interface ProfileFormValues {
  username?: string;
  email?: string;
  fullName?: string;
  penName?: string;
  bio?: string;
  image?: {
    originFileObj: File;
  }[];
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
