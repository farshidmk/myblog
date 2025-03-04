"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { KeySquare } from "lucide-react";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
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
  if (session.status === "authenticated") {
    return (
      <button className="flex h-10 rounded-lg" onClick={() => signOut()}>
        {session.data?.user?.name}
      </button>
    );
  }
  return <span className="loading loading-spinner"></span>;
};

export default AuthButton;
