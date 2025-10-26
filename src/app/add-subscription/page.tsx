"use client";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img from "@/images/add-subscription.jpeg";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function AddSubscription() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/subscription/create", {
        name,
        category,
        cost: parseFloat(cost),
        frequency,
        nextPayment: new Date(),
      });

      setName("");
      setCategory("");
      setCost("");
      setFrequency("monthly");
    } catch (err) {
      console.error("Error creating subscription:", err);
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
          {/* Left Side - Form */}
          <div className="flex-1 p-10 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center md:text-left">
              Add Subscription
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Subscription Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Cost
                </label>
                <input
                  type="number"
                  placeholder="Enter cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  required
                  className="w-full border rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full border rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-purple-600 text-white rounded-lg py-2 px-6 hover:bg-purple-700 transition-colors"
                >
                  Add Subscription
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="bg-gray-500 text-white rounded-lg py-2 px-6 hover:bg-gray-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="flex-1 relative hidden md:block">
            <Image
              src={img}
              alt="Add Subscription illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
