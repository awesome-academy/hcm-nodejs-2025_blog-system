import api from "../api/apiClient";
import { handleAxiosError } from "../utils/handleError";
import { ENDPOINTS } from "../constants/apiEndpoints";

export const followAuthor = async (authorId: number) => {
  try {
    const res = await api.post(ENDPOINTS.FOLLOWER.FOLLOW_AUTHOR(authorId));
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const unfollowAuthor = async (authorId: number) => {
  try {
    const res = await api.delete(ENDPOINTS.FOLLOWER.UNFOLLOW_AUTHOR(authorId));
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const getFollowedAuthors = async () => {
  try {
    const res = await api.get(ENDPOINTS.FOLLOWER.GET_FOLLOWED_AUTHORS);
    return res.data.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
