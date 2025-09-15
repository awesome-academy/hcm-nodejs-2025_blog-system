import api from "../api/apiClient";
import { handleAxiosError } from "../utils/handleError";
import type { AuthorApprovalFormData } from "../types/author.type";

export const getListAuthor = async () => {
  try {
    const res = await api.get("/v1/authors/list");
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
    const res = await api.patch(`/v1/authors/${id}/approval`, data);
    return res.data;
  } catch (err) {
    throw handleAxiosError(err, "author.approval_failed");
  }
};
