"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import Spinner from "@/components/ui/spinner";
import { UserRole } from "@/types/User";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function SettingsLayout({ children }: Props) {
  const { status, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
      return;
    }

    if (status === "authenticated" && user?.role !== UserRole.Admin) {
      router.replace("/");
    }
  }, [router, status, user?.role]);

  if (status === "loading") {
    return (
      <div className="mx-auto mt-16 flex w-full max-w-5xl items-center justify-center px-4">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (status !== "authenticated" || user?.role !== UserRole.Admin) {
    return null;
  }

  return <>{children}</>;
}
