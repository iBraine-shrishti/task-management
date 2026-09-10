// src/components/DataVaults/DocView.jsx
import React from "react";
import { Download } from "lucide-react";

export default function DocView({ client }) {
  const fileAssets = client.vault_collections.file_assets_db || [];

  return (
    <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-w-3xl mx-auto shadow-sm transition-colors">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Vault File Index
        </span>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
          {client.brand_name} Assets Directory
        </h2>
      </div>

      <div className="space-y-3">
        {fileAssets.map((asset) => (
          <div
            key={asset.id}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 font-mono text-xs font-bold">
                {asset.extension}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {asset.file_name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Uploaded by {asset.uploaded_by} • {asset.size}
                </p>
              </div>
            </div>
            <a
              href={asset.asset_path}
              download
              className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
            >
              <Download size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
