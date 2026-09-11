import React, { useState } from "react";
import {
  ArrowLeft,
  Users,
  Layers,
  FolderOpen,
  ExternalLink,
  Edit,
  CheckCircle2,
  Clock,
  UserCheck,
  Calendar,
  AlertCircle,
  History,
  Paperclip,
  ArrowRight,
} from "lucide-react";

export default function ProjectDetailView({
  project,
  onBack,
  onOpenAssetsVault,
  onEditProject,
}) {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample timeline data (matches reference UI format)
  const timelineEvents = project.timeline || [
    {
      id: "evt-1",
      user: "Shristhi iBraine",
      timestamp: "2 hours ago",
      modifiedField: "Primary Goal",
      oldValue: "Brand Awareness Only",
      newValue: "Lead Generation & Retargeting",
      reason: "Updated after the Q3 stakeholder meeting to prioritize ROI.",
      attachment: "Meeting_Notes.pdf",
    },
    {
      id: "evt-2",
      user: "Marcus Chen",
      timestamp: "Yesterday, 5:45 PM",
      addedSection: "Competitor Analysis References",
      tags: ["Instagram", "TikTok Ads", "Meta"],
    },
    {
      id: "evt-3",
      user: "Sarah Jenkins",
      timestamp: "3 days ago",
      modifiedField: "Target Audience",
      oldValue: "B2C Consumer Tech",
      newValue: "Enterprise B2B SaaS",
      reason: "Refocused direction to match new product pricing tier.",
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-slate-800">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition text-slate-600 cursor-pointer shadow-xs"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">
                {project.name}
              </h1>
              <span
                className={`px-3 py-0.5 rounded-full text-[11px] font-bold border ${
                  project.status === "Completed"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-xs font-semibold text-indigo-600">
              {project.category} • {project.teamName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAssetsVault(project.vaultPath)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-indigo-500/20 cursor-pointer"
          >
            <FolderOpen size={14} />
            <span>Open Assets Vault</span>
            <ExternalLink size={12} className="opacity-70" />
          </button>

          <button
            onClick={() => onEditProject(project)}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition text-xs font-bold shadow-xs cursor-pointer"
          >
            <Edit size={14} />
            <span>Edit Project</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="bg-slate-100/80 border border-slate-200/80 rounded-2xl p-1.5 flex gap-2 shadow-inner">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition cursor-pointer ${
            activeTab === "overview"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          Overview & Stats
        </button>
        <button
          onClick={() => setActiveTab("deliverables")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition cursor-pointer ${
            activeTab === "deliverables"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          Deliverables ({project.deliverables?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition cursor-pointer ${
            activeTab === "team"
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
        >
          Assigned Team ({project.members?.length || 0})
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-5">
          {/* Top Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">
                  {project.dueDate || "N/A"}
                </p>
                <p className="text-xs text-slate-500 font-semibold">Due Date</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">
                  {project.priority || "Medium"}
                </p>
                <p className="text-xs text-slate-500 font-semibold">
                  Priority Level
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900">
                  {project.assignedEmployees}
                </p>
                <p className="text-xs text-slate-500 font-semibold">
                  Assigned Staff
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 truncate">
                  {project.head}
                </p>
                <p className="text-[11px] text-slate-500 font-semibold truncate">
                  {project.headRole}
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
              <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl border border-cyan-100">
                <Layers size={20} />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900">
                  {project.deliverablesCount}
                </p>
                <p className="text-xs text-slate-500 font-semibold">
                  Deliverables
                </p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Project Description
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {project.description}
            </p>
          </div>

          {/* Evolution Timeline Section (Scrollable Container) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900">
                Survey Evolution Timeline
              </h3>
              <span className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                <History size={13} className="text-slate-400" />
                Showing latest changes in {project.name}
              </span>
            </div>

            {/* Scrollable Container with max-height to keep it clean */}
            <div className="max-h-[380px] overflow-y-auto pr-2 flex flex-col gap-5 relative">
              {/* Vertical Connector Line */}
              <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-slate-200" />

              {timelineEvents.map((item, idx) => (
                <div key={item.id} className="flex gap-4 relative">
                  {/* Node Dot */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-white ${
                      idx === 0
                        ? "border-blue-600 text-blue-600"
                        : "border-slate-300 text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        idx === 0 ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-slate-900">
                          {item.user}
                        </span>
                        <span className="text-slate-400">
                          • {item.timestamp}
                        </span>
                      </div>

                      <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3.5 flex flex-col gap-2.5">
                        {item.modifiedField && (
                          <div>
                            <p className="text-xs text-slate-600 mb-2">
                              Modified field:{" "}
                              <strong className="text-indigo-600 font-bold">
                                "{item.modifiedField}"
                              </strong>
                            </p>

                            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                              <div className="px-3 py-1.5 bg-rose-50/70 border border-rose-100 rounded-xl text-rose-800 flex flex-col">
                                <span className="text-[8px] font-bold uppercase tracking-wider text-rose-400">
                                  OLD VALUE
                                </span>
                                <span className="line-through">
                                  {item.oldValue}
                                </span>
                              </div>

                              <ArrowRight
                                size={14}
                                className="text-slate-400 shrink-0"
                              />

                              <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-800 flex flex-col">
                                <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-600">
                                  NEW VALUE
                                </span>
                                <span>{item.newValue}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.addedSection && (
                          <div>
                            <p className="text-xs text-slate-600 mb-2">
                              Added Section:{" "}
                              <strong className="text-indigo-600 font-bold">
                                "{item.addedSection}"
                              </strong>
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {item.tags?.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2.5 py-0.5 bg-white border border-slate-200 rounded-full text-[11px] font-semibold text-slate-700 shadow-2xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.reason && (
                          <p className="text-[11px] italic text-slate-500 border-t border-slate-200/60 pt-2 mt-0.5">
                            "{item.reason}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Attachment card */}
                    {item.attachment && (
                      <div className="sm:w-48 shrink-0 border border-dashed border-slate-300 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer">
                        <Paperclip size={16} className="text-slate-400" />
                        <span className="text-[11px] font-semibold text-slate-700 truncate w-full">
                          {item.attachment} attached
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DELIVERABLES TAB */}
      {activeTab === "deliverables" && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5">Deliverable Name</th>
                <th className="py-3.5 px-5">Type</th>
                <th className="py-3.5 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {project.deliverables?.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-5 font-bold text-slate-900">
                    {item.name}
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-semibold text-[11px]">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        item.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {item.status === "Completed" ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TEAM MEMBERS TAB */}
      {activeTab === "team" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.members?.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
                {member.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {member.name}
                </p>
                <p className="text-[11px] text-indigo-600 font-medium">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
