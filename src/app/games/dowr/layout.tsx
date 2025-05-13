import React from "react";
import DowrGameProvider from "./_providers/dowrGameProvider";

export default function DowrGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DowrGameProvider>{children}</DowrGameProvider>;
}
