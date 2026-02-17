import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UsersManagementPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2 text-2xl">
            <Users className="h-5 w-5" />
            مدیریت کاربران
          </CardTitle>
          <CardDescription>
            این بخش برای مدیریت کاربران و نقش‌ها در نظر گرفته شده است.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-700">
          <p>
            در نسخه بعدی می‌تونی لیست کاربران، نقش‌ها و وضعیت دسترسی هر کاربر رو
            اینجا مشاهده و ویرایش کنی.
          </p>

          <Link href="/settings">
            <Button variant="outline" className="border-slate-300">
              بازگشت به تنظیمات
              <ArrowLeft className="mr-1 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
