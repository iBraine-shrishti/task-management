import React from "react";
import { Check, X, GripVertical, Plus } from "lucide-react";
import {
  incomingRequests,
  priorityQueue,
  clientGroups,
} from "../../data/projectData";

export default function PriorityManager() {
  return (
    <div className="space-y-6">
      {/* SECTION TITLE */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          Priority Manager
        </h1>
        <p className="mt-1 text-sm font-medium text-gray-500">
          Manage high-stakes client requests and internal agency bandwidth.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* INCOMING REQUESTS (LEFT 4 COLS) */}
        <div className="lg:col-span-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-50 text-blue-600 font-bold">
                📥
              </span>
              <h2 className="text-base font-black text-gray-900">
                Incoming Requests
              </h2>
            </div>
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-black text-indigo-700">
              {incomingRequests.length} New
            </span>
          </div>

          <div className="space-y-3">
            {incomingRequests.map((req) => (
              <div
                key={req.id}
                className="rounded-xl border border-gray-100 bg-slate-50/50 p-4 transition hover:bg-slate-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-black uppercase ${req.tagStyle}`}
                  >
                    {req.tag}
                  </span>
                  <span className="text-[11px] font-medium text-gray-400">
                    {req.time}
                  </span>
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm">
                  {req.client}
                </h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  {req.description}
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-blue-600 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition">
                    <Check size={14} /> Accept
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-gray-100 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-200 transition">
                    <X size={14} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CLIENT PRIORITY & QUEUE (RIGHT 8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center mb-5">
              <div>
                <h2 className="text-base font-black text-gray-900">
                  Client Priority & Queue
                </h2>
                <p className="text-xs text-gray-400 font-medium">
                  Drag rows to reorder delivery order
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50">
                  Export Map
                </button>
                <button className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700">
                  Commit Changes
                </button>
              </div>
            </div>

            {/* QUEUE TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-black tracking-wider text-gray-400 uppercase">
                    <th className="py-2 pl-2">RANK</th>
                    <th className="py-2">CLIENT PROJECT</th>
                    <th className="py-2">CURRENT PHASE</th>
                    <th className="py-2">DEADLINE</th>
                    <th className="py-2">HEALTH</th>
                    <th className="py-2 text-right">MOVE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {priorityQueue.map((item) => (
                    <tr
                      key={item.rank}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="py-3 pl-2 font-black text-blue-600 text-sm">
                        {item.rank}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`grid h-8 w-8 place-items-center rounded-lg font-black text-xs shadow-2xs ${item.avatarBg}`}
                          >
                            {item.avatar}
                          </div>
                          <div>
                            <span className="block font-extrabold text-gray-900 text-xs">
                              {item.client}
                            </span>
                            <span className="text-[11px] font-medium text-gray-400">
                              {item.project}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-block rounded-md border px-2 py-0.5 text-[11px] font-bold ${item.phaseBg}`}
                        >
                          {item.phase}
                        </span>
                      </td>
                      <td className="py-3 text-xs font-bold text-gray-700">
                        {item.deadline}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-black uppercase ${item.healthStyle}`}
                        >
                          {item.health}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button className="text-gray-300 hover:text-gray-600">
                          <GripVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CLIENT-EMPLOYEE GROUPS */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black tracking-wide text-gray-900 uppercase">
                Client-Employee Groups
              </h3>
              <span className="text-xs font-bold text-gray-400">
                Total Groups: 3
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {clientGroups.map((grp) => (
                <div
                  key={grp.id}
                  className={`rounded-2xl border bg-white p-4 shadow-xs transition hover:shadow-md ${grp.borderColor}`}
                >
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-xl font-black text-sm mb-3 ${grp.codeBg}`}
                  >
                    {grp.code}
                  </div>
                  <h4 className="font-extrabold text-gray-900 text-sm">
                    {grp.name}
                  </h4>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed min-h-[36px]">
                    {grp.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-1">
                    <div className="flex -space-x-2">
                      {grp.members.map((m, i) => (
                        <img
                          key={i}
                          src={m}
                          alt="member"
                          className="h-6 w-6 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-gray-400">
                      {grp.extraMembers}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
