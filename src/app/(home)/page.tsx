import Link from "next/link";
import {
  ArrowLeft,
  BookOpenText,
  Calculator,
  Gamepad2,
  Globe,
  Rocket,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeAnimation from "./_components/CodeAnimation";
import SkillIcons from "./_components/SkillIcons";

const pillars = [
  {
    title: "مقاله و یادگیری",
    description:
      "انتشار تجربه‌های واقعی برنامه‌نویسی، خلاصه‌ درس‌ها و نکات کاربردی توسعه.",
    href: "/blog",
    icon: BookOpenText,
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "بازی‌های آنلاین",
    description:
      "ساخت و تجربه بازی‌های گروهی مثل آوالون، دور و جاسوس با UX سریع و روان.",
    href: "/games",
    icon: Gamepad2,
    accent: "from-orange-500/20 to-amber-500/10",
  },
  {
    title: "ابزارهای کاربردی",
    description:
      "اپ‌های سبک برای حل مسئله‌های روزمره مثل محاسبه‌گر ساعت و ابزارهای بهره‌وری.",
    href: "/utils",
    icon: Wrench,
    accent: "from-sky-500/20 to-indigo-500/10",
  },
];

const roadmap = [
  {
    title: "یادداشت‌های فنی",
    description: "مقاله‌های کوتاه و بلند با تمرکز روی تجربه واقعی ساخت محصول.",
  },
  {
    title: "گیم‌پلی چندنفره",
    description: "بهبود بازی‌های فعلی و اضافه‌شدن مودهای آنلاین جدید.",
  },
  {
    title: "ابزارهای میکرو",
    description: "مجموعه utility app برای کارهای سریع روزانه و مدیریت زمان.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,#99f6e4_0%,transparent_45%)]" />

      <section className="container mx-auto max-w-6xl px-4 pb-16 pt-16 md:pb-20 md:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              وبلاگ شخصی + بازی + ابزار
            </p>

            <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-6xl">
              یک جعبه‌ابزار شخصی
              <span className="block text-teal-700">
                برای یادگیری، بازی و ساختن
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
              اینجا فضای من برای انتشار مقاله‌های فنی، ساخت بازی‌های آنلاین و
              توسعه utility app های کاربردی است. هدف: محصولاتی ساده، سریع و
              مفید.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/blog">
                <Button className="w-full bg-teal-700 text-white hover:bg-teal-800 sm:w-auto">
                  شروع با مقاله‌ها
                  <ArrowLeft className="mr-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/games">
                <Button
                  variant="outline"
                  className="w-full border-slate-300 sm:w-auto"
                >
                  مشاهده بازی‌ها
                </Button>
              </Link>
            </div>
          </div>

          <Card className="border-slate-200 bg-white/80 shadow-xl backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">تمرکز فعلی سایت</CardTitle>
              <CardDescription>
                سه مسیر اصلی که به صورت موازی توسعه داده می‌شوند.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <BookOpenText className="mt-1 h-5 w-5 text-teal-700" />
                <div>
                  <p className="font-semibold text-slate-800">انتشار محتوا</p>
                  <p className="text-sm text-slate-600">
                    مقاله‌های فنی قابل استفاده در پروژه واقعی
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <Globe className="mt-1 h-5 w-5 text-indigo-700" />
                <div>
                  <p className="font-semibold text-slate-800">تجربه آنلاین</p>
                  <p className="text-sm text-slate-600">
                    بازی‌های تعاملی با طراحی ساده و سریع
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <Calculator className="mt-1 h-5 w-5 text-orange-700" />
                <div>
                  <p className="font-semibold text-slate-800">
                    ابزارهای ریز اما مفید
                  </p>
                  <p className="text-sm text-slate-600">
                    اپ‌های کوچک برای صرفه‌جویی در زمان روزانه
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href}>
                <Card className="group h-full border-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader>
                    <div
                      className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent}`}
                    >
                      <Icon className="h-5 w-5 text-slate-800" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription className="leading-7">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm font-bold text-teal-700 group-hover:text-teal-800">
                      مشاهده بخش
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Card className="border-slate-200 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">توانمندی‌ها و ابزارها</CardTitle>
              <CardDescription>
                تکنولوژی‌هایی که با آن‌ها محصول واقعی می‌سازم.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkillIcons />
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-gradient-to-br from-white to-teal-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">نمایی از فضای ساختن</CardTitle>
              <CardDescription>
                طراحی، توسعه و تجربه کاربری یک‌جا.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeAnimation />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-20">
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-2xl">
              <Rocket className="h-5 w-5 text-teal-700" />
              مسیر توسعه سایت
            </CardTitle>
            <CardDescription>
              برنامه‌ای ساده برای توسعه تدریجی محصولات این وب‌سایت.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {roadmap.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <p className="mb-2 text-xs font-bold text-slate-500">
                    مرحله {index + 1}
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
