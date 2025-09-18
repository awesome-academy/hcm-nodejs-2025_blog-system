import api from "../api/apiClient";
import { handleAxiosError } from "../utils/handleError";
import type {
  CreatePostFormData,
  UpdatePostFormData,
} from "../types/authorPost.type";

// List tags/categories/posts
export const getListTags = async () => {
  try {
    const res = await api.get("/v1/tags/list");
    return res.data.data;
  } catch (err) {
    throw handleAxiosError(err, "post.fetch_listTags_failed");
  }
};

export const getListCategories = async () => {
  try {
    const res = await api.get("/v1/categories/list");
    return res.data.data;
  } catch (err) {
    throw handleAxiosError(err, "post.fetch_listCategories_failed");
  }
};

export const getListPostsByAuthor = async () => {
  try {
    const res = await api.get("/v1/posts/authorPost");
    return res.data.data;
  } catch (err) {
    throw handleAxiosError(err, "post.fetch_listPosts_failed");
  }
};

export const createPost = async (data: CreatePostFormData) => {
  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);

    formData.append("category[id]", data.category.id?.toString() || "");
    formData.append("category[name]", data.category.name);

    data.tags.forEach((tag, index) => {
      if (tag.id !== undefined)
        formData.append(`tags[${index}][id]`, tag.id.toString());
      formData.append(`tags[${index}][name]`, tag.name);
    });

    if (data.file) formData.append("file", data.file);
    if (data.imageUrl) formData.append("imageUrl", data.imageUrl);

    const res = await api.post("/v1/posts/create", formData);
    return res.data.data;
  } catch (err) {
    throw handleAxiosError(err, "post.create_failed");
  }
};

export const updatePost = async (postId: number, data: UpdatePostFormData) => {
  try {
    const formData = new FormData();

    // Gửi luôn title & content
    formData.append("title", data.title ?? "");
    formData.append("content", data.content ?? "");

    // Category
    formData.append("category[id]", data.category?.id?.toString() ?? "");
    formData.append("category[name]", data.category?.name ?? "");

    // Tags
    (data.tags || []).forEach((tag, index) => {
      formData.append(`tags[${index}][id]`, tag.id?.toString() ?? "");
      formData.append(`tags[${index}][name]`, tag.name ?? "");
    });

    // Image/File
    formData.append("imageUrl", data.imageUrl ?? "");
    if (data.file) {
      formData.append("file", data.file);
    }

    const res = await api.put(`/v1/posts/update/${postId}`, formData);
    return res.data.data;
  } catch (err) {
    throw handleAxiosError(err, "post.update_failed");
  }
};

export const softDeletePost = async (postId: number) => {
  try {
    const res = await api.delete(`/v1/posts/softDelete/${postId}`);
    return res.data;
  } catch (err) {
    throw handleAxiosError(err, "post.delete_failed");
  }
};
