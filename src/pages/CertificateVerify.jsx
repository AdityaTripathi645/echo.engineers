import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CertificatePreviewModal from "../components/CertificatePreviewModal";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:csv&sheet=Sheet1";

const DEMO_DATA = [
  {
    "Credential ID": "AIVQ2026-001",
    Name: "Aditya Tripathi",
    Email: "aditya@gmail.com",
    Event: "AI VIBE QUIZ 2026",
    "Issue Date": "30 May 2026",
    "Certificate URL": "",
  },
  {
    "Credential ID": "AIVQ2026-002",
    Name: "Rahul Kumar",
    Email: "rahul@gmail.com",
    Event: "AI VIBE QUIZ 2026",
    "Issue Date": "30 May 2026",
    "Certificate URL": "",
  },
];

async function fetchSheetData() {
  const res = await fetch(SHEET_CSV_URL);
  const text = await res.text();
  const rows = text.trim().split("\n");
  const headers = rows[0].replace(/"/g, "").split(",");
  return rows.slice(1).map((row) => {
    const vals = row.match(/(".*?"|[^,]+)(?=,|$)/g) || [];
    const obj = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = (vals[i] || "").replace(/"/g, "").trim();
    });
    return obj;
  });
}

export default function CertificateVerify() {
  const { credentialId } = useParams();
  const [cert, setCert] = useState(undefined); // undefined = loading, null = not found
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      let data = DEMO_DATA;
      try {
        data = await fetchSheetData();
      } catch {}
      const found = data.find(
        (r) =>
          r["Credential ID"]?.toLowerCase() === credentialId?.toLowerCase(),
      );
      setCert(found || null);
    })();
  }, [credentialId]);

  const credUrl = `https://echo-engineers.vercel.app/certificate/${credentialId}`;

  if (cert === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#0d3b6e] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400">
            Verifying certificate…
          </p>
        </div>
      </div>
    );
  }

  if (cert === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/30 p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Certificate Not Found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
            No certificate found for ID:{" "}
            <code className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">
              {credentialId}
            </code>
          </p>
          <p className="text-slate-400 text-xs mb-6">
            This certificate may be invalid or the ID may be incorrect.
          </p>
          <Link
            to="/certificates"
            className="inline-block px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b6e] to-[#0e6655] text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Go to Certificate Portal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-teal-50/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 px-4">
        {/* Top bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#0d3b6e] dark:hover:text-teal-400 transition"
          >
            ← Back to Echo Engineers
          </Link>
        </div>

        {/* Verified card */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0d3b6e] via-[#1a5276] to-[#0e6655] px-8 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Certificate Verified
            </h1>
            <p className="text-blue-100/70 text-sm">
              This certificate has been verified by Echo Engineers
            </p>
          </div>

          {/* Branding */}
          <div className="flex items-center justify-center gap-3 py-4 border-b border-slate-100 dark:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0d3b6e] to-[#0e6655] flex items-center justify-center text-white text-xs font-bold">
              EE
            </div>
            <div>
              <div className="text-xs font-bold text-[#0d3b6e] dark:text-teal-400">
                ECHO ENGINEERS
              </div>
              <div className="text-xs text-slate-400">
                GFG Student Chapter · MUIT Noida
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 space-y-4">
            {[
              { label: "Participant Name", value: cert.Name, big: true },
              { label: "Event", value: cert.Event },
              { label: "Issue Date", value: cert["Issue Date"] },
              {
                label: "Credential ID",
                value: cert["Credential ID"],
                mono: true,
              },
            ].map(({ label, value, big, mono }) => (
              <div
                key={label}
                className="flex items-start justify-between gap-4 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0"
              >
                <span className="text-sm text-slate-400">{label}</span>
                <span
                  className={`text-right font-semibold text-slate-800 dark:text-slate-100 ${big ? "text-lg" : ""} ${mono ? "font-mono text-[#0d3b6e] dark:text-teal-400 text-sm" : ""}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="px-8 pb-8 flex flex-wrap gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 min-w-[140px] py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b6e] to-[#0e6655] text-white text-sm font-semibold hover:opacity-90 transition"
            >
              👁️ View Certificate
            </button>
            <button
              onClick={() =>
                navigator.clipboard.writeText(cert["Credential ID"])
              }
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              📋 Copy ID
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(credUrl)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              🔗 Copy URL
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Certificate issued by{" "}
          <strong className="text-[#0d3b6e] dark:text-teal-400">
            Echo Engineers – GFG Student Chapter
          </strong>
        </p>
      </div>

      {showModal && (
        <CertificatePreviewModal
          certificate={cert}
          credUrl={credUrl}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
