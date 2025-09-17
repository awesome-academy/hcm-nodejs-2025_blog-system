import api from "../api/apiClient";
import { handleAxiosError } from "../utils/handleError";
import type {
  AuthorApprovalFormData,
  PostApprovalFormData,
  FilterPostDto,
} from "../types/admin.type";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const getListPendingAuthor = async () => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.LIST_PENDING_AUTHORS);
    return res.data.data;
  } catch (err) {
    throw handleAxiosError(err, "author.fetch_list_failed");
  }
};

export const approvalAuthor = async (
  id: number,
  data: AuthorApprovalFormData
) => {
  try {
    const res = await api.patch(ENDPOINTS.ADMIN.APPROVAL_AUTHOR(id), data);
    return res.data;
  } catch (err) {
    throw handleAxiosError(err, "author.approval_failed");
  }
};

export const getAllPosts = async (filter?: FilterPostDto) => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.LIST_POSTS, { params: filter });
    return res.data.data;
  } catch (err) {
    throw handleAxiosError(err, "post.fetch_all_failed");
  }
};

export const approvePost = async (
  postId: number,
  data: PostApprovalFormData
) => {
  try {
    const res = await api.put(ENDPOINTS.ADMIN.APPROVE_POST(postId), data);
    return res.data;
  } catch (err) {
    throw handleAxiosError(err, "post.approve_failed");
  }
};

export const getAllListAuthor = async () => {
  try {
    const res = await api.get(ENDPOINTS.ADMIN.LIST_AUTHORS);
    return res.data.data;
  } catch (err) {
    throw handleAxiosError(err, "author.fetch_list_failed");
  }
};

