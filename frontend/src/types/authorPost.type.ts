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

export interface CreatePostFormData {
  title: string;
  content: string;
  imageUrl?: string;
  category: CreateCategoryDto;
  tags: CreateTagDto[];
  file?: File;
}

export interface CreatePostFormValues {
  title: string;
  content: string;
  category: CreateCategoryDto;
  tags: CreateTagDto[];
  image?: { originFileObj: File }[];
  imageUrl?: string;
}

// ========================
// Update Post
// ========================

export interface UpdateCategoryDto {
  id?: number;
  name?: string;
}

export interface UpdateTagDto {
  id?: number;
  name?: string;
}

export interface UpdatePostFormData {
  title?: string;
  content?: string;
  imageUrl?: string;
  category?: UpdateCategoryDto;
  tags?: UpdateTagDto[];
  file?: File;
}

export interface UpdatePostFormValues {
  title?: string;
  content?: string;
  category?: UpdateCategoryDto;
  tags?: UpdateTagDto[];
  imageUrl?: string;
  image?: { originFileObj: File }[];
}
