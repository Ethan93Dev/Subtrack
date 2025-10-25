"use client";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddSubscription() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/subscription", {
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
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-purple-600 text-center">
        Add Subscription
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="name">Subscription Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded-lg p-2"
        />

        <label htmlFor="category">Category</label>
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-2"
        />

        <label htmlFor="cost">Cost</label>
        <input
          type="number"
          placeholder="Enter cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
          className="border rounded-lg p-2"
        />

        <label htmlFor="frequency">Frequency</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        {/* Button Row */}
        <div className="flex justify-between mt-4">
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
  );
}
