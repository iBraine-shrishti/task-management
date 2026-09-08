import React from "react";

const timelineItems = [
  {
    time: "4:54 PM",
    text: "Extended license purchased from France.",
    color: "border-purple-500",
  },
  {
    time: "12:36 PM",
    text: "Aster Finance, a new rating has been received.",
    color: "border-emerald-400",
  },
  {
    time: "7:48 AM",
    text: "Customer's problem solved.",
    color: "border-amber-400",
  },
  {
    time: "a day ago",
    text: "Regular license purchased from United Kingdom.",
    color: "border-blue-400",
  },
  {
    time: "a day ago",
    text: "Regular license purchased from Italy.",
    color: "border-purple-500",
  },
  {
    time: "2 days ago",
    text: "New client onboarding survey submitted.",
    color: "border-blue-400",
  },
  {
    time: "3 days ago",
    text: "System backup completed successfully.",
    color: "border-emerald-400",
  },
  {
    time: "3 days ago",
    text: "Invoice #1094 paid by Apex Corp.",
    color: "border-purple-500",
  },
  {
    time: "4 days ago",
    text: "New user registration from Germany.",
    color: "border-amber-400",
  },
  {
    time: "5 days ago",
    text: "Security audit report generated.",
    color: "border-blue-400",
  },
  {
    time: "a week ago",
    text: "Server patch deployment v2.4.0 completed.",
    color: "border-purple-500",
  },
  {
    time: "a week ago",
    text: "Support ticket #842 escalated to tier 2.",
    color: "border-amber-400",
  },
];

export default function ActivityTimeline() {
  return (
    /* Outer Scroll Wrapper: Sets max height, allows overflow, and hides scrollbar */
    <div className="max-h-80 overflow-y-auto pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="relative ml-[65px] border-l border-gray-100 py-1">
        {timelineItems.map((item, i) => (
          <div key={i} className="relative mb-5 flex items-start last:mb-0">
            {/* Time on left */}
            <div className="absolute -left-[75px] top-0 w-[60px] text-right text-[10px] font-bold text-gray-900">
              {item.time}
            </div>

            {/* Circle ring */}
            <div
              className={`absolute -left-[5px] top-[3px] h-2.5 w-2.5 rounded-full border-2 bg-white ${item.color}`}
            />

            {/* Item text */}
            <div className="pl-4">
              <p className="text-xs font-medium leading-relaxed text-gray-600">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
