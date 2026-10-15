import React from 'react';
import { TERMINAL_INFO } from '../data/defaultSchedules';
import { Building2, MapPin, Phone, Clock, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';

interface TerminalSectionProps {
  onOpenModal: () => void;
}

export const TerminalSection: React.FC<TerminalSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Visual Box */}
        <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full bg-slate-900 overflow-hidden">
          <img
            src="/src/assets/images/terminal_pekalongan_bus_bay_1792064749394.jpg"
            alt="Fasilitas Peron Keberangkatan Terminal Tipe A Pekalongan"
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              BPTD Kelas I Jawa Tengah
            </span>
            <h3 className="text-lg font-bold">Terminal Penumpang Tipe A Pekalongan</h3>
            <p className="text-xs text-slate-300">
              Pusat simpul transportasi darat terintegrasi lintas Pantura & Tol Trans Jawa
            </p>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 text-blue-700" />
              <span>Profil Simpul Transportasi</span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 mb-2">
              Informasi Terminal Tipe A Pekalongan
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                  Nama Resmi
                </span>
                <span className="font-bold text-slate-800">{TERMINAL_INFO.nama}</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                  Jenis Fasilitas
                </span>
                <span className="font-bold text-slate-800">{TERMINAL_INFO.jenis}</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 sm:col-span-2">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                  Lokasi
                </span>
                <div className="font-medium text-slate-700 flex items-start gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>{TERMINAL_INFO.lokasi}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Layanan: Informasi jadwal, keberangkatan, kedatangan, loket tiket resmi, ruang tunggu ber-AC, musala, dan pos pelayanan penumpang 24 jam.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Operasional: <strong className="text-slate-800">24 Jam Non-Stop</strong></span>
            </div>

            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors shadow-xs"
            >
              <span>Lihat Informasi Terminal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
