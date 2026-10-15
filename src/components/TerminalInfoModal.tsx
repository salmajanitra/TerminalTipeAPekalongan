import React from 'react';
import { TERMINAL_INFO } from '../data/defaultSchedules';
import { X, Building2, MapPin, Phone, Mail, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

interface TerminalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalInfoModal: React.FC<TerminalInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0f2952] text-white p-5 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1">
            Kementerian Perhubungan Republik Indonesia
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Terminal Penumpang Tipe A Pekalongan
          </h2>
          <p className="text-xs text-sky-200 mt-1">
            Balai Pengelola Transportasi Darat (BPTD) Kelas I Jawa Tengah
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 text-sm">
          {/* Facility Photo */}
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-900">
            <img
              src="/src/assets/images/terminal_waiting_lounge_1792064749908.jpg"
              alt="Ruang Tunggu Penumpang Terminal Tipe A Pekalongan"
              className="w-full h-52 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-2.5 bg-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <span>Ruang Tunggu Penumpang & Layanan Papan Informasi Terpadu</span>
              <span className="text-amber-400 font-medium">BPTD Kemenhub RI</span>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-0.5">
                Klasifikasi Terminal
              </span>
              <span className="font-bold text-slate-900 text-sm">Tipe A (Nasional & Antarprovinsi)</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-0.5">
                Jam Layanan Operasional
              </span>
              <span className="font-bold text-slate-900 text-sm">24 Jam Setiap Hari</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg sm:col-span-2">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-0.5">
                Alamat Lengkap
              </span>
              <div className="flex items-start gap-1.5 font-medium text-slate-800 mt-0.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{TERMINAL_INFO.lokasi}</span>
              </div>
            </div>
          </div>

          {/* Fasilitas & Layanan */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Standar Fasilitas & Pelayanan Publik:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {TERMINAL_INFO.layanan.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 bg-slate-50 rounded-md border border-slate-100"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kontak & Pengaduan */}
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-2">
            <h4 className="font-bold text-blue-950 uppercase tracking-wide flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-blue-700" />
              <span>Kontak Informasi & Layanan Pengaduan:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <span>Telepon: <strong>{TERMINAL_INFO.kontak.telepon}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: <strong>{TERMINAL_INFO.kontak.whatsapp}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-600" />
                <span className="truncate">Email: <strong>{TERMINAL_INFO.kontak.email}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold px-1.5 py-0.5 bg-blue-900 text-white rounded text-[10px]">
                  Call Center
                </span>
                <span>Kemenhub: <strong>151</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
