import React from "react";
import {
  Filter,
  Plus,
  FileText,
  CheckCircle2,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import ClientStatCard from "../../components/clients/ClientStatCard";
import ClientTableRow from "../../components/clients/ClientTableRow";
import {
  clientMetrics,
  clientsList,
  globalActivities,
  strategicInsights,
} from "../../data/clientData";

export default function ClientDirectory() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Client Directory
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Manage your agency's client relationships, projects, and high-level
            financials.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 shadow-xs">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 shadow-xs">
            <Plus size={16} /> Add New Client
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {clientMetrics.map((metric, idx) => (
          <ClientStatCard key={idx} {...metric} />
        ))}
      </div>

      {/* CLIENT TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                <th className="py-4 pl-6 pr-3">CLIENT NAME</th>
                <th className="px-3 py-4">INDUSTRY</th>
                <th className="px-3 py-4">ONGOING PROJECTS</th>
                <th className="px-3 py-4">TOTAL REVENUE</th>
                <th className="px-3 py-4">STATUS</th>
                <th className="px-3 py-4">PRIMARY CONTACT</th>
                <th className="py-4 pl-3 pr-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clientsList.map((client) => (
                <ClientTableRow key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">1-4</span> of{" "}
            <span className="font-semibold text-gray-900">124</span> clients
          </p>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50">
              <ChevronLeft size={14} /> Previous
            </button>
            <button className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50">
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* GLOBAL ACTIVITY */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-extrabold text-gray-900">
              Global Client Activity
            </h2>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>
          <div className="space-y-6">
            {globalActivities.map((act) => (
              <div key={act.id} className="flex items-start gap-4">
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${act.iconBg}`}
                >
                  {act.type === "proposal" && <FileText size={18} />}
                  {act.type === "milestone" && <CheckCircle2 size={18} />}
                  {act.type === "survey" && <MessageSquare size={18} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{act.title}</p>
                  <p className="mt-1 text-xs font-medium text-gray-400">
                    {act.time} • {act.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STRATEGIC INSIGHTS */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-extrabold text-gray-900 mb-6">
            Strategic Insights
          </h2>
          <div className="space-y-4">
            {strategicInsights.map((insight) => (
              <div
                key={insight.id}
                className={`rounded-2xl border p-4 ${insight.cardStyle}`}
              >
                <span
                  className={`text-[10px] font-extrabold tracking-wider ${insight.categoryStyle}`}
                >
                  {insight.category}
                </span>
                <h3 className="mt-1 font-extrabold text-gray-900">
                  {insight.clientName}
                </h3>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  {insight.description}
                </p>
                <button
                  className={`mt-3 text-xs font-extrabold transition ${insight.actionStyle}`}
                >
                  {insight.actionText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
