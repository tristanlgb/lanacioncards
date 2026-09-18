import { ArrowUpRight, Mail } from 'lucide-react';

interface NewsletterCardProps {
  onSubscribe: () => void;
}

export function NewsletterCard({ onSubscribe }: NewsletterCardProps) {
  return (
    <section className="newsletter card">
      <span className="round-icon">
        <Mail size={19} />
      </span>
      <div>
        <h3>Lo importante, en tu mail.</h3>
        <p>Una selección de historias para empezar el día.</p>
      </div>
      <button onClick={() => onSubscribe()} aria-label="Suscribirse al newsletter">
        <ArrowUpRight size={23} />
      </button>
    </section>
  );
}
