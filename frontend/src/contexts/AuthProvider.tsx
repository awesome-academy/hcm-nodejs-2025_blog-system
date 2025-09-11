import { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  sub: string;
  username: string;
  role: string;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("access_token")
  );

  const user = useMemo<JwtPayload | null>(() => {
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }, [token]);

  const loginContext = (newToken: string) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
  };

  const logoutContext = () => {
    localStorage.removeItem("access_token");
    setToken(null);
  };

  const isLoggedIn = !!(token && token !== "null");

  return (
    <AuthContext.Provider
      value={{ token, user, isLoggedIn, loginContext, logoutContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};
