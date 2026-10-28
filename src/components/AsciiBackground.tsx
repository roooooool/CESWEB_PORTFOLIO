import { useEffect, useRef } from 'react';

// Character density ramp from light to dense
const CHARS = ' ·:=+*#%@█';

// Control the grid spacing: lower numbers = tighter packed characters
const SIZE = { n: 24, sm: 10 };

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Grid step spacing
    const cellSize = isMobile ? SIZE.sm : SIZE.n;

    // Make the font size significantly larger than the grid step 
    // so characters overlap and pack closely together.
    const fontSize = Math.round(cellSize * 1.1);

    const fps = prefersReducedMotion ? 5 : isMobile ? 15 : 22;
    const frameInterval = 1000 / fps;

    let animId = 0;
    let lastTime = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let scrollY = window.scrollY;

    const updateDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.ceil(width / cellSize) + 1;
      rows = Math.ceil(height / cellSize) + 1;
    };

    updateDimensions();

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onResize = () => {
      updateDimensions();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const charCount = CHARS.length - 1;

    const render = (currentTime: number) => {
      animId = requestAnimationFrame(render);

      if (document.hidden) return;

      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);

      if (!prefersReducedMotion) {
        time += 0.025;
      }

      ctx.clearRect(0, 0, width, height);

      // Explicitly set a large font with monospace fallback
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textBaseline = 'top';

      const scrollOffset = scrollY * 0.0012;

      for (let r = 0; r < rows; r++) {
        const y = r * cellSize;
        const rowFactor = r * 0.12;

        for (let c = 0; c < cols; c++) {
          const x = c * cellSize;
          const colFactor = c * 0.08;

          const wave1 = Math.sin(colFactor + rowFactor + time + scrollOffset);
          const wave2 = Math.cos(colFactor * 1.4 - time * 0.7 + rowFactor * 0.8);
          const wave3 = Math.sin((c - r) * 0.05 + time * 0.5);

          const combined = (wave1 + wave2 + wave3 + 3) / 6;
          const charIndex = Math.min(charCount, Math.max(0, Math.floor(combined * charCount)));
          const char = CHARS[charIndex];

          if (char !== ' ') {
            const alpha = 0.04 + combined * 0.18;
            ctx.fillStyle = `rgba(212, 255, 0, ${alpha.toFixed(3)})`;
            ctx.fillText(char, x, y);
          }
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}