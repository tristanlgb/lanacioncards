export interface Weather {
  temperature: number;
  code: number;
  windSpeed: number;
  humidity: number;
}
export interface ForecastDay {
  date: string;
  code: number;
  high: number;
  low: number;
  rainProbability: number;
  windSpeed: number;
}
export interface WeatherForecast {
  current: Weather;
  days: ForecastDay[];
}
export type WeatherState =
  | { status: 'loading'; data: null }
  | { status: 'success'; data: WeatherForecast }
  | { status: 'error'; data: null };
