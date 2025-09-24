import { useState, useCallback } from "react";
import type { AuthorSerializer } from "../types/author.type";
import { getAuthorInfo } from "../services/authorService";
import { toast } from "react-toastify";

export const useAuthor = () => {
  const [author, setAuthor] = useState<AuthorSerializer | null>(null);
  const [loading, setLoading] = useState(false);

  // Lấy thông tin tác giả
  const loadAuthorInfo = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const detail = await getAuthorInfo(id);
      setAuthor(detail || null);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    author,
    loading,
    loadAuthorInfo,
  };
};
