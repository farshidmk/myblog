"use client";
import { MENUS } from "@/shared/menus";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import logo from "/public/logo.png";
import AuthButton from "./authButton/AuthButton";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-lg border-b border-white/20 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
        <ul className="flex gap-6 items-center">
          {MENUS.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`${
                  pathname === item.path
                    ? "text-primary font-bold border-b-2 border-primary pb-1"
                    : "text-gray-700 hover:text-primary hover:scale-105"
                } transition-all duration-300`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-3 items-center">
          <AuthButton />
          <Link href={"/"} className="text-xl font-bold">
            <Image
              src={logo}
              alt="farshid"
              width={50}
              height={50}
              className="hover:scale-110 transition duration-300 ease-in-out drop-shadow-lg"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
