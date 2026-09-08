import React from "react";

export default function StatCard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
  theme = "purple",
  tall = false,
  note,
}) {
  const themes = {
    yellow: "bg-[#FFF9EA]",
    pink: "bg-[#FFF0F5]",
    purple: "bg-[#F4F2FF]",
  };

  const iconColors = {
    yellow: "text-amber-400",
    pink: "text-rose-400",
    purple: "text-indigo-400",
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-xl p-5 ${
        themes[theme] || themes.purple
      } ${tall ? "h-full" : ""}`}
    >
      <div className="mb-2 flex items-center gap-2">
        {Icon && (
          <Icon className={iconColors[theme]} size={20} strokeWidth={2.5} />
        )}
      </div>
      <div>
        <p className="mb-1 text-[13px] font-bold text-gray-900">{label}</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-extrabold text-gray-900">{value}</h2>
          {change && (
            <span
              className={`text-[11px] font-bold ${
                changeType === "down" ? "text-rose-500" : "text-emerald-500"
              }`}
            >
              {change}
            </span>
          )}
        </div>
        {note && <p className="mt-1 text-[10px] text-gray-500">{note}</p>}
      </div>
    </div>
  );
}
