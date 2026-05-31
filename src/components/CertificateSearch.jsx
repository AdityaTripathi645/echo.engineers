import { useState } from "react";
import participantsCSV from "../assets/participants.csv?raw";

const EVENTS = [
  "AI VIBE QUIZ 2026",
  "AI VIBEATHON 2026",
  "Web Development Workshop",
  "Hackathon 2026",
];

// ── CSV Data Fetcher ──────────────────────────────────────────────────────
async function fetchSheetData() {
  const rows = participantsCSV.trim().split("\n");
  const headers = rows[0].split(",").map((h) => h.trim());
  return rows.slice(1).map((row) => {
    const vals = row.split(",").map((v) => v.trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = vals[i] || "";
    });
    return obj;
  });
}

// Demo fallback data (used when sheet not configured)
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

export default function CertificateSearch({ mode, onResult, onReset }) {
  const [event, setEvent] = useState("");
  const [email, setEmail] = useState("");
  const [credId, setCredId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    if (mode === "search" && (!event || !email)) {
      setError("Please select an event and enter your email.");
      return;
    }
    if (mode === "verify" && !credId) {
      setError("Please enter a Credential ID.");
      return;
    }
    setLoading(true);
    try {
      let data = DEMO_DATA;
      try {
        data = await fetchSheetData();
      } catch {
        // Sheet not configured – use demo data silently
      }

      let found = null;
      if (mode === "search") {
        found = data.find(
          (r) =>
            r.Event?.toLowerCase() === event.toLowerCase() &&
            r.Email?.toLowerCase() === email.toLowerCase(),
        );
      } else {
        found = data.find(
          (r) =>
            r["Credential ID"]?.toLowerCase() === credId.trim().toLowerCase(),
        );
      }
      onResult(found || null);
    } catch {
      setError("Failed to fetch certificate data. Please try again.");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setEvent("");
    setEmail("");
    setCredId("");
    setError("");
    onReset();
  };

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      {mode === "search" && (
        <>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Select Event
            </label>
            <select
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0d3b6e] dark:focus:ring-teal-400 transition"
            >
              <option value="">— Choose an event —</option>
              {EVENTS.map((ev) => (
                <option key={ev} value={ev}>
                  {ev}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter your registered email"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d3b6e] dark:focus:ring-teal-400 transition"
            />
          </div>
        </>
      )}

      {mode === "verify" && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Credential ID
          </label>
          <input
            type="text"
            value={credId}
            onChange={(e) => setCredId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="e.g. AIVQ2026-001"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0d3b6e] dark:focus:ring-teal-400 transition font-mono tracking-widest"
          />
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
          ⚠️ {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSearch}
          disabled={loading}
          className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-[#0d3b6e] to-[#0e6655] text-white font-semibold shadow-lg shadow-blue-900/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Searching…
            </span>
          ) : (
            "Get Certificate"
          )}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
        >
          Reset
        </button>
      </div>

      {/* <p className="text-xs text-center text-slate-400">
        Data is fetched from a Google Sheet. Configure{" "}
        <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">
          SHEET_CSV_URL
        </code>{" "}
        in CertificateSearch.jsx.
      </p> */}
    </div>
  );
}
