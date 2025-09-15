import type {paths, components } from "../types/api";

export type AuthorSerializer = components["schemas"]["AuthorSerializer"];

export type AuthorApprovalFormData=paths["/v1/authors/{id}/approval"]["patch"]["requestBody"]["content"]["application/json"];
