import type {paths} from "./api";

export type RegisterFormData=paths["/v1/auth/register"]["post"]["requestBody"]["content"]["application/json"];

export type LoginFormData=paths["/v1/auth/login"]["post"]["requestBody"]["content"]["application/json"];

export type LoginResponse=paths["/v1/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];
