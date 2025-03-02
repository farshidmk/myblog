"use client";
import { credentialsLogin } from "@/shared/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpForm } from "../auth-types";
import { signInSchema } from "../auth-validation";
import { signOut, useSession } from "next-auth/react";

type LoginForm = Omit<SignUpForm, "name">;
const Login = () => {
  const session = useSession();
  console.log({ session });

  // useEffect(() => {
  //   session.

  //   return () => {
  //     second
  //   }
  // }, [third])

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
    try {
      const dbRes = await credentialsLogin(data.password, data.username);
      console.log("Form submitted with data:", data, { dbRes });
    } catch (error) {
      //TODO: check error type and send proper error message
      console.log(error);
    }
  };
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

      <div>
        <button type="submit">Submit</button>

        <button onClick={() => signOut()}>logout</button>
      </div>
    </form>
  );
};

export default Login;
