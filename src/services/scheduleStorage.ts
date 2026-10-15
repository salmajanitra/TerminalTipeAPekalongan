import { BusSchedule } from '../types/bus';
import { DEFAULT_BUS_SCHEDULES } from '../data/defaultSchedules';

const STORAGE_KEY = 'pekalongan_terminal_schedules_v1';

export const ScheduleStorage = {
  /**
   * Load all bus schedules from storage or default
   */
  getSchedules(): BusSchedule[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BUS_SCHEDULES));
        return DEFAULT_BUS_SCHEDULES;
      }
      return JSON.parse(data) as BusSchedule[];
    } catch (e) {
      console.error('Failed to parse schedules from storage:', e);
      return DEFAULT_BUS_SCHEDULES;
    }
  },

  /**
   * Save schedules to local storage
   */
  saveSchedules(schedules: BusSchedule[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
    } catch (e) {
      console.error('Failed to save schedules to storage:', e);
    }
  },

  /**
   * Add a new bus schedule
   */
  addSchedule(schedule: Omit<BusSchedule, 'id'>): BusSchedule {
    const schedules = this.getSchedules();
    const newId = `pk-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`;
    const newSchedule: BusSchedule = {
      ...schedule,
      id: newId,
    };
    schedules.unshift(newSchedule);
    this.saveSchedules(schedules);
    return newSchedule;
  },

  /**
   * Update an existing schedule
   */
  updateSchedule(id: string, updated: Partial<BusSchedule>): boolean {
    const schedules = this.getSchedules();
    const index = schedules.findIndex((s) => s.id === id);
    if (index === -1) return false;

    schedules[index] = {
      ...schedules[index],
      ...updated,
    };
    this.saveSchedules(schedules);
    return true;
  },

  /**
   * Delete a schedule by ID
   */
  deleteSchedule(id: string): boolean {
    const schedules = this.getSchedules();
    const filtered = schedules.filter((s) => s.id !== id);
    if (filtered.length === schedules.length) return false;
    this.saveSchedules(filtered);
    return true;
  },

  /**
   * Reset data to default factory records
   */
  resetToDefault(): BusSchedule[] {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BUS_SCHEDULES));
    return DEFAULT_BUS_SCHEDULES;
  },

  /**
   * Export schedules to CSV string
   */
  exportToCSV(schedules: BusSchedule[]): string {
    const headers = [
      'ID',
      'Nama PO',
      'Nomor Armada',
      'Asal',
      'Tujuan',
      'Rute Lengkap',
      'Kategori',
      'Jenis Bus',
      'Kelas Layanan',
      'Jam Keberangkatan',
      'Harga Tiket (Rp)',
      'Jalur Peron',
      'Status',
      'Keterangan'
    ];

    const rows = schedules.map((s) => [
      `"${s.id}"`,
      `"${s.nama_po.replace(/"/g, '""')}"`,
      `"${(s.nomor_armada || '').replace(/"/g, '""')}"`,
      `"${s.asal}"`,
      `"${s.tujuan}"`,
      `"${s.rute.replace(/"/g, '""')}"`,
      `"${s.kategori}"`,
      `"${s.jenis_bus}"`,
      `"${s.kelas_layanan}"`,
      `"${s.jam_keberangkatan}"`,
      s.harga_tiket,
      `"${s.jalur_peron}"`,
      `"${s.status}"`,
      `"${s.keterangan.replace(/"/g, '""')}"`
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }
};
