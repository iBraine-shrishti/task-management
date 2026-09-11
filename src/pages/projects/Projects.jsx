import React, { useState } from "react";
import {
  Folder,
  Plus,
  Search,
  Users,
  ChevronRight,
  Trash2,
  User,
  Clock,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { projectsData } from "../../data/projectsData.js";
import ProjectDetailView from "../../components/projects/ProjectDetailView.jsx";
import ProjectModal from "../../components/projects/ProjectModal.jsx";

export default function Projects({ onNavigateToAssets }) {
  const [projects, setProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Status Metrics
  const totalProjects = projects.length;
  const inProgressProjects = projects.filter(
    (p) => p.status === "In Progress",
  ).length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed",
  ).length;

  // Priority Metrics
  const highPriority = projects.filter((p) => p.priority === "High").length;
  const mediumPriority = projects.filter((p) => p.priority === "Medium").length;
  const lowPriority = projects.filter((p) => p.priority === "Low").length;

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.head.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateOrEditProject = (formData) => {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id ? { ...p, ...formData } : p,
        ),
      );
    } else {
      const newProj = {
        id: `proj-${Date.now()}`,
        ...formData,
        deliverablesCount: 0,
        vaultPath: `FOR_CLIENT/${formData.name.replace(/\s+/g, "_")}`,
        members: [{ name: formData.head, role: formData.headRole }],
        deliverables: [],
      };
      setProjects((prev) => [...prev, newProj]);
    }
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (e, projId) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== projId));
    }
  };

  if (selectedProject) {
    return (
      <div className="p-6 bg-slate-50 min-h-screen text-slate-900">
        <ProjectDetailView
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onOpenAssetsVault={onNavigateToAssets}
          onEditProject={(proj) => {
            setEditingProject(proj);
            setIsModalOpen(true);
          }}
        />

        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProject(null);
          }}
          onSave={handleCreateOrEditProject}
          editingProject={editingProject}
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50/60 min-h-screen text-slate-800 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Projects Workspace
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center gap-1 shadow-2xs">
              <Zap size={10} className="fill-indigo-500 text-indigo-500" /> Live
              Updates
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time delivery progress, priorities, and staff assignments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-2.5 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search projects or leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-800 w-48 sm:w-64 shadow-2xs"
            />
          </div>

          <button
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-indigo-500/20 cursor-pointer active:scale-95"
          >
            <Plus size={15} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* VIBRANT METRICS DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Colorful Status Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-indigo-50/80 via-white to-white border border-indigo-100 p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-xs relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-indigo-600 uppercase tracking-wider">
                Total Active
              </span>
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 shadow-2xs">
                <Folder size={18} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 mt-4">
              {totalProjects}
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50/80 via-white to-white border border-amber-100 p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-xs relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-amber-600 uppercase tracking-wider">
                In Progress
              </span>
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 shadow-2xs">
                <Clock size={18} />
              </div>
            </div>
            <p className="text-3xl font-black text-amber-600 mt-4">
              {inProgressProjects}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50/80 via-white to-white border border-emerald-100 p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-xs relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-emerald-600 uppercase tracking-wider">
                Completed
              </span>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 shadow-2xs">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <p className="text-3xl font-black text-emerald-600 mt-4">
              {completedProjects}
            </p>
          </div>
        </div>

        {/* Priority Graphic Card */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <AlertTriangle size={15} className="text-rose-500" />
              Priority Based On Due Dates
            </span>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
              {totalProjects} Total
            </span>
          </div>

          {/* Glowing Gradient Bar Graphic */}
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200/80 my-2">
            {highPriority > 0 && (
              <div
                style={{
                  width: `${(highPriority / (totalProjects || 1)) * 100}%`,
                }}
                className="bg-gradient-to-r from-rose-500 to-rose-600 h-full rounded-l-full shadow-2xs transition-all duration-300"
                title={`High Priority (${highPriority})`}
              />
            )}
            {mediumPriority > 0 && (
              <div
                style={{
                  width: `${(mediumPriority / (totalProjects || 1)) * 100}%`,
                }}
                className={`bg-gradient-to-r from-amber-400 to-amber-500 h-full shadow-2xs transition-all duration-300 ${
                  highPriority === 0 ? "rounded-l-full" : ""
                } ${lowPriority === 0 ? "rounded-r-full" : ""}`}
                title={`Medium Priority (${mediumPriority})`}
              />
            )}
            {lowPriority > 0 && (
              <div
                style={{
                  width: `${(lowPriority / (totalProjects || 1)) * 100}%`,
                }}
                className={`bg-gradient-to-r from-emerald-400 to-emerald-500 h-full transition-all duration-300 ${
                  highPriority === 0 && mediumPriority === 0
                    ? "rounded-l-full"
                    : ""
                } rounded-r-full shadow-2xs`}
                title={`Low Priority (${lowPriority})`}
              />
            )}
          </div>

          {/* Priority Legend */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>{" "}
              High ({highPriority})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>{" "}
              Medium ({mediumPriority})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>{" "}
              Low ({lowPriority})
            </span>
          </div>
        </div>
      </div>

      {/* Vibrant Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group relative bg-white border border-slate-200/80 hover:border-indigo-400 rounded-2xl p-5 shadow-2xs hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between gap-4"
          >
            <div>
              {/* Card Top Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/80 rounded-xl text-indigo-600 group-hover:scale-105 transition-transform shadow-2xs">
                  <Folder size={22} />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                      project.status === "Completed"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {project.status}
                  </span>
                  <button
                    onClick={(e) => handleDeleteProject(e, project.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition"
                    title="Delete Project"
                  >
                    <Trash2 size={14} />
                  </button>
                  <ChevronRight
                    size={18}
                    className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition"
                  />
                </div>
              </div>

              {/* Title & Category */}
              <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition mb-0.5">
                {project.name}
              </h3>
              <p className="text-xs font-bold text-indigo-600 mb-3">
                {project.category}
              </p>

              {/* Head & Due Date Box */}
              <div className="flex flex-col gap-2 bg-slate-50/80 p-3 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User size={13} className="text-slate-400" />
                    Head:{" "}
                    <strong className="text-slate-900 font-bold">
                      {project.head}
                    </strong>
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${
                      project.priority === "High"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : project.priority === "Medium"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {project.priority || "Medium"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-500 pt-1.5 border-t border-slate-200/60 text-[11px]">
                  <span className="flex items-center gap-1.5 text-rose-600 font-bold">
                    <Calendar size={13} />
                    Due: {project.dueDate || "Not set"}
                  </span>
                  <span className="text-slate-500 font-semibold">
                    {project.teamName}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-semibold text-slate-600">
                <Users size={13} className="text-indigo-600" />
                <span>{project.assignedEmployees} assigned</span>
              </div>
              <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/50">
                {project.deliverablesCount} deliverables
              </span>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleCreateOrEditProject}
        editingProject={editingProject}
      />
    </div>
  );
}
