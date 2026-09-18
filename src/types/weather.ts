export interface Weather {
  temperature: number;
  code: number;
  windSpeed: number;
  humidity: number;
}

export type WeatherState =
  | { status: 'loading'; data: null }
  | { status: 'success'; data: Weather }
  | { status: 'error'; data: null };
