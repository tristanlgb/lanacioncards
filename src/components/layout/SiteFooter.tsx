import { ArrowUpRight } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer>
      <span className="footer-brand">LA NACION</span>
      <span>
        © {new Date().getFullYear()} · Prototipo de diseño. Contenido editorial de demostración.
      </span>
      <a href="https://www.lanacion.com.ar/" target="_blank" rel="noreferrer">
        Visitá el sitio oficial <ArrowUpRight size={13} />
      </a>
    </footer>
  );
}
