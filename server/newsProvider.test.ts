import { describe, expect, it } from 'vitest';
import { parseNewsFeed } from './newsProvider';
const item =
  '<item><title>Un avance científico</title><link>https://www.lanacion.com.ar/tecnologia/avance/</link><description><![CDATA[<b>Una noticia</b> para hoy]]></description><category>Tecnología</category><media:content url="https://example.com/photo.jpg"/></item>';
const feed = (items: string) => '<rss><channel>' + items + '</channel></rss>';
describe('news RSS provider', () => {
  it('normalizes title, image, category and stable id while deduplicating', () => {
    const result = parseNewsFeed(feed(item + item));
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      title: 'Un avance científico',
      description: 'Una noticia para hoy',
      category: 'Tecnología',
      image: 'https://example.com/photo.jpg',
    });
    expect(parseNewsFeed(feed(item))[0]?.id).toBe(result[0]?.id);
  });
  it('rejects invalid and unsafe feeds', () => {
    expect(() => parseNewsFeed('<html>Error</html>')).toThrow();
    expect(() =>
      parseNewsFeed(
        feed(item.replace('https://www.lanacion.com.ar/tecnologia/avance/', 'javascript:alert(1)')),
      ),
    ).toThrow();
  });
});
