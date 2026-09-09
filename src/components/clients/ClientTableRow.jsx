import React from "react";
import {
  MoreHorizontal,
  Building2,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function ClientTableRow({ client, onViewProposal }) {
  return (
    <tr className="border-b border-gray-100 transition-colors duration-200 hover:bg-indigo-50/30">
      <td className="py-4 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-bold shadow-xs ${client.iconBg}`}
          >
            <Building2 size={20} />
          </div>
          <div>
            <span className="block font-extrabold text-gray-900">
              {client.name}
            </span>
            <span className="text-xs font-medium text-gray-400">
              ID: #{client.id}092
            </span>
          </div>
        </div>
      </td>

      <td className="px-3 py-4 text-sm font-semibold text-gray-600">
        <span className="inline-block rounded-lg bg-gray-100/80 px-2.5 py-1 text-xs font-bold text-gray-700">
          {client.industry}
        </span>
      </td>

      <td className="px-3 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs shadow-2xs ${client.projectBadgeStyle}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
          {client.ongoingProjects}
        </span>
      </td>

      <td className="px-3 py-4 font-black text-gray-900 text-base">
        {client.totalRevenue}
      </td>

      <td className="px-3 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-black tracking-wider uppercase ${client.statusStyle}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              client.status === "ACTIVE"
                ? "bg-emerald-500"
                : client.status === "LEAD"
                  ? "bg-amber-500"
                  : "bg-gray-400"
            }`}
          />
          {client.status}
        </span>
      </td>

      <td className="px-3 py-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`grid h-8 w-8 place-items-center rounded-full text-xs font-black shadow-xs ${client.avatarBg}`}
          >
            {client.contactAvatar}
          </div>
          <span className="text-sm font-bold text-gray-800">
            {client.contactName}
          </span>
        </div>
      </td>

      {/* PROPOSAL & ACTIONS */}
      <td className="py-4 pl-3 pr-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onViewProposal(client)}
            className="flex items-center gap-1 rounded-xl bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-xs font-black text-indigo-700 hover:bg-indigo-600 hover:text-white transition shadow-2xs cursor-pointer"
          >
            <FileText size={14} />
            <span>Proposal</span>
            <ExternalLink size={12} className="opacity-70" />
          </button>
          <button className="rounded-lg p-1.5 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
