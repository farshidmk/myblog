"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "../auth-validation";
import { useState } from "react";
import Alert from "@/components/ui/alert/Alert";
import AuthFormLayout from "../AuthFormLayout";
import Link from "next/link";
import { UserRoundPlus } from "lucide-react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "@/types/User";
import { AxiosRequestConfig } from "axios";
import { AuthSession } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

type LoginPayload = {
  identifier: string;
  password: string;
};

type LoginForm = z.infer<typeof signInSchema>;

const Login = () => {
  const router = useRouter();
  const { setAuthSession } = useAuth();
  const [serverError, setServerError] = useState("");
  const mapLoginResponseToSession = (response: LoginResponse): AuthSession => {
    return {
      accessToken: response.access_token,
      user: {
        id: response.user.id,
        email: response.user.email,
        username: response.user.username ?? null,
        firstName: response.user.firstName ?? null,
        lastName: response.user.lastName ?? null,
        phone: response.user.phone ?? null,
        role: response.user.role,
      },
    };
  };

  const { mutate, isPending } = useMutation<
    LoginResponse,
    Error,
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
          setServerError("خطا در ورود. اطلاعات را بررسی کنید.");
          console.log(error);
        },
      },
    );
  };

  return (
    <AuthFormLayout title="ورود">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="username">
            نام کاربری
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            placeholder="نام کاربری یا تلفن همراه یا ایمیل را وارد کنید"
            className="input input-sm"
          />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-semibold" htmlFor="password">
            رمز
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="رمز عبور را وارد کنید..."
            className="input input-sm"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {Boolean(serverError) && (
          <Alert text={serverError} severity="error" variant="soft" />
        )}

        <div className="w-full flex items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="btn btn-wide btn-primary btn-outline mt-5 mb-5 "
          >
            {isSubmitting || isPending ? "در حال ورود..." : "ورود"}
          </button>
        </div>

        <Link href="/auth/sign-up">
          <p className="no-underline font-semibold text-accent flex items-center gap-1">
            <UserRoundPlus />
            ثبت نام در سایت
          </p>
        </Link>
      </form>
    </AuthFormLayout>
  );
};

export default Login;
