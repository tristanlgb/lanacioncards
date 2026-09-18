export type Category =
  'Política' | 'Economía' | 'El mundo' | 'Deportes' | 'Lifestyle' | 'Tecnología' | 'Cultura';

export type Section = Category | 'Inicio' | 'Últimas noticias' | 'Guardados';

export interface Story {
  readonly id: number;
  readonly category: Category;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly minutes: number;
  readonly author: string;
  readonly dark?: boolean;
}

export interface StoryActions {
  onRead: (story: Story) => void;
  onToggleSaved: (storyId: Story['id']) => void;
}
