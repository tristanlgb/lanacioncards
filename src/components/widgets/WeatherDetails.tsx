import { useCurrentTime } from '../../hooks/useCurrentTime';
import { formatTime } from '../../utils/date';

interface WeatherDetailsProps {
  hasLiveData: boolean;
}

export function WeatherDetails({ hasLiveData }: WeatherDetailsProps) {
  const time = useCurrentTime();
  return (
    <div className="weather-details">
      Buenos Aires ·{' '}
      {hasLiveData
        ? 'Observación actual de Open-Meteo'
        : 'Datos de ejemplo, conexión no disponible'}
      . Hora local: {formatTime(time)}.
    </div>
  );
}
