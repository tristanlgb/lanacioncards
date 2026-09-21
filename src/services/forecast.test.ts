import { describe, expect, it } from 'vitest';
import { parseForecastDays } from './weatherService';

const daily = {
 time: Array.from({ length:7 }, (_,index) => '2026-09-' + (18+index)),
 weather_code: [0,1,3,61,80,2,0],
 temperature_2m_max: [22,23,24,19,18,20,22],
 temperature_2m_min: [12,13,14,12,10,11,12],
 precipitation_probability_max: [0,10,20,80,90,10,0],
 wind_speed_10m_max: [8,9,10,15,20,10,9],
};
describe('weekly forecast', () => {
 it('returns seven complete days in provider order', () => {
   const result = parseForecastDays({daily});
   expect(result).toHaveLength(7);
   expect(result[3]).toMatchObject({date:'2026-09-21',code:61,rainProbability:80,high:19,low:12});
 });
 it('does not fabricate missing forecast values', () => {
   expect(() => parseForecastDays({daily:{...daily,temperature_2m_max:[]}})).toThrow();
   expect(() => parseForecastDays({daily:{...daily,time:daily.time.slice(0,3)}})).toThrow();
 });
});
