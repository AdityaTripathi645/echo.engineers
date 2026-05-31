import { useState, useRef } from "react";
import QRCode from "qrcode";
import Papa from "papaparse";

const BASE_URL = "https://echoengineers.vercel.app";

function generateCredentialId(event, index) {
  const prefixMap = {
    "AI VIBE QUIZ 2026": "AIVQ2026",
    "AI VIBEATHON 2026": "AIVB2026",
    "Web Development Workshop": "WDW2026",
    "Hackathon 2026": "HACK2026",
  };
  const prefix = prefixMap[event] || "CERT2026";
  return `${prefix}-${String(index + 1).padStart(3, "0")}`;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

async function drawCertificate(canvas, participant) {
  const ctx = canvas.getContext("2d");
  const W = 1400,
    H = 990;
  canvas.width = W;
  canvas.height = H;

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  // Corner decorations
  ctx.fillStyle = "#0d3b6e";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(220, 0);
  ctx.lineTo(0, 180);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#0e6655";
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(0, H - 220);
  ctx.lineTo(200, H);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#d6eaf8";
  ctx.beginPath();
  ctx.moveTo(W, 0);
  ctx.lineTo(W - 180, 0);
  ctx.lineTo(W, 160);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#1a7a6e";
  ctx.beginPath();
  ctx.moveTo(W, H);
  ctx.lineTo(W - 260, H);
  ctx.lineTo(W, H - 200);
  ctx.closePath();
  ctx.fill();

  // Dot grid
  ctx.fillStyle = "#0d3b6e20";
  for (let x = W - 260; x < W - 80; x += 20)
    for (let y = 20; y < 180; y += 20) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

  // Border
  ctx.strokeStyle = "#0d3b6e";
  ctx.lineWidth = 2;
  ctx.strokeRect(24, 24, W - 48, H - 48);
  ctx.strokeStyle = "#0e665540";
  ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, W - 60, H - 60);

  // Logo
  ctx.fillStyle = "#0d3b6e";
  ctx.beginPath();
  ctx.arc(90, 90, 40, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0e6655";
  ctx.beginPath();
  ctx.arc(100, 100, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("EE", 95, 105);

  ctx.fillStyle = "#0d3b6e";
  ctx.font = "bold 32px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("ECHO", 150, 80);
  ctx.fillText("ENGINEERS", 150, 116);
  ctx.fillStyle = "#0e6655";
  ctx.font = "11px sans-serif";
  ctx.fillText("— GFG STUDENT CHAPTER —", 150, 136);
  ctx.strokeStyle = "#0d3b6e30";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(70, 155);
  ctx.lineTo(480, 155);
  ctx.stroke();

  // Title
  ctx.fillStyle = "#0d3b6e";
  ctx.font = "bold 68px Georgia,serif";
  ctx.textAlign = "center";
  ctx.fillText("CERTIFICATE", W / 2, 170);
  ctx.fillStyle = "#0e6655";
  ctx.font = "bold 28px Georgia,serif";
  ctx.strokeStyle = "#0e665560";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(340, 202);
  ctx.lineTo(530, 202);
  ctx.moveTo(870, 202);
  ctx.lineTo(1060, 202);
  ctx.stroke();
  ctx.fillText("OF PARTICIPATION", W / 2, 210);

  // Separator
  ctx.strokeStyle = "#0d3b6e30";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(200, 260);
  ctx.lineTo(600, 260);
  ctx.moveTo(800, 260);
  ctx.lineTo(1200, 260);
  ctx.stroke();
  ctx.fillStyle = "#888";
  ctx.font = "16px Georgia,serif";
  ctx.fillText("THIS IS PROUDLY PRESENTED TO", W / 2, 257);

  // Name
  ctx.fillStyle = "#0e6655";
  ctx.font = "italic bold 80px Georgia,serif";
  ctx.fillText(participant.Name, W / 2, 360);
  const nameW = ctx.measureText(participant.Name).width;
  ctx.strokeStyle = "#0d3b6e40";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - nameW / 2 - 20, 372);
  ctx.lineTo(W / 2 + nameW / 2 + 20, 372);
  ctx.stroke();
  ctx.fillStyle = "#0e6655";
  ctx.beginPath();
  ctx.arc(W / 2 - nameW / 2 - 30, 378, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(W / 2 + nameW / 2 + 30, 378, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#555";
  ctx.font = "20px Georgia,serif";
  ctx.fillText("for successfully participating in", W / 2, 420);

  ctx.fillStyle = "#0d3b6e";
  ctx.font = "bold 58px Georgia,serif";
  ctx.fillText(participant.Event, W / 2, 500);

  ctx.fillStyle = "#444";
  ctx.font = "18px Georgia,serif";
  ctx.fillText(
    "organised by Echo Engineers – GFG Student Chapter.",
    W / 2,
    540,
  );
  ctx.fillStyle = "#888";
  ctx.font = "italic 16px Georgia,serif";
  ctx.fillText(
    "Your enthusiasm and knowledge made this event a success.",
    W / 2,
    565,
  );

  // Info row
  ctx.strokeStyle = "#0d3b6e20";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(200, 610);
  ctx.lineTo(1200, 610);
  ctx.stroke();

  const cols = [
    { x: 350, label: "CERTIFICATE ID", value: participant["Credential ID"] },
    { x: 700, label: "ISSUE DATE", value: participant["Issue Date"] },
    {
      x: 1050,
      label: "EVENT",
      value:
        participant.Event.length > 16
          ? participant.Event.substring(0, 16) + "…"
          : participant.Event,
    },
  ];
  cols.forEach(({ x, label, value }, i) => {
    if (i > 0) {
      ctx.strokeStyle = "#0d3b6e20";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - 175, 620);
      ctx.lineTo(x - 175, 700);
      ctx.stroke();
    }
    ctx.fillStyle = "#999";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, x, 642);
    ctx.fillStyle = "#0d3b6e";
    ctx.font = "bold 20px Georgia,serif";
    ctx.fillText(value, x, 670);
  });

  // Signatures
  ctx.strokeStyle = "#0d3b6e20";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(200, 720);
  ctx.lineTo(1200, 720);
  ctx.stroke();

  ctx.fillStyle = "#0d3b6e";
  ctx.font = "italic 30px Georgia,serif";
  ctx.textAlign = "center";
  ctx.fillText("Echo Engineers", 320, 790);
  ctx.strokeStyle = "#0d3b6e60";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(180, 800);
  ctx.lineTo(460, 800);
  ctx.stroke();
  ctx.fillStyle = "#0d3b6e";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText("ECHO ENGINEERS", 320, 820);
  ctx.fillStyle = "#888";
  ctx.font = "13px sans-serif";
  ctx.fillText("Organizing Team", 320, 838);

  ctx.fillStyle = "#0e6655";
  ctx.font = "italic 30px Georgia,serif";
  ctx.fillText("GFG Chapter", 1080, 790);
  ctx.strokeStyle = "#0e665560";
  ctx.beginPath();
  ctx.moveTo(940, 800);
  ctx.lineTo(1220, 800);
  ctx.stroke();
  ctx.fillStyle = "#0e6655";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText("GFG STUDENT CHAPTER", 1080, 820);
  ctx.fillStyle = "#888";
  ctx.font = "13px sans-serif";
  ctx.fillText("Coordinator", 1080, 838);

  // Seal
  ctx.fillStyle = "#0d3b6e";
  ctx.beginPath();
  ctx.arc(700, 810, 55, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0e6655";
  ctx.beginPath();
  ctx.arc(700, 810, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 11px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("LEARN", 700, 800);
  ctx.fillText("INNOVATE", 700, 815);
  ctx.fillText("IMPACT", 700, 830);

  // QR Code
  const credUrl = `${BASE_URL}/certificate/${participant["Credential ID"]}`;
  const qrDataUrl = await QRCode.toDataURL(credUrl, {
    width: 160,
    margin: 1,
    color: { dark: "#0d3b6e" },
  });
  await new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#0d3b6e";
      ctx.lineWidth = 2;
      roundRect(ctx, 1185, 430, 180, 180, 8);
      ctx.fill();
      ctx.stroke();
      ctx.drawImage(img, 1195, 440, 160, 160);
      ctx.fillStyle = "#0d3b6e";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("SCAN TO VERIFY", 1275, 622);
      ctx.fillStyle = "#888";
      ctx.font = "12px sans-serif";
      ctx.fillText("or visit", 1275, 638);
      ctx.fillStyle = "#0e6655";
      ctx.font = "11px monospace";
      const short = credUrl.replace("https://", "");
      ctx.fillText(
        short.length > 30 ? short.substring(0, 30) + "…" : short,
        1275,
        655,
      );
      res();
    };
    img.src = qrDataUrl;
  });
}

export default function AdminPanel() {
  const [csvData, setCsvData] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState([]);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);
  const fileRef = useRef(null);

  const handleCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const today = new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const processed = data.map((row, i) => ({
          ...row,
          "Credential ID": generateCredentialId(row.Event, i),
          "Issue Date": today,
        }));
        setCsvData(processed);
      },
    });
  };

  const handleGenerate = async () => {
    if (!csvData.length) return;
    setGenerating(true);
    setGenerated([]);
    setProgress(0);
    const canvas = canvasRef.current;
    const results = [];

    for (let i = 0; i < csvData.length; i++) {
      const p = csvData[i];
      await drawCertificate(canvas, p);
      const dataUrl = canvas.toDataURL("image/png");
      results.push({ ...p, dataUrl });
      setProgress(Math.round(((i + 1) / csvData.length) * 100));
    }

    setGenerated(results);
    setGenerating(false);
  };

  const exportCSV = () => {
    const rows = [
      [
        "Credential ID",
        "Name",
        "Email",
        "Event",
        "Issue Date",
        "Certificate URL",
      ],
      ...generated.map((r) => [
        r["Credential ID"],
        r.Name,
        r.Email,
        r.Event,
        r["Issue Date"],
        `${BASE_URL}/certificate/${r["Credential ID"]}`,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificates_records.csv";
    a.click();
  };

  const downloadAll = () => {
    generated.forEach(({ dataUrl, "Credential ID": id }) => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${id}_certificate.png`;
      a.click();
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4">
        <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
          ⚙️ Admin Section — Upload a CSV and generate certificates for all
          participants.
        </p>
      </div>

      {/* CSV Upload */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Upload Participant CSV
        </label>
        <div
          className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-[#0d3b6e] dark:hover:border-teal-400 transition"
          onClick={() => fileRef.current.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.xlsx"
            className="hidden"
            onChange={(e) => e.target.files[0] && handleCSV(e.target.files[0])}
          />
          <div className="text-3xl mb-2">📄</div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Click to upload CSV / Excel
            <br />
            <span className="text-xs opacity-70">
              Format: Name, Email, Event
            </span>
          </p>
        </div>
      </div>

      {/* Preview CSV */}
      {csvData.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {csvData.length} participant{csvData.length > 1 ? "s" : ""} loaded
            </span>
            <span className="text-xs text-slate-400">IDs auto-generated</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  {["Credential ID", "Name", "Email", "Event"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 5).map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-slate-100 dark:border-slate-700"
                  >
                    <td className="px-4 py-2.5 font-mono text-xs text-[#0d3b6e] dark:text-teal-400">
                      {row["Credential ID"]}
                    </td>
                    <td className="px-4 py-2.5 text-slate-700 dark:text-slate-200">
                      {row.Name}
                    </td>
                    <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400 text-xs">
                      {row.Email}
                    </td>
                    <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400 text-xs">
                      {row.Event}
                    </td>
                  </tr>
                ))}
                {csvData.length > 5 && (
                  <tr className="border-t border-slate-100 dark:border-slate-700">
                    <td
                      colSpan={4}
                      className="px-4 py-2 text-center text-xs text-slate-400"
                    >
                      +{csvData.length - 5} more rows
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Generate button */}
      {csvData.length > 0 && (
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0d3b6e] to-[#0e6655] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {generating
            ? `Generating… ${progress}%`
            : `🎓 Generate ${csvData.length} Certificate${csvData.length > 1 ? "s" : ""}`}
        </button>
      )}

      {/* Progress */}
      {generating && (
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Generating certificates…</span>
            <span>{progress}%</span>
          </div>
          <div className="bg-slate-200 dark:bg-slate-600 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#0d3b6e] to-[#0e6655] h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {generated.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-green-700 dark:text-green-400 text-sm">
              ✅ {generated.length} certificates generated!
            </span>
            <div className="flex gap-2">
              <button
                onClick={exportCSV}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                📊 Export Records CSV
              </button>
              <button
                onClick={downloadAll}
                className="px-3 py-1.5 text-xs rounded-lg bg-[#0d3b6e] text-white hover:opacity-90 transition"
              >
                ⬇️ Download All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto">
            {generated.map((cert) => (
              <div
                key={cert["Credential ID"]}
                className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700 flex items-center gap-3"
              >
                <img
                  src={cert.dataUrl}
                  alt=""
                  className="w-16 h-11 object-cover rounded-lg border border-slate-200 dark:border-slate-600"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                    {cert.Name}
                  </div>
                  <div className="text-xs font-mono text-[#0d3b6e] dark:text-teal-400">
                    {cert["Credential ID"]}
                  </div>
                </div>
                <a
                  href={cert.dataUrl}
                  download={`${cert["Credential ID"]}.png`}
                  className="text-slate-400 hover:text-[#0d3b6e] dark:hover:text-teal-400 transition text-lg"
                >
                  ⬇️
                </a>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300">
            <strong>Next step:</strong> Upload the exported CSV to your Google
            Sheet to enable certificate lookup on the portal.
          </div>
        </div>
      )}

      {/* Hidden canvas for generation */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
