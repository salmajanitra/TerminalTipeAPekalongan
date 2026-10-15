import React from 'react';
import { BusSchedule } from '../types/bus';
import { formatIndonesianDate, formatIndonesianTime, formatRupiah } from '../utils/timeUtils';
import { TERMINAL_INFO } from '../data/defaultSchedules';

interface PrintScheduleViewProps {
  schedules: BusSchedule[];
  currentWibTime: Date;
}

export const PrintScheduleView: React.FC<PrintScheduleViewProps> = ({
  schedules,
  currentWibTime,
}) => {
  return (
    <div className="hidden print:block p-6 text-black bg-white">
      {/* Official Government Print Header */}
      <div className="border-b-2 border-black pb-4 mb-4 text-center">
        <h4 className="text-xs uppercase font-bold tracking-widest text-slate-700">
          KEMENTERIAN PERHUBUNGAN REPUBLIK INDONESIA
        </h4>
        <h3 className="text-sm font-bold text-slate-800">
          DIREKTORAT JENDERAL PERHUBUNGAN DARAT - BPTD KELAS I JAWA TENGAH
        </h3>
        <h1 className="text-lg font-extrabold uppercase mt-1">
          JADWAL RESMI LAYANAN BUS TERMINAL PENUMPANG TIPE A PEKALONGAN
        </h1>
        <p className="text-[11px] text-slate-600 mt-0.5">
          {TERMINAL_INFO.lokasi} · Telp: {TERMINAL_INFO.kontak.telepon} · Call Center: 151
        </p>

        <div className="flex items-center justify-between text-xs mt-3 pt-2 border-t border-slate-300">
          <span>
            Tanggal Cetak: <strong>{formatIndonesianDate(currentWibTime)}</strong> ({formatIndonesianTime(currentWibTime)})
          </span>
          <span>
            Total Armada Terjadwal: <strong>{schedules.length} Keberangkatan</strong>
          </span>
        </div>
      </div>

      {/* Schedule Table for Print */}
      <table className="w-full text-xs text-left border-collapse border border-slate-400">
        <thead>
          <tr className="bg-slate-100 font-bold border-b border-slate-400">
            <th className="p-2 border border-slate-300 text-center w-8">No</th>
            <th className="p-2 border border-slate-300 w-16 text-center">Jam</th>
            <th className="p-2 border border-slate-300">Nama PO Bus</th>
            <th className="p-2 border border-slate-300">Tujuan & Rute Lintasan</th>
            <th className="p-2 border border-slate-300">Jenis / Kelas</th>
            <th className="p-2 border border-slate-300">Kategori</th>
            <th className="p-2 border border-slate-300 text-center">Peron</th>
            <th className="p-2 border border-slate-300 text-right">Harga Tiket</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((item, index) => (
            <tr key={item.id} className="border-b border-slate-200">
              <td className="p-1.5 border border-slate-300 text-center font-mono">{index + 1}</td>
              <td className="p-1.5 border border-slate-300 text-center font-mono font-bold">
                {item.jam_keberangkatan}
              </td>
              <td className="p-1.5 border border-slate-300 font-bold">
                {item.nama_po}
                {item.nomor_armada && (
                  <span className="block text-[10px] font-normal text-slate-600 font-mono">
                    {item.nomor_armada}
                  </span>
                )}
              </td>
              <td className="p-1.5 border border-slate-300">
                <strong>{item.tujuan}</strong>
                <span className="block text-[10px] text-slate-600">{item.rute}</span>
              </td>
              <td className="p-1.5 border border-slate-300">
                {item.jenis_bus}
                <span className="block text-[10px] text-slate-500">{item.kelas_layanan}</span>
              </td>
              <td className="p-1.5 border border-slate-300 text-center font-semibold">
                {item.kategori}
              </td>
              <td className="p-1.5 border border-slate-300 text-center">
                {item.jalur_peron}
              </td>
              <td className="p-1.5 border border-slate-300 text-right font-mono font-bold">
                {formatRupiah(item.harga_tiket)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Official Sign-off Footer */}
      <div className="mt-6 flex justify-between items-end text-xs pt-4 border-t border-slate-300">
        <div className="text-[10px] text-slate-500 max-w-sm">
          * Dokumen ini dikeluarkan resmi oleh Satuan Pelayanan Terminal Tipe A Pekalongan.
          Jadwal dan tarif dapat berubah sewaktu-waktu sesuai ketentuan PO dan Dishub.
        </div>
        <div className="text-center w-56">
          <p>Pekalongan, {formatIndonesianDate(currentWibTime)}</p>
          <p className="font-semibold mt-1">Petugas Pelayanan Terminal</p>
          <div className="h-16" />
          <p className="font-bold border-b border-black pb-0.5 inline-block">
            Satpel Terminal Tipe A Pekalongan
          </p>
          <p className="text-[10px] text-slate-500">BPTD Kelas I Jawa Tengah</p>
        </div>
      </div>
    </div>
  );
};
