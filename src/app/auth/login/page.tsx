"use client";
import { credentialsLogin } from "@/shared/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpForm } from "../auth-types";
import { signInSchema } from "../auth-validation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { isKnownError } from "@/shared/errorCheck";
import Alert from "@/components/ui/alert/Alert";

type LoginForm = Omit<SignUpForm, "name">;
const Login = () => {
  const [serverError, setServerError] = useState("");
  const session = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await credentialsLogin(data.password, data.username);
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

  console.log(Boolean(serverError));
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 400, margin: "auto" }}
    >
      <h1>session: {session.data?.user?.name}</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register("username")}
          placeholder="Enter your username"
        />
        {errors.username && (
          <p style={{ color: "red" }}>{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      {Boolean(serverError) && (
        <Alert text={serverError} severity="error" variant="soft" />
      )}
      <div>
        <button type="submit">Submit</button>

        <button onClick={() => signOut()}>logout</button>
      </div>
    </form>
  );
};

export default Login;
