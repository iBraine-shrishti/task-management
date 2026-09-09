// proposalData.js
import {
  TrendingUp,
  Search,
  BarChart3,
  Users,
  Layout,
  Code,
  Code2,
  Target,
  PenTool,
  Palette,
  Video,
  Share2,
} from "lucide-react";

export const SERVICE_TAXONOMY = [
  {
    category: "Marketing Solutions",
    items: [
      {
        id: "perf_mktg",
        name: "Performance Marketing (PPC)",
        desc: "ROI focused data-driven ads",
        icon: TrendingUp,
        color: "from-emerald-400 to-teal-500",
        shadow: "shadow-emerald-500/20",
      },
      {
        id: "sem",
        name: "SEM Experts",
        desc: "Search, Display, Shopping, Native",
        icon: Search,
        color: "from-amber-400 to-orange-500",
        shadow: "shadow-amber-500/20",
      },
      {
        id: "seo",
        name: "Search Engine Optimization (SEO)",
        desc: "Rank organic in SERP & local listings",
        icon: BarChart3,
        color: "from-yellow-400 to-amber-500",
        shadow: "shadow-yellow-500/20",
      },
      {
        id: "smm",
        name: "Social Media Marketing",
        desc: "Building viral communities & engagement",
        icon: Users,
        color: "from-blue-500 to-indigo-600",
        shadow: "shadow-blue-500/20",
      },
      {
        id: "affiliate",
        name: "Affiliate Marketing",
        desc: "Partner network scaling",
        icon: Share2,
        color: "from-pink-500 to-rose-500",
        shadow: "shadow-pink-500/20",
      },
    ],
  },
  {
    category: "Website & Tech Solutions",
    items: [
      {
        id: "web_dev",
        name: "Website Design & Development",
        desc: "Clean builds that establish high trust",
        icon: Layout,
        color: "from-rose-500 to-red-600",
        shadow: "shadow-rose-500/20",
        hasSubCategory: true,
      },
      {
        id: "app_dev",
        name: "App Development",
        desc: "iOS & Android mobile apps",
        icon: Code,
        color: "from-violet-500 to-purple-600",
        shadow: "shadow-violet-500/20",
      },
      {
        id: "ga_analytics",
        name: "Google Analytics & GTM",
        desc: "Advanced conversion tag deployment",
        icon: Code2,
        color: "from-purple-500 to-indigo-600",
        shadow: "shadow-purple-500/20",
      },
      {
        id: "cro",
        name: "CRO Optimization",
        desc: "Highest level of sales conversions",
        icon: Target,
        color: "from-cyan-500 to-blue-600",
        shadow: "shadow-cyan-500/20",
      },
    ],
  },
  {
    category: "Creative Solutions",
    items: [
      {
        id: "content",
        name: "Content Writing",
        desc: "Improve conversions with compelling copy",
        icon: PenTool,
        color: "from-fuchsia-500 to-pink-600",
        shadow: "shadow-fuchsia-500/20",
      },
      {
        id: "graphic",
        name: "Graphic Design",
        desc: "Establish distinct visual style",
        icon: Palette,
        color: "from-sky-400 to-cyan-500",
        shadow: "shadow-sky-500/20",
      },
      {
        id: "video",
        name: "Video Production",
        desc: "Visual storytelling for products & ads",
        icon: Video,
        color: "from-indigo-500 to-purple-600",
        shadow: "shadow-indigo-500/20",
      },
    ],
  },
];

export const WEB_DEV_SUB_CATEGORIES = [
  { id: "ecommerce", label: "E-Commerce Store" },
  { id: "realestate", label: "Real Estate Portal" },
  { id: "food", label: "Food & Restaurant" },
  { id: "education", label: "Library / Education" },
  { id: "corporate", label: "Corporate Business Website" },
];

export const GOAL_OPTIONS = [
  "Sales",
  "Leads",
  "Branding",
  "Signups",
  "Phone Calls",
  "Other",
];
export const AD_ACCOUNT_OPTIONS = [
  "Google Ads",
  "Facebook Ads",
  "LinkedIn Ads",
  "First Time",
];
