import React, { useRef } from "react";
import { X, Download, Globe, Route, Info } from "lucide-react";

export default function ProposalModal({ isOpen, onClose, clientData }) {
  const proposalRef = useRef(null);

  if (!isOpen) return null;

  const clientName = clientData?.name || "Quantum Leap Inc.";
  const contactName = clientData?.contactName || "Sarah Jenkins, CEO";

  const handleDownloadPDF = () => {
    // Triggers native print preview cleanly formatted as PDF
    window.print();
  };

  return (
    <>
      {/* PRINT STYLES - Fixes scrollbars, page repetition, and fixed heights */}
      <style>{`
        @media print {
          /* Hide everything on the screen except the proposal document */
          body * {
            visibility: hidden !important;
          }

          /* Show only the proposal document */
          #pdf-proposal-content, #pdf-proposal-content * {
            visibility: visible !important;
          }

          /* Position content at the absolute top of the page */
          #pdf-proposal-content {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
            max-height: none !important;
            height: auto !important;
            background: white !important;
          }

          /* Hide scrollbars during print */
          ::-webkit-scrollbar {
            display: none !important;
          }

          /* Prevent page breaks inside cards & tables */
          section, table, .avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Reset backdrop overlay during print */
          .modal-overlay {
            position: static !important;
            background: none !important;
            padding: 0 !important;
          }

          .modal-container {
            max-height: none !important;
            height: auto !important;
            box-shadow: none !important;
            border: none !important;
            overflow: visible !important;
          }
        }
      `}</style>

      {/* MODAL OVERLAY */}
      <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 print:p-0">
        {/* MODAL CONTAINER */}
        <div className="modal-container relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 print:shadow-none print:max-h-none print:overflow-visible">
          {/* MODAL HEADER (Hidden during printing/download) */}
          <div className="print:hidden flex items-center justify-between border-b border-gray-100 bg-slate-50/80 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-black text-blue-700">
                PDF PREVIEW
              </span>
              <span className="text-sm font-bold text-gray-600">
                Proposal_{clientName.replace(/\s+/g, "_")}.pdf
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 cursor-pointer"
              >
                <Download size={15} />
                <span>Download PDF</span>
              </button>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-gray-400 hover:bg-gray-200/60 hover:text-gray-700 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* SCROLLABLE CONTAINER FOR ON-SCREEN DISPLAY */}
          <div className="overflow-y-auto p-6 sm:p-10 bg-gray-100/50 print:bg-white print:p-0 print:overflow-visible">
            {/* PROPOSAL DOCUMENT (ID targeted by print styles) */}
            <div
              id="pdf-proposal-content"
              ref={proposalRef}
              className="bg-white p-8 sm:p-12 rounded-xl shadow-xs space-y-10 text-gray-800 font-sans print:p-0 print:shadow-none"
            >
              {/* BRAND HEADER */}
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white font-black text-sm">
                  iB
                </div>
                <span className="text-lg font-bold text-gray-900">
                  AgencyOS
                </span>
              </div>

              {/* TITLE & METADATA */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-blue-600 leading-tight">
                    Quantum Leap:
                  </h1>
                  <h1 className="text-2xl font-bold text-blue-600 leading-tight">
                    The Global Identity Evolution
                  </h1>
                  <div className="mt-3 h-1.5 w-24 bg-blue-600 rounded-full" />
                </div>

                <p className="text-sm font-medium text-gray-500 max-w-xl">
                  A comprehensive proposal for the strategic modernization of{" "}
                  {clientName}'s digital ecosystem and brand architecture.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between pt-4 text-xs">
                  <div className="space-y-1">
                    <p className="font-bold tracking-wider text-gray-400 uppercase">
                      PREPARED FOR
                    </p>
                    <p className="font-extrabold text-gray-900 text-sm">
                      {clientName}
                    </p>
                    <p className="font-semibold text-gray-600">
                      Attn: {contactName}
                    </p>
                  </div>

                  <div className="space-y-1 sm:text-right mt-4 sm:mt-0">
                    <p className="font-bold tracking-wider text-gray-400 uppercase">
                      DATE ISSUED
                    </p>
                    <p className="font-extrabold text-gray-900 text-sm">
                      May 24, 2024
                    </p>
                    <p className="font-bold tracking-wider text-gray-400 uppercase pt-1">
                      PROPOSAL ID
                    </p>
                    <p className="font-extrabold text-gray-900">#QL-2024-001</p>
                  </div>
                </div>
              </div>

              <hr className="border-t-4 border-blue-600 rounded-full" />

              {/* 01. PROJECT OVERVIEW */}
              <section className="space-y-4 avoid-break">
                <h2 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">
                  01. Project Overview
                </h2>
                <p className="text-sm leading-relaxed font-medium text-gray-600">
                  {clientName} stands at a pivotal junction of growth. To
                  facilitate a successful global expansion, the existing brand
                  architecture requires a transformation that aligns with your
                  status as a tech innovator while ensuring deep resonance with
                  diverse international markets. Our strategy focuses on
                  "Focused Scalability"—building a digital and visual language
                  that grows with you.
                </p>

                {/* STRATEGIC PILLARS */}
                <div className="pt-2 avoid-break">
                  <h3 className="text-xs font-black tracking-wider text-blue-600 uppercase mb-3">
                    STRATEGIC PILLARS
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-gray-100 bg-slate-50/70 p-5 space-y-2">
                      <Globe className="text-blue-600" size={20} />
                      <h4 className="font-bold text-gray-900 text-sm">
                        Global Resonance
                      </h4>
                      <p className="text-xs font-medium text-gray-500 leading-relaxed">
                        Design systems that bridge regional aesthetic gaps while
                        maintaining a unified core identity.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-slate-50/70 p-5 space-y-2">
                      <Route className="text-blue-600" size={20} />
                      <h4 className="font-bold text-gray-900 text-sm">
                        UX Precision
                      </h4>
                      <p className="text-xs font-medium text-gray-500 leading-relaxed">
                        Data-driven user journeys designed specifically to
                        increase B2B conversion by 35%.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 02. SCOPE OF WORK */}
              <section className="space-y-4 avoid-break">
                <h2 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">
                  02. Scope of Work
                </h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span className="text-gray-900">
                        Phase 1: Brand Evolution
                      </span>
                      <span className="text-gray-400 font-semibold text-xs">
                        Weeks 1-4
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2 text-xs font-medium text-gray-600 list-disc pl-5">
                      <li>Primary and Secondary Brand Identity Design</li>
                      <li>
                        Color Palette & Typography System (Multi-lingual
                        support)
                      </li>
                      <li>Digital Brand Guidelines & Component Library</li>
                      <li>
                        Corporate Asset Templates (Decks, Business Cards,
                        Stationery)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span className="text-gray-900">
                        Phase 2: Digital Ecosystem
                      </span>
                      <span className="text-gray-400 font-semibold text-xs">
                        Weeks 5-12
                      </span>
                    </div>
                    <ul className="mt-3 space-y-2 text-xs font-medium text-gray-600 list-disc pl-5">
                      <li>Strategic Information Architecture & Sitemap</li>
                      <li>High-fidelity UX Prototypes for Enterprise Web</li>
                      <li>Custom CMS Development (Headless architecture)</li>
                      <li>Third-party API Integrations (CRM & Lead Gen)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 03. BUDGET BREAKDOWN */}
              <section className="space-y-4 avoid-break">
                <h2 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">
                  03. Budget Breakdown
                </h2>

                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-slate-50/50">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200/60 text-gray-500 font-bold uppercase tracking-wider">
                        <th className="p-4">SERVICE</th>
                        <th className="p-4 text-right">INVESTMENT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                      <tr>
                        <td className="p-4">
                          Brand Strategy & Identity System
                        </td>
                        <td className="p-4 text-right font-bold">$45,000</td>
                      </tr>
                      <tr>
                        <td className="p-4">UX/UI Design & Prototyping</td>
                        <td className="p-4 text-right font-bold">$35,000</td>
                      </tr>
                      <tr>
                        <td className="p-4">Frontend & CMS Development</td>
                        <td className="p-4 text-right font-bold">$30,000</td>
                      </tr>
                      <tr>
                        <td className="p-4">Project Management & Deployment</td>
                        <td className="p-4 text-right font-bold">$10,000</td>
                      </tr>
                      <tr className="bg-blue-50/80 font-black text-blue-900">
                        <td className="p-4 text-sm">
                          Total Project Investment (Phase 1)
                        </td>
                        <td className="p-4 text-right text-sm font-extrabold">
                          $120,000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* PAYMENT TERMS */}
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200/60 bg-amber-50/40 p-4 text-xs avoid-break">
                  <Info className="text-amber-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="font-bold text-amber-900">Payment Terms</p>
                    <p className="mt-1 font-medium text-amber-800/80">
                      30% upfront deposit, 40% upon Phase 1 completion, 30% upon
                      final delivery.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
