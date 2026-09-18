import { ArrowRight, Globe2 } from 'lucide-react';

interface ExploreCardProps {
  onExplore: () => void;
}

export function ExploreCard({ onExplore }: ExploreCardProps) {
  return (
    <section className="explore card">
      <Globe2 size={27} />
      <h3>Hay más por descubrir.</h3>
      <p>Las historias que te interesan, en un solo lugar.</p>
      <button onClick={() => onExplore()}>
        Explorá todas las noticias <ArrowRight size={16} />
      </button>
    </section>
  );
}
