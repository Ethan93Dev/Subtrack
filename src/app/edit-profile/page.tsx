"use client";
import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";
import img from "@/images/Edit-profile.jpeg";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("/api/profile/put", {
        firstname,
        lastname,
        state,
        city,
        county,
      });
      setFirstName("");
      setLastName("");
      setState("");
      setCity("");
      setCounty("");
      router.push("/profile");
    } catch (e) {
      console.error("Error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full">
          {/* Left Side - Form */}
          <div className="flex-1 p-10 flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center md:text-left">
              Edit Your Profile
            </h1>

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
                onClick={() => router.push("/profile")}
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="flex-1 relative hidden md:block">
            <Image
              src={img}
              alt="Edit profile illustration"
              fill
              className="object-cover rounded-l-none rounded-r-2xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
