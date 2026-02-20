import React from "react";
import AvalonProvider from "./AvalonProvider";

type Props = { children: React.ReactNode };

const AvalonLayout = ({ children }: Props) => {
  return <AvalonProvider>{children}</AvalonProvider>;
};

export default AvalonLayout;
