"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/login",
        { email, password },
        { withCredentials: true } // ✅ allow cookies
      );

      const { profile } = res.data;

      setEmail("");
      setPassword("");

      if (profile) {
        router.push("/dashboard"); // existing profile
      } else {
        router.push("/profile"); // new user — create profile
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Login failed:", err.response?.data || err.message);
        alert(
          err.response?.data?.error ||
            "Login failed. Please check your credentials."
        );
      } else {
        console.error("Unexpected error:", err);
        alert("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Moved JSX return *outside* of handleSubmit
  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login Page</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded-lg p-2"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded-lg p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white rounded-lg py-2 mt-2 hover:bg-purple-700 transition-colors"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
