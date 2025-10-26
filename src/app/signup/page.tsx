"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null); // reset message

    try {
      await axios.post("/api/auth/signup", { username, email, password });

      setUsername("");
      setEmail("");
      setPassword("");

      // Show success message
      setMessage({
        type: "success",
        text: "Account created successfully! Redirecting to login...",
      });

      // Redirect after a short delay
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      console.error("Error", err);

      // Show error message
      if (axios.isAxiosError(err)) {
        const msg =
          err.response?.data?.error ||
          "Signup failed. Maybe the email is already registered.";
        setMessage({ type: "error", text: msg });
      } else {
        setMessage({
          type: "error",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Create Account
        </h1>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
