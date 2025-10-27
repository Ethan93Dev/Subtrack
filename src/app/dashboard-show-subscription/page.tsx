"use client";
import React from "react";

export default function ShowDashboardDebts() {
  // Mock data — replace this with API data later
  const debts = [
    {
      id: 1,
      name: "Car Loan",
      amount: 8500,
      category: "Loan",
      dueDate: "2025-11-01",
    },
    {
      id: 2,
      name: "Credit Card",
      amount: 2200,
      category: "Credit",
      dueDate: "2025-10-30",
    },
    {
      id: 3,
      name: "Rent",
      amount: 1400,
      category: "Rent / Mortgage",
      dueDate: "2025-11-05",
    },
    {
      id: 4,
      name: "Electric Bill",
      amount: 120,
      category: "Utilities",
      dueDate: "2025-11-10",
    },
  ];

  // Optionally, calculate total owed
  const totalOwed = debts.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">
        Your Bills & Debts
      </h1>

      <p className="text-gray-700 mb-8">
        Track what you owe and when payments are due.
      </p>

      {/* Total Summary */}
      <div className="bg-purple-100 border border-purple-300 text-purple-800 rounded-xl px-6 py-4 mb-8 shadow-sm">
        <p className="text-lg font-medium">
          💰 Total Owed:{" "}
          <span className="font-bold">${totalOwed.toLocaleString()}</span>
        </p>
      </div>

      {/* Debt Cards */}
      <div className="w-full max-w-3xl grid gap-6">
        {debts.map((debt) => (
          <div
            key={debt.id}
            className="flex justify-between items-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300"
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {debt.name}
              </h2>
              <p className="text-gray-500 text-sm">
                Category:{" "}
                <span className="font-medium text-gray-700">
                  {debt.category}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                Due Date:{" "}
                <span className="font-medium text-gray-700">
                  {new Date(debt.dueDate).toLocaleDateString()}
                </span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-green-600">
                ${debt.amount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
