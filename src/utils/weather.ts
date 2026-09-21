export function weatherDescription(code: number): string {
  if (code === 0) return 'Despejado';
  if (code <= 2) return 'Parcialmente soleado';
  if (code === 3) return 'Nublado';
  if (code <= 48) return 'Niebla';
  if (code <= 57) return 'Llovizna';
  if (code <= 67) return 'Lluvia';
  if (code <= 77) return 'Nieve';
  if (code <= 82) return 'Chaparrones';
  if (code <= 86) return 'Nevadas';
  return 'Tormentas';
}
