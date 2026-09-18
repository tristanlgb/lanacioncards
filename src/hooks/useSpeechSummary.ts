import { useEffect, useState } from 'react';

interface SpeechSummaryOptions {
  text: string;
  onError: (message: string) => void;
}

export function useSpeechSummary({ text, onError }: SpeechSummaryOptions) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  function togglePlayback() {
    if (!('speechSynthesis' in window)) {
      onError('Tu navegador no permite reproducir el resumen');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-AR';
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }

  return { isPlaying, togglePlayback };
}
