"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../auth-validation";
import { SignUpForm } from "../auth-types";
import { signUp } from "@/shared/actions";
import { signIn } from "@/auth";
type LoginForm = Omit<SignUpForm, "name">;
const Login = () => {
  // Use react-hook-form with zodResolver to apply validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(signInSchema),
  });

  // Handle form submission
  const onSubmit = async (data: LoginForm) => {
    const dbRes = await signIn("credentials", { values: data });
    console.log("Form submitted with data:", data, { dbRes });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 400, margin: "auto" }}
    >
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

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Login;
