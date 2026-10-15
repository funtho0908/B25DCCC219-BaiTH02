import { Clock3, Droplets, Wind } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { formatUpdate, toTemperature, weatherInfo } from '../utils/weatherUtils';

export default function CurrentWeather({ city, current, unit }) {
  const info = weatherInfo(current.weather_code);
  return (
    <section className="current-card" aria-label={`Thời tiết hiện tại tại ${city.name}`}>
      <div className="current-top"><div><p className="eyebrow">THỜI TIẾT HIỆN TẠI</p><h2>{city.name}</h2></div>
        <span className="live-tag"><span className="live-dot" /> Trực tiếp</span>
      </div>
      <div className="current-main">
        <div className="weather-symbol"><WeatherIcon name={info.icon} size={88} /></div>
        <div><div className="big-temperature">{toTemperature(current.temperature_2m, unit)}<span>{unit}</span></div>
          <p className="condition">{info.label}</p></div>
      </div>
      <div className="metrics">
        <div className="metric"><Droplets size={22} /><div><span>Độ ẩm</span><strong>{current.relative_humidity_2m ?? '—'}%</strong></div></div>
        <div className="metric"><Wind size={22} /><div><span>Tốc độ gió</span><strong>{current.wind_speed_10m ?? '—'} km/h</strong></div></div>
      </div>
      <p className="updated"><Clock3 size={15} /> Cập nhật: {formatUpdate(current.time)}</p>
    </section>
  );
}
