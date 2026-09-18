import { useState } from 'react';
import { ArrowUpRight, Cloud, Droplets, MapPin, Sun, Wind } from 'lucide-react';
import { useWeather } from '../../hooks/useWeather';
import { WeatherDetails } from './WeatherDetails';

function getWeatherDescription(code: number | undefined): string {
  if (code === undefined || code < 3) return 'Parcialmente soleado';
  if (code < 50) return 'Cielo nublado';
  return 'Probabilidad de lluvia';
}

export function WeatherWidget() {
  const { data: weather } = useWeather();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <section className="weather card dark">
      <div className="weather-top">
        <span>
          <MapPin size={13} /> Buenos Aires
        </span>
        <span>
          {weather ? 'Actualizado ahora' : 'Clima de muestra'} <span className="live-dot" />
        </span>
      </div>
      <div className="weather-main">
        <div>
          <strong>
            {weather?.temperature ?? 22}
            <sup>°</sup>
          </strong>
          <div>
            {getWeatherDescription(weather?.code)}
            <small>Un buen día para estar al día.</small>
          </div>
        </div>
        <div className="weather-art">
          <Sun className="weather-sun" />
          <Cloud className="weather-cloud" />
        </div>
      </div>
      <div className="weather-bottom">
        <span>
          <Droplets size={13} />
          {weather?.humidity ?? 64}%
        </span>
        <span>
          <Wind size={14} />
          {weather?.windSpeed ?? 12} km/h
        </span>
        <button onClick={() => setIsDetailsOpen((open) => !open)}>
          {isDetailsOpen ? 'Cerrar detalle' : 'Ver el clima'}
          <ArrowUpRight size={14} />
        </button>
      </div>
      {isDetailsOpen && <WeatherDetails hasLiveData={weather !== null} />}
    </section>
  );
}
