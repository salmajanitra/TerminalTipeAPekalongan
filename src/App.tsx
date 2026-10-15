import React, { useState, useEffect, useMemo } from 'react';
import { BusSchedule, FilterState, BusKategori } from './types/bus';
import { ScheduleStorage } from './services/scheduleStorage';
import {
  calculateBusStatus,
  formatIndonesianDate,
  formatIndonesianTime,
  matchesTimeOfDay,
  timeStringToMinutes,
} from './utils/timeUtils';
import { Header } from './components/Header';
import { StatCards } from './components/StatCards';
import { UpcomingDepartures } from './components/UpcomingDepartures';
import { FilterBar } from './components/FilterBar';
import { ScheduleTable } from './components/ScheduleTable';
import { ScheduleDetailModal } from './components/ScheduleDetailModal';
import { TerminalSection } from './components/TerminalSection';
import { TerminalInfoModal } from './components/TerminalInfoModal';
import { AdminModal } from './components/AdminModal';
import { QrModal } from './components/QrModal';
import { Footer } from './components/Footer';
import { PrintScheduleView } from './components/PrintScheduleView';
import {
  Clock,
  Calendar,
  Sparkles,
  MapPin,
  Download,
  Printer,
  Compass,
} from 'lucide-react';

const INITIAL_FILTER: FilterState = {
  search: '',
  tujuan: '',
  nama_po: '',
  jenis_bus: '',
  jam_keberangkatan: 'all',
  kategori: 'Semua',
  sortBy: 'jam_asc',
};

export default function App() {
  // Live schedules state
  const [schedules, setSchedules] = useState<BusSchedule[]>(() =>
    ScheduleStorage.getSchedules()
  );

  // Live WIB clock ticking every 1s
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Filter state
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTER);

  // Modals state
  const [selectedSchedule, setSelectedSchedule] = useState<BusSchedule | null>(null);
  const [isTerminalInfoOpen, setIsTerminalInfoOpen] = useState<boolean>(false);
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Real-time clock interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter and sort schedules in real-time
  const filteredSchedules = useMemo(() => {
    return schedules
      .filter((item) => {
        // Search text matching PO, Tujuan, Rute, Jenis Bus
        if (filter.search.trim()) {
          const q = filter.search.toLowerCase().trim();
          const matchPo = item.nama_po.toLowerCase().includes(q);
          const matchTujuan = item.tujuan.toLowerCase().includes(q);
          const matchRute = item.rute.toLowerCase().includes(q);
          const matchJenis = item.jenis_bus.toLowerCase().includes(q);
          if (!matchPo && !matchTujuan && !matchRute && !matchJenis) return false;
        }

        // Category filter (AKAP / AKDP / ALBN)
        if (filter.kategori !== 'Semua' && item.kategori !== filter.kategori) {
          return false;
        }

        // Destination filter
        if (filter.tujuan && item.tujuan !== filter.tujuan) {
          return false;
        }

        // PO filter
        if (filter.nama_po && item.nama_po !== filter.nama_po) {
          return false;
        }

        // Bus type filter
        if (filter.jenis_bus && item.jenis_bus !== filter.jenis_bus) {
          return false;
        }

        // Time of day filter
        if (!matchesTimeOfDay(item.jam_keberangkatan, filter.jam_keberangkatan)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filter.sortBy) {
          case 'jam_asc':
            return (
              timeStringToMinutes(a.jam_keberangkatan) -
              timeStringToMinutes(b.jam_keberangkatan)
            );
          case 'jam_desc':
            return (
              timeStringToMinutes(b.jam_keberangkatan) -
              timeStringToMinutes(a.jam_keberangkatan)
            );
          case 'harga_asc':
            return a.harga_tiket - b.harga_tiket;
          case 'harga_desc':
            return b.harga_tiket - a.harga_tiket;
          case 'po_asc':
            return a.nama_po.localeCompare(b.nama_po);
          case 'tujuan_asc':
            return a.tujuan.localeCompare(b.tujuan);
          default:
            return 0;
        }
      });
  }, [schedules, filter]);

  // Update filter helper
  const handleFilterChange = (partial: Partial<FilterState>) => {
    setFilter((prev) => ({ ...prev, ...partial }));
  };

  const handleResetFilter = () => {
    setFilter(INITIAL_FILTER);
  };

  // Quick destination pick
  const handleQuickDestination = (dest: string) => {
    setFilter((prev) => ({
      ...prev,
      tujuan: prev.tujuan === dest ? '' : dest,
      search: '',
    }));
  };

  // Admin CRUD actions
  const handleAddSchedule = (newSchedule: Omit<BusSchedule, 'id'>) => {
    const created = ScheduleStorage.addSchedule(newSchedule);
    setSchedules(ScheduleStorage.getSchedules());
  };

  const handleUpdateSchedule = (id: string, updated: Partial<BusSchedule>) => {
    ScheduleStorage.updateSchedule(id, updated);
    setSchedules(ScheduleStorage.getSchedules());
  };

  const handleDeleteSchedule = (id: string) => {
    ScheduleStorage.deleteSchedule(id);
    setSchedules(ScheduleStorage.getSchedules());
  };

  const handleResetDefault = () => {
    const defs = ScheduleStorage.resetToDefault();
    setSchedules(defs);
    setFilter(INITIAL_FILTER);
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvContent = ScheduleStorage.exportToCSV(schedules);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `jadwal-bus-terminal-pekalongan-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  // Quick list of popular destinations
  const popularDestinations = ['Jakarta', 'Surabaya', 'Semarang', 'Bandung', 'Solo', 'Denpasar'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Official Top Header */}
      <Header
        currentWibTime={currentTime}
        onOpenTerminalInfo={() => setIsTerminalInfoOpen(true)}
        onOpenQrCode={() => setIsQrOpen(true)}
        onPrint={handlePrint}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminActive={isAdminOpen}
      />

      {/* Main Container */}
      <main className="no-print flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* ======================================================== */}
        {/* HERO SECTION (Requirement 3: Halaman Utama)             */}
        {/* ======================================================== */}
        <section className="bg-linear-to-r from-[#0d2854] via-[#103672] to-[#1a498f] text-white rounded-2xl p-6 sm:p-8 shadow-md mb-6 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none hidden sm:block">
            <Compass className="w-80 h-80 -mr-20 -mb-20 text-white" />
          </div>

          <div className="relative z-10 max-w-3xl">
            {/* Live Realtime Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs border border-white/20 rounded-full text-xs font-semibold text-sky-200 mb-3.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Pusat Informasi Realtime</span>
              <span className="text-white/40">·</span>
              <span className="font-mono text-white tabular-nums">
                {formatIndonesianDate(currentTime)}
              </span>
              <span className="font-mono font-bold text-amber-300 tabular-nums">
                {formatIndonesianTime(currentTime)}
              </span>
            </div>

            {/* Title (Requirement 3) */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              Jadwal Layanan Bus Terminal Tipe A Pekalongan
            </h1>

            {/* Description (Requirement 3) */}
            <p className="text-sm sm:text-base text-sky-100 font-medium leading-relaxed mb-5">
              Informasi jadwal keberangkatan bus, trayek, jenis layanan, dan harga tiket dari Terminal Tipe A Pekalongan.
            </p>

            {/* Quick Destination Pills for Instant Search (Requirement 19: Fast UX) */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-sky-300 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Tujuan Populer:</span>
              </span>
              {popularDestinations.map((dest) => {
                const isSelected = filter.tujuan === dest;
                return (
                  <button
                    key={dest}
                    onClick={() => handleQuickDestination(dest)}
                    className={`px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                        : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                    }`}
                  >
                    {dest}
                  </button>
                );
              })}
              {filter.tujuan && (
                <button
                  onClick={() => handleFilterChange({ tujuan: '' })}
                  className="text-xs text-amber-300 hover:text-white underline ml-1"
                >
                  Hapus
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* DASHBOARD STATISTIK (Requirement 10)                     */}
        {/* ======================================================== */}
        <StatCards schedules={schedules} currentTime={currentTime} />

        {/* ======================================================== */}
        {/* KEBERANGKATAN TERDEKAT (Requirement 18)                  */}
        {/* ======================================================== */}
        <UpcomingDepartures
          schedules={schedules}
          currentTime={currentTime}
          onSelectSchedule={(s) => setSelectedSchedule(s)}
        />

        {/* ======================================================== */}
        {/* FILTER BAR & SEARCH (Requirement 4, 5, 11)              */}
        {/* ======================================================== */}
        <FilterBar
          filter={filter}
          onFilterChange={handleFilterChange}
          onResetFilter={handleResetFilter}
          allSchedules={schedules}
          totalFilteredCount={filteredSchedules.length}
        />

        {/* Action Header above Table */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Daftar Keberangkatan Bus Hari Ini</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                {filteredSchedules.length}
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Pilih salah satu jadwal untuk melihat detail rute, armada, dan info loket.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
              title="Unduh daftar jadwal ini sebagai CSV"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              <span className="hidden sm:inline">Download CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
              title="Cetak lembar jadwal resmi"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-700" />
              <span>Cetak Jadwal</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TABEL JADWAL BUS & MOBILE CARDS (Requirement 6, 7, 8)    */}
        {/* ======================================================== */}
        <ScheduleTable
          schedules={filteredSchedules}
          currentTime={currentTime}
          onSelectSchedule={(s) => setSelectedSchedule(s)}
          onQuickEdit={(s) => {
            setIsAdminOpen(true);
          }}
          isAdmin={isAdminOpen}
        />

        {/* ======================================================== */}
        {/* INFORMASI TERMINAL SECTION (Requirement 12)              */}
        {/* ======================================================== */}
        <TerminalSection onOpenModal={() => setIsTerminalInfoOpen(true)} />
      </main>

      {/* Official Footer (Requirement 13) */}
      <Footer />

      {/* ======================================================== */}
      {/* MODALS & OVERLAYS                                        */}
      {/* ======================================================== */}

      {/* 1. Schedule Detail Modal (Requirement 9) */}
      <ScheduleDetailModal
        schedule={selectedSchedule}
        currentTime={currentTime}
        onClose={() => setSelectedSchedule(null)}
      />

      {/* 2. Full Terminal Information Modal (Requirement 12) */}
      <TerminalInfoModal
        isOpen={isTerminalInfoOpen}
        onClose={() => setIsTerminalInfoOpen(false)}
      />

      {/* 3. QR Code Website Modal (Requirement 18) */}
      <QrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        url={window.location.href}
      />

      {/* 4. Admin Management CRUD Modal (Requirement 14) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        schedules={schedules}
        onAddSchedule={handleAddSchedule}
        onUpdateSchedule={handleUpdateSchedule}
        onDeleteSchedule={handleDeleteSchedule}
        onResetDefault={handleResetDefault}
        onExportCSV={handleExportCSV}
      />

      {/* 5. Print Sheet Template (Strictly print only) */}
      <PrintScheduleView
        schedules={filteredSchedules}
        currentWibTime={currentTime}
      />
    </div>
  );
}
