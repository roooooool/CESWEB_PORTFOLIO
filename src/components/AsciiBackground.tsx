import { useEffect, useRef } from 'react';
import { asciiBackground } from 'asciify-engine';

function AsciiBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const hostWindow = window as Window;
    const hostDocument = document.documentElement;
    const prefersReducedMotion = hostWindow.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const parallaxStrength = 0.12;

    const { destroy } = asciiBackground(element, {
      type: 'morph',
      opacity: 1,
      colorScheme: 'auto',
      fontSize: 44,
      accentColor: '#d4ff00',
    });

    const updateCoverage = () => {
      const maxScrollable = Math.max(0, hostDocument.scrollHeight - hostWindow.innerHeight);
      const maxParallaxOffset = maxScrollable * parallaxStrength;
      const baseBleed = hostWindow.innerHeight * 0.12;
      const bleed = Math.ceil(baseBleed + maxParallaxOffset);

      element.style.top = `${-bleed}px`;
      element.style.left = `${-bleed}px`;
      element.style.width = `calc(100vw + ${bleed * 2}px)`;
      element.style.height = `calc(100vh + ${bleed * 2}px)`;
    };

    updateCoverage();

    if (prefersReducedMotion) {
      const onResizeReduced = () => updateCoverage();
      hostWindow.addEventListener('resize', onResizeReduced);

      return () => {
        hostWindow.removeEventListener('resize', onResizeReduced);
        destroy();
      };
    }

    let rafId = 0;
    let targetOffsetY = 0;
    let currentOffsetY = 0;

    const getTargetOffset = () => {
      const maxScrollable = Math.max(0, hostDocument.scrollHeight - hostWindow.innerHeight);
      const maxParallaxOffset = maxScrollable * parallaxStrength;
      const unclampedOffset = -hostWindow.scrollY * parallaxStrength;
      return Math.max(-maxParallaxOffset, Math.min(0, unclampedOffset));
    };

    const renderParallax = () => {
      currentOffsetY += (targetOffsetY - currentOffsetY) * 0.14;

      if (Math.abs(targetOffsetY - currentOffsetY) < 0.12) {
        currentOffsetY = targetOffsetY;
      }

      element.style.transform = `translate3d(0, ${currentOffsetY}px, 0) scale(1.08)`;

      if (currentOffsetY !== targetOffsetY) {
        rafId = hostWindow.requestAnimationFrame(renderParallax);
      } else {
        rafId = 0;
      }
    };

    const queueParallaxFrame = () => {
      targetOffsetY = getTargetOffset();
      if (rafId !== 0) return;
      rafId = hostWindow.requestAnimationFrame(renderParallax);
    };

    const onScroll = () => queueParallaxFrame();

    const onResize = () => {
      updateCoverage();
      queueParallaxFrame();
    };

    queueParallaxFrame();
    hostWindow.addEventListener('scroll', onScroll, { passive: true });
    hostWindow.addEventListener('resize', onResize);

    return () => {
      if (rafId !== 0) {
        hostWindow.cancelAnimationFrame(rafId);
      }
      hostWindow.removeEventListener('scroll', onScroll);
      hostWindow.removeEventListener('resize', onResize);
      destroy();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}

export default AsciiBackground;