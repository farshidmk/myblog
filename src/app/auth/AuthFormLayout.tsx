import React from "react";

type Props = {
  title: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Container for login and signup form
 * @returns
 */
const AuthFormLayout = ({ title, children }: Props) => {
  return (
    <div className="p-5 flex flex-col rounded-md border border-secondary w-1/2 max-w-sm bg-slate-50 min-h-40 gap-3">
      <h1 className="text-2xl font-extrabold text-secondary">{title}</h1>
      <div className="my-2">{children}</div>
    </div>
  );
};

export default AuthFormLayout;
