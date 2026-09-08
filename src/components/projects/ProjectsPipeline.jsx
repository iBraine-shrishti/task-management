import React, { useState } from "react";
import {
  LayoutGrid,
  List,
  Filter,
  Calendar,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { pipelineData } from "../../data/projectData";

export default function ProjectsPipeline() {
  const [viewMode, setViewMode] = useState("kanban"); // 'kanban' or 'list'

  const stages = [
    {
      key: "ONGOING",
      title: "ONGOING",
      color: "bg-blue-600",
      badgeBg: "bg-blue-100 text-blue-700",
    },
    {
      key: "COMPLETED",
      title: "COMPLETED",
      color: "bg-emerald-500",
      badgeBg: "bg-emerald-100 text-emerald-700",
    },
    {
      key: "PENDING",
      title: "PENDING",
      color: "bg-amber-500",
      badgeBg: "bg-amber-100 text-amber-700",
    },
    {
      key: "DROPPED",
      title: "DROPPED",
      color: "bg-rose-500",
      badgeBg: "bg-rose-100 text-rose-700",
    },
  ];

  return (
    <div className="space-y-6 pt-6 border-t border-gray-200">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-gray-900">
            Projects Pipeline
          </h2>
          <p className="mt-1 text-xs font-medium text-gray-500">
            Manage, monitor and accelerate agency workflows across all
            departments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* GRID / LIST TOGGLE */}
          <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1 shadow-2xs">
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                viewMode === "kanban"
                  ? "bg-indigo-50 text-indigo-600 shadow-2xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <LayoutGrid size={14} /> Kanban
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
                viewMode === "list"
                  ? "bg-indigo-50 text-indigo-600 shadow-2xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <List size={14} /> List
            </button>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 shadow-2xs hover:bg-gray-50">
            <Filter size={14} /> Filters
          </button>
        </div>
      </div>

      {/* KANBAN GRID VIEW */}
      {viewMode === "kanban" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => {
            const items = pipelineData[stage.key] || [];
            return (
              <div key={stage.key} className="space-y-3">
                {/* STAGE HEADER */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${stage.color}`}
                    />
                    <span className="text-xs font-black tracking-wider text-gray-700 uppercase">
                      {stage.title}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-black ${stage.badgeBg}`}
                    >
                      {items.length}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                {/* CARDS */}
                <div className="space-y-3">
                  {items.map((card) => (
                    <div
                      key={card.id}
                      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs transition hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-black ${card.tagStyle}`}
                        >
                          {card.tag}
                        </span>
                        <span
                          className={`text-[11px] font-bold ${card.priorityStyle}`}
                        >
                          • {card.priority}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-gray-900 text-sm">
                        {card.title}
                      </h4>
                      <p className="text-xs font-medium text-gray-400 mt-0.5">
                        {card.client}
                      </p>

                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-50">
                        <div className="flex -space-x-2">
                          {card.team.map((avatar, idx) => (
                            <img
                              key={idx}
                              src={avatar}
                              alt="team"
                              className="h-6 w-6 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                          <Calendar size={12} />
                          <span>{card.date}</span>
                        </div>
                      </div>

                      {/* PROGRESS BAR */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={`h-full ${card.progressBg}`}
                            style={{ width: `${card.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-gray-500">
                          {card.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-slate-50/80 text-[11px] font-black tracking-wider text-gray-400 uppercase">
                <th className="py-3 pl-6 pr-3">PROJECT TITLE</th>
                <th className="px-3 py-3">STAGE</th>
                <th className="px-3 py-3">CLIENT</th>
                <th className="px-3 py-3">PRIORITY</th>
                <th className="px-3 py-3">PROGRESS</th>
                <th className="py-3 pl-3 pr-6 text-right">DUE DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stages.flatMap((stage) =>
                (pipelineData[stage.key] || []).map((card) => (
                  <tr key={card.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 pl-6 pr-3">
                      <span className="font-extrabold text-gray-900 text-sm">
                        {card.title}
                      </span>
                      <span
                        className={`ml-2 inline-block rounded-md px-2 py-0.5 text-[10px] font-black ${card.tagStyle}`}
                      >
                        {card.tag}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-black ${stage.badgeBg}`}
                      >
                        {stage.title}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs font-bold text-gray-600">
                      {card.client}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`text-xs font-bold ${card.priorityStyle}`}
                      >
                        {card.priority}
                      </span>
                    </td>
                    <td className="px-3 py-3 w-36">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className={`h-full ${card.progressBg}`}
                            style={{ width: `${card.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-gray-500">
                          {card.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pl-3 pr-6 text-right text-xs font-bold text-gray-500">
                      {card.date}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
