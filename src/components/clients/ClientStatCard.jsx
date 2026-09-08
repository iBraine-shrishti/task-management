import React from "react";
import { TrendingUp, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ClientStatCard({ title, value, note, noteType }) {
  const getNoteIcon = () => {
    switch (noteType) {
      case "success":
        return <TrendingUp size={14} className="text-emerald-500" />;
      case "info":
        return <Clock size={14} className="text-blue-500" />;
      case "warning":
        return <AlertCircle size={14} className="text-amber-500" />;
      default:
        return <CheckCircle2 size={14} className="text-emerald-500" />;
    }
  };

  const getNoteColor = () => {
    switch (noteType) {
      case "success":
        return "text-emerald-600";
      case "info":
        return "text-blue-600";
      case "warning":
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
      <span className="text-xs font-bold tracking-wider text-gray-400">
        {title}
      </span>
      <div className="mt-2">
        <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
        <div
          className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${getNoteColor()}`}
        >
          {getNoteIcon()}
          <span>{note}</span>
        </div>
      </div>
    </div>
  );
}
