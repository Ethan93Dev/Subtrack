"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type Subscription = {
  name: string;
  category?: string;
  cost: number;
};

type SubscriptionChartsProps = {
  subscriptions: Subscription[];
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

export default function DashboardChars({
  subscriptions,
}: SubscriptionChartsProps) {
  // Aggregate by category for Pie chart
  const pieData = subscriptions.reduce(
    (acc: { name: string; value: number }[], sub) => {
      const cat = sub.category || "Other";
      const existing = acc.find((item) => item.name === cat);
      if (existing) {
        existing.value += sub.cost;
      } else {
        acc.push({ name: cat, value: sub.cost });
      }
      return acc;
    },
    []
  );

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Pie Chart */}
      <div className="flex-1" style={{ height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="flex-1" style={{ height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={subscriptions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cost" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
