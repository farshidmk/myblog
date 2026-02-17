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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <AuthFormLayout title="??? ???">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="email">
            ?????
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="firstName">
            ???
          </label>
          <Input
            id="firstName"
            type="text"
            {...register("firstName")}
            placeholder="??? ?? ???? ????..."
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="lastName">
            ??? ????????
          </label>
          <Input
            id="lastName"
            type="text"
            {...register("lastName")}
            placeholder="??? ???????? ?? ???? ????..."
          />
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="username">
            ??? ??????
          </label>
          <Input
            id="username"
            type="text"
            {...register("username")}
            placeholder="??? ?????? ?? ???? ????..."
          />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-base font-semibold" htmlFor="phone">
            ??????
          </label>
          <Input id="phone" type="text" {...register("phone")} placeholder="09..." />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-semibold" htmlFor="password">
            ???
          </label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="??? ???? ?? ???? ????..."
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="w-full flex items-center justify-center">
          <Button type="submit" variant="outline" className="w-full max-w-xs mt-5 mb-5">
            ??? ???
          </Button>
        </div>
      </form>
      <Link href="/auth/login">
        <p className="no-underline font-semibold text-accent flex items-center gap-1">
          <KeySquare />
          ???? ?? ????
        </p>
      </Link>
    </AuthFormLayout>
  );
};

export default SignUp;
