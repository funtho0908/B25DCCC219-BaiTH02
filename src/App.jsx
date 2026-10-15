import { useEffect, useRef, useState } from 'react';
import { CloudSun, RefreshCw, AlertCircle, MapPinned } from 'lucide-react';
import CityList from './components/CityList';
import CurrentWeather from './components/CurrentWeather';
import Forecast7Days from './components/Forecast7Days';
import UnitToggle from './components/UnitToggle';
import { CITIES } from './data/cities';
import { getWeather } from './services/weatherApi';
import { weatherInfo } from './utils/weatherUtils';

const FAVORITES_KEY = 'baith02-favorite-cities';

function loadFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    return Array.isArray(value) ? value.filter((id) => CITIES.some((city) => city.id === id)) : [];
  } catch { return []; }
}

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [unit, setUnit] = useState('C');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState(loadFavorites);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);
  const requestId = useRef(0);

  const city = CITIES.find((item) => item.id === selectedId);
  const theme = weather && status === 'success' ? weatherInfo(weather.current.weather_code).theme : 'default';

  useEffect(() => {
    if (!city) return;
    const controller = new AbortController();
    const id = ++requestId.current;
    setStatus('loading');
    setError('');
    setWeather(null);
    getWeather(city, controller.signal)
      .then((data) => {
        if (id !== requestId.current) return;
        setWeather(data);
        setStatus('success');
      })
      .catch((err) => {
        if (controller.signal.aborted || id !== requestId.current) return;
        setError(err.message || 'Không thể lấy dữ liệu thời tiết.');
        setStatus('error');
      });
    return () => controller.abort();
  }, [selectedId, retryKey]);

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(next)); } catch { /* Trình duyệt có thể chặn lưu trữ */ }
      return next;
    });
  }

  return (
    <div className={`app theme-${theme}`}>
      <header className="site-header">
        <div className="brand"><div className="brand-icon"><CloudSun size={26} /></div>
          <div><strong>VietWeather</strong><span>Thời tiết Việt Nam</span></div></div>
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

      <main className="container">
        <div className="hero"><p className="eyebrow">XIN CHÀO, VIỆT NAM ☀</p>
          <h1>Hôm nay trời <span>thế nào?</span></h1>
          <p>Khám phá thời tiết hiện tại và dự báo 7 ngày tại 8 thành phố trên khắp Việt Nam.</p></div>

        <div className="layout">
          <CityList cities={CITIES} selectedId={selectedId} onSelect={setSelectedId}
            favorites={favorites} onToggleFavorite={toggleFavorite} query={query} onQueryChange={setQuery} />

          <div className="weather-content" aria-live="polite">
            {status === 'idle' && <div className="panel state-panel">
              <MapPinned size={60} strokeWidth={1.4} /><h2>Chọn một thành phố</h2>
              <p>Chọn địa điểm từ danh sách bên trái để xem thời tiết hiện tại và dự báo 7 ngày.</p></div>}
            {status === 'loading' && <div className="panel state-panel" role="status">
              <div className="spinner" /><h2>Đang tải thời tiết...</h2><p>Đang cập nhật thông tin cho {city?.name}.</p></div>}
            {status === 'error' && <div className="panel state-panel error-panel" role="alert">
              <AlertCircle size={54} /><h2>Không tải được dữ liệu</h2><p>{error}</p>
              <button className="retry-btn" onClick={() => setRetryKey((key) => key + 1)}>
                <RefreshCw size={17} /> Thử lại</button></div>}
            {status === 'success' && weather && city && <>
              <CurrentWeather city={city} current={weather.current} unit={unit} />
              <Forecast7Days daily={weather.daily} unit={unit} />
            </>}
          </div>
        </div>
      </main>
      <footer className="footer">Dữ liệu cung cấp bởi <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a> · BaiTH02 · React + Vite</footer>
    </div>
  );
}
