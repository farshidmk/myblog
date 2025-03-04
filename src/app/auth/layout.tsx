"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div className="h-full w-full  bg-mainBg flex items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
