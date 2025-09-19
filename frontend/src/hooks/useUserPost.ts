import { useState, useCallback } from "react";
import { getPostUser, getPostUserDetail } from "../services/postService";
import type { FilterPostDto } from "../types/admin.type";
import type { PostSerializer } from "../types/authorPost.type";
import { toast } from "react-toastify";

export const useUserPost = () => {
  const [posts, setPosts] = useState<PostSerializer[]>([]);
  const [postDetail, setPostDetail] = useState<PostSerializer | null>(null);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách bài viết
  const loadUserPosts = useCallback(async (filter?: FilterPostDto) => {
    setLoading(true);
    try {
      const postsData = await getPostUser(filter);
      setPosts(postsData || []);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy chi tiết bài viết
  const loadPostDetail = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const detail = await getPostUserDetail(id);
      setPostDetail(detail || null);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    posts,
    postDetail,
    loading,
    loadUserPosts,
    loadPostDetail,
  };
};
