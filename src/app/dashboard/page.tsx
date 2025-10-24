"use client";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

import React from "react";
import SubscriptionCharts from "./components/SubscriptionChartInner";

export default function Dashboard() {
  const subscriptions = [
    { name: "Netflix", category: "Entertainment", cost: 15 },
    { name: "Spotify", category: "Music", cost: 10 },
    { name: "Figma", category: "Work Tools", cost: 20 },
    { name: "Amazon Prime", category: "Shopping", cost: 12 },
  ];

  return (
    <>
      <Nav />
      <div className="p-8 max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-purple-600 text-center">
          Dashboard
        </h1>
        <p className="text-gray-700 text-center">
          Overview of your subscriptions by category and cost.
        </p>

        <SubscriptionCharts subscriptions={subscriptions} />
      </div>
      <Footer />
    </>
  );
}
