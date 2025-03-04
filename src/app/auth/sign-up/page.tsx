"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpValidation } from "../auth-validation";
import { SignUpForm } from "../auth-types";
import { signUp } from "@/shared/actions";
import AuthFormLayout from "../AuthFormLayout";
import Link from "next/link";
import { KeySquare } from "lucide-react";

const SignUp = () => {
  // Use react-hook-form with zodResolver to apply validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpValidation),
  });

  // Handle form submission
  const onSubmit = async (data: SignUpForm) => {
    try {
      const dbRes = await signUp({ ...data });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthFormLayout title="ثبت نام">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="username">
            نام{" "}
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="نام را وارد کنید..."
            className="input input-sm"
          />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="username">
            نام کاربری
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            placeholder="نام کاربری را وارد کنید..."
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

        <div className="w-full flex items-center justify-center">
          <button
            type="submit"
            className="btn btn-wide btn-primary btn-outline mt-5 mb-5 "
          >
            ثبت نام
          </button>
        </div>
      </form>
      <Link href="/auth/login">
        <p className="no-underline font-semibold text-accent flex items-center gap-1">
          <KeySquare />
          ورود به سایت
        </p>
      </Link>
    </AuthFormLayout>
  );
};

export default SignUp;
