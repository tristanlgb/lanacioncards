const LOCALE = 'es-AR';
const TIME_ZONE = 'America/Argentina/Buenos_Aires';

export function formatDate(date: Date): string {
  return date.toLocaleDateString(LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: TIME_ZONE,
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIME_ZONE,
  });
}
