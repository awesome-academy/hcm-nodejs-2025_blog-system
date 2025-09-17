import { useState, useCallback } from "react";
import {
  getListPendingAuthor,
  approvalAuthor as approvalAuthorAPI,
  getAllPosts,
  approvePost,
  getAllListAuthor,
} from "../services/adminService";
import type {
  AuthorApprovalFormData,
  PostApprovalFormData,
  FilterPostDto,
} from "../types/admin.type";
import type { AuthorSerializer } from "../types/author.type";
import type { PostSerializer } from "../types/authorPost.type";
import { toast } from "react-toastify";

export const useAdmin = () => {
  const [posts, setPosts] = useState<PostSerializer[]>([]);
  const [pendingAuthors, setPendingAuthors] = useState<AuthorSerializer[]>([]);
  const [authors, setAuthors] = useState<AuthorSerializer[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPendingAuthors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getListPendingAuthor();
      setPendingAuthors(data || []);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAllAuthors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllListAuthor();
      setAuthors(data || []);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const approvalAuthor = async (id: number, data: AuthorApprovalFormData) => {
    try {
      const res = await approvalAuthorAPI(id, data);
      toast.success(res.data.message);
      await loadPendingAuthors();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const loadAllPosts = useCallback(async (filter?: FilterPostDto) => {
    setLoading(true);
    try {
      const postsData = await getAllPosts(filter);
      setPosts(postsData || []);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const approvalPost = async (postId: number, data: PostApprovalFormData) => {
    try {
      const res = await approvePost(postId, data);
      toast.success(res.data.message);
      await loadAllPosts();
      return true;
    } catch (err) {
      toast.error((err as Error).message);
      return false;
    }
  };

  return {
    pendingAuthors,
    posts,
    authors,
    loadAllAuthors,
    loadPendingAuthors,
    loadAllPosts,
    loading,
    approvalAuthor,
    approvalPost,
  };
};
