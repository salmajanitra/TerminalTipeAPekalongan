export type BusKategori = 'AKAP' | 'AKDP' | 'ALBN';

export type BusStatus = 'Akan Berangkat' | 'Segera Berangkat' | 'Sudah Berangkat' | 'Delay' | 'Dibatalkan';

export type TimeOfDayFilter = 'all' | 'pagi' | 'siang' | 'sore' | 'malam';

export type SortOption = 'jam_asc' | 'jam_desc' | 'harga_asc' | 'harga_desc' | 'po_asc' | 'tujuan_asc';

export interface BusSchedule {
  id: string;
  nama_po: string;
  nomor_armada?: string;
  rute: string;
  asal: string;
  tujuan: string;
  jenis_bus: string;
  kategori: BusKategori;
  kelas_layanan: string;
  jam_keberangkatan: string; // Format "HH:mm"
  harga_tiket: number;
  status: BusStatus;
  keterangan: string;
  fasilitas: string[];
  jalur_peron: string;
  kontak_loket?: string;
  estimasi_waktu?: string;
  kursi_tersedia?: number;
}

export interface FilterState {
  search: string;
  tujuan: string;
  nama_po: string;
  jenis_bus: string;
  jam_keberangkatan: TimeOfDayFilter;
  kategori: 'Semua' | BusKategori;
  sortBy: SortOption;
}
