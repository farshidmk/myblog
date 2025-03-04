"use client";
import { credentialsLogin } from "@/shared/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpForm } from "../auth-types";
import { signInSchema } from "../auth-validation";
import { useState } from "react";
import { isKnownError } from "@/shared/errorCheck";
import Alert from "@/components/ui/alert/Alert";
import { useRouter } from "next/navigation";
import AuthFormLayout from "../AuthFormLayout";
import Link from "next/link";
import { UserRoundPlus } from "lucide-react";

type LoginForm = Omit<SignUpForm, "name">;
const Login = () => {
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await credentialsLogin(data.password, data.username);
      if (res?.error) {
        setServerError(res.error); // If error, show the error message
      }
      router.push("/");
    } catch (error) {
      if (isKnownError(error)) {
        setServerError(error.message);
      } else {
        setServerError("خطا در ارتباط با سرور");
      }
      //TODO: check error type and send proper error message
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

        {Boolean(serverError) && (
          <Alert text={serverError} severity="error" variant="soft" />
        )}

        <div className="w-full flex items-center justify-center">
          <button
            type="submit"
            className="btn btn-wide btn-primary btn-outline mt-5 mb-5 "
          >
            ورود
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
