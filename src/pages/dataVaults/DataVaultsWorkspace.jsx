import React, { useState } from "react";
import { Layers, Upload } from "lucide-react";
import { MOCK_CLIENT_VAULTS } from "../../data/agencyVaultData";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/dataVaults/Sidebar";
import HeaderNav from "../../components/dataVaults/HeaderNav";
import TableView from "../../components/dataVaults/TableView";
import KanbanView from "../../components/dataVaults/KanbanView";
import DocView from "../../components/dataVaults/DocView";

export default function DataVaultsWorkspace({ activeVaultRoute = "all" }) {
  // Add this helper function at the top of DataVaultsWorkspace.jsx
  const location = useLocation();
  const activeVaultRoute = location.pathname.includes("/assets/images")
    ? "images"
    : location.pathname.includes("/assets/docs")
      ? "docs"
      : location.pathname.includes("/assets/archives")
        ? "archives"
        : location.pathname.includes("/assets/media-kits")
          ? "media-kits"
          : location.pathname.includes("/vaults/intake")
            ? "intake"
            : "all";
  function filterVaultRecords(records = [], activeVaultRoute) {
    if (activeVaultRoute === "all") return records;

    switch (activeVaultRoute) {
      case "images":
        return records.filter(
          (r) =>
            r.file_type === "IMAGE" ||
            r.extension?.match(/\.(png|jpg|svg|webp)$/i),
        );
      case "docs":
        return records.filter(
          (r) =>
            r.file_type === "DOCUMENT" ||
            r.extension?.match(/\.(pdf|docx|xlsx)$/i),
        );
      case "archives":
        return records.filter(
          (r) =>
            r.file_type === "ARCHIVE" ||
            r.extension?.match(/\.(zip|rar|tar)$/i),
        );
      case "media-kits":
        return records.filter((r) => r.file_type === "MEDIA_KIT");
      default:
        return records;
    }
  }
  const [selectedClientId, setSelectedClientId] = useState(
    MOCK_CLIENT_VAULTS[0].client_id,
  );
  const [activeCollectionKey, setActiveCollectionKey] =
    useState("file_assets_db");
  const [activeViewMode, setActiveViewMode] = useState("table");
  const [darkMode, setDarkMode] = useState(false); // Vibrant light mode default

  const activeClient =
    MOCK_CLIENT_VAULTS.find((c) => c.client_id === selectedClientId) ||
    MOCK_CLIENT_VAULTS[0];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-hidden selection:bg-blue-600 selection:text-white transition-colors">
        {/* SIDEBAR COMPONENT */}
        <Sidebar
          selectedClientId={selectedClientId}
          setSelectedClientId={setSelectedClientId}
          activeCollectionKey={activeCollectionKey}
          setActiveCollectionKey={setActiveCollectionKey}
        />

        {/* MAIN WORKSPACE */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-900 transition-colors">
          {/* HEADER NAV COMPONENT WITH DARK MODE SWITCH */}
          <HeaderNav
            activeClient={activeClient}
            activeViewMode={activeViewMode}
            setActiveViewMode={setActiveViewMode}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* MAIN DATA CANVAS */}
          <div className="flex-1 p-8 overflow-y-auto space-y-6">
            {/* INGESTION BANNER */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs shadow-sm transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                  <Layers size={18} />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">
                    Multi-Format Vault Asset Ingestion
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Direct indexing enabled for{" "}
                    <span className="text-purple-600 dark:text-purple-400 font-bold">
                      Images (.PNG, .SVG)
                    </span>
                    ,{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      Documents (.PDF, .DOCX)
                    </span>
                    , and{" "}
                    <span className="text-amber-600 dark:text-amber-400 font-bold">
                      ZIP Archives (.ZIP)
                    </span>
                    .
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition cursor-pointer shadow-sm">
                <Upload size={14} /> Upload Asset
              </button>
            </div>

            {/* DYNAMIC VIEW SWITCHER */}
            {activeCollectionKey === "file_assets_db" && (
              <TableView
                collectionKey={activeCollectionKey}
                client={activeClient}
                filterRoute={activeVaultRoute}
              />
            )}

            {activeViewMode === "kanban" && (
              <KanbanView
                collectionKey={activeCollectionKey}
                client={activeClient}
              />
            )}

            {activeViewMode === "doc" && (
              <DocView
                collectionKey={activeCollectionKey}
                client={activeClient}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
