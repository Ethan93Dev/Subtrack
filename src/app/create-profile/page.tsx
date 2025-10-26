"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

export default function CreateProfile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
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
        state,
        city,
        county,
      });

      setFirstName("");
      setLastName("");
      setState("");
      setCity("");
      setCounty("");

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
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full p-10">
          <h1 className="text-4xl font-bold text-purple-600 mb-6 text-center">
            Create Your Profile
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
            {/* First & Last Name */}
            <div>
              <label
                htmlFor="firstname"
                className="block text-gray-700 font-medium mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                placeholder="Enter First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block text-gray-700 font-medium mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Enter Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* State, City, County */}
            <div>
              <label
                htmlFor="state"
                className="block text-gray-700 font-medium mb-1"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                placeholder="Enter State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-gray-700 font-medium mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label
                htmlFor="county"
                className="block text-gray-700 font-medium mb-1"
              >
                County
              </label>
              <input
                type="text"
                id="county"
                placeholder="Enter County"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                required
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
      </main>

      <Footer />
    </div>
  );
}
