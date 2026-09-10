// src/components/DataVaults/Sidebar.jsx
import React from "react";
import {
  Database,
  Folder,
  ShieldCheck,
  ChevronRight,
  Paperclip,
  UserCheck,
  MessageSquare,
  Cpu,
} from "lucide-react";
import { MOCK_CLIENT_VAULTS } from "../../data/agencyVaultData";

export default function Sidebar({
  selectedClientId,
  setSelectedClientId,
  activeCollectionKey,
  setActiveCollectionKey,
}) {
  return (
    <aside className="w-80 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/80 flex flex-col justify-between shrink-0 transition-colors">
      <div className="p-5 space-y-6 overflow-y-auto">
        {/* Workspace Brand */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
            <Database size={20} />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white tracking-wide">
              AGENCY WORKSPACE
            </h2>
            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Multi-Tenant Management
            </p>
          </div>
        </div>

        {/* DATA VAULTS Hierarchy */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" />
              DATA VAULTS
            </span>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
              {MOCK_CLIENT_VAULTS.length} Clients
            </span>
          </div>

          <div className="space-y-3">
            {MOCK_CLIENT_VAULTS.map((client) => {
              const isSelectedClient = client.client_id === selectedClientId;
              return (
                <div key={client.client_id} className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedClientId(client.client_id);
                      setActiveCollectionKey("file_assets_db");
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      isSelectedClient
                        ? "bg-blue-50 dark:bg-slate-800/90 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-slate-700 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Folder
                        size={16}
                        className={
                          isSelectedClient
                            ? "text-blue-600 dark:text-blue-400 fill-blue-500/20"
                            : "text-slate-400 dark:text-slate-500"
                        }
                      />
                      <span className="truncate">{client.brand_name}</span>
                    </div>
                    <ChevronRight
                      size={14}
                      className={`transition-transform ${isSelectedClient ? "rotate-90 text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-600"}`}
                    />
                  </button>

                  {isSelectedClient && (
                    <div className="ml-4 pl-3 border-l-2 border-slate-200 dark:border-slate-800 space-y-1 pt-1">
                      <button
                        onClick={() => setActiveCollectionKey("file_assets_db")}
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition ${
                          activeCollectionKey === "file_assets_db"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                        }`}
                      >
                        <Paperclip
                          size={13}
                          className={
                            activeCollectionKey === "file_assets_db"
                              ? "text-white"
                              : "text-cyan-500"
                          }
                        />
                        <span>File & Media Vault</span>
                      </button>

                      <button
                        onClick={() =>
                          setActiveCollectionKey("intake_survey_db")
                        }
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition ${
                          activeCollectionKey === "intake_survey_db"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                        }`}
                      >
                        <UserCheck
                          size={13}
                          className={
                            activeCollectionKey === "intake_survey_db"
                              ? "text-white"
                              : "text-emerald-500"
                          }
                        />
                        <span>Inbound Intake Vault</span>
                      </button>

                      <button
                        onClick={() =>
                          setActiveCollectionKey("chatbox_logs_db")
                        }
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition ${
                          activeCollectionKey === "chatbox_logs_db"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                        }`}
                      >
                        <MessageSquare
                          size={13}
                          className={
                            activeCollectionKey === "chatbox_logs_db"
                              ? "text-white"
                              : "text-purple-500"
                          }
                        />
                        <span>Chat & Portal Vault</span>
                      </button>

                      <button
                        onClick={() =>
                          setActiveCollectionKey("team_operations_db")
                        }
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition ${
                          activeCollectionKey === "team_operations_db"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                        }`}
                      >
                        <Cpu
                          size={13}
                          className={
                            activeCollectionKey === "team_operations_db"
                              ? "text-white"
                              : "text-amber-500"
                          }
                        />
                        <span>Team Service Vaults</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/50 text-[11px] font-medium text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Router Pipeline Active
        </span>
        <span className="font-mono text-[10px]">v2.4</span>
      </div>
    </aside>
  );
}
