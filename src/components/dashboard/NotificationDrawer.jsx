// src/components/dashboard/NotificationDrawer.jsx

import React from "react";
import {
  X,
  Bell,
  Layers,
  ThumbsUp,
  Package,
  Utensils,
  Zap,
  FileUp,
  Flag,
} from "lucide-react";
import { notificationsData } from "../../data/notificationsData";

const iconMap = {
  Layers,
  ThumbsUp,
  Package,
  Utensils,
  Zap,
  FileUp,
  Flag,
};

export default function NotificationDrawer({ isOpen, onClose }) {
  return (
    <>
      {/* Invisible Click Outside Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose} />
      )}

      {/* Glassmorphic Drawer (Blurs page content directly underneath it) */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 sm:w-96 bg-white/40 backdrop-blur-xl border-l border-white/50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/30 bg-white/20">
          <h2 className="text-lg font-extrabold text-gray-900">
            Notifications
          </h2>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-gray-600 hover:bg-white/40 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Notification Cards */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notificationsData.map((item) => {
            const IconComponent = iconMap[item.icon] || Bell;
            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 rounded-2xl border p-3.5 shadow-sm transition hover:scale-[1.01] ${item.bgColor} ${item.textColor}`}
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/80 shadow-sm">
                  <IconComponent size={16} />
                </div>
                <p className="pt-0.5 text-xs font-semibold leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
