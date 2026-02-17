"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpLeft,
  Github,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

const quickLinks = [
  { title: "خانه", path: "/" },
  { title: "بلاگ", path: "/blog" },
  { title: "بازی‌ها", path: "/games" },
  { title: "ابزارها", path: "/utils" },
];

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <footer className="relative border-t border-slate-300 bg-gradient-to-b from-slate-100 to-slate-200/80">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                آماده همکاری
              </p>
              <h3 className="mt-3 text-2xl font-black">
                پروژه جدیدی تو ذهنت داری؟
              </h3>
              <p className="mt-2 text-sm text-cyan-50">
                برای همکاری در توسعه ایده ات خوشحال میشم کمکت کنم ;)
              </p>
            </div>
            <a
              href="mailto:farshid@example.com"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-teal-700 transition hover:bg-slate-100"
            >
              ارسال ایمیل
              <ArrowUpLeft className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h4 className="text-lg font-black text-slate-900">FarshidMK</h4>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              وب‌سایت شخصی برای انتشار مقاله‌های فنی، ساخت بازی آنلاین و توسعه
              ابزارهای کوچک اما کاربردی.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://github.com/farshidmk"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-teal-200 hover:text-teal-700"
                aria-label="github"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/farshidmk"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-teal-200 hover:text-teal-700"
                aria-label="linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900">دسترسی سریع</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-slate-600 transition hover:text-teal-700"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900">اطلاعات تماس</h4>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <a
                href="mailto:farshid@example.com"
                className="flex items-center gap-2 hover:text-teal-700"
              >
                <Mail className="h-4 w-4" />
                farshid@example.com
              </a>
              <a
                href="tel:+989123456789"
                className="flex items-center gap-2 hover:text-teal-700"
              >
                <Phone className="h-4 w-4" />
                +98 912 345 6789
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                تهران، ایران
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-300 pt-4 text-center text-xs text-slate-600 md:flex md:items-center md:justify-between md:text-right">
          <p>© {currentYear} FarshidMK - تمامی حقوق محفوظ است.</p>
          <p
            className="mt-2 inline-flex items-center justify-center gap-1 md:mt-0"
            dir="ltr"
          >
            made with
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
