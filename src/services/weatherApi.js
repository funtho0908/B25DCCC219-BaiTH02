const API_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getWeather(city, signal) {
  const params = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'Asia/Ho_Chi_Minh',
    forecast_days: '7',
  });
  const response = await fetch(`${API_URL}?${params}`, { signal });
  if (!response.ok) throw new Error(`Máy chủ trả về lỗi HTTP ${response.status}.`);
  const data = await response.json();
  if (data.error) throw new Error(data.reason || 'API không thể xử lý yêu cầu.');
  if (!data.current || !data.daily || !Array.isArray(data.daily.time)) {
    throw new Error('Dữ liệu thời tiết không hợp lệ.');
  }
  const d = data.daily;
  if ([d.weather_code, d.temperature_2m_max, d.temperature_2m_min].some(
    (arr) => !Array.isArray(arr) || arr.length !== d.time.length
  ) || d.time.length !== 7) {
    throw new Error('Dữ liệu dự báo 7 ngày không đầy đủ.');
  }
  return data;
}
