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

type LoginPayload = {
  identifier: string;
  password: string;
};

type RegisterPayload = SignUpForm;

type AuthContextType = {
  status: "loading" | "authenticated" | "unauthenticated";
  session: AuthSession | null;
  user: AuthUser | null;
  setAuthSession: (session: AuthSession | null) => void;
  login: (payload: LoginPayload) => Promise<AuthSession>;
  register: (payload: RegisterPayload) => Promise<unknown>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function asObject(input: unknown): Record<string, unknown> {
  return typeof input === "object" && input !== null
    ? (input as Record<string, unknown>)
    : {};
}

function pickString(source: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }
  return "";
}

function normalizeUser(raw: unknown): AuthUser {
  const user = asObject(raw);
  const idValue = user.id;
  const id =
    typeof idValue === "number"
      ? idValue
      : typeof idValue === "string"
        ? Number(idValue)
        : NaN;

  if (!Number.isFinite(id)) {
    throw new Error("Invalid user object in login response.");
  }

  const normalized: AuthUser = {
    id,
    email: pickString(user, ["email"]),
    firstName: pickString(user, ["firstName", "first_name"]) || null,
    lastName: pickString(user, ["lastName", "last_name"]) || null,
    username: pickString(user, ["username"]) || null,
    phone: pickString(user, ["phone"]) || null,
    role: pickString(user, ["role"]) || "",
    createdAt: pickString(user, ["createdAt", "created_at"]) || null,
    updatedAt: pickString(user, ["updatedAt", "updated_at"]) || null,
  };

  if (!normalized.email) {
    throw new Error("User email is missing in login response.");
  }

  return normalized;
}

function normalizeSession(raw: unknown): AuthSession {
  const data = asObject(raw);
  const nested = asObject(data.data);

  const accessToken =
    pickString(data, ["accessToken", "access_token", "access-token", "token"]) ||
    pickString(nested, [
      "accessToken",
      "access_token",
      "access-token",
      "token",
    ]);
  const refreshToken =
    pickString(data, ["refreshToken", "refresh_token", "refresh-token"]) ||
    pickString(nested, ["refreshToken", "refresh_token", "refresh-token"]);

  const rawUser = data.user ?? nested.user;
  if (!accessToken || !rawUser) {
    throw new Error("Invalid login response from API.");
  }

  return {
    accessToken,
    refreshToken: refreshToken || undefined,
    user: normalizeUser(rawUser),
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

  const setAuthSession = useCallback((nextSession: AuthSession | null) => {
    if (nextSession) {
      setStoredSession(nextSession);
      setSession(nextSession);
      return;
    }
    clearStoredSession();
    setSession(null);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await apiClient.post("/auth/login", payload);
    const normalizedSession = normalizeSession(response.data);
    setAuthSession(normalizedSession);
    return normalizedSession;
  }, [setAuthSession]);

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
      login,
      register,
      logout,
    };
  }, [hydrated, login, logout, register, session, setAuthSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}
