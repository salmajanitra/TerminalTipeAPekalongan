import React from 'react';
import { BusSchedule } from '../types/bus';
import { calculateBusStatus, formatRupiah } from '../utils/timeUtils';
import {
  X,
  Bus,
  MapPin,
  Clock,
  Tag,
  CheckCircle2,
  Info,
  PhoneCall,
  Navigation,
  ShieldAlert,
} from 'lucide-react';

interface ScheduleDetailModalProps {
  schedule: BusSchedule | null;
  currentTime: Date;
  onClose: () => void;
}

export const ScheduleDetailModal: React.FC<ScheduleDetailModalProps> = ({
  schedule,
  currentTime,
  onClose,
}) => {
  if (!schedule) return null;

  const status = calculateBusStatus(schedule.jam_keberangkatan, currentTime);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0f2952] text-white p-5 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup Detail"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
            <span>{schedule.kategori}</span>
            <span>·</span>
            <span>{schedule.jalur_peron}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {schedule.nama_po}
          </h2>
          {schedule.nomor_armada && (
            <p className="text-xs text-sky-200 font-mono mt-0.5">
              Armada: {schedule.nomor_armada}
            </p>
          )}

          {/* Quick status pill */}
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                status === 'Segera Berangkat'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : status === 'Sudah Berangkat'
                  ? 'bg-slate-700 text-slate-200'
                  : 'bg-emerald-500 text-white'
              }`}
            >
              Status: {status}
            </span>
            <span className="text-xs text-slate-300">
              Jadwal Keberangkatan: <strong className="text-white font-mono">{schedule.jam_keberangkatan} WIB</strong>
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-4 text-sm">
          {/* Origin & Destination Journey Visual */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                <div className="w-0.5 h-10 bg-slate-300 my-0.5" />
                <div className="w-3 h-3 rounded-full bg-rose-600 ring-4 ring-rose-100" />
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Titik Keberangkatan (Asal)
                  </span>
                  <div className="font-bold text-slate-900 text-sm">
                    {schedule.asal}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Tujuan Akhir
                  </span>
                  <div className="font-bold text-blue-900 text-base">
                    {schedule.tujuan}
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Route Path */}
            <div className="mt-3 pt-3 border-t border-slate-200/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                Rute Lintasan Lengkap:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {schedule.rute}
              </p>
            </div>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
                Jenis & Kelas Bus
              </span>
              <div className="font-bold text-slate-900">{schedule.jenis_bus}</div>
              <div className="text-xs text-slate-500">{schedule.kelas_layanan}</div>
            </div>

            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 block mb-0.5">
                Harga Tiket
              </span>
              <div className="font-mono text-lg font-extrabold text-emerald-700 tabular-nums">
                {formatRupiah(schedule.harga_tiket)}
              </div>
              <div className="text-[11px] text-emerald-800 font-medium">Resmi Loket Terminal</div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
                Jalur Peron Keberangkatan
              </span>
              <div className="font-bold text-blue-900 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                <span>{schedule.jalur_peron}</span>
              </div>
              <div className="text-[11px] text-slate-500">Gedung Utama Terminal Tipe A</div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
                Estimasi Waktu Tempuh
              </span>
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{schedule.estimasi_waktu || 'Tergantung Kondisi Lalu Lintas'}</span>
              </div>
              <div className="text-[11px] text-slate-500">Via Jalan Tol Trans Jawa</div>
            </div>
          </div>

          {/* Fasilitas */}
          {schedule.fasilitas && schedule.fasilitas.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                Fasilitas Armada Bus:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {schedule.fasilitas.map((f, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{f}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Keterangan Tambahan */}
          {schedule.keterangan && (
            <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold mb-1 text-blue-950">
                <Info className="w-4 h-4 text-blue-700" />
                <span>Keterangan Layanan & Perjalanan:</span>
              </div>
              <p>{schedule.keterangan}</p>
            </div>
          )}

          {/* Kontak Loket */}
          {schedule.kontak_loket && (
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>
                  Informasi & Pemesanan Loket:{' '}
                  <strong className="text-slate-900">{schedule.kontak_loket}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Disclaimer note */}
          <div className="text-[11px] text-slate-400 text-center italic pt-1">
            Penumpang disarankan telah berada di ruang tunggu terminal minimal 30 menit sebelum jam keberangkatan.
          </div>
        </div>

        {/* Modal Footer */}
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
