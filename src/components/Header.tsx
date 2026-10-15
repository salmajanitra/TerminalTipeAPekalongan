import React from 'react';
import { KemenhubLogo } from './KemenhubLogo';
import { Printer, QrCode, Shield, Info, Clock, Calendar } from 'lucide-react';
import { formatIndonesianDate, formatIndonesianTime } from '../utils/timeUtils';

interface HeaderProps {
  currentWibTime: Date;
  onOpenTerminalInfo: () => void;
  onOpenQrCode: () => void;
  onPrint: () => void;
  onOpenAdmin: () => void;
  isAdminActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentWibTime,
  onOpenTerminalInfo,
  onOpenQrCode,
  onPrint,
  onOpenAdmin,
  isAdminActive = false,
}) => {
  return (
    <header className="no-print bg-[#0a1f44] text-white border-b border-[#1b3a6b] sticky top-0 z-40 shadow-md">
      {/* Top Utility Gov Ribbon */}
      <div className="bg-[#06152f] text-slate-300 text-xs py-1.5 px-4 sm:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span className="hidden sm:inline text-amber-400 font-bold tracking-wide">REPUBLIK INDONESIA</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span>Kementerian Perhubungan Republik Indonesia</span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-400">BPTD Kelas I Jawa Tengah</span>
          </div>
          <div className="flex items-center gap-3 text-slate-200 ml-auto font-mono text-[11px] tabular-nums">
            <div className="flex items-center gap-1.5 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{formatIndonesianDate(currentWibTime)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-white">{formatIndonesianTime(currentWibTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Identity Lockup */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <KemenhubLogo size={52} className="shadow-lg" />
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Kementerian Perhubungan Republik Indonesia
              </span>
              <h1 className="text-base sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-tight">
                MEDIA INFORMASI JADWAL LAYANAN BUS
              </h1>
              <p className="text-xs sm:text-sm text-sky-200 font-medium flex items-center gap-2">
                <span>Terminal Tipe A Pekalongan</span>
                <span className="hidden sm:inline text-sky-400">·</span>
                <span className="hidden sm:inline text-xs text-sky-300/80">Satpel Pekalongan</span>
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTerminalInfo}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-100 bg-white/10 hover:bg-white/15 border border-white/20 rounded-md transition-colors whitespace-nowrap"
              title="Informasi Fasilitas & Layanan Terminal"
            >
              <Info className="w-4 h-4 text-sky-300" />
              <span>Info Terminal</span>
            </button>

            <button
              onClick={onPrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-100 bg-white/10 hover:bg-white/15 border border-white/20 rounded-md transition-colors whitespace-nowrap"
              title="Cetak Jadwal Bus Resmi (A4)"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Cetak Jadwal</span>
            </button>

            <button
              onClick={onOpenQrCode}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-100 bg-white/10 hover:bg-white/15 border border-white/20 rounded-md transition-colors whitespace-nowrap"
              title="Scan QR Code Website Jadwal di HP"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">QR Code</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                isAdminActive
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-sm'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
              }`}
              title="Kelola Data Jadwal Bus (Khusus Petugas Terminal)"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isAdminActive ? 'Keluar Admin' : 'Akses Petugas'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
