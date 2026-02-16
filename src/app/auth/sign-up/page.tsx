"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpValidation } from "../auth-validation";
import { SignUpForm } from "../auth-types";
import AuthFormLayout from "../AuthFormLayout";
import Link from "next/link";
import { KeySquare } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpValidation),
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      await registerUser({ ...data });
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthFormLayout title="Ø«Ø¨Øª Ù†Ø§Ù…">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="email">
            Ø§ÛŒÙ…ÛŒÙ„
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="example@mail.com"
            className="input input-sm"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="firstName">
            Ù†Ø§Ù…
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            placeholder="Ù†Ø§Ù… Ø±Ø§ ÙˆØ§Ø±Ø¯ Ú©Ù†ÛŒØ¯..."
            className="input input-sm"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="lastName">
            Ù†Ø§Ù… Ø®Ø§Ù†ÙˆØ§Ø¯Ú¯ÛŒ
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            placeholder="Ù†Ø§Ù… Ø®Ø§Ù†ÙˆØ§Ø¯Ú¯ÛŒ Ø±Ø§ ÙˆØ§Ø±Ø¯ Ú©Ù†ÛŒØ¯..."
            className="input input-sm"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="username">
            Ù†Ø§Ù… Ú©Ø§Ø±Ø¨Ø±ÛŒ
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            placeholder="Ù†Ø§Ù… Ú©Ø§Ø±Ø¨Ø±ÛŒ Ø±Ø§ ÙˆØ§Ø±Ø¯ Ú©Ù†ÛŒØ¯..."
            className="input input-sm"
          />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="phone">
            Ù…ÙˆØ¨Ø§ÛŒÙ„
          </label>
          <input
            id="phone"
            type="text"
            {...register("phone")}
            placeholder="09..."
            className="input input-sm"
          />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-semibold" htmlFor="password">
            Ø±Ù…Ø²
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Ø±Ù…Ø² Ø¹Ø¨ÙˆØ± Ø±Ø§ ÙˆØ§Ø±Ø¯ Ú©Ù†ÛŒØ¯..."
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
            Ø«Ø¨Øª Ù†Ø§Ù…
          </button>
        </div>
      </form>
      <Link href="/auth/login">
        <p className="no-underline font-semibold text-accent flex items-center gap-1">
          <KeySquare />
          ÙˆØ±ÙˆØ¯ Ø¨Ù‡ Ø³Ø§ÛŒØª
        </p>
      </Link>
    </AuthFormLayout>
  );
};

export default SignUp;
