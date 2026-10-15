import { Heart, MapPin, Search } from 'lucide-react';
import { normalizeText } from '../utils/weatherUtils';

export default function CityList({ cities, selectedId, onSelect, favorites, onToggleFavorite, query, onQueryChange }) {
  const filtered = cities.filter((city) => normalizeText(city.name).includes(normalizeText(query)));
  return (
    <section className="panel city-panel" aria-label="Danh sách thành phố">
      <div className="panel-heading">
        <div><p className="eyebrow">KHÁM PHÁ</p><h2>Thành phố</h2></div>
        <span className="count">{cities.length} địa điểm</span>
      </div>
      <label className="search-box">
        <Search size={18} aria-hidden="true" />
        <input value={query} onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Tìm thành phố..." aria-label="Tìm thành phố không phân biệt dấu" />
      </label>
      <div className="city-list">
        {filtered.length === 0 && <p className="muted empty-search">Không tìm thấy thành phố phù hợp.</p>}
        {filtered.map((city) => (
          <div key={city.id} className={`city-row ${selectedId === city.id ? 'selected' : ''}`}>
            <button className="city-select" type="button" onClick={() => onSelect(city.id)}
              aria-pressed={selectedId === city.id}>
              <MapPin size={18} aria-hidden="true" /><span>{city.name}</span>
            </button>
            <button className={`favorite-btn ${favorites.includes(city.id) ? 'is-favorite' : ''}`}
              type="button" onClick={() => onToggleFavorite(city.id)}
              aria-label={`${favorites.includes(city.id) ? 'Bỏ yêu thích' : 'Yêu thích'} ${city.name}`}
              aria-pressed={favorites.includes(city.id)} title="Yêu thích">
              <Heart size={19} fill={favorites.includes(city.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        ))}
      </div>
      <p className="sidebar-hint">♡ Đánh dấu trái tim để lưu thành phố yêu thích trên thiết bị.</p>
    </section>
  );
}
