import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { Vazirmatn } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Bounce, ToastContainer } from "react-toastify";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FarshidMK's Blog | 💻",
  description:
    "Tutorials, games, and developer tools built with Next.js & Supabase. Learn, play, and explore useful resources from Farshid’s coding journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} antialiased h-screen`}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />

        <SessionProvider>
          <div className="flex flex-col h-full">
            <Navbar />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
