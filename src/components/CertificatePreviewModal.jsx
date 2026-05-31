import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import templateImg from "../assets/template.jpeg";

export default function CertificatePreviewModal({
  certificate,
  credUrl,
  onClose,
}) {
  const canvasRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  // Draw certificate on canvas using template
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 1400,
      H = 990;
    canvas.width = W;
    canvas.height = H;

    // Load and draw template image
    const templateImage = new Image();
    templateImage.onload = () => {
      // Draw template background
      ctx.drawImage(templateImage, 0, 0, W, H);

      // ── Add dynamic content on top of template ──────────────────────────────

      // Participant Name (large italic text, center)
      const participantName = certificate.Name || "Participant Name";
      ctx.fillStyle = "#0d3b6e";
      ctx.font = "italic bold 80px Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(participantName, W / 2, 360);

      // Underline for name
      const nameW = ctx.measureText(participantName).width;
      ctx.strokeStyle = "#0d3b6e40";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(W / 2 - nameW / 2 - 20, 396);
      ctx.lineTo(W / 2 + nameW / 2 + 20, 396);
      ctx.stroke();

      // Bullet dots around name
      ctx.fillStyle = "#0e6655";
      ctx.beginPath();
      ctx.arc(W / 2 - nameW / 2 - 30, 402, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(W / 2 + nameW / 2 + 30, 402, 4, 0, Math.PI * 2);
      ctx.fill();

      // Event name (bold, center)
      const eventName = certificate.Event || "Event Name";
      ctx.fillStyle = "#0d3b6e";
      ctx.font = "bold 54px Georgia, serif";
      ctx.textBaseline = "middle";
      ctx.fillText(eventName, W / 2, 470);

      // ── Info Row ─────────────────────────────────────────────────────────────
      const infoY = 745;
      const cols = [
        {
          x: 364,
          value: certificate["Credential ID"] || "—",
        },
        {
          x: 700,
          value: certificate["Issue Date"] || "30 May 2026",
        },
        {
          x: 1036,
          value: certificate.Event ? certificate.Event : "Event Name",
        },
      ];

      cols.forEach(({ x, value }) => {
        ctx.fillStyle = "#0d3b6e";
        ctx.font = "bold 22px Georgia, serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(value, x, infoY);
      });

      // ── QR Code (right side, mid) ─────────────────────────────────────────
      QRCode.toDataURL(credUrl, {
        width: 160,
        margin: 1,
        color: { dark: "#0d3b6e" },
      })
        .then((qrDataUrl) => {
          const img = new Image();
          img.onload = () => {
            // Draw QR code image
            ctx.drawImage(img, 1195, 440, 160, 160);
          };
          img.src = qrDataUrl;
        })
        .catch(() => {});
    };
    templateImage.src = templateImg;
  }, [certificate, credUrl]);

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

  const handleDownload = () => {
    setDownloading(true);
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `${certificate["Credential ID"]}_certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setDownloading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-bold text-slate-800 dark:text-white text-lg">
            Certificate Preview
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0d3b6e] to-[#0e6655] text-white text-sm font-semibold hover:opacity-90 transition"
            >
              {downloading ? "Downloading…" : "⬇️ Download PNG"}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-4 overflow-auto">
          <canvas
            ref={canvasRef}
            className="w-full rounded-xl shadow border border-slate-100"
            style={{ maxHeight: "70vh", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}
