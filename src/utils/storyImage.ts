import type { Story } from '../types/news';
export function storyImage(story: Story): string {
  return story.image.startsWith('/') ||
    story.image.startsWith('https://') ||
    story.image.startsWith('http://')
    ? story.image
    : '/images/' + story.image + '.jpg';
}
