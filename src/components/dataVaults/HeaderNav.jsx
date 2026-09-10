// src/components/DataVaults/HeaderNav.jsx
import React from "react";
import { FileSpreadsheet, Kanban, FileText, Sun, Moon } from "lucide-react";

export default function HeaderNav({
  activeClient,
  activeViewMode,
  setActiveViewMode,
  darkMode,
  setDarkMode,
}) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 px-8 flex items-center justify-between shrink-0 transition-colors">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-base font-black text-slate-900 dark:text-white truncate">
            {activeClient.brand_name}
          </h1>
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 border border-blue-300 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800">
            {activeClient.industry}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          Client ID:{" "}
          <span className="font-mono text-slate-700 dark:text-slate-300">
            {activeClient.client_id}
          </span>{" "}
          • Budget: {activeClient.master_profile.budget}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* VIEW MODE TOGGLES */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveViewMode("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeViewMode === "table"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <FileSpreadsheet size={14} />
            <span>Table</span>
          </button>

          <button
            onClick={() => setActiveViewMode("kanban")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeViewMode === "kanban"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Kanban size={14} />
            <span>Kanban</span>
          </button>

          <button
            onClick={() => setActiveViewMode("doc")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeViewMode === "doc"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <FileText size={14} />
            <span>Doc</span>
          </button>
        </div>

        {/* LIGHT / DARK MODE TOGGLE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
          title="Toggle Light/Dark Theme"
        >
          {darkMode ? (
            <Sun size={16} className="text-amber-400" />
          ) : (
            <Moon size={16} className="text-slate-700" />
          )}
        </button>
      </div>
    </header>
  );
}
