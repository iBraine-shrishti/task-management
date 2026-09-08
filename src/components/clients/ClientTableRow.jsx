import React from "react";
import { MoreHorizontal, Server } from "lucide-react";

export default function ClientTableRow({ client }) {
  return (
    <tr className="border-b border-gray-100 transition hover:bg-gray-50/50">
      <td className="py-4 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-gray-400">
            <Server size={18} />
          </div>
          <span className="font-bold text-gray-900">{client.name}</span>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-500">{client.industry}</td>
      <td className="px-3 py-4">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${client.projectBadgeStyle}`}
        >
          {client.ongoingProjects}
        </span>
      </td>
      <td className="px-3 py-4 font-bold text-gray-900">
        {client.totalRevenue}
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              client.status === "ACTIVE"
                ? "bg-emerald-500"
                : client.status === "LEAD"
                  ? "bg-amber-500"
                  : "bg-gray-400"
            }`}
          />
          <span className="text-xs font-bold tracking-wider text-gray-700">
            {client.status}
          </span>
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
            {client.contactAvatar}
          </div>
          <span className="text-sm font-medium text-gray-800">
            {client.contactName}
          </span>
        </div>
      </td>
      <td className="py-4 pl-3 pr-6 text-right">
        <button className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <MoreHorizontal size={18} />
        </button>
      </td>
    </tr>
  );
}
