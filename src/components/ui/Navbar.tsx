"use client";

import { MENUS } from "@/shared/menus";
import {
  ChevronDown,
  KeySquare,
  LogOut,
  Menu,
  UserCircle2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { Button } from "./button";
import Spinner from "./spinner";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { status, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const displayName =
    user?.username || user?.firstName || user?.email || "کاربر";

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isActive = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(path + "/"));

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-xl">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="group inline-flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="farshid"
            width={42}
            height={42}
            className="rounded-xl transition duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-black text-slate-900">FarshidMK</p>
            <p className="text-xs text-slate-500">Blog • Games • Tools</p>
          </div>
        </Link>

        <ul className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 md:flex">
          {MENUS.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={
                  isActive(item.path)
                    ? "rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white"
                    : "rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                }
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {status === "loading" && <Spinner />}

          {status === "unauthenticated" && (
            <Button
              variant="outline"
              className="hidden border-slate-300 md:inline-flex"
              onClick={() => router.push("/auth/login")}
            >
              ورود
              <KeySquare className="h-4 w-4" />
            </Button>
          )}

          {status === "authenticated" && (
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <UserCircle2 className="h-4 w-4 text-slate-500" />
                {displayName}
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute left-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <UserCircle2 className="h-4 w-4" />
                    مشاهده پروفایل
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    خروج
                  </button>
                </div>
              )}
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <ul className="space-y-2">
            {MENUS.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={
                    isActive(item.path)
                      ? "block rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                      : "block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  }
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-slate-200 pt-4">
            {status === "unauthenticated" && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/auth/login")}
              >
                ورود
                <KeySquare className="h-4 w-4" />
              </Button>
            )}

            {status === "authenticated" && (
              <div className="space-y-2">
                <p className="px-1 text-sm font-semibold text-slate-600">
                  {displayName}
                </p>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  <UserCircle2 className="h-4 w-4" />
                  مشاهده پروفایل
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  خروج
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
