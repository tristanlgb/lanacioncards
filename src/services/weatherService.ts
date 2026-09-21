import type { ForecastDay, Weather, WeatherForecast } from '../types/weather';
import { isFiniteNumber, isRecord } from '../utils/validation';

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&forecast_days=7&timezone=America%2FArgentina%2FBuenos_Aires';

export function parseWeatherResponse(value: unknown): Weather {
  if (!isRecord(value) || !isRecord(value.current))
    throw new Error('No hay una observación actual.');
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
    throw new Error('La observación contiene valores inválidos.');
  }
  return { temperature: Math.round(temperature), code, windSpeed: Math.round(windSpeed), humidity };
}

export function parseForecastDays(value: unknown): ForecastDay[] {
  if (!isRecord(value) || !isRecord(value.daily)) throw new Error('No hay pronóstico semanal.');
  const daily = value.daily;
  const dates = daily.time;
  const codes = daily.weather_code;
  const highs = daily.temperature_2m_max;
  const lows = daily.temperature_2m_min;
  const rain = daily.precipitation_probability_max;
  const wind = daily.wind_speed_10m_max;
  if (
    !Array.isArray(dates) ||
    dates.length < 7 ||
    !Array.isArray(codes) ||
    !Array.isArray(highs) ||
    !Array.isArray(lows) ||
    !Array.isArray(rain) ||
    !Array.isArray(wind)
  ) {
    throw new Error('El pronóstico semanal está incompleto.');
  }
  return dates.slice(0, 7).map((date: unknown, index): ForecastDay => {
    const code: unknown = codes[index];
    const high: unknown = highs[index];
    const low: unknown = lows[index];
    const rainProbability: unknown = rain[index];
    const windSpeed: unknown = wind[index];
    if (
      typeof date !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !isFiniteNumber(code) ||
      !isFiniteNumber(high) ||
      !isFiniteNumber(low) ||
      !isFiniteNumber(rainProbability) ||
      !isFiniteNumber(windSpeed)
    ) {
      throw new Error('Uno de los días tiene datos inválidos.');
    }
    return {
      date,
      code,
      high: Math.round(high),
      low: Math.round(low),
      rainProbability,
      windSpeed: Math.round(windSpeed),
    };
  });
}

export async function fetchCurrentWeather(signal: AbortSignal): Promise<WeatherForecast> {
  const response = await fetch(WEATHER_URL, { signal });
  if (!response.ok) throw new Error('No se pudo consultar el clima.');
  const payload: unknown = await response.json();
  return { current: parseWeatherResponse(payload), days: parseForecastDays(payload) };
}
