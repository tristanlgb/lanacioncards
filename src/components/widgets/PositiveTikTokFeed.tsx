import { ArrowUpRight, Heart, Pause, Play } from 'lucide-react';
import { positiveVideos } from '../../data/positiveVideos';
import { useAutoScroll } from '../../hooks/useAutoScroll';

export function PositiveTikTokFeed() {
  const { containerRef, isPaused, setIsPaused, setIsInteracting } = useAutoScroll();
  return (
    <section className="positive-feed card">
      <div className="positive-heading">
        <span className="round-icon">
          <Heart size={17} />
        </span>
        <div>
          <span className="category">UN RESPIRO POSITIVO</span>
          <h2>Buenas noticias en TikTok</h2>
        </div>
        <button
          onClick={() => setIsPaused((paused) => !paused)}
          aria-label={
            isPaused ? 'Reanudar desplazamiento de TikTok' : 'Pausar desplazamiento de TikTok'
          }
          aria-pressed={isPaused}
        >
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>
      <p className="positive-intro">Pequeñas historias que hacen bien.</p>
      <div
        className="positive-scroll"
        ref={containerRef}
        tabIndex={0}
        aria-label="Videos positivos de TikTok con desplazamiento automático"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onFocus={() => setIsInteracting(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false);
        }}
        onTouchStart={() => setIsPaused(true)}
      >
        {positiveVideos.map((video) => (
          <article className="positive-video" key={video.id}>
            <iframe
              src={
                'https://www.tiktok.com/player/v1/' +
                video.id +
                '?autoplay=0&controls=1&description=0&rel=0'
              }
              title={video.title}
              allow="fullscreen"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <div className="positive-caption">
              <span>{video.creator}</span>
              <h3>{video.title}</h3>
              <div>
                <a href={video.url} target="_blank" rel="noreferrer">
                  Abrir en TikTok <ArrowUpRight size={13} />
                </a>
                <a href={video.sourceUrl} target="_blank" rel="noreferrer">
                  La historia
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="positive-footer">
        Selección editorial · Pausá el movimiento para mirar.
        <br />
        Si el video no carga, abrilo directamente en TikTok.
      </p>
    </section>
  );
}
