import api from "../api/apiClient";
import { handleAxiosError } from "../utils/handleError";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const getAuthorInfo = async (id: number) => {
  try {
    const res = await api.get(ENDPOINTS.AUTHOR.AUTHOR_INFO(id));
    return res.data.data;
  } catch (err) {
    throw handleAxiosError(err, "author.fetch_failed");
  }
};
