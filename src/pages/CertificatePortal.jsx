import { useState } from "react";
import CertificateSearch from "../components/CertificateSearch";
import CertificateResult from "../components/CertificateResult";

export default function CertificatePortal() {
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0d3b6e] via-[#1a5276] to-[#0e6655] py-16 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-teal-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium">
              Echo Engineers · GFG Student Chapter
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Certificate Portal
          </h1>
          <p className="text-blue-100/80 text-lg max-w-xl mx-auto">
            Access, verify, and download your certificates from Echo Engineers
            events.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-5xl mx-auto px-4 -mt-5">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="flex border-b border-slate-100 dark:border-slate-700">
            {[
              {
                id: "search",
                label: "🔍 Find Certificate",
                desc: "Search by email or ID",
              },
              {
                id: "verify",
                label: "✅ Verify",
                desc: "Enter credential ID",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setResult(null);
                  setSearched(false);
                  setActiveTab(tab.id);
                }}
                className={`flex-1 px-4 py-4 text-center transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-b from-[#0d3b6e]/5 to-transparent border-b-2 border-[#0d3b6e] dark:border-teal-400"
                    : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
                }`}
              >
                <div
                  className={`font-semibold text-sm ${activeTab === tab.id ? "text-[#0d3b6e] dark:text-teal-400" : "text-slate-500 dark:text-slate-400"}`}
                >
                  {tab.label}
                </div>
                <div className="text-xs text-slate-400 hidden sm:block mt-0.5">
                  {tab.desc}
                </div>
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            <CertificateSearch
              mode={activeTab}
              onResult={(r) => {
                setResult(r);
                setSearched(true);
              }}
              onReset={() => {
                setResult(null);
                setSearched(false);
              }}
            />
          </div>
        </div>
      </div>

      {/* Result */}
      {searched && (
        <div className="max-w-5xl mx-auto px-4 mt-6 pb-16">
          <CertificateResult certificate={result} />
        </div>
      )}
    </div>
  );
}
