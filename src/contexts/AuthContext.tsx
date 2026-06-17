import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { login as apiLogin, logout as apiLogout, me } from "@/services/authService";
import { getToken } from "@/services/apiClient";
import type { AuthUser } from "@/types/tutor";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, senha: string) => Promise<AuthUser>;
  logout: () => void;
  hasRole: (role: AuthUser["role"]) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    me()
      .then(setUser)
      .catch(() => apiLogout())
      .finally(() => setLoading(false));
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    loading,
    async login(email, senha) {
      const resp = await apiLogin(email, senha);
      setUser(resp.user);
      return resp.user;
    },
    logout() {
      apiLogout();
      setUser(null);
    },
    hasRole: (role) => user?.role === role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
