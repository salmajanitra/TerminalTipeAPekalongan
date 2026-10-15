import React, { useState } from 'react';
import { BusSchedule } from '../types/bus';
import { calculateBusStatus, formatRupiah } from '../utils/timeUtils';
import { Eye, ChevronLeft, ChevronRight, Bus, MapPin, Clock, Tag } from 'lucide-react';

interface ScheduleTableProps {
  schedules: BusSchedule[];
  currentTime: Date;
  onSelectSchedule: (schedule: BusSchedule) => void;
  onQuickEdit?: (schedule: BusSchedule) => void;
  isAdmin?: boolean;
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({
  schedules,
  currentTime,
  onSelectSchedule,
  onQuickEdit,
  isAdmin = false,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(schedules.length / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const paginatedSchedules = schedules.slice(startIndex, startIndex + pageSize);

  const getStatusBadge = (timeStr: string) => {
    const status = calculateBusStatus(timeStr, currentTime);

    switch (status) {
      case 'Segera Berangkat':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            <span>Segera Berangkat</span>
          </span>
        );
      case 'Sudah Berangkat':
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-500 border border-slate-200">
            Sudah Berangkat
          </span>
        );
      case 'Akan Berangkat':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300">
            Akan Berangkat
          </span>
        );
    }
  };

  if (schedules.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
        <Bus className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800 mb-1">
          Tidak ada jadwal bus yang sesuai filter
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Silakan coba ubah kata kunci pencarian atau reset filter untuk menampilkan seluruh jadwal bus Terminal Tipe A Pekalongan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ======================================================== */}
      {/* DESKTOP TABLE VIEW (Visible on lg screens and up)       */}
      {/* ======================================================== */}
      <div className="hidden lg:block bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0f2952] text-white text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th scope="col" className="py-3 px-4 w-12 text-center">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Nama PO Bus
                </th>
                <th scope="col" className="py-3 px-4">
                  Rute / Trayek
                </th>
                <th scope="col" className="py-3 px-4">
                  Jenis Bus
                </th>
                <th scope="col" className="py-3 px-4 text-center">
                  Jadwal Berangkat
                </th>
                <th scope="col" className="py-3 px-4 text-right">
                  Harga Tiket
                </th>
                <th scope="col" className="py-3 px-4 text-center">
                  Status
                </th>
                <th scope="col" className="py-3 px-4 text-center w-28">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedSchedules.map((schedule, index) => {
                const rowNumber = startIndex + index + 1;
                const isEven = index % 2 === 0;

                return (
                  <tr
                    key={schedule.id}
                    className={`hover:bg-blue-50/60 transition-colors ${
                      isEven ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    {/* No */}
                    <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-500 tabular-nums">
                      {rowNumber}
                    </td>

                    {/* Nama PO */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{schedule.nama_po}</span>
                        {schedule.nomor_armada && (
                          <span className="text-[11px] font-normal text-slate-500 font-mono">
                            ({schedule.nomor_armada})
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="font-semibold text-blue-900">{schedule.kategori}</span>
                        <span>·</span>
                        <span>{schedule.jalur_peron}</span>
                      </div>
                    </td>

                    {/* Rute / Trayek */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <span className="text-slate-600">{schedule.asal}</span>
                        <span className="text-blue-600 font-bold">→</span>
                        <span className="text-blue-900 font-bold">{schedule.tujuan}</span>
                      </div>
                      <div className="text-xs text-slate-500 truncate" title={schedule.rute}>
                        {schedule.rute}
                      </div>
                    </td>

                    {/* Jenis Bus */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">
                        {schedule.jenis_bus}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {schedule.kelas_layanan}
                      </div>
                    </td>

                    {/* Jadwal Keberangkatan */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="font-mono text-base font-extrabold text-blue-950 tabular-nums">
                        {schedule.jam_keberangkatan}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">
                        WIB
                      </div>
                    </td>

                    {/* Harga Tiket */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="font-mono text-base font-bold text-emerald-700 tabular-nums">
                        {formatRupiah(schedule.harga_tiket)}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        per kursi
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      {getStatusBadge(schedule.jam_keberangkatan)}
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onSelectSchedule(schedule)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-800 hover:text-white bg-blue-50 hover:bg-blue-700 border border-blue-200 hover:border-transparent rounded-md transition-all shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>
                        {isAdmin && onQuickEdit && (
                          <button
                            type="button"
                            onClick={() => onQuickEdit(schedule)}
                            className="inline-flex items-center px-2 py-1.5 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-md border border-amber-300 transition-colors"
                            title="Edit Data"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE CARD VIEW (Requirement 8: Mobile Responsive)     */}
      {/* ======================================================== */}
      <div className="lg:hidden space-y-3">
        {paginatedSchedules.map((schedule, index) => {
          const rowNumber = startIndex + index + 1;

          return (
            <div
              key={schedule.id}
              onClick={() => onSelectSchedule(schedule)}
              className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs active:bg-blue-50/30 transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Header Card: No, Category, Status */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">
                    #{rowNumber}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-100">
                    {schedule.kategori}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {schedule.jalur_peron}
                  </span>
                </div>
                <div>{getStatusBadge(schedule.jam_keberangkatan)}</div>
              </div>

              {/* Main Content: PO & Time */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                    {schedule.nama_po}
                  </h3>
                  {schedule.nomor_armada && (
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {schedule.nomor_armada}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-lg font-extrabold text-blue-950 tabular-nums">
                    {schedule.jam_keberangkatan} <span className="text-xs font-sans font-bold text-slate-500">WIB</span>
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="bg-slate-50 rounded-lg p-2.5 mb-3 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{schedule.asal}</span>
                  <span className="text-blue-600 font-bold">→</span>
                  <span className="text-blue-900 font-bold">{schedule.tujuan}</span>
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1">
                  {schedule.rute}
                </div>
              </div>

              {/* Class & Price */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <div>
                  <div className="font-semibold text-slate-700">
                    {schedule.jenis_bus}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {schedule.kelas_layanan}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-base font-bold text-emerald-700 tabular-nums">
                    {formatRupiah(schedule.harga_tiket)}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSchedule(schedule);
                    }}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-0.5 mt-0.5"
                  >
                    Lihat Detail →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Bar (Requirement 18) */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <span>Tampilkan per halaman:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="py-1 px-2 border border-slate-200 rounded-md text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 font-medium"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-slate-400">|</span>
          <span>
            Menampilkan {startIndex + 1} - {Math.min(startIndex + pageSize, schedules.length)} dari {schedules.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={validCurrentPage <= 1}
            className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-2 font-semibold text-slate-700">
            Halaman {validCurrentPage} dari {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={validCurrentPage >= totalPages}
            className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Halaman Selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
