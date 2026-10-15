import React from 'react';
import { Bus, CalendarCheck, Clock, MapPin } from 'lucide-react';
import { BusSchedule } from '../types/bus';
import { timeStringToMinutes } from '../utils/timeUtils';

interface StatCardsProps {
  schedules: BusSchedule[];
  currentTime: Date;
}

export const StatCards: React.FC<StatCardsProps> = ({ schedules, currentTime }) => {
  // Unique POs
  const uniquePOs = new Set(schedules.map((s) => s.nama_po.trim())).size;

  // Total Schedules
  const totalSchedules = schedules.length;

  // Unique Routes / Trayek
  const uniqueTrayek = new Set(schedules.map((s) => `${s.asal}-${s.tujuan}`)).size;

  // Find next upcoming departure after currentTime
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  
  // Sort schedules by time
  const sortedByTime = [...schedules].sort(
    (a, b) => timeStringToMinutes(a.jam_keberangkatan) - timeStringToMinutes(b.jam_keberangkatan)
  );

  const upcomingBus = sortedByTime.find(
    (s) => timeStringToMinutes(s.jam_keberangkatan) >= currentMinutes
  ) || sortedByTime[0];

  const nextDepartureTime = upcomingBus ? upcomingBus.jam_keberangkatan : '--:--';
  const nextDeparturePO = upcomingBus ? `${upcomingBus.nama_po} (${upcomingBus.tujuan})` : 'Tidak ada';

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6">
      {/* Stat 1: Total PO */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs hover:border-blue-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Total PO Bus</span>
          <Bus className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {uniquePOs}
          </span>
          <span className="text-xs text-slate-500 font-medium">Perusahaan</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 truncate">
          PO resmi berizin terdaftar
        </p>
      </div>

      {/* Stat 2: Jadwal Hari Ini */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs hover:border-emerald-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Jadwal Hari Ini</span>
          <CalendarCheck className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {totalSchedules}
          </span>
          <span className="text-xs text-slate-500 font-medium">Keberangkatan</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 truncate">
          Terjadwal dari Pekalongan
        </p>
      </div>

      {/* Stat 3: Keberangkatan Terdekat */}
      <div className="bg-white rounded-xl border border-blue-200 bg-linear-to-br from-white to-blue-50/40 p-4 shadow-xs hover:border-blue-400 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-900">Keberangkatan Terdekat</span>
          <Clock className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-mono tabular-nums">
            {nextDepartureTime}
          </span>
          <span className="text-xs text-blue-700 font-bold uppercase tracking-wide">WIB</span>
        </div>
        <p className="text-[11px] text-blue-800 font-medium mt-1 truncate" title={nextDeparturePO}>
          {nextDeparturePO}
        </p>
      </div>

      {/* Stat 4: Total Trayek */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs hover:border-amber-300 transition-colors">
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">Total Trayek</span>
          <MapPin className="w-4 h-4 text-amber-600" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {uniqueTrayek}
          </span>
          <span className="text-xs text-slate-500 font-medium">Rute Kota</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 truncate">
          Jabodetabek, Jatim, Jabar & Luar Jawa
        </p>
      </div>
    </section>
  );
};
