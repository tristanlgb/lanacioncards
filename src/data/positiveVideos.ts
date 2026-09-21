export interface PositiveVideo {
  id: string;
  creator: string;
  title: string;
  url: string;
  sourceUrl: string;
}

// Curated public posts, verified against the linked editorial coverage.
export const positiveVideos: readonly PositiveVideo[] = [
  {
    id: '7623928310052998430',
    creator: '@lifewithjessikaa',
    title: 'Un encuentro en lengua de señas que hizo feliz a una niña.',
    url: 'https://www.tiktok.com/@lifewithjessikaa/video/7623928310052998430',
    sourceUrl:
      'https://www.goodnewsnetwork.org/toy-story-character-talks-with-deaf-girl-in-heartwarming-asl-moment-that-went-viral/',
  },
  {
    id: '7624301752371744014',
    creator: '@chewythenewfie',
    title: 'Una abuela y su perro: el mejor equipo para cuidar el jardín.',
    url: 'https://www.tiktok.com/@chewythenewfie/video/7624301752371744014',
    sourceUrl:
      'https://www.goodnewsnetwork.org/elderly-lady-gets-help-from-dog-while-gardening-she-points-and-he-digs/',
  },
];
