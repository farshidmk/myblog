"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import Alert from "@/components/ui/alert/Alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpValidation } from "../auth-validation";
import { useAuth } from "@/components/providers/AuthProvider";
import { mapLoginResponseToSession } from "../login/_services/mapLoginResponse";
import { LoginResponse } from "@/types/User";

type SignUpForm = z.infer<typeof signUpValidation>;

type ApiErrorPayload = {
  message?: string;
  errors?: string[];
};

const SignUp = () => {
  const { setAuthSession } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const { mutate, isPending } = useMutation<
    LoginResponse,
    AxiosError<ApiErrorPayload>,
    AxiosRequestConfig<SignUpForm>
  >({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpValidation),
  });

  const onSubmit = (data: SignUpForm) => {
    setServerError("");
    mutate(
      {
        url: "auth/register",
        method: "post",
        data,
      },
      {
        onSuccess: (res) => {
          setAuthSession(mapLoginResponseToSession(res));
          router.push("/auth/login");
        },
        onError: (error) => {
          setServerError(extractErrorMessage(error));
        },
      },
    );
  };

  return (
    <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#0f766e] via-[#155e75] to-[#1d4ed8] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative">
            <h1 className="text-4xl font-extrabold leading-tight">
              شروع عالیه!
            </h1>
            <p className="mt-4 max-w-md text-slate-100/90">
              یک حساب جدید بساز تا به مدیریت بازی‌ها، محتوا و ابزارهای سایت
              دسترسی داشته باشی.
            </p>
          </div>
        </section>

        <section className="flex items-center bg-gradient-to-b from-slate-50 to-white p-6 md:p-10">
          <div className="mx-auto w-full max-w-md">
            <div className="flex items-center justify-center w-full">
              <Image
                src="/logo.png"
                alt="farshid"
                width={150}
                height={150}
                className="rounded-xl transition duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
            <h2 className="text-3xl font-black text-slate-900">ثبت‌نام</h2>
            <p className="mt-2 text-sm text-slate-600">
              اطلاعات زیر را کامل کن تا حساب جدیدت ساخته شود.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div className="space-y-1">
                <label
                  className="text-sm font-semibold text-slate-800"
                  htmlFor="email"
                >
                  ایمیل
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="example@mail.com"
                  className="h-11 border-slate-300 focus-visible:ring-teal-600"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label
                    className="text-sm font-semibold text-slate-800"
                    htmlFor="firstName"
                  >
                    نام
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                    placeholder="علی"
                    className="h-11 border-slate-300 focus-visible:ring-teal-600"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    className="text-sm font-semibold text-slate-800"
                    htmlFor="lastName"
                  >
                    نام خانوادگی
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    {...register("lastName")}
                    placeholder="رضایی"
                    className="h-11 border-slate-300 focus-visible:ring-teal-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  className="text-sm font-semibold text-slate-800"
                  htmlFor="username"
                >
                  نام کاربری
                </label>
                <Input
                  id="username"
                  type="text"
                  {...register("username")}
                  placeholder="kiarash"
                  className="h-11 border-slate-300 focus-visible:ring-teal-600"
                />
                {errors.username && (
                  <p className="text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  className="text-sm font-semibold text-slate-800"
                  htmlFor="phone"
                >
                  شماره موبایل
                </label>
                <Input
                  id="phone"
                  type="text"
                  {...register("phone")}
                  placeholder="09..."
                  className="h-11 border-slate-300 focus-visible:ring-teal-600"
                />
              </div>

              <div className="space-y-1">
                <label
                  className="text-sm font-semibold text-slate-800"
                  htmlFor="password"
                >
                  رمز عبور
                </label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="رمز عبور را وارد کنید"
                  className="h-11 border-slate-300 focus-visible:ring-teal-600"
                />
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {Boolean(serverError) && (
                <Alert text={serverError} severity="error" variant="soft" />
              )}

              <Button
                type="submit"
                disabled={isSubmitting || isPending}
                className="h-11 w-full bg-teal-700 text-white hover:bg-teal-800"
              >
                {isSubmitting || isPending ? "در حال ثبت‌نام..." : "ایجاد حساب"}
              </Button>

              <div className="text-center text-sm text-slate-700">
                حساب داری؟
                <Link
                  href="/auth/login"
                  className="mr-1 font-bold text-teal-700 hover:text-teal-800"
                >
                  ورود
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUp;

function extractErrorMessage(error: AxiosError<ApiErrorPayload>) {
  const payload = error.response?.data;
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    return payload.errors.join("، ");
  }
  if (payload?.message) {
    return payload.message;
  }
  return "خطا در ثبت‌نام. اطلاعات را بررسی کنید.";
}
