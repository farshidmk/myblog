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
    <nav className="shadow-lg p-2 flex justify-center ">
      <div className="flex items-center justify-between max-w-5xl w-full">
        <ul className="flex gap-4 items-center">
          {MENUS.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`${
                  pathname === item.path
                    ? "text-primary font-semibold"
                    : "text-gray-900 hover:text-secondary"
                } `}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <AuthButton />
          <Link href={"/"} className="text-xl font-bold ">
            <Image
              src={logo}
              alt="farshid"
              width={50}
              height={50}
              className="hover:scale-110 transition  duration-300 ease-in-out"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
