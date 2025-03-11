import React from "react";
import AvalonProvider from "./AvalonProvider";

type Props = { children: React.ReactNode };

const AvalonLayout = ({ children }: Props) => {
  return (
    <div>
      <AvalonProvider>{children}</AvalonProvider>
    </div>
  );
};

export default AvalonLayout;
