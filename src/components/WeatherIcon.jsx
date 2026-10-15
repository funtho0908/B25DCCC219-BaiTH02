import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Sun } from 'lucide-react';

const icons = {
  sun: Sun, 'cloud-sun': CloudSun, cloud: Cloud, 'cloud-fog': CloudFog,
  'cloud-drizzle': CloudDrizzle, 'cloud-rain': CloudRain,
  'cloud-snow': CloudSnow, 'cloud-lightning': CloudLightning,
};

export default function WeatherIcon({ name, size = 36, className = '' }) {
  const Icon = icons[name] || Cloud;
  return <Icon size={size} strokeWidth={1.7} className={className} aria-hidden="true" />;
}
