"use client";

import {
  AuthSession,
  AuthUser,
  clearStoredSession,
  getStoredSession,
  setStoredSession,
} from "@/lib/auth-storage";
import { apiClient } from "@/lib/reactQueryFunctions";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SignUpForm } from "@/app/auth/auth-types";

type RegisterPayload = SignUpForm;

type AuthContextType = {
  status: "loading" | "authenticated" | "unauthenticated";
  session: AuthSession | null;
  user: AuthUser | null;
  setAuthSession: (session: AuthSession | null) => void;
  register: (payload: RegisterPayload) => Promise<unknown>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

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

  const setAuthSession = useCallback((nextSession: AuthSession | null) => {
    if (nextSession) {
      setStoredSession(nextSession);
      setSession(nextSession);
      return;
    }
    clearStoredSession();
    setSession(null);
  }, []);

  // const login = useCallback(
  //   async (payload: LoginPayload) => {
  //     const response = await apiClient.post("/auth/login", payload);
  //     const normalizedSession = normalizeSession(response.data);
  //     setAuthSession(normalizedSession);
  //     return normalizedSession;
  //   },
  //   [setAuthSession],
  // );

  const register = useCallback(async (payload: RegisterPayload) => {
    const response = await apiClient.post("/auth/sign-up", payload);
    return response.data;
  }, []);

  const logout = useCallback(() => {
    setAuthSession(null);
  }, [setAuthSession]);

  const value = useMemo<AuthContextType>(() => {
    return {
      status: !hydrated
        ? "loading"
        : session
          ? "authenticated"
          : "unauthenticated",
      session,
      user: session?.user || null,
      setAuthSession,

      register,
      logout,
    };
  }, [hydrated, logout, register, session, setAuthSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
