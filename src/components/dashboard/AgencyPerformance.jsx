import React, { useState } from "react";
import { Send, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";

const clients = [
  { name: "Reebok", color: "bg-amber-50 text-amber-600 border-amber-200" },
  { name: "The Kollektor", color: "bg-rose-50 text-rose-600 border-rose-200" },
  { name: "Amazon", color: "bg-[#F4F2FF] text-indigo-600 border-indigo-200" },
  { name: "GRT Jewellers", color: "bg-sky-50 text-sky-600 border-sky-200" },
];

const chartData = [
  { name: "Jan", income: 4.0, cashFlow: 1.2, revenue: 22 },
  { name: "Feb", income: 3.0, cashFlow: 2.9, revenue: 12 },
  { name: "Mar", income: 2.5, cashFlow: 3.6, revenue: 52 },
  { name: "Apr", income: 1.5, cashFlow: 1.2, revenue: 54 },
  { name: "May", income: 2.5, cashFlow: 3.6, revenue: 23 },
  { name: "Jun", income: 3.8, cashFlow: 2.3, revenue: 35 },
  { name: "Jul", income: 3.8, cashFlow: 3.8, revenue: 28 },
  { name: "Aug", income: 4.6, cashFlow: 5.0, revenue: 33 },
];

const pendingResponses = [
  {
    name: "Grace Buckland",
    location: "Maryland",
    percent: 43,
    color: "text-amber-500",
  },
  {
    name: "Jane Lee",
    location: "North Carolina",
    percent: 35,
    color: "text-rose-400",
  },
  {
    name: "Ryan McGrath",
    location: "Rhode Island",
    percent: 27,
    color: "text-indigo-500",
  },
  {
    name: "Ella Oliver",
    location: "Washington",
    percent: 15,
    color: "text-emerald-500",
  },
  {
    name: "Chloe Walker",
    location: "Kentucky",
    percent: 12,
    color: "text-amber-400",
  },
];

export default function AgencyPerformance() {
  const [selectedClient, setSelectedClient] = useState("Reebok");

  return (
    <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
      {/* LEFT CARD: Sales & Revenue by Client */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">
              Agency Performance
            </h2>
            <p className="text-xs text-gray-500">Reports by Client</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-1 text-xs font-bold text-gray-600">
            <button className="grid h-6 w-6 place-items-center rounded hover:bg-white">
              <ChevronLeft size={14} />
            </button>
            <span className="px-1">2026</span>
            <button className="grid h-6 w-6 place-items-center rounded hover:bg-white">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[140px_1fr]">
          {/* Client Selector Buttons */}
          <div className="flex flex-col gap-2.5">
            {clients.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedClient(c.name)}
                className={`flex h-12 items-center justify-center rounded-xl border font-bold text-xs transition ${
                  selectedClient === c.name
                    ? `${c.color} shadow-sm ring-2 ring-offset-1 ring-blue-500/20`
                    : "border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Dual Y-Axis Chart */}
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F1F5F9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6366F1", fontSize: 11 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#F59E0B", fontSize: 11 }}
                />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="income"
                  fill="#6366F1"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
                <Bar
                  yAxisId="left"
                  dataKey="cashFlow"
                  fill="#34D399"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-2 flex items-center justify-center gap-6 text-[11px] font-bold text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />{" "}
                Income
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />{" "}
                Cash Flow
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />{" "}
                Revenue
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT CARD: Waiting for an Answer */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">
              Waiting for an Answer
            </h2>
            <p className="text-xs text-gray-500">Client approvals pending</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="space-y-3.5">
          {pendingResponses.map((person, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-orange-100 to-amber-100 text-xs font-bold text-gray-700">
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">
                    {person.name}
                  </p>
                  <p className="text-[10px] text-gray-400">{person.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-extrabold ${person.color}`}>
                  %{person.percent}
                </span>
                <button className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-[11px] font-bold text-indigo-600 transition hover:bg-indigo-100">
                  <Send size={11} /> Send
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
