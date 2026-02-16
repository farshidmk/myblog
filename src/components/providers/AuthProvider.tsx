"use client";

import {
  AuthSession,
  AuthUser,
  clearStoredSession,
  getStoredSession,
  setStoredSession,
} from "@/lib/auth-storage";
import { apiClient } from "@/lib/reactQueryFunctions";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type LoginPayload = {
  identifier: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

type AuthContextType = {
  status: "loading" | "authenticated" | "unauthenticated";
  session: AuthSession | null;
  user: AuthUser | null;
  login: (payload: LoginPayload) => Promise<AuthSession>;
  register: (payload: RegisterPayload) => Promise<unknown>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function normalizeSession(raw: unknown): AuthSession {
  const data = raw as Record<string, unknown>;
  const nested = (data.data || {}) as Record<string, unknown>;
  const accessToken =
    (data.accessToken as string) ||
    (data["access-token"] as string) ||
    (data.token as string) ||
    (nested.accessToken as string) ||
    (nested["access-token"] as string) ||
    (nested.token as string);
  const refreshToken =
    (data.refreshToken as string) ||
    (data["refresh-token"] as string) ||
    (nested.refreshToken as string) ||
    (nested["refresh-token"] as string);
  const user = (data.user || nested.user) as AuthUser;

  if (!accessToken || !user) {
    throw new Error("Invalid login response from API.");
  }

  return {
    accessToken,
    refreshToken,
    user,
  };
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(getStoredSession());
    setHydrated(true);
  }, []);

  const login: AuthContextType["login"] = async (payload) => {
    const response = await apiClient.post("/auth/login", payload);
    const normalized = normalizeSession(response.data);
    setStoredSession(normalized);
    setSession(normalized);
    return normalized;
  };

  const register: AuthContextType["register"] = async (payload) => {
    const response = await apiClient.post("/auth/register", payload);
    return response.data;
  };

  const logout = () => {
    clearStoredSession();
    setSession(null);
  };

  const value = useMemo<AuthContextType>(() => {
    return {
      status: !hydrated
        ? "loading"
        : session
          ? "authenticated"
          : "unauthenticated",
      session,
      user: session?.user || null,
      login,
      register,
      logout,
    };
  }, [hydrated, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
