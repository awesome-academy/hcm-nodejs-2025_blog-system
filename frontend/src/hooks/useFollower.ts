import { useState, useCallback } from "react";
import {
  followAuthor as followAuthorAPI,
  unfollowAuthor as unfollowAuthorAPI,
  getFollowedAuthors as getFollowedAuthorsAPI,
} from "../services/followerService";
import type { FollowerSerializer } from "../types/follower.type";
import { toast } from "react-toastify";

export const useFollower = () => {
  const [followedAuthors, setFollowedAuthors] = useState<FollowerSerializer[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  // Load danh sách tác giả đã theo dõi
  const loadFollowedAuthors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getFollowedAuthorsAPI();
      setFollowedAuthors(data || []);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Theo dõi tác giả
  const followAuthor = async (authorId: number) => {
    try {
      await followAuthorAPI(authorId);
      loadFollowedAuthors();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  // Bỏ theo dõi tác giả
  const unfollowAuthor = async (authorId: number) => {
    try {
      const res = await unfollowAuthorAPI(authorId);
      toast.success(res.data.message);
      await loadFollowedAuthors();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return {
    followedAuthors,
    loading,
    loadFollowedAuthors,
    followAuthor,
    unfollowAuthor,
  };
};
