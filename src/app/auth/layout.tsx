"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);

  return (
    <div className="h-full w-full  bg-mainBg flex items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
