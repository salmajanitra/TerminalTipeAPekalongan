import React from 'react';
import { Search, X, RotateCcw, Filter, ArrowUpDown } from 'lucide-react';
import { BusSchedule, FilterState, BusKategori, TimeOfDayFilter, SortOption } from '../types/bus';

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onResetFilter: () => void;
  allSchedules: BusSchedule[];
  totalFilteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  onResetFilter,
  allSchedules,
  totalFilteredCount,
}) => {
  // Extract unique lists for dropdown options
  const uniqueDestinations = Array.from(
    new Set(allSchedules.map((s) => s.tujuan.trim()))
  ).sort();

  const uniquePOs = Array.from(
    new Set(allSchedules.map((s) => s.nama_po.trim()))
  ).sort();

  const uniqueBusTypes = Array.from(
    new Set(allSchedules.map((s) => s.jenis_bus.trim()))
  ).sort();

  // Category counts
  const categoryCounts = {
    Semua: allSchedules.length,
    AKAP: allSchedules.filter((s) => s.kategori === 'AKAP').length,
    AKDP: allSchedules.filter((s) => s.kategori === 'AKDP').length,
    ALBN: allSchedules.filter((s) => s.kategori === 'ALBN').length,
  };

  const isFiltered =
    filter.search.trim() !== '' ||
    filter.tujuan !== '' ||
    filter.nama_po !== '' ||
    filter.jenis_bus !== '' ||
    filter.jam_keberangkatan !== 'all' ||
    filter.kategori !== 'Semua' ||
    filter.sortBy !== 'jam_asc';

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-6">
      {/* Category Tabs (Requirement 11) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-lg max-w-full overflow-x-auto">
          {(['Semua', 'AKAP', 'AKDP', 'ALBN'] as const).map((cat) => {
            const isActive = filter.kategori === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange({ kategori: cat })}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Count info */}
        <div className="text-xs text-slate-500 font-medium">
          Menampilkan <span className="font-bold text-slate-900 font-mono">{totalFilteredCount}</span> dari {allSchedules.length} jadwal
        </div>
      </div>

      {/* Main Search Box (Requirement 4) */}
      <div className="mt-4 mb-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filter.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Cari nama PO, tujuan, atau trayek..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
          {filter.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Row (Requirement 5) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2">
        {/* Filter Tujuan */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
            Tujuan
          </label>
          <select
            value={filter.tujuan}
            onChange={(e) => onFilterChange({ tujuan: e.target.value })}
            className="w-full py-1.5 px-2.5 text-xs bg-white border border-slate-200 rounded-md text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="">Semua Tujuan</option>
            {uniqueDestinations.map((dest) => (
              <option key={dest} value={dest}>
                {dest}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Nama PO */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
            Nama PO Bus
          </label>
          <select
            value={filter.nama_po}
            onChange={(e) => onFilterChange({ nama_po: e.target.value })}
            className="w-full py-1.5 px-2.5 text-xs bg-white border border-slate-200 rounded-md text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="">Semua PO Bus</option>
            {uniquePOs.map((po) => (
              <option key={po} value={po}>
                {po}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Jenis Bus */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
            Jenis / Kelas
          </label>
          <select
            value={filter.jenis_bus}
            onChange={(e) => onFilterChange({ jenis_bus: e.target.value })}
            className="w-full py-1.5 px-2.5 text-xs bg-white border border-slate-200 rounded-md text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="">Semua Jenis Bus</option>
            {uniqueBusTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Jam Keberangkatan */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
            Waktu Berangkat
          </label>
          <select
            value={filter.jam_keberangkatan}
            onChange={(e) =>
              onFilterChange({ jam_keberangkatan: e.target.value as TimeOfDayFilter })
            }
            className="w-full py-1.5 px-2.5 text-xs bg-white border border-slate-200 rounded-md text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="all">Semua Jam</option>
            <option value="pagi">Pagi (05:00 - 11:59)</option>
            <option value="siang">Siang (12:00 - 14:59)</option>
            <option value="sore">Sore (15:00 - 18:59)</option>
            <option value="malam">Malam (19:00 - 04:59)</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
            Urutkan
          </label>
          <select
            value={filter.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
            className="w-full py-1.5 px-2.5 text-xs bg-white border border-slate-200 rounded-md text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="jam_asc">Jam: Paling Awal</option>
            <option value="jam_desc">Jam: Paling Akhir</option>
            <option value="harga_asc">Harga: Termurah</option>
            <option value="harga_desc">Harga: Tertinggi</option>
            <option value="po_asc">Nama PO: A - Z</option>
            <option value="tujuan_asc">Tujuan: A - Z</option>
          </select>
        </div>
      </div>

      {/* Reset Filter Action Bar */}
      {isFiltered && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-blue-800 bg-blue-50/70 px-2.5 py-1 rounded-md">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter aktif diterapkan</span>
          </div>

          <button
            type="button"
            onClick={onResetFilter}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 rounded-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filter</span>
          </button>
        </div>
      )}
    </div>
  );
};
