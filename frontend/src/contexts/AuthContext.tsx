export type UserPayload = {
  sub: string;
  username: string;
  role: string;
};

export type AuthContextType = {
  token: string | null;
  user: UserPayload | null;
  isLoggedIn: boolean;
  loginContext: (token: string) => void;
  logoutContext: () => void;
};

import { createContext } from "react";
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
