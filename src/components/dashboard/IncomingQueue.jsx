import React, { useState } from "react";
import {
  CheckSquare,
  MoreHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

const initialQueue = [
  {
    id: 1,
    text: "New Client Request needs approval",
    badge: "New",
    badgeColor: "bg-emerald-50 text-emerald-600",
    done: false,
  },
  {
    id: 2,
    text: "Cover images will be edited in 2 days",
    badge: "Update",
    badgeColor: "bg-blue-50 text-blue-600",
    done: false,
  },
  {
    id: 3,
    text: "Preparing for A/B testing in 2 days",
    badge: "Test",
    badgeColor: "bg-amber-50 text-amber-600",
    done: false,
  },
  {
    id: 4,
    text: "Google Analytics data will be synced",
    badge: "Report",
    badgeColor: "bg-indigo-50 text-indigo-600",
    done: false,
  },
  {
    id: 5,
    text: "Invoices will be issued in 8 days",
    badge: "Print",
    badgeColor: "bg-orange-50 text-orange-600",
    done: false,
  },
];

const badgeStyles = {
  New: "bg-emerald-50 text-emerald-600",
  Update: "bg-blue-50 text-blue-600",
  Test: "bg-amber-50 text-amber-600",
  Report: "bg-indigo-50 text-indigo-600",
  Print: "bg-orange-50 text-orange-600",
  Control: "bg-purple-50 text-purple-600",
  Meeting: "bg-rose-50 text-rose-600",
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function IncomingQueue() {
  const [issues, setIssues] = useState(initialQueue);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("New");

  // Dynamic Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Sep 2026 default
  const [selectedDate, setSelectedDate] = useState(8);

  // Calendar Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonthDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) => daysInPrevMonth - firstDayOfMonth + i + 1,
  );
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Toggle Checkbox Status
  const toggleDone = (id) => {
    setIssues((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  // Add Item to State
  const handleAddItem = () => {
    if (!title.trim()) return;

    const newItem = {
      id: Date.now(),
      text: title,
      badge: selectedBadge,
      badgeColor: badgeStyles[selectedBadge] || "bg-gray-100 text-gray-600",
      done: false,
    };

    setIssues((prev) => [newItem, ...prev]);
    setTitle("");
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      {/* QUEUE SECTION */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-gray-900">
            <CheckSquare className="text-orange-500" size={20} /> Queue Issues
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-100 transition"
          >
            + New
          </button>
        </div>

        {/* INCOMING QUEUE LIST */}
        <div className="space-y-3.5">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="group flex items-center justify-between"
            >
              <div
                onClick={() => toggleDone(issue.id)}
                className="flex cursor-pointer items-center gap-3 select-none"
              >
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                    issue.done
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  {issue.done && <Check size={12} strokeWidth={3} />}
                </div>

                <p
                  className={`text-[13px] font-medium transition-all ${
                    issue.done
                      ? "text-gray-400 line-through"
                      : "text-gray-700 group-hover:text-gray-900"
                  }`}
                >
                  {issue.text}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${issue.badgeColor}`}
                >
                  {issue.badge}
                </span>
                <button className="text-gray-300 hover:text-gray-500">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BACKDROP */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsModalOpen(false)}
      />

      {/* MODAL (SLIDES DOWN FROM TOP) */}
      <div
        className={`fixed left-1/2 top-10 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 ease-out ${
          isModalOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-16 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-lg font-bold text-gray-800">New Issue</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Input Field */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold text-gray-500">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter issue summary..."
            className="w-full rounded-xl bg-gray-50/80 px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:bg-gray-100"
          />
        </div>

        {/* DYNAMIC CALENDAR PICKER */}
        <div className="mb-5">
          <label className="mb-2 block text-xs font-semibold text-gray-500">
            Due Date
          </label>
          <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-3 text-xs">
            {/* Calendar Controls */}
            <div className="mb-3 flex items-center justify-between font-semibold text-gray-600">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="grid h-6 w-6 place-items-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
              >
                <ChevronLeft size={14} />
              </button>
              <span>
                {monthNames[month]} {year}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="grid h-6 w-6 place-items-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-gray-400">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Days Grid */}
            <div className="mt-1 grid grid-cols-7 gap-1 text-center font-medium text-gray-700">
              {/* Previous Month Padding Days */}
              {prevMonthDays.map((d, idx) => (
                <span key={`prev-${idx}`} className="text-gray-300 py-1">
                  {d}
                </span>
              ))}

              {/* Current Month Active Days */}
              {currentMonthDays.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDate(d)}
                  className={`py-1 rounded-full text-xs font-semibold transition ${
                    selectedDate === d
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "hover:bg-gray-200/60 text-gray-700"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Badge Options */}
        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold text-gray-500">
            Badge
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(badgeStyles).map((badgeKey) => (
              <button
                key={badgeKey}
                type="button"
                onClick={() => setSelectedBadge(badgeKey)}
                className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                  badgeStyles[badgeKey]
                } ${
                  selectedBadge === badgeKey
                    ? "ring-2 ring-indigo-500 ring-offset-1"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {badgeKey}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAddItem}
            className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-sm"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}
