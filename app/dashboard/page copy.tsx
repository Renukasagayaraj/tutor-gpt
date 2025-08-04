"use client";

// app/dashboard/page.tsx
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const data = [
  { name: "Jan", questions: 100, time: 800, success: 100 },
  { name: "Feb", questions: 150, time: 700, success: 150 },
  { name: "Mar", questions: 180, time: 900, success: 200 },
  { name: "Apr", questions: 170, time: 600, success: 180 },
  { name: "May", questions: 220, time: 1000, success: 240 },
  { name: "Jun", questions: 280, time: 500, success: 300 },
];

const COLORS = ["#003366", "#003366cc", "#66cccc", "#ff9999", "#99e6e6", "#c2c2f0"];

export default function DashboardPage() {
  return (
    <main style={{ padding: "2rem", background: "#f6f8fa", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "1rem" }}>Dashboard</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "24px"
      }}>
        {/* Line Chart */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px #0001" }}>
          <h3>Total Questions Answered</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="questions" stroke="#003366" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Stat Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: "#e3f0fa", borderRadius: 12, padding: 24, flex: 1 }}>
            <h4>Total Questions Answered</h4>
            <div style={{ fontSize: 36, fontWeight: 700 }}>1,200</div>
            <div>Questions</div>
          </div>
          <div style={{ background: "#e7fae3", borderRadius: 12, padding: 24, flex: 1 }}>
            <h4>Total Time Spent</h4>
            <div style={{ fontSize: 36, fontWeight: 700 }}>6,000</div>
            <div>Hours</div>
          </div>
        </div>
        {/* Donut Chart */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px #0001" }}>
          <h3>Total Time Spent</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="time"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#003366"
                label
              >
                {data.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Bar Chart */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px #0001" }}>
          <h3>Student Success Rate</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="success" fill="#003366" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}