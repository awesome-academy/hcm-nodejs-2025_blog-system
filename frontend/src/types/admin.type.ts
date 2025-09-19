import type { paths } from "../types/api";

export type AuthorApprovalFormData =
  paths["/v1/admin/{id}/approvalAuthor"]["patch"]["requestBody"]["content"]["application/json"];

export type PostApprovalFormData =
  paths["/v1/admin/approvalPost/{id}"]["put"]["requestBody"]["content"]["application/json"];

export type FilterPostDto =
  paths["/v1/admin/listPost"]["get"]["parameters"]["query"];
