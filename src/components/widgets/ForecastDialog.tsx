import { useId } from 'react';
import { Cloud, CloudRain, Droplets, MapPin, Sun, Wind } from 'lucide-react';
import type { WeatherForecast } from '../../types/weather';
import { weatherDescription } from '../../utils/weather';
import { Dialog } from '../ui/Dialog';

interface ForecastDialogProps {
  isOpen: boolean;
  forecast: WeatherForecast | null;
  isLoading: boolean;
  onClose: () => void;
}
export function ForecastDialog({ isOpen, forecast, isLoading, onClose }: ForecastDialogProps) {
  const titleId = useId();
  return (
    <Dialog isOpen={isOpen} titleId={titleId} onClose={onClose}>
      <div className="forecast-dialog">
        <span className="category">
          <MapPin size={14} />
          BUENOS AIRES
        </span>
        <h2 id={titleId}>Tu semana, de un vistazo.</h2>
        <p className="forecast-intro">Los próximos 7 días · temperaturas, lluvias y viento</p>
        {forecast ? (
          <div className="forecast-list">
            {forecast.days.map((day, index) => {
              const Icon = day.code < 3 ? Sun : day.code < 50 ? Cloud : CloudRain;
              const date = new Date(day.date + 'T12:00:00-03:00');
              return (
                <div className="forecast-day" key={day.date}>
                  <div className="forecast-date">
                    <strong>
                      {index === 0 ? 'Hoy' : date.toLocaleDateString('es-AR', { weekday: 'long' })}
                    </strong>
                    <span>
                      {date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <Icon className="forecast-icon" size={26} />
                  <span className="forecast-condition">{weatherDescription(day.code)}</span>
                  <span className="forecast-temperature">
                    <strong>{day.high}°</strong> / {day.low}°
                  </span>
                  <span className="forecast-rain">
                    <Droplets size={13} />
                    {day.rainProbability}%
                  </span>
                  <span className="forecast-wind">
                    <Wind size={13} />
                    {day.windSpeed} km/h
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p role="status">
            {isLoading
              ? 'Consultando el pronóstico…'
              : 'El pronóstico no está disponible. Volvé a intentarlo más tarde.'}
          </p>
        )}
        <a
          className="forecast-credit"
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
        >
          Pronóstico de Open-Meteo · horario de Buenos Aires
        </a>
      </div>
    </Dialog>
  );
}
