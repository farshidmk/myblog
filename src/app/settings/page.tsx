import Link from "next/link";
import {
  ArrowLeft,
  FolderCog,
  ShieldCheck,
  Users,
  Wrench,
  ClipboardList,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const gameActions = [
  {
    title: "مدیریت واژه‌های بازی",
    description: "افزودن، حذف و مشاهده واژه‌ها و درجه سختی آن‌ها.",
    href: "/settings/words",
    action: "رفتن به واژه‌ها",
  },
  {
    title: "مدیریت دسته‌بندی واژه‌ها",
    description: "ایجاد دسته جدید و ویرایش/حذف دسته‌بندی‌های موجود.",
    href: "/settings/wordCategory",
    action: "مدیریت دسته‌بندی",
  },
  {
    title: "مدیریت کاربران",
    description: "مشاهده کاربران، بررسی نقش‌ها و مدیریت دسترسی‌ها.",
    href: "/settings/users",
    action: "مشاهده کاربران",
  },
];

export default function SettingsPage() {
  return (
    <main className="mx-auto mt-2 w-full max-w-6xl px-4 py-8 md:py-12">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin Only
        </p>
        <h1 className="text-3xl font-black">تنظیمات وب‌سایت</h1>
        <p className="mt-2 text-sm text-slate-100/90">
          از اینجا می‌تونی تنظیمات مدیریتی سایت و بخش بازی‌ها را کنترل کنی.
        </p>
      </div>

      <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {gameActions.map((item, index) => {
          const icon = index === 0 ? Wrench : index === 1 ? FolderCog : Users;
          const Icon = icon;
          return (
            <Link href={item.href} key={item.title}>
              <Card className="cursor-pointer border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <Icon className="h-5 w-5 text-slate-700" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="leading-7">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-slate-300">
                    {item.action}
                    <ArrowLeft className="mr-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>

      <section className="mt-8">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-xl">
              <ClipboardList className="h-5 w-5" />
              راهنمای سریع اکشن‌ها
            </CardTitle>
            <CardDescription>
              خلاصه کارهایی که در بخش مدیریت می‌تونی انجام بدی.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <p>1. افزودن واژه جدید برای بازی‌ها با درجه سختی مناسب</p>
            <p>2. حذف/ویرایش واژه‌های قدیمی یا نامناسب</p>
            <p>3. ایجاد دسته‌بندی جدید برای واژه‌ها</p>
            <p>4. مشاهده و مدیریت کاربران سایت</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
