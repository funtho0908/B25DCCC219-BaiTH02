export function normalizeText(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim();
}

export function toTemperature(celsius, unit) {
  if (celsius == null || !Number.isFinite(Number(celsius))) return '—';
  const value = unit === 'F' ? Number(celsius) * 9 / 5 + 32 : Number(celsius);
  return `${Math.round(value)}°`;
}

export function weatherInfo(code) {
  if (code === 0) return { label: 'Trời quang', icon: 'sun', theme: 'sunny' };
  if ([1, 2].includes(code)) return { label: 'Ít mây', icon: 'cloud-sun', theme: 'sunny' };
  if (code === 3) return { label: 'Nhiều mây', icon: 'cloud', theme: 'cloudy' };
  if ([45, 48].includes(code)) return { label: 'Sương mù', icon: 'cloud-fog', theme: 'cloudy' };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Mưa phùn', icon: 'cloud-drizzle', theme: 'rainy' };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Có mưa', icon: 'cloud-rain', theme: 'rainy' };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Có tuyết', icon: 'cloud-snow', theme: 'cloudy' };
  if ([95, 96, 99].includes(code)) return { label: 'Dông', icon: 'cloud-lightning', theme: 'stormy' };
  return { label: 'Chưa rõ', icon: 'cloud', theme: 'cloudy' };
}

// Open-Meteo trả thời gian địa phương dạng YYYY-MM-DDTHH:mm.
// Không chuyển qua Date.UTC hay múi giờ trình duyệt.
export function formatUpdate(localIso) {
  if (!localIso || !localIso.includes('T')) return 'Không rõ';
  const [date, time] = localIso.split('T');
  const [y, m, d] = date.split('-');
  return `${time.slice(0, 5)} • ${d}/${m}/${y} (VN)`;
}

export function formatDay(dateString) {
  const [y, m, d] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const weekday = date.getUTCDay();
  return {
    weekday: weekday === 0 ? 'CN' : `Th ${weekday + 1}`,
    date: `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}`,
  };
}
