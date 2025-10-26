"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const logout = async () => {
    try {
      await axios.delete("/api/auth/logout", { withCredentials: true });
      setIsLoggedIn(false);
      setMessage("Logout successful!");
      setTimeout(() => setMessage(null), 3000);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
      setMessage("Logout failed. Please try again.");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const publicNavLinks = [
    { href: "/signup", label: "Signup" },
    { href: "/login", label: "Login" },
  ];

  const privateNavLinks = [
    { href: "/", label: "Home" },
    { href: "/profile", label: "Profile" },
    { href: "/dashboard", label: "Dashboard" },
  ];

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
    <nav className="flex flex-col md:flex-row items-center justify-between px-8 py-4 bg-black text-white shadow-md relative">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold tracking-wide">
        Subtrack
      </Link>

      {/* Links */}
      <div className="flex space-x-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href
                ? "text-white font-bold border-b-2 border-purple-400"
                : "text-gray-300 hover:text-purple-300"
            } transition-all duration-200 pb-1`}
          >
            {link.label}
          </Link>
        ))}

        {/* Logout button */}
        {isLoggedIn && (
          <button
            onClick={logout}
            className="text-gray-300 hover:text-purple-300 transition-all duration-200 pb-1"
          >
            Logout
          </button>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className="absolute top-full mt-2 bg-gray-800 text-white px-4 py-2 rounded shadow-md">
          {message}
        </div>
      )}
    </nav>
  );
}
