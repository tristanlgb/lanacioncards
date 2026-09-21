import { useEffect, useRef, useState } from 'react';

export function useAutoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isPaused || isInteracting) return;
    let frame = 0;
    let lastTimestamp = 0;
    let position = container.scrollTop;
    let direction = 1;

    function animate(timestamp: number) {
      if (!container) return;
      const delta = lastTimestamp ? Math.min(timestamp - lastTimestamp, 50) : 0;
      lastTimestamp = timestamp;
      const max = container.scrollHeight - container.clientHeight;
      if (!document.hidden && max > 0) {
        position += direction * delta * 0.018;
        if (position >= max) {
          position = max;
          direction = -1;
        }
        if (position <= 0) {
          position = 0;
          direction = 1;
        }
        container.scrollTop = position;
      }
      frame = window.requestAnimationFrame(animate);
    }
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [isPaused, isInteracting]);

  return { containerRef, isPaused, setIsPaused, setIsInteracting };
}
