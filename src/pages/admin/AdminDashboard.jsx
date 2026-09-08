import React, { useState } from "react";
import {
  Filter,
  Plus,
  X,
  TrendingUp,
  Tag,
  Ticket,
  ArrowUpRight,
  Banknote,
  FolderKanban,
  Star,
  AlertCircle,
  TrendingUpIcon,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";
import TeamCard from "../../components/dashboard/TeamCard";
import ProjectCard from "../../components/dashboard/ProjectCard";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";
import IncomingQueue from "../../components/dashboard/IncomingQueue";
import AgencyPerformance from "../../components/dashboard/AgencyPerformance";
import AgencyWalletTopServices from "../../components/dashboard/AgencyWalletTopServices";

const yearlyIncomeData = {
  2025: {
    sales: {
      value: "$34.00",
      change: "41.67% ↗",
      changeType: "up",
      note: "Compared to ($24.00 in 2024)",
      graph: "M 0 20 Q 25 38 45 10 T 80 20 T 100 20",
    },
    campaigns: {
      value: "$3,265.72",
      change: "-34.69% ↘",
      changeType: "down",
      note: "Compared to ($5,000.00 in 2024)",
    },
    coupons: {
      value: "$2,654.20",
      change: "15.4% ↗",
      changeType: "up",
      note: "Compared to ($2,300.00 in 2024)",
    },
  },
  2024: {
    sales: {
      value: "$24.00",
      change: "20.00% ↗",
      changeType: "up",
      note: "Compared to ($20.00 in 2023)",
      graph: "M 0 30 Q 30 10 60 25 T 100 15",
    },
    campaigns: {
      value: "$5,000.00",
      change: "11.11% ↗",
      changeType: "up",
      note: "Compared to ($4,500.00 in 2023)",
    },
    coupons: {
      value: "$2,300.00",
      change: "-8.0% ↘",
      changeType: "down",
      note: "Compared to ($2,500.00 in 2023)",
    },
  },
  2023: {
    sales: {
      value: "$20.00",
      change: "5.26% ↗",
      changeType: "up",
      note: "Compared to ($19.00 in 2022)",
      graph: "M 0 25 Q 35 30 70 15 T 100 25",
    },
    campaigns: {
      value: "$4,500.00",
      change: "2.27% ↗",
      changeType: "up",
      note: "Compared to ($4,400.00 in 2022)",
    },
    coupons: {
      value: "$2,500.00",
      change: "13.6% ↗",
      changeType: "up",
      note: "Compared to ($2,200.00 in 2022)",
    },
  },
};

const availableYears = [2025, 2024, 2023];

const projects = [
  {
    client: "Nova Foods",
    service: "Social Media",
    status: "Ongoing",
    priority: "High",
    progress: 68,
    due: "18 Sep",
    people: ["NF", "AK"],
    tasks: 14,
  },
  {
    client: "Aster Finance",
    service: "Website + CRO",
    status: "Review",
    priority: "Urgent",
    progress: 91,
    due: "12 Sep",
    people: ["AF", "RP"],
    tasks: 9,
  },
  {
    client: "Urban Nest",
    service: "SEO",
    status: "Pending",
    priority: "Medium",
    progress: 15,
    due: "25 Sep",
    people: ["UN"],
    tasks: 18,
  },
  {
    client: "Bloom Studio",
    service: "Creative",
    status: "Hold",
    priority: "Low",
    progress: 42,
    due: "30 Sep",
    people: ["BS", "SK"],
    tasks: 11,
  },
];

export default function AdminDashboard() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentIncomeData = yearlyIncomeData[selectedYear];
  const compareOptions = availableYears.filter((y) => y !== selectedYear);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Overview
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-200">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      {/* CONGRATULATIONS BANNER */}
      <div className="flex items-center justify-between rounded-xl border border-[#EBE5FF] bg-[#F4F1FF] px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl">🎉</div>
          <div>
            <h3 className="font-bold text-[#4B3095]">Congratulations!</h3>
            <p className="text-xs font-medium text-[#6B53B5]">
              You have reached your monthly project targets.
            </p>
          </div>
        </div>
        <button className="text-[#6B53B5] hover:text-[#4B3095]">
          <X size={18} />
        </button>
      </div>

      {/* TOP METRICS ROW */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Monthly Revenue */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
          <div>
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-medium text-gray-500">
                Monthly Revenue
              </span>
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-100/70 text-blue-600">
                <Banknote size={18} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">$142,500</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-500">
            <TrendingUpIcon size={14} />
            <span>+12.4% from last month</span>
          </div>
        </div>

        {/* Active Projects */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
          <div>
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-medium text-gray-500">
                Active Projects
              </span>
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-100/70 text-indigo-600">
                <FolderKanban size={18} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">24</p>
          </div>
          <p className="mt-4 text-xs font-medium text-gray-500">
            4 finishing this week
          </p>
        </div>

        {/* Client Satisfaction */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
          <div>
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-medium text-gray-500">
                Client Satisfaction
              </span>
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-purple-100/70 text-purple-600">
                <Star size={18} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">4.9/5</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-500">
            <CheckCircle2 size={14} />
            <span>98% retention rate</span>
          </div>
        </div>

        {/* Overdue Actions */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
          <div>
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-medium text-gray-500">
                Overdue Actions
              </span>
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-100 text-rose-500">
                <AlertCircle size={18} />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">3</p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-rose-500">
            <AlertTriangle size={14} />
            <span>High priority intervention</span>
          </div>
        </div>
      </div>

      {/* TEAM CARDS ROW */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <TeamCard
          title="Sam Roberts"
          subtitle="Team Lead"
          avatars={["SR"]}
          isLead={true}
        />
        <TeamCard
          title="Marketing Team"
          subtitle="There is a meeting at 12 o'clock."
          avatars={["MK", "AR", "PS"]}
          count={3}
        />
        <TeamCard
          title="Design Team"
          subtitle="There is a meeting at 15 o'clock."
          avatars={["DS", "RV", "AM"]}
          count={1}
        />
      </div>

      {/* MAIN METRICS & ACTIVITY ROW */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* STATS COL */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-gray-900">
              Income{" "}
              <span className="block text-sm font-normal text-gray-500">
                Yearly
              </span>
            </h2>

            {/* COMPARISON DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 transition hover:bg-indigo-100"
              >
                <SlidersHorizontal size={14} />
                Compared to {selectedYear}
                <ChevronDown size={14} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 z-20 mt-2 w-36 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                  {compareOptions.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-semibold text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Compared to {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-1 sm:row-span-2">
              <StatCard
                label="Sales"
                value={currentIncomeData.sales.value}
                change={currentIncomeData.sales.change}
                changeType={currentIncomeData.sales.changeType}
                note={currentIncomeData.sales.note}
                graphData={currentIncomeData.sales.graph}
                icon={TrendingUp}
                theme="yellow"
                tall
              />
            </div>
            <StatCard
              label="Campaigns"
              value={currentIncomeData.campaigns.value}
              change={currentIncomeData.campaigns.change}
              changeType={currentIncomeData.campaigns.changeType}
              note={currentIncomeData.campaigns.note}
              icon={Tag}
              theme="pink"
            />
            <StatCard
              label="Coupons"
              value={currentIncomeData.coupons.value}
              change={currentIncomeData.coupons.change}
              changeType={currentIncomeData.coupons.changeType}
              note={currentIncomeData.coupons.note}
              icon={Ticket}
              theme="purple"
            />
          </div>
        </section>

        {/* RECENT ACTIVITIES */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-gray-900">
            Recent Activities
          </h2>
          <p className="mb-6 mt-1 text-xs text-gray-500">last 2 weeks</p>
          <ActivityTimeline />
        </section>

        {/* INCOMING QUEUE COMPONENT */}
        <IncomingQueue />
      </div>

      {/* AGENCY PERFORMANCE & WALLET ROW */}
      <div className="grid gap-6 lg:grid-cols-1">
        <AgencyPerformance />
      </div>

      <div className="grid gap-6 lg:grid-cols-1">
        <AgencyWalletTopServices />
      </div>

      {/* PROJECT TRACKER */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">
              Project Tracker
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Live view of project progress and workload
            </p>
          </div>
          <button className="flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100">
            Board View <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <ProjectCard key={p.client} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
