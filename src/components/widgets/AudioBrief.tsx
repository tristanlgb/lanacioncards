import { Headphones, Pause, Play } from 'lucide-react';
import { stories } from '../../data/stories';
import { useSpeechSummary } from '../../hooks/useSpeechSummary';

const SUMMARY_TEXT =
  'Tu día, en contexto. Bienvenido a este resumen de demostración. ' +
  stories
    .slice(0, 3)
    .map((story) => story.title + '. ' + story.description)
    .join(' ');

const WAVEFORM_BARS = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  height: 8 + ((index * 17) % 26),
  animationDelay: index * 0.04,
}));

interface AudioBriefProps {
  onError: (message: string) => void;
}

export function AudioBrief({ onError }: AudioBriefProps) {
  const { isPlaying, togglePlayback } = useSpeechSummary({ text: SUMMARY_TEXT, onError });
  return (
    <section className="brief card">
      <div className="brief-head">
        <span className="round-icon">
          <Headphones size={18} />
        </span>
        <span className="category">EL RESUMEN</span>
        <span className="audio-label">AUDIO</span>
      </div>
      <h2>
        El mundo no para.
        <br />
        Ponete al día en minutos.
      </h2>
      <p>Las claves de la jornada, estés donde estés.</p>
      <div className="audio-controls">
        <button
          className="play-button"
          aria-label={isPlaying ? 'Pausar resumen' : 'Escuchar resumen'}
          onClick={togglePlayback}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
        </button>
        <div className={`waveform ${isPlaying ? 'playing' : ''}`}>
          {WAVEFORM_BARS.map((bar) => (
            <i
              key={bar.id}
              style={{ height: bar.height, animationDelay: bar.animationDelay + 's' }}
            />
          ))}
        </div>
        <span>{isPlaying ? 'En curso' : 'Escuchar'}</span>
      </div>
    </section>
  );
}
