"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img from "@/images/profile-img.jpeg";

import Footer from "../components/Footer";

export default function CreateProfile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      await axios.post("/api/profile/create", {
        firstName: firstname,
        lastName: lastname,
        avatarUrl,
      });

      setFirstName("");
      setLastName("");
      setAvatarUrl("");

      setMessage({
        type: "success",
        text: "Profile created successfully! Redirecting...",
      });

      setTimeout(() => router.push("/add-subscription"), 1500);
    } catch (err) {
      console.error("Error", err);
      setMessage({
        type: "error",
        text: "Failed to create profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
          {/* Left Side - Form */}
          <div className="flex-1 p-10 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center md:text-left">
              Create Profile
            </h1>

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
                  htmlFor="firstname"
                >
                  Firstname
                </label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="Enter Firstname"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="lastname"
                >
                  Lastname
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Enter Lastname"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="avatarUrl"
                >
                  Avatar URL
                </label>
                <input
                  id="avatarUrl"
                  type="text"
                  placeholder="Enter Avatar URL"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
              >
                {loading ? "Saving..." : "Create Profile"}
              </button>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="flex-1 relative hidden md:block">
            <Image
              src={img}
              alt="Profile illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
