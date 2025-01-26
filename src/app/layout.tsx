import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { Vazirmatn } from "next/font/google";

export const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Farshid mk",
  description: "some of",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
