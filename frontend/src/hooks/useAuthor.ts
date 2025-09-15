import { useState, useEffect } from "react";
import { getListAuthor, approvalAuthor } from "../services/authorService";
import type {
  AuthorSerializer,
  AuthorApprovalFormData,
} from "../types/author.type";
import { toast } from "react-toastify";

export const useAuthors = () => {
  const [authors, setAuthors] = useState<AuthorSerializer[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAuthors = async () => {
    setLoading(true);
    try {
      const data = await getListAuthor();
      setAuthors(data || []);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id: number, data: AuthorApprovalFormData) => {
    try {
      const res = await approvalAuthor(id, data);
      toast.success(res.data.message);
      await loadAuthors();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  return {
    authors,
    loadAuthors,
    loading,
    handleApproval,
  };
};
