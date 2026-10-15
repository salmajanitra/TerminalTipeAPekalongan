import React from 'react';
import { KemenhubLogo } from './KemenhubLogo';
import { ShieldAlert, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { TERMINAL_INFO } from '../data/defaultSchedules';

export const Footer: React.FC = () => {
  return (
    <footer className="no-print bg-[#071733] text-slate-300 border-t border-[#122852] mt-12">
      {/* Disclaimer Section (Requirement 13) */}
      <div className="bg-[#050f22] border-b border-white/5 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>Pemberitahuan Resmi:</strong> Jadwal dan harga tiket dapat berubah sewaktu-waktu sesuai kebijakan masing-masing perusahaan otobus (PO) dan ketersediaan armada. Silakan melakukan konfirmasi kepada operator loket bus resmi di Terminal Tipe A Pekalongan sebelum melakukan perjalanan.
          </p>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <KemenhubLogo size={44} />
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide">
                  KEMENTERIAN PERHUBUNGAN REPUBLIK INDONESIA
                </h4>
                <p className="text-xs text-sky-300 font-medium">
                  Direktorat Jenderal Perhubungan Darat
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Balai Pengelola Transportasi Darat (BPTD) Kelas I Jawa Tengah
              <br />
              <strong className="text-white">Satuan Pelayanan Terminal Penumpang Tipe A Pekalongan</strong>
            </p>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pelayanan Publik Beroperasi 24 Jam Non-Stop</span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <h5 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Alamat & Wilayah Kerja
            </h5>
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{TERMINAL_INFO.lokasi}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 pt-1">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Telepon: {TERMINAL_INFO.kontak.telepon} / WA: {TERMINAL_INFO.kontak.whatsapp}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Email: {TERMINAL_INFO.kontak.email}</span>
            </div>
          </div>

          {/* Quick Links & Service Standard */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h5 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Kanal Terpadu
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Portal Dephub RI: <span className="text-sky-300">dephub.go.id</span></li>
              <li>• Ditjen Hubdat: <span className="text-sky-300">hubdat.dephub.go.id</span></li>
              <li>• Call Center Resmi Perhubungan: <strong className="text-white">151</strong></li>
              <li>• Layanan Bebas Pungli di Area Terminal</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Satuan Pelayanan Terminal Tipe A Pekalongan. Hak Cipta Dilindungi.</p>
          <p className="text-[11px] text-slate-400">
            Media Informasi Publik Pelayanan Transportasi Darat Nasional
          </p>
        </div>
      </div>
    </footer>
  );
};
