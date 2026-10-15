import WeatherIcon from './WeatherIcon';
import { formatDay, toTemperature, weatherInfo } from '../utils/weatherUtils';

export default function Forecast7Days({ daily, unit }) {
  return (
    <section className="panel forecast-panel">
      <div className="forecast-heading"><div><p className="eyebrow">KẾ HOẠCH TUẦN NÀY</p><h2>Dự báo 7 ngày</h2></div>
        <span className="muted">Cao nhất / Thấp nhất</span></div>
      <div className="forecast-grid">
        {daily.time.map((date, index) => {
          const day = formatDay(date);
          const info = weatherInfo(daily.weather_code[index]);
          return (
            <div className="forecast-day" key={date}>
              <strong>{day.weekday}</strong><span className="muted">{day.date}</span>
              <WeatherIcon name={info.icon} size={35} />
              <span className="forecast-description">{info.label}</span>
              <div className="forecast-temps"><strong>{toTemperature(daily.temperature_2m_max[index], unit)}</strong>
                <span>{toTemperature(daily.temperature_2m_min[index], unit)}</span></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
