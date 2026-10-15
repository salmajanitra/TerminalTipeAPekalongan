import { BusStatus, TimeOfDayFilter } from '../types/bus';

/**
 * Format a number to Indonesian Rupiah currency string
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get Indonesian formatted date string
 */
export function formatIndonesianDate(date: Date = new Date()): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${monthName} ${year}`;
}

/**
 * Format time to HH:mm:ss WIB
 */
export function formatIndonesianTime(date: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${hours}:${minutes}:${seconds} WIB`;
}

/**
 * Parse time string "HH:mm" into total minutes from midnight
 */
export function timeStringToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map((val) => parseInt(val, 10) || 0);
  return h * 60 + m;
}

/**
 * Automatically calculate schedule status based on current time
 * Rule:
 * - "Sudah Berangkat" if departure was > 10 minutes ago
 * - "Segera Berangkat" if departing within the next 30 minutes (0 to 30 min)
 * - "Akan Berangkat" if departure is more than 30 minutes in the future
 */
export function calculateBusStatus(departureTimeStr: string, currentTime: Date = new Date()): BusStatus {
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const departureMinutes = timeStringToMinutes(departureTimeStr);

  const diff = departureMinutes - currentMinutes;

  if (diff < -15) {
    return 'Sudah Berangkat';
  } else if (diff <= 30 && diff >= -15) {
    return 'Segera Berangkat';
  } else {
    return 'Akan Berangkat';
  }
}

/**
 * Check if a departure time falls within a given time of day filter
 * Pagi: 05:00 - 11:59
 * Siang: 12:00 - 14:59
 * Sore: 15:00 - 18:59
 * Malam: 19:00 - 04:59
 */
export function matchesTimeOfDay(departureTimeStr: string, filter: TimeOfDayFilter): boolean {
  if (filter === 'all') return true;

  const [hours] = departureTimeStr.split(':').map(Number);
  if (isNaN(hours)) return true;

  switch (filter) {
    case 'pagi':
      return hours >= 5 && hours < 12;
    case 'siang':
      return hours >= 12 && hours < 15;
    case 'sore':
      return hours >= 15 && hours < 19;
    case 'malam':
      return hours >= 19 || hours < 5;
    default:
      return true;
  }
}
