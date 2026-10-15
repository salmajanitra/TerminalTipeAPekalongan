import React from 'react';
import { X, QrCode, Smartphone, Printer, ExternalLink } from 'lucide-react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose, url }) => {
  if (!isOpen) return null;

  // Generate QR Code image using high quality quickchart/google charts API or direct SVG
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    url || window.location.href
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-full"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-extrabold text-slate-900">
          Pindai Jadwal Digital
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Arahkan kamera ponsel Anda untuk membuka jadwal bus Terminal Tipe A Pekalongan secara realtime.
        </p>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 inline-block mx-auto mb-4">
          <img
            src={qrImageUrl}
            alt="QR Code Jadwal Bus Terminal Tipe A Pekalongan"
            className="w-48 h-48 mx-auto rounded-lg shadow-2xs"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="text-[11px] text-slate-600 font-mono bg-slate-100 p-2 rounded-md break-all mb-4 select-all">
          {url || window.location.href}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Lembar QR</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
