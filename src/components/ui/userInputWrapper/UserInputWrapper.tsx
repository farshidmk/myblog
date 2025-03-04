import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
  error?: string;
};

const UserInputWrapper = ({ children, label, error }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1 mb-2">
      <label className="text-base font-semibold">{label}</label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default UserInputWrapper;
