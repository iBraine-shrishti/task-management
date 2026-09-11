import React, { useState } from "react";
import { HardDrive, ChevronRight } from "lucide-react";

export default function Breadcrumbs({
  tree,
  path,
  onNavigateBreadcrumb,
  onMoveFolder,
}) {
  const [activeDragTarget, setActiveDragTarget] = useState(null);

  const crumbs = [];
  let current = { children: tree };
  for (const id of path) {
    current = current.children?.find((item) => item.id === id);
    if (current) crumbs.push(current);
  }

  const handleDragOver = (e, targetId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (activeDragTarget !== targetId) setActiveDragTarget(targetId);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setActiveDragTarget(null);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDragTarget(null);

    const rawData = e.dataTransfer.getData("application/json");
    if (rawData) {
      try {
        const parsed = JSON.parse(rawData);
        if (parsed.type === "DRIVE_FOLDER") {
          onMoveFolder(parsed.id, targetId);
        }
      } catch (err) {}
    }
  };

  return (
    <div className="flex items-center gap-1.5 text-xs md:text-sm flex-wrap py-1.5 px-3 bg-white border border-slate-200 rounded-xl shadow-xs">
      {/* ROOT STEP */}
      <button
        onClick={() => onNavigateBreadcrumb(-1)}
        onDragOver={(e) => handleDragOver(e, "ROOT")}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, "ROOT")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition font-semibold cursor-pointer ${
          activeDragTarget === "ROOT"
            ? "bg-blue-600 text-white ring-2 ring-blue-400"
            : path.length === 0
              ? "text-blue-600 bg-blue-50 font-bold"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        <HardDrive size={15} />
        <span className="whitespace-nowrap">ROOT</span>
      </button>

      {/* DYNAMIC PATH STEPS */}
      {crumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.id}>
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
          <button
            onClick={() => onNavigateBreadcrumb(idx)}
            onDragOver={(e) => handleDragOver(e, crumb.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, crumb.id)}
            className={`px-2.5 py-1 rounded-md transition font-semibold max-w-none break-all cursor-pointer ${
              activeDragTarget === crumb.id
                ? "bg-blue-600 text-white ring-2 ring-blue-400"
                : idx === crumbs.length - 1
                  ? "text-blue-600 bg-blue-50 font-bold"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {crumb.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
