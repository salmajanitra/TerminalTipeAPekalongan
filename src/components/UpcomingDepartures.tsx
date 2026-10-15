import React from 'react';
import { BusSchedule } from '../types/bus';
import { timeStringToMinutes, calculateBusStatus, formatRupiah } from '../utils/timeUtils';
import { Compass, Clock, MapPin, ChevronRight } from 'lucide-react';

interface UpcomingDeparturesProps {
  schedules: BusSchedule[];
  currentTime: Date;
  onSelectSchedule: (schedule: BusSchedule) => void;
}

export const UpcomingDepartures: React.FC<UpcomingDeparturesProps> = ({
  schedules,
  currentTime,
  onSelectSchedule,
}) => {
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  // Find buses departing soon (sorted from next departing)
  const sorted = [...schedules].sort(
    (a, b) => timeStringToMinutes(a.jam_keberangkatan) - timeStringToMinutes(b.jam_keberangkatan)
  );

  // Pick upcoming ones or loop to first ones
  let upcoming = sorted.filter((s) => timeStringToMinutes(s.jam_keberangkatan) >= currentMinutes - 15);
  if (upcoming.length === 0) {
    upcoming = sorted;
  }
  const topUpcoming = upcoming.slice(0, 3);

  if (topUpcoming.length === 0) return null;

  return (
    <div className="mb-6 bg-slate-900 text-white rounded-xl p-4 sm:p-5 border border-slate-800 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold tracking-tight text-white uppercase">
            Papan Keberangkatan Terdekat
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Siap di peron keberangkatan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {topUpcoming.map((item) => {
          const status = calculateBusStatus(item.jam_keberangkatan, currentTime);
          const isSoon = status === 'Segera Berangkat';

          return (
            <div
              key={item.id}
              onClick={() => onSelectSchedule(item)}
              className="group cursor-pointer bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-lg p-3.5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-950 text-sky-300 border border-blue-800">
                    {item.jalur_peron}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      isSoon
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                    {item.nama_po}
                  </h3>
                  <span className="font-mono text-lg font-bold text-amber-400 tabular-nums">
                    {item.jam_keberangkatan}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="font-semibold text-white">{item.tujuan}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 truncate">{item.jenis_bus}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-200">
                  {formatRupiah(item.harga_tiket)}
                </span>
                <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5 font-medium">
                  Detail <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
