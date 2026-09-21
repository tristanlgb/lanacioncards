import { useState } from 'react';
import { ArrowUpRight, Cloud, Droplets, MapPin, Sun, Wind } from 'lucide-react';
import { useWeather } from '../../hooks/useWeather';
import { weatherDescription } from '../../utils/weather';
import { ForecastDialog } from './ForecastDialog';

export function WeatherWidget() {
  const forecast = useWeather();
  const weather = forecast.data?.current;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <section className="weather card dark">
        <div className="weather-top">
          <span>
            <MapPin size={13} /> Buenos Aires
          </span>
          <span>
            {weather
              ? 'Actualizado ahora'
              : forecast.status === 'loading'
                ? 'Consultando…'
                : 'Sin conexión'}{' '}
            <span className="live-dot" />
          </span>
        </div>
        <div className="weather-main">
          <div>
            <strong>
              {weather?.temperature ?? '—'}
              <sup>°</sup>
            </strong>
            <div>
              {weather ? weatherDescription(weather.code) : 'Clima no disponible'}
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
            {weather?.humidity ?? '—'}%
          </span>
          <span>
            <Wind size={14} />
            {weather?.windSpeed ?? '—'} km/h
          </span>
          <button onClick={() => setIsOpen(true)}>
            Ver semana completa
            <ArrowUpRight size={14} />
          </button>
        </div>
      </section>
      <ForecastDialog
        isOpen={isOpen}
        forecast={forecast.data}
        isLoading={forecast.status === 'loading'}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
