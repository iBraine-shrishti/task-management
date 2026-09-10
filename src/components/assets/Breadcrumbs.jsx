import React from "react";
import { HardDrive, ChevronRight } from "lucide-react";

export default function Breadcrumbs({ tree, path, onNavigateBreadcrumb }) {
  const crumbs = [];
  let current = { children: tree };
  for (const id of path) {
    current = current.children?.find((item) => item.id === id);
    if (current) crumbs.push(current);
  }

  return (
    <div className="flex items-center gap-1.5 text-xs md:text-sm overflow-x-auto py-2">
      <button
        onClick={() => onNavigateBreadcrumb(-1)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition font-medium ${
          path.length === 0
            ? "text-blue-600 bg-blue-50 font-bold"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        <HardDrive size={16} />
        <span>Root Drive</span>
      </button>

      {crumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.id}>
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
          <button
            onClick={() => onNavigateBreadcrumb(idx)}
            className={`px-2 py-1 rounded-md transition truncate max-w-[180px] font-medium ${
              idx === crumbs.length - 1
                ? "text-blue-600 bg-blue-50 font-bold"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {crumb.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
