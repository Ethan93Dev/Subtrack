"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const publicNavLinks = [
  { href: "/register", label: "Register" },
  { href: "/login", label: "Login" },
];

const privateNavLinks = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/logout", label: "Logout" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("/api/auth/session", {
          withCredentials: true,
        });
        setIsLoggedIn(res.data.loggedIn);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  const navLinks = isLoggedIn ? privateNavLinks : publicNavLinks;

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white shadow-md">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-purple-500 tracking-wide"
      >
        MyApp
      </Link>

      {/* Links */}
      <div className="flex space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href
                ? "text-purple-400 font-bold border-b-2 border-purple-400"
                : "text-gray-300 hover:text-purple-300"
            } transition-all duration-200 pb-1`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
