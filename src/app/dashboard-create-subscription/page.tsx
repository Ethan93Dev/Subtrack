"use client";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import img from "@/images/add-subscription.jpeg"; // you can replace this later with a finance image

export default function DashboardCreateBill() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("loan");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("unpaid");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/bill/create", {
        name,
        category,
        amount: parseFloat(amount),
        dueDate,
        status,
      });

      // Reset form
      setName("");
      setCategory("loan");
      setAmount("");
      setDueDate("");
      setStatus("unpaid");
    } catch (err) {
      console.error("Error creating bill:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        {/* Left Side - Form */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center md:text-left">
            Add a New Bill / Expense
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Bill Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Bill Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rent, Credit Card, Internet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="loan">Loan</option>
                <option value="credit">Credit Card</option>
                <option value="utility">Utilities</option>
                <option value="rent">Rent / Mortgage</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount owed"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full border rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full border rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-purple-600 text-white rounded-lg py-2 px-6 hover:bg-purple-700 transition-colors"
              >
                Add Bill
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
            alt="Add Bill illustration"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
