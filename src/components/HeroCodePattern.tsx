import { memo, useEffect, useMemo, useRef, useState } from 'react';

const CODE_PATTERN_TOKENS = [
  // --- Code Keywords ---
  'DEVELOPMENT', 'API', './ENV', 'RETURN', 'HOST', 'LOCAL', 'SERVER', 
  'REACT', 'NODE', 'SQL', 'JSON', 'FETCH()', 'COMMIT', 'MERGE', 
  'DEPLOY', 'PIPELINE', 'STACK', 'ASYNC', 'PROMISE', 'HOOK', 
  'COMPONENT', 'CLOUD', 'BUILD', 'DEBUG', 'SCRIPT', 'ENDPOINT', 
  'CACHE', 'GIT', 'TYPES', 'INTERFACE', 'CLASS', 'FUNCTION', 'MODULE', 'PACKAGE',
];

const EXTENDED_CODE_PATTERN_TOKENS = [
  // --- Structural Syntax (The "Mimicry" glue) ---
  '=>', '{', '}', '=> {', '();', '[]', '<>', '</>', '===', 'const', 
  'export', 'import', 'async', 'await', '??', '&&', '||', '?.', 
  'interface', 'type', '.map(() =>', 'private', 'readonly', 'static',
  ': string', ': number', 'as', 'from', '...props', '0x1A4F', '0o755', '(count: number) =>', 'function*', 'yield', 'try {', 'catch (error)', 'finally {',
];

const buildHeroCodePattern = (count: number) =>
  Array.from({ length: count }, (_, index) => {
    const source = index % 2 === 0 ? CODE_PATTERN_TOKENS : EXTENDED_CODE_PATTERN_TOKENS;
    const token = source[Math.floor(Math.random() * source.length)];
    return token;
  }).join(' ');

const getHeroPatternTokenCounts = (width: number, height: number) => {
  const BASE_WIDTH = 1366;
  const BASE_HEIGHT = 768;
  const BASE_BUFFER = 15;
  const BASE_MAIN = 50;

  const areaScale = Math.sqrt((width * height) / (BASE_WIDTH * BASE_HEIGHT));
  const scale = Math.min(1.55, Math.max(0.65, areaScale));

  return {
    buffer: Math.max(12, Math.min(36, Math.round(BASE_BUFFER * scale))),
    main: Math.max(28, Math.min(90, Math.round(BASE_MAIN * scale))),
  };
};

export const HeroCodePattern = memo(function HeroCodePattern() {
  const [patternSeed, setPatternSeed] = useState(0);
  const [heroPatternCounts, setHeroPatternCounts] = useState(() =>
    getHeroPatternTokenCounts(window.innerWidth, window.innerHeight)
  );
  const hasUsedStartupBufferRef = useRef(false);
  const lastWidthRef = useRef(window.innerWidth);

  // Resize listener: ignore vertical-only height changes (e.g. mobile URL bar expand/collapse)
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (Math.abs(currentWidth - lastWidthRef.current) > 30) {
        lastWidthRef.current = currentWidth;
        setHeroPatternCounts(
          getHeroPatternTokenCounts(window.innerWidth, window.innerHeight)
        );
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const heroCodeBuffer = useMemo(
    () => buildHeroCodePattern(heroPatternCounts.buffer),
    [heroPatternCounts.buffer]
  );

  const fullHeroCodePattern = useMemo(
    () => `${heroCodeBuffer} ${buildHeroCodePattern(heroPatternCounts.main)}`,
    [heroCodeBuffer, heroPatternCounts.main, patternSeed]
  );

  const [heroCodePattern, setHeroCodePattern] = useState(heroCodeBuffer);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth < 768;
    const minVisibleChars = hasUsedStartupBufferRef.current ? 0 : heroCodeBuffer.length;

    if (prefersReducedMotion) {
      setHeroCodePattern(fullHeroCodePattern);
      return;
    }

    let charIndex = minVisibleChars;
    let isDeleting = false;

    setHeroCodePattern(fullHeroCodePattern.slice(0, minVisibleChars));

    const typingInterval = window.setInterval(() => {
      if (isDeleting) {
        const deleteStep = Math.floor(Math.random() * 4) + 2;
        charIndex = Math.max(charIndex - deleteStep, minVisibleChars);
      } else {
        const typeStep = Math.floor(Math.random() * 3) + 1;
        charIndex = Math.min(charIndex + typeStep, fullHeroCodePattern.length);
      }

      setHeroCodePattern(fullHeroCodePattern.slice(0, charIndex));

      if (!isDeleting && charIndex >= fullHeroCodePattern.length) {
        isDeleting = true;
      }

      if (isDeleting && charIndex <= minVisibleChars) {
        isDeleting = false;
        if (!hasUsedStartupBufferRef.current) {
          hasUsedStartupBufferRef.current = true;
        }
        setPatternSeed((seed) => seed + 1);
      }
    }, isSmallScreen ? 140 : 45);

    return () => window.clearInterval(typingInterval);
  }, [fullHeroCodePattern, heroCodeBuffer]);

  return (
    <div className="hero-code-pattern" aria-hidden="true">
      {heroCodePattern}
    </div>
  );
});

export default HeroCodePattern;
