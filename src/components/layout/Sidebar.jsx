import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  UserRoundCog,
  Boxes,
  Bell,
  BarChart3,
  Settings,
  PanelLeftClose,
  ChevronRight,
  Layers3,
  Link2,
} from "lucide-react";
import Logo from "../brand/Logo";

const groups = [
  {
    label: "",
    items: [
      ["Dashboard", "/admin", LayoutDashboard],
      ["Clients", "/admin/clients", Users],
      ["Projects", "/projects/p1", FolderKanban],
      ["Employees", "/employee", UserRoundCog],
      ["Groups", "/admin/groups", Layers3],
    ],
  },
  {
    label: "Manage",
    items: [
      ["Assets", "/assets", Boxes],
      ["Platforms", "/admin/platforms", Link2],
      ["Notifications", "/notifications", Bell],
      ["Reports", "/admin/reports", BarChart3],
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] flex-col bg-[#0b0c10] text-gray-300 lg:flex">
      {/* Header */}
      <div className="flex h-[82px] items-center justify-between px-5">
        <Logo />
        <button className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white transition">
          <PanelLeftClose size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {groups.map((g, idx) => (
          <div key={idx} className="space-y-1">
            {g.label && (
              <p className="px-3 pb-2 text-[11px] font-bold text-gray-500 tracking-wider">
                {g.label}
              </p>
            )}
            {g.items.map(([name, path, Icon]) => (
              <NavLink
                key={name}
                to={path}
                end={path === "/admin"} // Ensures exact match so other links sharing /admin don't stay active
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#181a20] text-white shadow-inner"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }`
                }
              >
                <Icon size={18} />
                <span className="truncate">{name}</span>

                {/* Badge Indicator */}
                {name === "Notifications" && (
                  <span className="ml-auto h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                )}

                {/* Chevron Indicator */}
                {["Clients", "Projects"].includes(name) && (
                  <ChevronRight className="ml-auto opacity-50" size={16} />
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-white/5">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-white/5"
        >
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 font-bold text-white text-sm">
            S
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-white">
              Harsh Pareek
            </p>
            <p className="truncate text-xs text-gray-500">Administrator</p>
          </div>
          <Settings
            className="text-gray-400 hover:text-white transition"
            size={17}
          />
        </NavLink>
      </div>
    </aside>
  );
}
