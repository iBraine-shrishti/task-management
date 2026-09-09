// ProposalBuilder.jsx
import React, { useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Download,
  ArrowLeft,
  Sparkles,
  Layers,
  Globe,
  Target,
  Upload,
  Image as ImageIcon,
  FileText,
  X,
} from "lucide-react";

import {
  SERVICE_TAXONOMY,
  WEB_DEV_SUB_CATEGORIES,
  GOAL_OPTIONS,
  AD_ACCOUNT_OPTIONS,
} from "../../data/proposalData";

export default function ProposalBuilder() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [subCategories, setSubCategories] = useState({});

  // Backend-ready Form State
  const [formData, setFormData] = useState({
    brand_name: "",
    website_url: "",
    logo_file: null,
    logo_preview: "",
    brief_files: [],
    project_goals: [],
    business_description: "",
    monthly_budget: "",
    project_duration: "3 mnths",
    location_targeting: "",
    social_links: "",
    top_competitors: "",
    usp: "",
    ad_accounts: [],
    ga_access: "No",
    has_creative_team: "no",
    penalized: "not sure",
    site_age: "",
    page_count: "",
  });

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMultiOption = (fieldName, option) => {
    setFormData((prev) => {
      const current = prev[fieldName] || [];
      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return { ...prev, [fieldName]: updated };
    });
  };

  // Cross-platform Logo Upload Handler
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo_file: file,
        logo_preview: URL.createObjectURL(file),
      }));
    }
  };

  // Cross-platform Document Upload Handler
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        brief_files: [...prev.brief_files, ...files],
      }));
    }
  };

  const removeDoc = (index) => {
    setFormData((prev) => ({
      ...prev,
      brief_files: prev.brief_files.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 text-slate-800 font-sans p-4 sm:p-8 relative selection:bg-blue-500 selection:text-white">
      {/* PRINT CSS OVERRIDES */}
      <style>{`
        #printable-proposal-root { display: none; }
        @media print {
          body * { display: none !important; }
          #printable-proposal-root, #printable-proposal-root * {
            display: block !important;
            visibility: visible !important;
          }
          #printable-proposal-root {
            position: absolute !important;
            left: 0 !important; top: 0 !important;
            width: 100% !important;
            background: #ffffff !important;
            color: #0f172a !important;
            padding: 0 !important; margin: 0 !important;
          }
          .print-avoid-break { page-break-inside: avoid !important; }
          @page { size: A4 portrait; margin: 15mm; }
        }
      `}</style>

      {/* BACKGROUND ORBS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 print:hidden">
        <div className="absolute -top-30 -left-30 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-30 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* APP HEADER */}
      <div className="relative z-10 max-w-5xl mx-auto mb-8 print:hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/20 text-white">
              <Sparkles size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">
                Proposal Studio
              </h1>
              <p className="text-xs font-bold text-blue-600 flex items-center gap-1.5 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                Cross-Platform Interactive Questionnaire
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200">
            <Layers className="text-blue-600" size={16} />
            <span className="text-xs font-bold text-slate-700">
              Step {step} of 3
            </span>
          </div>
        </div>
      </div>

      {/* STEP 1: SERVICE SELECTION */}
      {step === 1 && (
        <div className="relative z-10 max-w-5xl mx-auto space-y-8 print:hidden">
          <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white shadow-xl shadow-slate-200/50 space-y-8">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                1. Select Target Services
              </h2>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Select the required services for this campaign proposal.
              </p>
            </div>

            {SERVICE_TAXONOMY.map((group) => (
              <div key={group.category} className="space-y-4">
                <h3 className="text-xs font-black tracking-widest text-blue-600 uppercase flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  {group.category}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {group.items.map((svc) => {
                    const isSelected = selectedServices.includes(svc.id);
                    const Icon = svc.icon;
                    return (
                      <div
                        key={svc.id}
                        onClick={() => toggleService(svc.id)}
                        className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                          isSelected
                            ? "bg-gradient-to-br from-blue-50/90 to-indigo-50/80 border-blue-500 shadow-lg shadow-blue-500/10 scale-[1.01]"
                            : "bg-white border-slate-200/80 hover:border-blue-300 hover:bg-slate-50/50"
                        }`}
                      >
                        {isSelected && (
                          <div
                            className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${svc.color}`}
                          />
                        )}

                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-2xl bg-gradient-to-br ${svc.color} text-white shadow-md ${svc.shadow}`}
                          >
                            <Icon size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                                {svc.name}
                              </h4>
                              <div
                                className={`h-5 w-5 rounded-full border flex items-center justify-center transition ${
                                  isSelected
                                    ? "bg-blue-600 border-blue-600 text-white font-bold"
                                    : "border-slate-300"
                                }`}
                              >
                                {isSelected && <CheckCircle2 size={14} />}
                              </div>
                            </div>
                            <p className="text-xs text-slate-500 font-medium mt-1">
                              {svc.desc}
                            </p>

                            {isSelected && svc.hasSubCategory && (
                              <div
                                className="mt-4 pt-3 border-t border-blue-200/60"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <label
                                  htmlFor={`subcat-${svc.id}`}
                                  className="text-[11px] font-bold text-blue-700 block mb-1"
                                >
                                  Sub-Category Industry Focus:
                                </label>
                                <select
                                  id={`subcat-${svc.id}`}
                                  name={`subcat_${svc.id}`}
                                  value={subCategories[svc.id] || "ecommerce"}
                                  onChange={(e) =>
                                    setSubCategories({
                                      ...subCategories,
                                      [svc.id]: e.target.value,
                                    })
                                  }
                                  className="w-full text-xs font-semibold p-2.5 bg-white rounded-xl border border-blue-200 text-slate-800 focus:border-blue-500 focus:outline-none"
                                >
                                  {WEB_DEV_SUB_CATEGORIES.map((sc) => (
                                    <option key={sc.id} value={sc.id}>
                                      {sc.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <button
                disabled={selectedServices.length === 0}
                onClick={() => setStep(2)}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-4 text-xs font-black text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110 disabled:opacity-40 cursor-pointer"
              >
                <span>Proceed to Questionnaire</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: DEDUPLICATED FORM */}
      {step === 2 && (
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 print:hidden">
          <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white shadow-xl shadow-slate-200/50 space-y-8">
            {/* STEP 2 HEADER WITH BACK BUTTON */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  2. Initial Questionnaire
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fill in the details below. Fully compatible across all
                  devices.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to Services
              </button>
            </div>

            {/* ASSETS & LOGO UPLOAD */}
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200/80">
                <span className="text-xs font-black text-purple-700 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles size={14} /> Brand Profile & Media Assets
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="brand_name"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Brand / Business Name *
                  </label>
                  <input
                    id="brand_name"
                    name="brand_name"
                    type="text"
                    placeholder="e.g., Acme Corporation"
                    value={formData.brand_name}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="website_url"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Website URL *
                  </label>
                  <input
                    id="website_url"
                    name="website_url"
                    type="text"
                    placeholder="https://www.example.com"
                    value={formData.website_url}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* LOGO IMAGE UPLOAD */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Upload Brand Logo
                  </label>
                  <div className="relative">
                    <input
                      id="logo_file"
                      name="logo_file"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="logo_file"
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 cursor-pointer hover:border-blue-500 transition"
                    >
                      {formData.logo_preview ? (
                        <img
                          src={formData.logo_preview}
                          alt="Logo Preview"
                          className="h-8 w-8 object-contain rounded-lg border bg-white"
                        />
                      ) : (
                        <ImageIcon className="text-slate-400" size={20} />
                      )}
                      <span className="text-xs font-semibold text-slate-600 truncate">
                        {formData.logo_file
                          ? formData.logo_file.name
                          : "Choose logo image (PNG, JPG, SVG)..."}
                      </span>
                    </label>
                  </div>
                </div>

                {/* DOCUMENT BRIEF UPLOAD */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Upload Brief / Documents
                  </label>
                  <div className="relative">
                    <input
                      id="brief_files"
                      name="brief_files"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.png,.jpg"
                      onChange={handleDocumentUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="brief_files"
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 cursor-pointer hover:border-blue-500 transition"
                    >
                      <Upload className="text-slate-400" size={20} />
                      <span className="text-xs font-semibold text-slate-600 truncate">
                        Choose document files (PDF, DOCX)...
                      </span>
                    </label>
                  </div>
                </div>

                {/* ATTACHED DOCUMENTS LIST */}
                {formData.brief_files.length > 0 && (
                  <div className="sm:col-span-2 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500">
                      Attached Documents:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {formData.brief_files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-700"
                        >
                          <FileText size={14} />
                          <span className="font-semibold truncate max-w-[150px]">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeDoc(idx)}
                            className="hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TIER 1: CORE GOALS */}
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200/80">
                <span className="text-xs font-black text-blue-700 uppercase tracking-widest flex items-center gap-2">
                  <Globe size={14} /> Tier 1: Core Objectives & Parameters
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    What is the goal of the project? *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {GOAL_OPTIONS.map((goal) => {
                      const isSelected = (
                        formData.project_goals || []
                      ).includes(goal);
                      return (
                        <button
                          key={goal}
                          type="button"
                          onClick={() =>
                            toggleMultiOption("project_goals", goal)
                          }
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {goal}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="business_description"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    A short description about the business *
                  </label>
                  <textarea
                    id="business_description"
                    name="business_description"
                    rows={3}
                    placeholder="Describe products, services, value proposition..."
                    value={formData.business_description}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="monthly_budget"
                      className="block text-xs font-bold text-slate-700 mb-1"
                    >
                      Monthly Budget ($) *
                    </label>
                    <input
                      id="monthly_budget"
                      name="monthly_budget"
                      type="text"
                      placeholder="$5,000 - $10,000"
                      value={formData.monthly_budget}
                      onChange={handleInputChange}
                      className="w-full text-xs p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="project_duration"
                      className="block text-xs font-bold text-slate-700 mb-1"
                    >
                      Project Duration *
                    </label>
                    <select
                      id="project_duration"
                      name="project_duration"
                      value={formData.project_duration}
                      onChange={handleInputChange}
                      className="w-full text-xs p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="3 mnths">3 Months</option>
                      <option value=">6mnths">&gt; 6 Months</option>
                      <option value=">1 yr">&gt; 1 Year</option>
                      <option value="<1 yr">&lt; 1 Year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location_targeting"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Target Location(s) *
                  </label>
                  <input
                    id="location_targeting"
                    name="location_targeting"
                    type="text"
                    placeholder="e.g., California, US, Global, Local City"
                    value={formData.location_targeting}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="social_links"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Social Media Links
                  </label>
                  <textarea
                    id="social_links"
                    name="social_links"
                    rows={2}
                    placeholder="Facebook, LinkedIn, Instagram, Twitter/X profiles..."
                    value={formData.social_links}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="top_competitors"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Top Competitors *
                  </label>
                  <input
                    id="top_competitors"
                    name="top_competitors"
                    type="text"
                    placeholder="Competitor A, Competitor B"
                    value={formData.top_competitors}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* TIER 2: TECHNICAL DETAILS */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                <span className="text-xs font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                  <Target size={14} /> Tier 2: Technical Parameters
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Existing Ad Accounts
                  </label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {AD_ACCOUNT_OPTIONS.map((acc) => {
                      const isSelected = (formData.ad_accounts || []).includes(
                        acc,
                      );
                      return (
                        <button
                          key={acc}
                          type="button"
                          onClick={() => toggleMultiOption("ad_accounts", acc)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                            isSelected
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          {acc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ga_access"
                    className="block text-xs font-bold text-slate-700 mb-1"
                  >
                    Google Analytics Access?
                  </label>
                  <select
                    id="ga_access"
                    name="ga_access"
                    value={formData.ga_access}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3.5 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No GA Account">No GA Account</option>
                  </select>
                </div>
              </div>
            </div>

            {/* FOOTER BUTTONS WITH PREV BUTTON */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Previous Step</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-4 text-xs font-black text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110 cursor-pointer"
              >
                <span>Generate Proposal</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: PREVIEW */}
      {step === 3 && (
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 print:hidden">
          <div className="flex items-center justify-between bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white shadow-xl shadow-slate-200/50">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Form
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-xs font-black text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110 cursor-pointer"
            >
              <Download size={16} />
              <span>Download PDF / Print</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 text-slate-900 shadow-2xl space-y-8 border border-slate-100">
            <ProposalDocumentView
              formData={formData}
              selectedServices={selectedServices}
              subCategories={subCategories}
            />
          </div>
        </div>
      )}

      {/* PRINT ENGINE */}
      <div id="printable-proposal-root">
        <ProposalDocumentView
          formData={formData}
          selectedServices={selectedServices}
          subCategories={subCategories}
        />
      </div>
    </div>
  );
}

// DOCUMENT PREVIEW COMPONENT
function ProposalDocumentView({ formData, selectedServices, subCategories }) {
  const brandName = formData.brand_name || "Client Business";

  return (
    <div className="bg-white p-8 sm:p-12 space-y-8 text-slate-800 font-sans">
      <div className="flex items-center justify-between border-b-2 border-slate-100 pb-6">
        <div className="flex items-center gap-3">
          {formData.logo_preview ? (
            <img
              src={formData.logo_preview}
              alt="Brand Logo"
              className="h-12 w-auto max-w-[120px] object-contain"
            />
          ) : (
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-lg shadow-md">
              iB
            </div>
          )}
          <div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              AgencyOS
            </span>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              Growth Strategy Proposal
            </p>
          </div>
        </div>
        <div className="text-right text-xs">
          <p className="font-black text-slate-900">
            PROPOSAL #{Math.floor(100000 + Math.random() * 900000)}
          </p>
          <p className="font-medium text-slate-500">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-lg uppercase tracking-wider">
          Digital Strategy Proposal
        </span>
        <h1 className="text-3xl font-black text-slate-900 leading-tight">
          Growth Strategy for {brandName}
        </h1>
        <p className="text-xs font-medium text-slate-600 max-w-2xl leading-relaxed">
          {formData.business_description ||
            "Customized strategy generated based on campaign objectives and conversion targets."}
        </p>
      </div>

      <hr className="border-t-2 border-slate-900" />

      <section className="space-y-4 print-avoid-break">
        <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">
          01. Campaign Objectives
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="font-bold text-slate-400 uppercase text-[10px]">
              Target Goals:
            </span>
            <p className="font-bold text-slate-900 mt-1">
              {formData.project_goals?.join(", ") || "Sales & Branding"}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="font-bold text-slate-400 uppercase text-[10px]">
              Monthly Budget:
            </span>
            <p className="font-bold text-slate-900 mt-1">
              {formData.monthly_budget || "Custom Budget"}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4 print-avoid-break">
        <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">
          02. Selected Services ({selectedServices.length})
        </h2>
        <div className="space-y-3">
          {selectedServices.map((svcId) => {
            const activeSub = subCategories[svcId];
            return (
              <div
                key={svcId}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50"
              >
                <h3 className="text-xs font-extrabold text-blue-700 uppercase tracking-wider">
                  • {svcId.toUpperCase()}{" "}
                  {activeSub ? `[${activeSub.toUpperCase()}]` : ""}
                </h3>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
