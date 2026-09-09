export const clientMetrics = [
  {
    title: "TOTAL CLIENTS",
    value: "124",
    note: "12% increase",
    noteType: "success",
    bgColor: "bg-emerald-50/80 border-emerald-100",
    badgeColor: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-emerald-500 text-white",
  },
  {
    title: "ACTIVE PROJECTS",
    value: "48",
    note: "8 closing soon",
    noteType: "info",
    bgColor: "bg-indigo-50/80 border-indigo-100",
    badgeColor: "bg-indigo-100 text-indigo-700",
    iconBg: "bg-indigo-600 text-white",
  },
  {
    title: "LEAD PIPELINE",
    value: "$1.2M",
    note: "In negotiation",
    noteType: "warning",
    bgColor: "bg-amber-50/80 border-amber-100",
    badgeColor: "bg-amber-100 text-amber-700",
    iconBg: "bg-amber-500 text-white",
  },
  {
    title: "CUSTOMER HEALTH",
    value: "94%",
    note: "Above target",
    noteType: "purple",
    bgColor: "bg-purple-50/80 border-purple-100",
    badgeColor: "bg-purple-100 text-purple-700",
    iconBg: "bg-purple-600 text-white",
  },
];

export const clientsList = [
  {
    id: 1,
    name: "Nebula Cloud Systems",
    industry: "Cloud Infrastructure",
    ongoingProjects: "4 Active",
    projectBadgeStyle:
      "bg-indigo-100 text-indigo-800 font-bold border border-indigo-200",
    totalRevenue: "$452,000",
    status: "ACTIVE",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
    contactName: "Sarah Jenkins",
    contactAvatar: "SJ",
    avatarBg: "bg-gradient-to-tr from-purple-500 to-indigo-500 text-white",
    iconBg: "bg-indigo-500 text-white",
    proposalUrl: "#proposal-nebula",
  },
  {
    id: 2,
    name: "Vertex Automotive",
    industry: "Manufacturing",
    ongoingProjects: "0 Pending",
    projectBadgeStyle:
      "bg-amber-100 text-amber-800 font-bold border border-amber-200",
    totalRevenue: "$12,500",
    status: "LEAD",
    statusStyle: "bg-amber-100 text-amber-800 border-amber-200",
    contactName: "Marcus Bell",
    contactAvatar: "MB",
    avatarBg: "bg-gradient-to-tr from-blue-500 to-cyan-500 text-white",
    iconBg: "bg-amber-500 text-white",
    proposalUrl: "#proposal-vertex",
  },
  {
    id: 3,
    name: "Horizon Retail Group",
    industry: "E-commerce",
    ongoingProjects: "12 Active",
    projectBadgeStyle:
      "bg-emerald-100 text-emerald-800 font-bold border border-emerald-200",
    totalRevenue: "$1,280,000",
    status: "ACTIVE",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
    contactName: "Elena Lopez",
    contactAvatar: "EL",
    avatarBg: "bg-gradient-to-tr from-pink-500 to-rose-500 text-white",
    iconBg: "bg-emerald-500 text-white",
    proposalUrl: "#proposal-horizon",
  },
  {
    id: 4,
    name: "Zion Fintech",
    industry: "Financial Services",
    ongoingProjects: "0 Active",
    projectBadgeStyle:
      "bg-rose-100 text-rose-800 font-bold border border-rose-200",
    totalRevenue: "$89,000",
    status: "ARCHIVED",
    statusStyle: "bg-gray-100 text-gray-700 border-gray-200",
    contactName: "David Wu",
    contactAvatar: "DW",
    avatarBg: "bg-gradient-to-tr from-slate-600 to-slate-800 text-white",
    iconBg: "bg-gray-400 text-white",
    proposalUrl: "#proposal-zion",
  },
  {
    id: 5,
    name: "Aura Skincare Inc.",
    industry: "Health & Beauty",
    ongoingProjects: "3 Active",
    projectBadgeStyle:
      "bg-purple-100 text-purple-800 font-bold border border-purple-200",
    totalRevenue: "$210,000",
    status: "ACTIVE",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
    contactName: "Chloe Vance",
    contactAvatar: "CV",
    avatarBg: "bg-gradient-to-tr from-purple-400 to-pink-500 text-white",
    iconBg: "bg-purple-500 text-white",
    proposalUrl: "#proposal-aura",
  },
  {
    id: 6,
    name: "Quantum Dynamics",
    industry: "Artificial Intelligence",
    ongoingProjects: "2 Pending",
    projectBadgeStyle:
      "bg-amber-100 text-amber-800 font-bold border border-amber-200",
    totalRevenue: "$340,000",
    status: "LEAD",
    statusStyle: "bg-amber-100 text-amber-800 border-amber-200",
    contactName: "Dr. Aris Thorne",
    contactAvatar: "AT",
    avatarBg: "bg-gradient-to-tr from-teal-400 to-emerald-600 text-white",
    iconBg: "bg-teal-500 text-white",
    proposalUrl: "#proposal-quantum",
  },
  {
    id: 7,
    name: "Solaris Energy",
    industry: "Clean Energy",
    ongoingProjects: "5 Active",
    projectBadgeStyle:
      "bg-emerald-100 text-emerald-800 font-bold border border-emerald-200",
    totalRevenue: "$910,000",
    status: "ACTIVE",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
    contactName: "Maya Lin",
    contactAvatar: "ML",
    avatarBg: "bg-gradient-to-tr from-amber-400 to-orange-500 text-white",
    iconBg: "bg-amber-500 text-white",
    proposalUrl: "#proposal-solaris",
  },
];

export const globalActivities = [
  {
    id: 1,
    type: "proposal",
    title: "Proposal Generated for Horizon Retail Group by Elena Lopez.",
    time: "2 hours ago",
    category: "Marketing Strategy 2026",
    proposalUrl: "#proposal-horizon",
    iconBg:
      "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-200",
  },
  {
    id: 2,
    type: "milestone",
    title:
      "Project Milestone Reached: Nebula Cloud - Security Audit Completed.",
    time: "5 hours ago",
    category: "Infrastructure Team",
    proposalUrl: "#proposal-nebula",
    iconBg:
      "bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-md shadow-teal-200",
  },
  {
    id: 3,
    type: "proposal",
    title: "New Retainer Proposal submitted to Aura Skincare Inc.",
    time: "6 hours ago",
    category: "Brand Refresh",
    proposalUrl: "#proposal-aura",
    iconBg:
      "bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md shadow-purple-200",
  },
  {
    id: 4,
    type: "survey",
    title: "New Survey Response received from Marcus Bell (Vertex Auto).",
    time: "Yesterday",
    category: "Customer Satisfaction Survey",
    proposalUrl: "#proposal-vertex",
    iconBg:
      "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-orange-200",
  },
];

export const strategicInsights = [
  {
    id: 1,
    category: "GROWTH OPPORTUNITY",
    clientName: "Nebula Cloud Systems",
    description:
      "Currently at 80% capacity. Potential for cross-selling Data Analytics services.",
    actionText: "Review Deal →",
    cardStyle:
      "bg-gradient-to-br from-indigo-50/90 via-purple-50/50 to-white border-indigo-200 shadow-xs",
    categoryStyle: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    actionStyle:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200",
  },
  {
    id: 2,
    category: "RETENTION RISK",
    clientName: "Zion Fintech",
    description:
      "Zero activity recorded in the last 30 days. Recommend an immediate check-in call.",
    actionText: "Schedule Call →",
    cardStyle:
      "bg-gradient-to-br from-rose-50/90 via-pink-50/50 to-white border-rose-200 shadow-xs",
    categoryStyle: "bg-rose-100 text-rose-700 border border-rose-200 font-bold",
    actionStyle:
      "bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-200",
  },
];
