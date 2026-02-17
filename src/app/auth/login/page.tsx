"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "../auth-validation";
import { useState } from "react";
import Alert from "@/components/ui/alert/Alert";
import Link from "next/link";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "@/types/User";
import { AxiosError, AxiosRequestConfig } from "axios";
import { AuthSession } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { mapLoginResponseToSession } from "./_services/mapLoginResponse";

type LoginPayload = {
  identifier: string;
  password: string;
};

type LoginForm = z.infer<typeof signInSchema>;

type ApiErrorPayload = {
  message?: string;
  errors?: string[];
};

const Login = () => {
  const router = useRouter();
  const { setAuthSession } = useAuth();
  const [serverError, setServerError] = useState("");

  const { mutate, isPending } = useMutation<
    LoginResponse,
    AxiosError<ApiErrorPayload>,
    AxiosRequestConfig<LoginPayload>
  >({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: LoginForm) => {
    setServerError("");
    mutate(
      {
        url: "auth/login",
        method: "post",
        data: {
          identifier: data.username,
          password: data.password,
        },
      },
      {
        onSuccess: (response) => {
          setAuthSession(mapLoginResponseToSession(response));
          router.push("/");
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
              خیلی خوش اومدی! :)
            </h1>
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
            <h2 className="text-3xl font-black text-slate-900">ورود به حساب</h2>
            <p className="mt-2 text-sm text-slate-600">
              برای ادامه، نام کاربری و رمز عبور خودت را وارد کن.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div className="space-y-1">
                <label
                  className="text-sm font-semibold text-slate-800"
                  htmlFor="username"
                >
                  نام کاربری / ایمیل / موبایل
                </label>
                <Input
                  id="username"
                  type="text"
                  {...register("username")}
                  placeholder="مثلاً: kiarash"
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
                {isSubmitting || isPending ? "در حال ورود..." : "ورود"}
              </Button>

              <div className="text-center text-sm text-slate-700">
                حساب نداری؟
                <Link
                  href="/auth/sign-up"
                  className="mr-1 font-bold text-teal-700 hover:text-teal-800"
                >
                  ثبت نام کن
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;

function extractErrorMessage(error: AxiosError<ApiErrorPayload>) {
  const payload = error.response?.data;
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    return payload.errors.join("، ");
  }
  if (payload?.message) {
    return payload.message;
  }
  return "خطا در ورود. اطلاعات را بررسی کنید.";
}
