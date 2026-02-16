"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "../auth-validation";
import { useState } from "react";
import Alert from "@/components/ui/alert/Alert";
import { useRouter } from "next/navigation";
import AuthFormLayout from "../AuthFormLayout";
import Link from "next/link";
import { UserRoundPlus } from "lucide-react";
import { z } from "zod";
import { useAuth } from "@/components/providers/AuthProvider";

type LoginForm = z.infer<typeof signInSchema>;

const Login = () => {
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setServerError("");
      await login({
        identifier: data.username,
        password: data.password,
      });
      router.push("/");
    } catch (error) {
      setServerError("خطا در ورود. اطلاعات را بررسی کنید.");
      console.log(error);
    }
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
            disabled={isSubmitting}
            className="btn btn-wide btn-primary btn-outline mt-5 mb-5 "
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
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
