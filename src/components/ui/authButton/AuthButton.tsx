"use client";
import React from "react";
import { KeySquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

const AuthButton = () => {
  const { status, user, logout } = useAuth();
  const router = useRouter();
  if (status === "unauthenticated") {
    return (
      <button
        className="btn btn-outline btn-primary"
        onClick={() => router.push("/auth/login")}
      >
        ورود
        <KeySquare />
      </button>
    );
  }
  if (status === "authenticated") {
    return (
      <button className="flex h-10 rounded-lg" onClick={logout}>
        {user?.firstName || user?.username || user?.email}
      </button>
    );
  }
  return <span className="loading loading-spinner"></span>;
};

export default AuthButton;
