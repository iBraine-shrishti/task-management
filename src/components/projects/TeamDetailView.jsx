import React, { useState } from "react";
import {
  ArrowLeft,
  Users,
  Briefcase,
  Layers,
  FolderKanban,
  ExternalLink,
  Edit,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";

export default function TeamDetailView({
  team,
  onBack,
  onOpenAssetsVault,
  onEditTeam,
}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition text-slate-600 cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
              <FolderKanban size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{team.name}</h1>
              <p className="text-xs text-slate-500">{team.description}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onEditTeam(team)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Edit size={14} />
          <span>Edit Team Workspace</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex gap-2 shadow-xs">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "overview"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("clients")}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "clients"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Active Clients ({team.clients.length})
        </button>
        <button
          onClick={() => setActiveTab("deliverables")}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "deliverables"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Deliverables ({team.deliverables.length})
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {team.membersCount}
              </p>
              <p className="text-xs font-medium text-slate-500">
                Specialists Assigned
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Briefcase size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {team.activeClientsCount}
              </p>
              <p className="text-xs font-medium text-slate-500">
                Assigned Clients
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {team.deliverables.length}
              </p>
              <p className="text-xs font-medium text-slate-500">
                Active Deliverables
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <FolderOpen size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 truncate">
                {team.head}
              </p>
              <p className="text-xs font-medium text-slate-500">
                {team.headRole}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ACTIVE CLIENTS */}
      {activeTab === "clients" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.clients.map((client) => (
            <div
              key={client.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-lg border border-blue-100">
                    {client.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <CheckCircle2 size={12} />
                    {client.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  {client.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Deliverables in pipeline:{" "}
                  <span className="font-semibold text-slate-700">
                    {client.deliverablesCount}
                  </span>
                </p>
              </div>

              {/* DIRECT ASSETS DRIVE SHORTCUT LINK */}
              <button
                onClick={() => onOpenAssetsVault(client.vaultPath)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <FolderOpen size={14} />
                <span>Open Client Assets Drive</span>
                <ExternalLink size={12} className="opacity-70" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: DELIVERABLES */}
      {activeTab === "deliverables" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Deliverable Name</th>
                <th className="py-3 px-4">Assigned Client</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {team.deliverables.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4">{item.client}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onOpenAssetsVault()}
                      className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      View Assets <ExternalLink size={11} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
