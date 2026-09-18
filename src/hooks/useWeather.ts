import { useEffect, useState } from 'react';
import { fetchCurrentWeather } from '../services/weatherService';
import type { WeatherState } from '../types/weather';

export function useWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>({ status: 'loading', data: null });

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try {
        const data = await fetchCurrentWeather(controller.signal);
        if (!controller.signal.aborted) {
          setState({ status: 'success', data });
        }
      } catch {
        if (!controller.signal.aborted) {
          setState({ status: 'error', data: null });
        }
      }
    }

    void loadWeather();
    return () => controller.abort();
  }, []);

  return state;
}
