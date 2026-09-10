// src/components/DataVaults/TableView.jsx
import React from "react";
import { FILE_TYPES } from "../../data/agencyVaultData";

export default function TableView({
  collectionKey,
  client,
  filterRoute = "all",
}) {
  const rawRecords = client.vault_collections[collectionKey] || [];

  // Filter records based on active route
  const records = rawRecords.filter((row) => {
    if (filterRoute === "images") return row.file_type === "IMAGE";
    if (filterRoute === "docs") return row.file_type === "DOCUMENT";
    if (filterRoute === "archives") return row.file_type === "ARCHIVE";
    if (filterRoute === "media-kits") return row.file_type === "MEDIA_KIT";
    return true; // "all" or default
  });
  return (
    <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Raw Vault Grid ({records.length} Entries)
        </h3>
        <span className="text-[11px] text-slate-500 font-mono">
          client_id: {client.client_id}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-3.5">Asset / Record ID</th>
              <th className="px-6 py-3.5">Type & Extension</th>
              <th className="px-6 py-3.5">Title / Payload</th>
              <th className="px-6 py-3.5">Size / Source</th>
              <th className="px-6 py-3.5 text-right">Tags / Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-medium">
            {records.map((row) => {
              const typeConfig =
                FILE_TYPES[row.file_type] || FILE_TYPES.DOCUMENT;
              const TypeIcon = typeConfig.icon;

              return (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-900/60 transition"
                >
                  <td className="px-6 py-4 font-mono text-blue-600 dark:text-blue-400 font-bold">
                    {row.id}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold border ${typeConfig.badgeColorLight} ${typeConfig.badgeColorDark}`}
                    >
                      <TypeIcon size={12} />
                      {row.file_type || "DATA"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                    {row.file_name || row.form_name || row.task || row.text}
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                    {row.size || row.submitter || row.source || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      {(row.tags || [row.status || "Logged"]).map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
