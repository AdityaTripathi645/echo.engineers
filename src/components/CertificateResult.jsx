import { useState } from "react";
import CertificatePreviewModal from "./CertificatePreviewModal";

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
    >
      {copied ? "✅ Copied!" : `📋 ${label}`}
    </button>
  );
}

export default function CertificateResult({ certificate }) {
  const [showModal, setShowModal] = useState(false);

  const baseUrl = "https://echoengineers.vercel.app";

  if (certificate === null) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/30 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">❌</span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          No Certificate Found
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
          We couldn't find a certificate matching your details. Please check
          your email or event selection and try again.
        </p>
        <p className="mt-4 text-xs text-slate-400">
          Contact us at{" "}
          <a
            href="mailto:echoengineers@muit.in"
            className="text-[#0d3b6e] dark:text-teal-400 underline"
          >
            echoengineers@muit.in
          </a>{" "}
          if you believe this is an error.
        </p>
      </div>
    );
  }

  const credId = certificate["Credential ID"];
  const credUrl = `${baseUrl}/certificate/${credId}`;
  const linkedinText = `${certificate.Event} | Echo Engineers\nCredential ID: ${credId}\n${credUrl}`;

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-green-100 dark:border-green-900/30 overflow-hidden">
        {/* Success banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <div className="text-white font-bold text-lg">
              Certificate Found!
            </div>
            <div className="text-white/70 text-xs">
              Verified by Echo Engineers
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Certificate details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Participant Name",
                value: certificate.Name,
                icon: "👤",
              },
              { label: "Event", value: certificate.Event, icon: "🏆" },
              {
                label: "Issue Date",
                value: certificate["Issue Date"],
                icon: "📅",
              },
              { label: "Credential ID", value: credId, icon: "🆔", mono: true },
            ].map(({ label, value, icon, mono }) => (
              <div
                key={label}
                className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700"
              >
                <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                  {icon} {label}
                </div>
                <div
                  className={`text-slate-800 dark:text-slate-100 font-semibold ${mono ? "font-mono text-sm text-[#0d3b6e] dark:text-teal-400" : ""}`}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Verification URL */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-xl p-4">
            <div className="text-xs text-blue-600 dark:text-blue-400 mb-1 font-medium">
              🔗 Verification URL
            </div>
            <div className="text-sm font-mono text-slate-700 dark:text-slate-200 break-all">
              {credUrl}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b6e] to-[#0e6655] text-white text-sm font-semibold shadow hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              👁️ View Certificate
            </button>
            {certificate["Certificate URL"] && (
              <a
                href={certificate["Certificate URL"]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-600 text-white text-sm font-semibold hover:opacity-90 transition"
              >
                ⬇️ Download
              </a>
            )}
            <CopyButton text={credId} label="Copy ID" />
            <CopyButton text={credUrl} label="Copy URL" />
          </div>

          {/* LinkedIn */}
          <div className="border border-[#0077b5]/20 dark:border-[#0077b5]/30 rounded-xl p-5 bg-blue-50/30 dark:bg-blue-900/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-[#0077b5] rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">in</span>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                Add to LinkedIn Certification
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Go to your LinkedIn profile → Add profile section → Licenses &
              Certifications → Fill in the details below:
            </p>
            <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2 mb-4 bg-white dark:bg-slate-700/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700">
              <div className="border-b border-slate-200 dark:border-slate-600 pb-2">
                <div className="text-xs text-slate-400 font-semibold mb-1">
                  CREDENTIAL NAME
                </div>
                <div className="font-medium text-slate-700 dark:text-slate-200">
                  {certificate.Event}
                </div>
              </div>
              <div className="border-b border-slate-200 dark:border-slate-600 pb-2">
                <div className="text-xs text-slate-400 font-semibold mb-1">
                  ISSUED BY
                </div>
                <div className="font-medium text-slate-700 dark:text-slate-200">
                  Echo Engineers - GFG Student Chapter
                </div>
              </div>
              <div className="border-b border-slate-200 dark:border-slate-600 pb-2">
                <div className="text-xs text-slate-400 font-semibold mb-1">
                  ISSUE DATE
                </div>
                <div className="font-medium text-slate-700 dark:text-slate-200">
                  {certificate["Issue Date"]}
                </div>
              </div>
              <div className="border-b border-slate-200 dark:border-slate-600 pb-2">
                <div className="text-xs text-slate-400 font-semibold mb-1">
                  CREDENTIAL ID
                </div>
                <div className="font-mono font-medium text-[#0d3b6e] dark:text-teal-400">
                  {credId}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold mb-1">
                  CREDENTIAL URL
                </div>
                <div className="font-mono text-xs text-slate-700 dark:text-slate-200 break-all">
                  {credUrl}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <CopyButton text={linkedinText} label="Copy All Details" />
              <button
                onClick={() => {
                  const issueDate = certificate["Issue Date"] || "";
                  let issueYear = "NaN";
                  let issueMonth = "NaN";
                  // Try to parse a year and month from the issue date
                  try {
                    const parsed = new Date(issueDate);
                    if (!isNaN(parsed.getTime())) {
                      issueYear = String(parsed.getFullYear());
                      issueMonth = String(parsed.getMonth() + 1);
                    } else {
                      const m = issueDate.match(/(\d{4})/);
                      if (m) issueYear = m[1];
                    }
                  } catch (e) {
                    // leave as NaN
                  }

                  const params = new URLSearchParams({
                    startTask: "CERTIFICATION_NAME",
                    name: certificate.Event || "",
                    organizationId: "117304338",
                    issueYear,
                    issueMonth,
                    certUrl: credUrl,
                    certId: credId,
                  });

                  const linkedinShareUrl = `https://www.linkedin.com/profile/add?${params.toString()}`;
                  window.open(linkedinShareUrl, "_blank");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077b5] text-white text-xs font-medium hover:bg-[#005885] transition"
              >
                🔗 Add to LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <CertificatePreviewModal
          certificate={certificate}
          credUrl={credUrl}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
