import React, { useState } from "react";
import { Plus, Download, ChevronDown, Calendar } from "lucide-react";

const topServices = [
  {
    id: 1,
    name: "Beveled Cone 3D Design",
    category: "3D Shapes",
    sales: [30, 40, 35, 50, 49],
    stock: 380,
    price: "$14.50",
    client: "Reebok",
    clientColor: "bg-amber-500",
  },
  {
    id: 2,
    name: "Cloud Ball Motion Graphic",
    category: "3D Shapes",
    sales: [20, 25, 30, 45, 60],
    stock: 1245,
    price: "$12.00",
    client: "Amazon",
    clientColor: "bg-orange-500",
  },
  {
    id: 3,
    name: "Quadrilateral Branding Pack",
    category: "3D Shapes",
    sales: [40, 20, 35, 10, 25],
    stock: 27,
    price: "$12.80",
    client: "GRT Jewellers",
    clientColor: "bg-indigo-600",
  },
];

export default function AgencyWalletTopServices() {
  const [activeCard, setActiveCard] = useState("Mastercard - 1198");

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_2fr]">
      {/* LEFT CARD: My Wallet */}
      <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-gray-900">My Wallet</h2>
          <button className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-100">
            <Plus size={14} /> Add New
          </button>
        </div>

        {/* Credit Card Visual */}
        <div className="relative my-6 h-44 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-5 text-white shadow-lg shadow-orange-500/20">
          <div className="flex justify-between items-start">
            <div className="h-7 w-10 rounded-md bg-amber-200/80 border border-amber-300" />
            <div className="flex -space-x-2">
              <div className="h-7 w-7 rounded-full bg-red-500/90" />
              <div className="h-7 w-7 rounded-full bg-amber-400/90" />
            </div>
          </div>
          <div className="mt-6 text-lg font-mono tracking-widest font-semibold">
            **** **** **** 1198
          </div>
          <div className="mt-4 flex justify-between text-[10px] uppercase opacity-90">
            <div>
              <p className="text-[8px] opacity-75">Card Holder</p>
              <p className="font-bold tracking-wider">Harsh Pareek</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] opacity-75">Valid Thru</p>
              <p className="font-bold">12/28</p>
            </div>
          </div>
        </div>

        {/* Card Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-gray-100 p-1 text-[11px] font-bold text-gray-500">
          {["Visa - 1134", "Mastercard - 1198", "Amex - 00002"].map((card) => (
            <button
              key={card}
              onClick={() => setActiveCard(card)}
              className={`rounded-lg py-2 transition ${
                activeCard === card
                  ? "bg-slate-900 text-white shadow-sm"
                  : "hover:text-gray-900"
              }`}
            >
              {card.split(" - ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT CARD: Top Services / Performers Table */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-extrabold text-gray-900">
            Top Deliverables & Services
          </h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
              <Calendar size={13} /> Sep 8 <ChevronDown size={12} />
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-100">
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        {/* Deliverables Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-bold text-gray-400">
                <th className="p-3 rounded-l-xl">#</th>
                <th className="p-3">Deliverable Name</th>
                <th className="p-3">Trend</th>
                <th className="p-3">Output Qty</th>
                <th className="p-3">Value</th>
                <th className="p-3 rounded-r-xl">Client</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
              {topServices.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50">
                  <td className="p-3 font-bold text-gray-900">{s.id}</td>
                  <td className="p-3">
                    <p className="font-bold text-gray-900">{s.name}</p>
                    <p className="text-[10px] text-gray-400">{s.category}</p>
                  </td>
                  <td className="p-3">
                    {/* SVG Sparkline */}
                    <svg
                      className="h-5 w-20 stroke-emerald-500 fill-none"
                      viewBox="0 0 100 25"
                    >
                      <path d="M0 20 Q 25 5, 50 15 T 100 5" strokeWidth="2" />
                    </svg>
                  </td>
                  <td className="p-3 font-semibold">{s.stock}</td>
                  <td className="p-3 font-bold text-gray-900">{s.price}</td>
                  <td className="p-3">
                    <span
                      className={`rounded-full ${s.clientColor} px-2.5 py-1 text-[10px] font-extrabold text-white`}
                    >
                      {s.client}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
          <span>Showing 1 to 3 of 5 items</span>
          <div className="flex items-center gap-1 font-bold">
            <button className="grid h-7 w-7 place-items-center rounded bg-indigo-600 text-white">
              1
            </button>
            <button className="grid h-7 w-7 place-items-center rounded hover:bg-gray-100 text-gray-600">
              2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
