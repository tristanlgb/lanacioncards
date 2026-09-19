import { describe, expect, it } from 'vitest';
import { parseWeatherResponse } from './weatherService';

describe('parseWeatherResponse', () => {
  it('normalizes a valid current observation', () => {
    expect(
      parseWeatherResponse({
        current: {
          temperature_2m: 21.7,
          weather_code: 3,
          wind_speed_10m: 12.2,
          relative_humidity_2m: 60,
        },
      }),
    ).toEqual({ temperature: 22, code: 3, windSpeed: 12, humidity: 60 });
  });
  it('rejects incomplete and non-numeric external data', () => {
    for (const input of [null, {}, { current: {} }, { current: { temperature_2m: '22' } }]) {
      expect(() => parseWeatherResponse(input)).toThrow();
    }
  });
});
