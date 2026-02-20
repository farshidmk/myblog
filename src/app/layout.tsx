import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Vazirmatn } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
import AppProviders from "@/components/providers/AppProviders";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FarshidMK's Blog | 💻",
  description:
    "Tutorials, games, and developer tools built with Next.js & Nestjs. Learn, play, and explore useful resources from Farshid’s coding journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.className} antialiased min-h-screen flex flex-col`}
      >
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

        <AppProviders>
          <Navbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
