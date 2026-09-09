// import React from "react";
// import {
//   Filter,
//   Plus,
//   FileText,
//   CheckCircle2,
//   MessageSquare,
//   ChevronLeft,
//   ChevronRight,
//   Zap,
// } from "lucide-react";

// import ClientStatCard from "../../components/clients/ClientStatCard";
// import ClientTableRow from "../../components/clients/ClientTableRow";
// import {
//   clientMetrics,
//   clientsList,
//   globalActivities,
//   strategicInsights,
// } from "../../data/clientData";

// export default function ClientDirectory() {
//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <div className="flex items-center gap-2">
//             <h1 className="text-3xl font-black tracking-tight text-gray-900">
//               Client Directory
//             </h1>
//             <span className="flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-700">
//               <Zap size={12} className="fill-indigo-700" /> Live Updates
//             </span>
//           </div>
//           <p className="mt-1 text-sm font-medium text-gray-500">
//             Manage your agency's client relationships, projects, and high-level
//             financials.
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-xs transition hover:border-gray-300 hover:bg-gray-50">
//             <Filter size={16} className="text-gray-500" /> Filter
//           </button>
//           <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:opacity-95">
//             <Plus size={18} /> Add New Client
//           </button>
//         </div>
//       </div>

//       {/* VIBRANT STAT CARDS */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {clientMetrics.map((metric, idx) => (
//           <ClientStatCard key={idx} {...metric} />
//         ))}
//       </div>

//       {/* CLIENT TABLE CONTAINER */}
//       <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse text-left">
//             <thead>
//               <tr className="border-b border-gray-100 bg-slate-50/80 text-[11px] font-black tracking-wider text-gray-400 uppercase">
//                 <th className="py-4 pl-6 pr-3">CLIENT NAME</th>
//                 <th className="px-3 py-4">INDUSTRY</th>
//                 <th className="px-3 py-4">ONGOING PROJECTS</th>
//                 <th className="px-3 py-4">TOTAL REVENUE</th>
//                 <th className="px-3 py-4">STATUS</th>
//                 <th className="px-3 py-4">PRIMARY CONTACT</th>
//                 <th className="py-4 pl-3 pr-6 text-right">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {clientsList.map((client) => (
//                 <ClientTableRow key={client.id} client={client} />
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="flex items-center justify-between border-t border-gray-100 bg-slate-50/30 px-6 py-4">
//           <p className="text-sm font-medium text-gray-500">
//             Showing <span className="font-extrabold text-gray-900">1-4</span> of{" "}
//             <span className="font-extrabold text-gray-900">124</span> clients
//           </p>
//           <div className="flex items-center gap-2">
//             <button className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-2xs">
//               <ChevronLeft size={14} /> Previous
//             </button>
//             <button className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-2xs">
//               Next <ChevronRight size={14} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM SECTION */}
//       <div className="grid gap-6 lg:grid-cols-3">
//         {/* GLOBAL CLIENT ACTIVITY */}
//         <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
//           <div className="mb-6 flex items-center justify-between">
//             <div>
//               <h2 className="text-lg font-black text-gray-900">
//                 Global Client Activity
//               </h2>
//               <p className="text-xs text-gray-400 font-medium">
//                 Real-time actions from client accounts
//               </p>
//             </div>
//             <button className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-100 transition">
//               View all
//             </button>
//           </div>

//           <div className="space-y-5">
//             {globalActivities.map((act) => (
//               <div
//                 key={act.id}
//                 className="flex items-start gap-4 rounded-xl border border-transparent p-3 transition hover:border-gray-100 hover:bg-slate-50/80"
//               >
//                 <div
//                   className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${act.iconBg}`}
//                 >
//                   {act.type === "proposal" && <FileText size={20} />}
//                   {act.type === "milestone" && <CheckCircle2 size={20} />}
//                   {act.type === "survey" && <MessageSquare size={20} />}
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm font-bold text-gray-900 leading-snug">
//                     {act.title}
//                   </p>
//                   <p className="mt-1 text-xs font-semibold text-gray-400">
//                     <span className="text-gray-600">{act.time}</span> •{" "}
//                     {act.category}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* STRATEGIC INSIGHTS */}
//         <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
//           <h2 className="text-lg font-black text-gray-900 mb-1">
//             Strategic Insights
//           </h2>
//           <p className="text-xs text-gray-400 font-medium mb-6">
//             AI-driven client opportunities & warnings
//           </p>

//           <div className="space-y-4">
//             {strategicInsights.map((insight) => (
//               <div
//                 key={insight.id}
//                 className={`rounded-2xl border p-5 transition hover:shadow-md ${insight.cardStyle}`}
//               >
//                 <span
//                   className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] font-black tracking-wider ${insight.categoryStyle}`}
//                 >
//                   {insight.category}
//                 </span>
//                 <h3 className="mt-2 text-base font-black text-gray-900">
//                   {insight.clientName}
//                 </h3>
//                 <p className="mt-2 text-xs font-medium text-gray-600 leading-relaxed">
//                   {insight.description}
//                 </p>
//                 <button
//                   className={`mt-4 w-full rounded-xl py-2 text-xs font-black transition ${insight.actionStyle}`}
//                 >
//                   {insight.actionText}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  Filter,
  Plus,
  FileText,
  CheckCircle2,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Zap,
  ExternalLink,
} from "lucide-react";

import ClientStatCard from "../../components/clients/ClientStatCard";
import ClientTableRow from "../../components/clients/ClientTableRow";
import ProposalModal from "../../components/clients/ProposalModal";
import {
  clientMetrics,
  clientsList,
  globalActivities,
  strategicInsights,
} from "../../data/clientData";

export default function ClientDirectory() {
  const [selectedClientForProposal, setSelectedClientForProposal] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProposal = (clientData) => {
    setSelectedClientForProposal(clientData);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              Client Directory
            </h1>
            <span className="flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-700">
              <Zap size={12} className="fill-indigo-700" /> Live Updates
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Manage your agency's client relationships, projects, and high-level
            financials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-xs transition hover:border-gray-300 hover:bg-gray-50">
            <Filter size={16} className="text-gray-500" /> Filter
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:opacity-95">
            <Plus size={18} /> Add New Client
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {clientMetrics.map((metric, idx) => (
          <ClientStatCard key={idx} {...metric} />
        ))}
      </div>

      {/* CLIENT TABLE CONTAINER */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-slate-50/80 text-[11px] font-black tracking-wider text-gray-400 uppercase">
                <th className="py-4 pl-6 pr-3">CLIENT NAME</th>
                <th className="px-3 py-4">INDUSTRY</th>
                <th className="px-3 py-4">ONGOING PROJECTS</th>
                <th className="px-3 py-4">TOTAL REVENUE</th>
                <th className="px-3 py-4">STATUS</th>
                <th className="px-3 py-4">PRIMARY CONTACT</th>
                <th className="py-4 pl-3 pr-6 text-right">
                  PROPOSAL & ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clientsList.map((client) => (
                <ClientTableRow
                  key={client.id}
                  client={client}
                  onViewProposal={handleOpenProposal}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-slate-50/30 px-6 py-4">
          <p className="text-sm font-medium text-gray-500">
            Showing{" "}
            <span className="font-extrabold text-gray-900">
              1-{clientsList.length}
            </span>{" "}
            of <span className="font-extrabold text-gray-900">124</span> clients
          </p>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-2xs">
              <ChevronLeft size={14} /> Previous
            </button>
            <button className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-2xs">
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* SCROLLABLE GLOBAL CLIENT ACTIVITY */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-gray-900">
                Global Client Activity
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                Real-time actions from client accounts
              </p>
            </div>
            <button className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-100 transition">
              View all
            </button>
          </div>

          <div className="max-h-[380px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {globalActivities.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-3.5 transition hover:bg-slate-50/80 hover:border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${act.iconBg}`}
                  >
                    {act.type === "proposal" && <FileText size={20} />}
                    {act.type === "milestone" && <CheckCircle2 size={20} />}
                    {act.type === "survey" && <MessageSquare size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-snug">
                      {act.title}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-gray-400">
                      <span className="text-gray-600">{act.time}</span> •{" "}
                      {act.category}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleOpenProposal({
                      name: act.category,
                      contactName: "Client Representative",
                    })
                  }
                  className="flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-black text-white shadow-xs transition hover:bg-indigo-700 hover:shadow-md cursor-pointer"
                >
                  <FileText size={14} />
                  <span>View Proposal</span>
                  <ExternalLink size={12} className="opacity-70" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* STRATEGIC INSIGHTS */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-black text-gray-900 mb-1">
            Strategic Insights
          </h2>
          <p className="text-xs text-gray-400 font-medium mb-6">
            AI-driven client opportunities & warnings
          </p>

          <div className="space-y-4">
            {strategicInsights.map((insight) => (
              <div
                key={insight.id}
                className={`rounded-2xl border p-5 transition hover:shadow-md ${insight.cardStyle}`}
              >
                <span
                  className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] font-black tracking-wider ${insight.categoryStyle}`}
                >
                  {insight.category}
                </span>
                <h3 className="mt-2 text-base font-black text-gray-900">
                  {insight.clientName}
                </h3>
                <p className="mt-2 text-xs font-medium text-gray-600 leading-relaxed">
                  {insight.description}
                </p>
                <button
                  className={`mt-4 w-full rounded-xl py-2 text-xs font-black transition ${insight.actionStyle}`}
                >
                  {insight.actionText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROPOSAL MODAL */}
      <ProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clientData={selectedClientForProposal}
      />
    </div>
  );
}
