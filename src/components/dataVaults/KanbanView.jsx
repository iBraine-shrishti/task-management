// src/components/DataVaults/KanbanView.jsx
import React from "react";

export default function KanbanView({ collectionKey, client }) {
  const records = client.vault_collections[collectionKey] || [];

  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {["Incoming / Raw", "Verified Assets", "Archived"].map((colTitle) => (
        <div
          key={colTitle}
          className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm transition-colors"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider">
              {colTitle}
            </span>
            <span className="h-5 w-5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 flex items-center justify-center">
              {records.length}
            </span>
          </div>

          <div className="space-y-3">
            {records.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">
                    {item.id}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    {item.date || item.timestamp || "Today"}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {item.file_name || item.form_name || item.task}
                </h4>
                <div className="flex items-center justify-between pt-2 text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/60">
                  <span>{item.uploaded_by || item.submitter || "System"}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {item.size || item.status || "Active"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
