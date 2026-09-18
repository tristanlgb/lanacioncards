import type { Weather } from '../types/weather';

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=America%2FArgentina%2FBuenos_Aires';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function parseWeatherResponse(value: unknown): Weather {
  if (!isRecord(value) || !isRecord(value.current)) {
    throw new Error('La respuesta del clima no contiene una observación actual.');
  }

  const current = value.current;
  const temperature = current.temperature_2m;
  const code = current.weather_code;
  const windSpeed = current.wind_speed_10m;
  const humidity = current.relative_humidity_2m;

  if (
    !isFiniteNumber(temperature) ||
    !isFiniteNumber(code) ||
    !isFiniteNumber(windSpeed) ||
    !isFiniteNumber(humidity)
  ) {
    throw new Error('La observación del clima contiene valores inválidos.');
  }

  return {
    temperature: Math.round(temperature),
    code,
    windSpeed: Math.round(windSpeed),
    humidity,
  };
}

export async function fetchCurrentWeather(signal: AbortSignal): Promise<Weather> {
  const response = await fetch(WEATHER_URL, { signal });

  if (!response.ok) {
    throw new Error('No se pudo consultar el clima.');
  }

  const payload: unknown = await response.json();
  return parseWeatherResponse(payload);
}
