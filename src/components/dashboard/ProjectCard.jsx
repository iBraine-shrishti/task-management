import React from "react";

const pTone = {
  Ongoing: "bg-blue-50 text-blue-600",
  Review: "bg-purple-50 text-purple-600",
  Pending: "bg-amber-50 text-amber-600",
  Hold: "bg-gray-100 text-gray-600",
};

export default function ProjectCard({ project }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
            {project.service}
          </p>
          <h3 className="mt-0.5 text-sm font-extrabold text-gray-900">
            {project.client}
          </h3>
        </div>
        <span
          className={`rounded-md px-2 py-1 text-[9px] font-bold ${
            pTone[project.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {project.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="font-semibold text-gray-500">Progress</span>
        <b className="text-gray-900">{project.progress}%</b>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-gray-100">
        <div
          className="h-1.5 rounded-full bg-[#4B3095]"
          style={{ width: `${project.progress}%` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
        <div className="flex -space-x-1.5">
          {project.people?.map((p, i) => (
            <span
              key={i}
              className="grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-blue-100 text-[8px] font-bold text-blue-800"
            >
              {p}
            </span>
          ))}
        </div>
        <span className="text-[10px] font-bold text-gray-400">
          Due {project.due}
        </span>
      </div>
    </div>
  );
}
