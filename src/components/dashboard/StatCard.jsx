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
  graphData,
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

  const strokeColors = {
    yellow: "#FACC15",
    pink: "#FB7185",
    purple: "#818CF8",
  };

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 ${
        themes[theme] || themes.purple
      } ${tall ? "h-full min-h-[220px]" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900">{label}</span>
        {Icon && (
          <Icon className={iconColors[theme]} size={22} strokeWidth={2.5} />
        )}
      </div>

      {/* SVG GRAPH AREA */}
      {graphData && (
        <div className="my-2 h-16 w-full">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 100 40">
            <path
              d={graphData}
              fill="none"
              stroke={strokeColors[theme]}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      <div>
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-extrabold text-gray-900">{value}</h2>
          {change && (
            <span
              className={`text-xs font-bold ${
                changeType === "down" ? "text-rose-500" : "text-emerald-500"
              }`}
            >
              {change}
            </span>
          )}
        </div>
        {note && <p className="mt-1 text-[11px] text-gray-500">{note}</p>}
      </div>
    </div>
  );
}
