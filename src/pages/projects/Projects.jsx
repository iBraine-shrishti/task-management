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
      <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
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
    <div className="p-6 bg-slate-950 min-h-screen text-slate-100 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white">
              Projects Workspace
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
              <Zap size={10} className="fill-indigo-400" /> Live Updates
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
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
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500 text-slate-200 w-48 sm:w-64 shadow-inner"
            />
          </div>

          <button
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-500/25 cursor-pointer active:scale-95"
          >
            <Plus size={15} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* VIBRANT METRICS DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Colorful Status Cards */}
        <div className="lg:col-span-2 grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/30 p-4 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Total Active
              </span>
              <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                <Folder size={18} />
              </div>
            </div>
            <p className="text-3xl font-black text-white mt-4">
              {totalProjects}
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/40 via-slate-900 to-slate-900 border border-amber-500/30 p-4 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                In Progress
              </span>
              <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                <Clock size={18} />
              </div>
            </div>
            <p className="text-3xl font-black text-amber-400 mt-4">
              {inProgressProjects}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-900 border border-emerald-500/30 p-4 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Completed
              </span>
              <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <p className="text-3xl font-black text-emerald-400 mt-4">
              {completedProjects}
            </p>
          </div>
        </div>

        {/* Priority Graphic Card */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <AlertTriangle size={15} className="text-rose-500" />
              Priority Based On Due Dates
            </span>
            <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
              {totalProjects} Total
            </span>
          </div>

          {/* Glowing Gradient Bar Graphic */}
          <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden flex p-0.5 border border-slate-800 my-2">
            <div
              style={{
                width: `${(highPriority / (totalProjects || 1)) * 100}%`,
              }}
              className="bg-gradient-to-r from-rose-500 to-red-600 h-full rounded-l-full shadow-lg shadow-rose-500/50"
              title="High Priority"
            />
            <div
              style={{
                width: `${(mediumPriority / (totalProjects || 1)) * 100}%`,
              }}
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-full shadow-lg shadow-amber-500/50"
              title="Medium Priority"
            />
            <div
              style={{
                width: `${(lowPriority / (totalProjects || 1)) * 100}%`,
              }}
              className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-r-full shadow-lg shadow-emerald-500/50"
              title="Low Priority"
            />
          </div>

          {/* Priority Legend */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs shadow-rose-500"></span>{" "}
              High ({highPriority})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-xs shadow-amber-400"></span>{" "}
              Medium ({mediumPriority})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400"></span>{" "}
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
            className="group relative bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between gap-4"
          >
            <div>
              {/* Card Top Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                  <Folder size={22} />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                      project.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {project.status}
                  </span>
                  <button
                    onClick={(e) => handleDeleteProject(e, project.id)}
                    className="p-1 text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition"
                    title="Delete Project"
                  >
                    <Trash2 size={14} />
                  </button>
                  <ChevronRight
                    size={18}
                    className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition"
                  />
                </div>
              </div>

              {/* Title & Category */}
              <h3 className="text-lg font-black text-white group-hover:text-indigo-400 transition mb-0.5">
                {project.name}
              </h3>
              <p className="text-xs font-semibold text-indigo-300/80 mb-3">
                {project.category}
              </p>

              {/* Head & Due Date Box */}
              <div className="flex flex-col gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User size={13} className="text-slate-500" />
                    Head:{" "}
                    <strong className="text-white font-bold">
                      {project.head}
                    </strong>
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      project.priority === "High"
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        : project.priority === "Medium"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {project.priority || "Medium"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-400 pt-1.5 border-t border-slate-800 text-[11px]">
                  <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                    <Calendar size={13} />
                    Due: {project.dueDate || "Not set"}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {project.teamName}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5 font-medium">
                <Users size={13} className="text-indigo-400" />
                <span>{project.assignedEmployees} assigned</span>
              </div>
              <span className="font-bold text-slate-200 bg-slate-800/80 px-2.5 py-1 rounded-lg">
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
