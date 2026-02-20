"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { status, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [router, status]);

  if (status === "loading") {
    return <div className="mx-auto mt-20 max-w-4xl px-4">در حال بارگذاری...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto mt-12 w-full max-w-4xl px-4">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">پروفایل کاربری</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <p>
            <span className="font-bold">نام کاربری: </span>
            {user.username || "-"}
          </p>
          <p>
            <span className="font-bold">نام: </span>
            {user.firstName || "-"}
          </p>
          <p>
            <span className="font-bold">ایمیل: </span>
            {user.email}
          </p>
          <p>
            <span className="font-bold">شناسه کاربر: </span>
            {user.id}
          </p>
          <div className="pt-2">
            <Button
              variant="destructive"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              خروج از حساب
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
