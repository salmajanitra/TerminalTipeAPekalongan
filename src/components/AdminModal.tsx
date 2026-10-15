import React, { useState } from 'react';
import { BusSchedule, BusKategori, BusStatus } from '../types/bus';
import { formatRupiah } from '../utils/timeUtils';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Download,
  RotateCcw,
  Search,
  Check,
  AlertCircle,
  Save,
  Bus,
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedules: BusSchedule[];
  onAddSchedule: (schedule: Omit<BusSchedule, 'id'>) => void;
  onUpdateSchedule: (id: string, updated: Partial<BusSchedule>) => void;
  onDeleteSchedule: (id: string) => void;
  onResetDefault: () => void;
  onExportCSV: () => void;
}

const INITIAL_FORM_STATE: Omit<BusSchedule, 'id'> = {
  nama_po: '',
  nomor_armada: '',
  rute: '',
  asal: 'Terminal Tipe A Pekalongan',
  tujuan: '',
  jenis_bus: 'Executive',
  kategori: 'AKAP',
  kelas_layanan: 'Executive 2+2',
  jam_keberangkatan: '08:00',
  harga_tiket: 150000,
  status: 'Akan Berangkat',
  keterangan: 'Via Tol Trans Jawa',
  fasilitas: ['AC', 'Toilet', 'Reclining Seat'],
  jalur_peron: 'Jalur 1',
  kontak_loket: '',
  estimasi_waktu: '5 Jam',
};

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  schedules,
  onAddSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
  onResetDefault,
  onExportCSV,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<BusSchedule, 'id'>>(INITIAL_FORM_STATE);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStartAdd = () => {
    setEditingId(null);
    setFormData(INITIAL_FORM_STATE);
    setActiveTab('form');
  };

  const handleStartEdit = (item: BusSchedule) => {
    setEditingId(item.id);
    setFormData({
      nama_po: item.nama_po,
      nomor_armada: item.nomor_armada || '',
      rute: item.rute,
      asal: item.asal,
      tujuan: item.tujuan,
      jenis_bus: item.jenis_bus,
      kategori: item.kategori,
      kelas_layanan: item.kelas_layanan,
      jam_keberangkatan: item.jam_keberangkatan,
      harga_tiket: item.harga_tiket,
      status: item.status,
      keterangan: item.keterangan,
      fasilitas: item.fasilitas || [],
      jalur_peron: item.jalur_peron || 'Jalur 1',
      kontak_loket: item.kontak_loket || '',
      estimasi_waktu: item.estimasi_waktu || '',
    });
    setActiveTab('form');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama_po.trim() || !formData.tujuan.trim() || !formData.jam_keberangkatan) {
      alert('Mohon lengkapi Nama PO, Tujuan, dan Jam Keberangkatan.');
      return;
    }

    if (editingId) {
      onUpdateSchedule(editingId, formData);
      showNotice(`Jadwal ${formData.nama_po} berhasil diperbarui.`);
    } else {
      onAddSchedule(formData);
      showNotice(`Jadwal baru ${formData.nama_po} berhasil ditambahkan.`);
    }

    setActiveTab('list');
    setEditingId(null);
  };

  const handleDelete = (id: string, name: string) => {
    onDeleteSchedule(id);
    setDeleteConfirmId(null);
    showNotice(`Jadwal ${name} telah dihapus.`);
  };

  const filtered = schedules.filter(
    (s) =>
      s.nama_po.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tujuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rute.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#0b1c36] text-white p-4 sm:p-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 uppercase tracking-wider">
                Panel Petugas Terminal
              </span>
              <span className="text-xs text-sky-200">Terminal Tipe A Pekalongan</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold mt-1">
              Pengelolaan Data Jadwal Bus & Tarif
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Tutup Panel Admin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice toast */}
        {notification && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 flex items-center gap-2 animate-in fade-in shrink-0">
            <Check className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Action bar and Tab switches */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:px-6 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'list'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daftar Jadwal ({schedules.length})
            </button>
            <button
              onClick={handleStartAdd}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1 ${
                activeTab === 'form' && !editingId
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Jadwal</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportCSV}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors"
              title="Unduh file spreadsheet CSV jadwal"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Kembalikan semua jadwal ke data default asli Terminal Pekalongan?')) {
                  onResetDefault();
                  showNotice('Data berhasil dikembalikan ke jadwal default.');
                }
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-md hover:bg-rose-100 transition-colors"
              title="Kembalikan ke data awal"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>

        {/* Tab 1: SCHEDULES LIST TABLE */}
        {activeTab === 'list' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
            {/* Quick search input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari dalam tabel admin (PO, tujuan, rute)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Jam</th>
                      <th className="py-2.5 px-3">Nama PO</th>
                      <th className="py-2.5 px-3">Tujuan & Rute</th>
                      <th className="py-2.5 px-3">Jenis / Kelas</th>
                      <th className="py-2.5 px-3">Harga</th>
                      <th className="py-2.5 px-3">Peron</th>
                      <th className="py-2.5 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                          {item.jam_keberangkatan}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">
                          {item.nama_po}
                        </td>
                        <td className="py-2.5 px-3 max-w-xs truncate">
                          <span className="font-bold text-blue-900">{item.tujuan}</span>
                          <span className="text-slate-400 block text-[11px] truncate">
                            {item.rute}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                          {item.jenis_bus} ({item.kategori})
                        </td>
                        <td className="py-2.5 px-3 font-mono font-medium text-emerald-700 whitespace-nowrap">
                          {formatRupiah(item.harga_tiket)}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                          {item.jalur_peron}
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(item)}
                              className="p-1 text-blue-700 hover:bg-blue-100 rounded transition-colors"
                              title="Edit jadwal"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(item.id)}
                              className="p-1 text-rose-600 hover:bg-rose-100 rounded transition-colors"
                              title="Hapus jadwal"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delete Confirmation Dialog */}
            {deleteConfirmId && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-900">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Apakah Anda yakin ingin menghapus jadwal bus ini?</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const item = schedules.find((s) => s.id === deleteConfirmId);
                      if (item) handleDelete(item.id, item.nama_po);
                    }}
                    className="px-2.5 py-1 bg-rose-600 text-white font-semibold rounded hover:bg-rose-700"
                  >
                    Ya, Hapus
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-100"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: ADD / EDIT FORM */}
        {activeTab === 'form' && (
          <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingId ? 'Edit Data Jadwal Bus' : 'Tambah Jadwal Bus Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Kembali ke Daftar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Nama PO */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nama PO Bus *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PO Nusantara"
                  value={formData.nama_po}
                  onChange={(e) => setFormData({ ...formData, nama_po: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-600 text-slate-900"
                />
              </div>

              {/* Nomor Armada */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nomor / Identitas Armada
                </label>
                <input
                  type="text"
                  placeholder="Contoh: NS-01 Super Executive"
                  value={formData.nomor_armada}
                  onChange={(e) => setFormData({ ...formData, nomor_armada: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-600 text-slate-900"
                />
              </div>

              {/* Asal */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Asal Keberangkatan
                </label>
                <input
                  type="text"
                  value={formData.asal}
                  onChange={(e) => setFormData({ ...formData, asal: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-600 text-slate-900"
                />
              </div>

              {/* Tujuan */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Kota Tujuan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Jakarta / Surabaya / Bandung"
                  value={formData.tujuan}
                  onChange={(e) => setFormData({ ...formData, tujuan: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-600 text-slate-900"
                />
              </div>

              {/* Jam Keberangkatan */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Jam Keberangkatan (HH:mm) *
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-2][0-9]:[0-5][0-9]"
                  placeholder="07:00"
                  value={formData.jam_keberangkatan}
                  onChange={(e) => setFormData({ ...formData, jam_keberangkatan: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md font-mono focus:ring-1 focus:ring-blue-600 text-slate-900"
                />
              </div>

              {/* Harga Tiket */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Harga Tiket (Rp) *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  step={5000}
                  value={formData.harga_tiket}
                  onChange={(e) =>
                    setFormData({ ...formData, harga_tiket: Number(e.target.value) || 0 })
                  }
                  className="w-full p-2 border border-slate-300 rounded-md font-mono focus:ring-1 focus:ring-blue-600 text-slate-900"
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Kategori Trayek
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value as BusKategori })
                  }
                  className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-900"
                >
                  <option value="AKAP">AKAP (Antar Kota Antar Provinsi)</option>
                  <option value="AKDP">AKDP (Antar Kota Dalam Provinsi)</option>
                  <option value="ALBN">ALBN (Antar Lintas Batas Negara / Wisata)</option>
                </select>
              </div>

              {/* Jenis Bus */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Jenis Bus
                </label>
                <select
                  value={formData.jenis_bus}
                  onChange={(e) => setFormData({ ...formData, jenis_bus: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-900"
                >
                  <option value="Executive">Executive</option>
                  <option value="Super Executive">Super Executive</option>
                  <option value="Sleeper Class">Sleeper Class</option>
                  <option value="Bisnis">Bisnis</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="VIP AC">VIP AC</option>
                </select>
              </div>

              {/* Kelas Layanan */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Kelas & Konfigurasi Kursi
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Executive 2+2 Reclining Seat"
                  value={formData.kelas_layanan}
                  onChange={(e) => setFormData({ ...formData, kelas_layanan: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md text-slate-900"
                />
              </div>

              {/* Jalur Peron */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Jalur Peron Keberangkatan
                </label>
                <select
                  value={formData.jalur_peron}
                  onChange={(e) => setFormData({ ...formData, jalur_peron: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-900"
                >
                  <option value="Jalur 1">Jalur 1</option>
                  <option value="Jalur 2">Jalur 2</option>
                  <option value="Jalur 3">Jalur 3</option>
                  <option value="Jalur 4">Jalur 4</option>
                  <option value="Jalur 5">Jalur 5</option>
                  <option value="Jalur Khusus">Jalur Khusus</option>
                </select>
              </div>

              {/* Rute Lengkap */}
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Rute Lintasan Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pekalongan → Pemalang → Tegal → Cirebon → Jakarta (Pulo Gebang)"
                  value={formData.rute}
                  onChange={(e) => setFormData({ ...formData, rute: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md text-slate-900"
                />
              </div>

              {/* Keterangan */}
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Keterangan Tambahan
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Via Tol Trans Jawa, Servis Makan di KM 228"
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md text-slate-900"
                />
              </div>

              {/* Kontak Loket */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Kontak Loket PO
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 0812-3456-7890 (Loket 02)"
                  value={formData.kontak_loket}
                  onChange={(e) => setFormData({ ...formData, kontak_loket: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md text-slate-900"
                />
              </div>

              {/* Estimasi Waktu */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Estimasi Waktu Tempuh
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 5 - 6 Jam"
                  value={formData.estimasi_waktu}
                  onChange={(e) => setFormData({ ...formData, estimasi_waktu: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-md text-slate-900"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-xs inline-flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Simpan Perubahan' : 'Tambahkan Jadwal'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Modal Bottom Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 px-4 sm:px-6 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>
            Data tersimpan otomatis di sistem lokal (localStorage) Terminal Tipe A Pekalongan.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 text-white font-semibold rounded-md hover:bg-slate-900"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
};
