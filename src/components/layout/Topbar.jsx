import React, { useState } from "react";
import {
  Search,
  Sun,
  Maximize2,
  Bell,
  Flag,
  SlidersHorizontal,
} from "lucide-react";

import ChatDrawer from "../../components/dashboard/chat/ChatDrawer";
import NotificationDrawer from "../../components/dashboard/NotificationDrawer";

export default function Topbar() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 flex h-[72px] w-full items-center justify-between border-b border-gray-100 bg-white/95 px-6 backdrop-blur lg:px-8">
        {/* LEFT: Search Bar */}
        <div className="relative flex items-center">
          <Search
            className="absolute left-3.5 text-indigo-500"
            size={18}
            strokeWidth={2.5}
          />
          <input
            className="h-10 w-64 rounded-xl bg-transparent pl-10 pr-4 text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400 focus:w-80 focus:bg-gray-50/80 transition-all duration-200"
            placeholder="Search..."
          />
        </div>

        {/* RIGHT: Action Icons & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Flag Icon */}
          <button className="relative grid h-9 w-9 place-items-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition">
            <Flag size={17} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {/* Theme Toggle (Sun) */}
          <button className="grid h-9 w-9 place-items-center rounded-full text-amber-500 hover:bg-amber-50/50 transition">
            <Sun size={18} />
          </button>

          {/* Fullscreen Toggle */}
          <button className="grid h-9 w-9 place-items-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition">
            <Maximize2 size={16} />
          </button>

          {/* Sliders Icon */}
          <button className="grid h-9 w-9 place-items-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition">
            <SlidersHorizontal size={17} />
          </button>

          {/* Bell Icon -> Opens Notification Drawer */}
          <button
            onClick={() => {
              setIsNotificationOpen(true);
              setIsChatOpen(false);
            }}
            className="relative grid h-9 w-9 place-items-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="mx-2 h-6 w-[1px] bg-gray-100" />

          {/* User Profile -> Opens Team Chat Drawer */}
          <div
            onClick={() => {
              setIsChatOpen(true);
              setIsNotificationOpen(false);
            }}
            className="flex cursor-pointer items-center gap-3 pl-1 group"
          >
            <div className="text-right leading-tight hidden sm:block">
              <p className="text-xs font-extrabold text-gray-800 group-hover:text-indigo-600 transition">
                Harsh Pareek
              </p>
              <p className="text-[10px] font-semibold text-gray-400">
                Administrator
              </p>
            </div>

            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-tr from-amber-200 via-orange-300 to-rose-300 text-xs font-bold text-gray-800 shadow-sm ring-2 ring-white transition group-hover:scale-105">
                HP
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
          </div>
        </div>
      </header>

      {/* DRAWERS */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
