import type { components } from "../types/api";

export type PostSerializer = components["schemas"]["PostSerializer"];
export type TagSerializer = components["schemas"]["TagSerializer"];
export type CategorySerializer = components["schemas"]["CategorySerializer"];

export interface CreateCategoryDto {
  id?: number;
  name: string;
}

export interface CreateTagDto {
  id?: number;
  name: string;
}

// Payload gửi lên API
export interface CreatePostFormData {
  title: string;
  content: string;
  imageUrl?: string;
  category: CreateCategoryDto;
  tags: CreateTagDto[];
  file?: File;
}

// Dữ liệu form (frontend)
export interface CreatePostFormValues {
  title: string;
  content: string;
  category: CreateCategoryDto;
  tags: CreateTagDto[];
  image?: { originFileObj: File }[];
}
