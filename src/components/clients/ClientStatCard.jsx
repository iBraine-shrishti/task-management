import React from "react";
import {
  TrendingUp,
  Clock,
  AlertCircle,
  Sparkles,
  Users,
  FolderKanban,
  DollarSign,
  Activity,
} from "lucide-react";

export default function ClientStatCard({
  title,
  value,
  note,
  noteType,
  bgColor,
  iconBg,
}) {
  const getNoteIcon = () => {
    switch (noteType) {
      case "success":
        return <TrendingUp size={14} className="text-emerald-600" />;
      case "info":
        return <Clock size={14} className="text-indigo-600" />;
      case "warning":
        return <AlertCircle size={14} className="text-amber-600" />;
      case "purple":
        return <Sparkles size={14} className="text-purple-600" />;
      default:
        return <TrendingUp size={14} className="text-emerald-600" />;
    }
  };

  const getHeaderIcon = () => {
    if (title.includes("CLIENTS")) return <Users size={18} />;
    if (title.includes("PROJECTS")) return <FolderKanban size={18} />;
    if (title.includes("PIPELINE")) return <DollarSign size={18} />;
    return <Activity size={18} />;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${bgColor}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-black tracking-wider text-gray-600 uppercase">
          {title}
        </span>
        <div
          className={`grid h-9 w-9 place-items-center rounded-xl shadow-xs ${iconBg}`}
        >
          {getHeaderIcon()}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-3xl font-black text-gray-900 tracking-tight">
          {value}
        </h3>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold border border-gray-100 shadow-2xs backdrop-blur-xs">
          {getNoteIcon()}
          <span className="text-gray-800">{note}</span>
        </div>
      </div>
    </div>
  );
}
