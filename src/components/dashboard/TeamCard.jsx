import React from "react";

export default function TeamCard({
  title,
  subtitle,
  avatars = [],
  count,
  isLead,
}) {
  return (
    <div className="flex min-h-[90px] cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div>
        <p className="font-extrabold text-gray-900">{title}</p>
        <p className="mt-0.5 text-[11px] font-medium text-gray-500">
          {subtitle}
        </p>
        {!isLead && avatars.length > 0 && (
          <div className="mt-3 flex -space-x-2">
            {avatars.map((a, i) => (
              <div
                key={i}
                className="grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-blue-100 to-orange-100 text-[8px] font-bold text-gray-700"
              >
                {a}
              </div>
            ))}
            {count > 0 && (
              <div className="grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-[#F4F2FF] text-[9px] font-bold text-indigo-600">
                +{count}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-900">
        ›
      </div>
    </div>
  );
}
