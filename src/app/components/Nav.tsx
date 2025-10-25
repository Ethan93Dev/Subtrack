"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/login", label: "Login" },
  ];

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white shadow-md">
      {/* Left - Logo / Title */}
      <Link
        href="/"
        className="text-2xl font-bold text-purple-500 tracking-wide"
      >
        Subtrack
      </Link>

      {/* Right - Navigation Links */}
      <div className="flex space-x-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${
              pathname === href
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-300 hover:text-purple-300"
            } transition-all duration-200 pb-1`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
