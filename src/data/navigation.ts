import type { Section } from '../types/news';

export const sections = [
  'Inicio',
  'Política',
  'Economía',
  'El mundo',
  'Deportes',
  'Lifestyle',
  'Tecnología',
  'Cultura',
  'Sociedad',
] as const satisfies readonly Section[];
export const menuSections = [
  ...sections,
  'Últimas noticias',
  'Guardados',
] as const satisfies readonly Section[];

export const trendingTopics = [
  { label: 'Economía argentina', query: 'Economía' },
  { label: 'Inteligencia artificial', query: 'Inteligencia artificial' },
  { label: 'Escapadas', query: 'Patagonia' },
  { label: 'Fútbol argentino', query: 'fútbol' },
] as const;
