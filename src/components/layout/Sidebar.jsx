import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderKanban,
  UserRoundCog,
  Layers3,
  Database,
  ShieldCheck,
  PanelLeftClose,
  ChevronRight,
  Settings,
  Image as ImageIcon,
  FileCode,
  Archive,
  Paperclip,
  Boxes,
  Link2,
  Bell,
  BarChart3,
  TrendingUp,
  Search,
  Monitor,
  Palette,
  ListTodo,
  UsersRound,
  CalendarDays,
} from "lucide-react";
import Logo from "../brand/Logo";

const groups = [
  {
    label: "",
    items: [
      ["Dashboard", "/admin", LayoutDashboard],
      ["Clients", "/admin/clients", Users],
      ["Proposals", "/proposals", FileText],
      ["Projects", "/projects", FolderKanban],
      ["Employees", "/admin/employees", UserRoundCog],
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
  {
    label: "Services Matrix",
    items: [
      ["Performance & SEM", "/admin/services/performance", TrendingUp],
      ["SEO & Search", "/admin/services/seo", Search],
      ["Web & UX/UI Design", "/admin/services/web-design", Monitor],
      ["Creative & Content", "/admin/services/creative", Palette],
    ],
  },
];

const employeeGroups = [
  {
    label: "My workspace",
    items: [
      ["Dashboard", "/employee", LayoutDashboard],
      ["My Tasks", "/employee/tasks", ListTodo],
      ["My Projects", "/employee/projects", FolderKanban],
      ["Colleagues", "/employee/colleagues", UsersRound],
      ["My Schedule", "/employee/schedule", CalendarDays],
    ],
  },
];

export default function Sidebar() {
  const [vaultsOpen, setVaultsOpen] = useState(true);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isEmployee = location.pathname.startsWith("/employee");
  const activeUser = isEmployee
    ? { name: "Employee User", role: "Employee", initial: "E" }
    : { name: "Harsh Pareek", role: "Super Admin", initial: "H" };

  const switchRole = (path) => {
    navigate(path);
    setRoleMenuOpen(false);
  };
  const navigationGroups = isEmployee ? employeeGroups : groups;

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] flex-col bg-white dark:bg-[#0b0c10] text-slate-700 dark:text-gray-300 border-r border-slate-200 dark:border-white/5 lg:flex transition-colors">
      {/* Header */}
      <div className="flex h-[82px] items-center justify-between px-5">
        <Logo />
        <button className="rounded-lg p-2 text-slate-400 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition">
          <PanelLeftClose size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {navigationGroups.map((g, idx) => (
          <div key={idx} className="space-y-1">
            {g.label && (
              <div className="flex items-center justify-between px-3 pb-2">
                <p className="text-[11px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider">
                  {g.label}
                </p>
                {g.label === "Data Vaults" && (
                  <button
                    onClick={() => setVaultsOpen(!vaultsOpen)}
                    className="text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300 transition"
                  >
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-200 ${
                        vaultsOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
            )}

            {/* Item Rendering */}
            {(g.label !== "Data Vaults" || vaultsOpen) &&
              g.items.map(([name, path, Icon]) => (
                <NavLink
                  key={name}
                  to={path}
                  end={path === "/admin"}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-gray-200"
                    }`
                  }
                >
                  <Icon size={16} />
                  <span className="truncate">{name}</span>

                  {/* Badge Indicator */}
                  {name === "Notifications" && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                  )}

                  {/* Arrow for Expandable Groups */}
                  {["Clients", "Projects"].includes(name) && (
                    <ChevronRight className="ml-auto opacity-50" size={14} />
                  )}
                </NavLink>
              ))}
          </div>
        ))}
      </nav>

      {/* User Footer / role switcher */}
      <div className="relative p-3 border-t border-slate-200 dark:border-white/5">
        {roleMenuOpen && (
          <div className="absolute bottom-[76px] left-3 right-3 z-50 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#16181f]">
            <p className="px-2.5 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Switch dashboard
            </p>
            <button
              onClick={() => switchRole("/admin")}
              className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-slate-100 dark:hover:bg-white/5 ${!isEmployee ? "bg-slate-100 dark:bg-white/5" : ""}`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-xs font-bold text-white">H</span>
              <span><span className="block text-xs font-bold text-slate-900 dark:text-white">Harsh Pareek</span><span className="block text-[10px] text-slate-500">Super Admin</span></span>
            </button>
            <button
              onClick={() => switchRole("/employee")}
              className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-slate-100 dark:hover:bg-white/5 ${isEmployee ? "bg-slate-100 dark:bg-white/5" : ""}`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 text-xs font-bold text-white">E</span>
              <span><span className="block text-xs font-bold text-slate-900 dark:text-white">Employee User</span><span className="block text-[10px] text-slate-500">Employee</span></span>
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => setRoleMenuOpen((open) => !open)}
          aria-expanded={roleMenuOpen}
          className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-slate-100 dark:hover:bg-white/5"
        >
          <div className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr font-bold text-white text-sm shadow-sm ${isEmployee ? "from-blue-600 to-cyan-400" : "from-orange-500 to-amber-400"}`}>
            {activeUser.initial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-slate-900 dark:text-white">{activeUser.name}</p>
            <p className="truncate text-[10px] font-medium text-slate-500 dark:text-gray-500">{activeUser.role}</p>
          </div>
          <Settings className="text-slate-400 dark:text-gray-400 transition hover:text-slate-900 dark:hover:text-white" size={16} />
        </button>
      </div>
    </aside>
  );
}
