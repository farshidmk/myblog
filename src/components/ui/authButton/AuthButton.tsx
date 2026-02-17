"use client";
import React from "react";
import { KeySquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

const AuthButton = () => {
  const { status, user, logout } = useAuth();
  const router = useRouter();

  if (status === "unauthenticated") {
    return (
      <Button variant="outline" onClick={() => router.push("/auth/login")}>
        ورود
        <KeySquare className="h-4 w-4" />
      </Button>
    );
  }

  if (status === "authenticated") {
    return (
      <Button variant="ghost" className="h-10" onClick={logout}>
        {user?.firstName || user?.username || user?.email}
      </Button>
    );
  }

  return <Spinner />;
};

export default AuthButton;
