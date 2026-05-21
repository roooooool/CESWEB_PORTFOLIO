import tripDispatchImg from '../assets/TripDispatch-demo-thumbnail.png';
import dashboardImg from '../assets/Dashboard-demo-thumbnail.png';
import liveGpsImg from '../assets/LiveGPS-demo-thumbnail.png';
import christianImg from '../assets/ChristianIDpicTransparent.png';

//components
import AsciiBackground from '../components/AsciiBackground';
import BrandChromeIcon from '../components/ui/brand-chrome-icon';
import Cloud3Icon from '../components/ui/cloud-3-icon';
import Stack3Icon from '../components/ui/stack-3-icon';
import PlugConnectedIcon from '../components/ui/plug-connected-icon';
import GithubIcon from '../components/ui/github-icon';
import CodeXmlIcon from '../components/ui/code-xml-icon';
import PythonIcon from '../components/ui/python-icon';
import BrandReactIcon from '../components/ui/brand-react-icon';
import NodejsIcon from '../components/ui/nodejs-icon';
import TerminalIcon from '../components/ui/terminal-icon';
import LibraryIcon from '../components/ui/library-icon';
import CpuIcon from '../components/ui/cpu-icon';
import LinkIcon from '../components/ui/link-icon';
import type { AnimatedIconHandle } from '../components/ui/types';

import { Network, Database, Warehouse, Server, ChevronRight, ChevronLeft } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

const CODE_PATTERN_TOKENS = [
  // --- Code Keywords ---
  'DEVELOPMENT', 'API', './ENV', 'RETURN', 'HOST', 'LOCAL', 'SERVER', 
  'REACT', 'NODE', 'SQL', 'JSON', 'FETCH()', 'COMMIT', 'MERGE', 
  'DEPLOY', 'PIPELINE', 'STACK', 'ASYNC', 'PROMISE', 'HOOK', 
  'COMPONENT', 'CLOUD', 'BUILD', 'DEBUG', 'SCRIPT', 'ENDPOINT', 
  'CACHE', 'GIT', 'TYPES', 'INTERFACE', 'CLASS', 'FUNCTION', 'MODULE', 'PACKAGE',
];

const EXTENDED_CODE_PATTERN_TOKENS =  [
  // --- Structural Syntax (The "Mimicry" glue) ---
  '=>', '{', '}', '=> {', '();', '[]', '<>', '</>', '===', 'const', 
  'export', 'import', 'async', 'await', '??', '&&', '||', '?.', 
  'interface', 'type', '.map(() =>', 'private', 'readonly', 'static',
  ': string', ': number', 'as', 'from', '...props', '0x1A4F', '0o755' , '(count: number) =>', 'function*', 'yield', 'try {', 'catch (error)', 'finally {',
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

function PortfolioPage() {

  // const initialization
  const scrollRef = useRef<HTMLDivElement>(null);
  const topNavRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const webScrapingIconRef = useRef<AnimatedIconHandle | null>(null);
  const sharePointIconRef = useRef<AnimatedIconHandle | null>(null);
  const dataverseIconRef = useRef<AnimatedIconHandle | null>(null);
  const powerAutomateIconRef = useRef<AnimatedIconHandle | null>(null);
  const githubIconRef = useRef<AnimatedIconHandle | null>(null);
  const renderIconRef = useRef<AnimatedIconHandle | null>(null);
  const pythonIconRef = useRef<AnimatedIconHandle | null>(null);
  const restApiIconRef = useRef<AnimatedIconHandle | null>(null);
  const reactIconRef = useRef<AnimatedIconHandle | null>(null);
  const nodeIconRef = useRef<AnimatedIconHandle | null>(null);
  const arduinoIconRef = useRef<AnimatedIconHandle | null>(null);
  const cppIconRef = useRef<AnimatedIconHandle | null>(null);
  const dotnetIconRef = useRef<AnimatedIconHandle | null>(null);
  const hasUsedStartupBufferRef = useRef(false);
  const [patternSeed, setPatternSeed] = useState(0);
  const [heroPatternCounts, setHeroPatternCounts] = useState(() =>
    getHeroPatternTokenCounts(window.innerWidth, window.innerHeight)
  );
  const heroCodeBuffer = useMemo(
    () => buildHeroCodePattern(heroPatternCounts.buffer),
    [heroPatternCounts.buffer]
  );
  const fullHeroCodePattern = useMemo(
    () => `${heroCodeBuffer} ${buildHeroCodePattern(heroPatternCounts.main)}`,
    [heroCodeBuffer, heroPatternCounts.main, patternSeed]
  );
  const [heroCodePattern, setHeroCodePattern] = useState(heroCodeBuffer);
  const totalCards = 5;
  const navLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#architecture', label: 'Architecture' },
    { href: '#resume', label: 'Personal Info' },
    { href: '#contact', label: 'Contact' },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 600; 
      // If we reach the end, wrap back to the beginning
      const isEnd = scrollRef.current.scrollLeft + scrollRef.current.offsetWidth >= scrollRef.current.scrollWidth;
      
      if (direction === 'right' && isEnd) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      const progress = (scrollLeft / totalScrollable) * 100;
      setScrollProgress(progress);
      
      // Calculate current page based on scroll progress
      const page = Math.max(1, Math.ceil((progress / 100) * totalCards));
      setCurrentPage(page);
    }
  };




  //All use effects

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      scroll('right');
    }, 5000); // Scrolls every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      node.addEventListener('scroll', handleScroll);
      return () => node.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const hostWindow = window as Window;
    const node = topNavRef.current;
    if (!node) return;

    const updateStickyVisibility = () => {
      const { bottom } = node.getBoundingClientRect();
      setShowStickyNav(bottom <= 0);
    };

    if ('IntersectionObserver' in hostWindow) {
      const observer = new IntersectionObserver(
        ([entry]) => setShowStickyNav(!entry.isIntersecting),
        { threshold: 0 }
      );

      observer.observe(node);
      updateStickyVisibility();
      return () => observer.disconnect();
    }

    updateStickyVisibility();
    hostWindow.addEventListener('scroll', updateStickyVisibility, { passive: true });
    return () => hostWindow.removeEventListener('scroll', updateStickyVisibility);
  }, []);

  useEffect(() => {
    const hostWindow = window as Window;

    const updatePatternCounts = () => {
      setHeroPatternCounts(
        getHeroPatternTokenCounts(hostWindow.innerWidth, hostWindow.innerHeight)
      );
    };

    updatePatternCounts();
    hostWindow.addEventListener('resize', updatePatternCounts);
    return () => hostWindow.removeEventListener('resize', updatePatternCounts);
  }, []);

  useEffect(() => {
    const hostWindow = window as Window;
    const prefersReducedMotion = hostWindow.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minVisibleChars = hasUsedStartupBufferRef.current ? 0 : heroCodeBuffer.length;

    if (prefersReducedMotion) {
      setHeroCodePattern(fullHeroCodePattern);
      return;
    }

    let charIndex = minVisibleChars;
    let isDeleting = false;

    setHeroCodePattern(fullHeroCodePattern.slice(0, minVisibleChars));

    const typingInterval = hostWindow.setInterval(() => {
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
    }, 20);

    return () => hostWindow.clearInterval(typingInterval);
  }, [fullHeroCodePattern, heroCodeBuffer]);




  return (
    <>
    <AsciiBackground />
    <nav className={`top-nav top-nav--sticky ${showStickyNav ? 'top-nav--visible' : ''}`} aria-hidden={!showStickyNav}>
      {navLinks.map((link, index) => (
        <span key={link.href}>
          <a href={link.href}>{link.label}</a>
          {index < navLinks.length - 1 && <span> | </span>}
        </span>
      ))}
    </nav>
    <div className="portfolio-page-main-container">
      <section className="hero-stage">
        <nav ref={topNavRef} className="top-nav top-nav--inline">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <header
          className="hero hero-layout glass-panel neon-shadow reveal reveal-up"
          style={{ '--hero-photo': `url(${christianImg})` } as CSSProperties}
        >
          <div className="hero-code-pattern" aria-hidden="true">{heroCodePattern}</div>
          <div className="hero-main reveal reveal-up animation-delay-200">
            <div className="hero-intro">
              <p className="eyebrow">Senior Power Apps Developer</p>
              <h1 className="text-gradient">Christian Errol A. Sinag</h1>
              <p className="hero-copy">
                I design cloud-first business applications, intelligent data pipelines,
                and low-tech-friendly solutions that help teams move faster and build
                dashboards with modern Microsoft and open-source tools.
              </p>
            </div>
            <div className="hero-actions">
              <a href="#projects" className="button primary">View projects</a>
              <a href="#contact" className="button secondary">Contact me</a>
            </div>
          </div>
          
          <div className="hero-meta-row reveal reveal-fade animation-delay-600">
            <div className="hero-badges">
              {['Microsoft Power Apps', 'SICM (Education)', 'TESDA NC2', 'RCMDE (Capstone)', 'AWS EC2', 'Github Contributor'].map((badge, index) => (
                <span
                  key={badge}
                  className="hero-badge glass-panel reveal reveal-fade"
                  style={{ animationDelay: `${300 + (index * 80)}ms` }}
                >
                  {badge}
                </span>
              ))}
            </div>
            <a href="#resume" className="hero-about-me glass-panel">
              Learn More About Me
              <ChevronRight size={20} />
            </a>
          </div>

          <div className="hero-mobile-photo-spacer" aria-hidden="true" />

        </header>
      </section>

      <section 
        id="projects" 
        className="showcase-carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="carousel-header-wrapper">
          <div className="section-header">
            <h2>Projects I have created</h2>
            <div className="header-description">
              <p>
                Over the course of my career, I have specialized in bridging the gap between 
                complex industrial operations and digital efficiency. My work focuses on 
                <strong> Efficient logistics, real-time fleet management, and enterprise data modeling</strong>. 
                I'm also available for <strong> project-based development </strong> and offer free and low-tech alternatives for startups and small businesses.
              </p>
            </div>
          </div>
        </div>

        <div 
          className="carousel-track" 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Project 1: Trip Dispatch */}
          <a href="#demo/trip-dispatch" className="showcase-card reveal reveal-up animation-delay-200">
            <div className="showcase-bg" style={{ backgroundImage: `url(${tripDispatchImg})` }}></div>
            <div className="showcase-content">
              <p className="demo-tag">Featured Project</p>
              <h4>Trip Dispatch System</h4>
              <p className="showcase-desc">
                A real-time logistics hub managing driver assignments, fuel requests, and attendance logs. 
                Built to handle complex fleet operations with automated validation logic.
              </p>
              <div className="showcase-footer">
                <span className="button primary">View Demo ›</span>
              </div>
            </div>
          </a>

          {/* Project 2: Sales Forecast */}
          <a href="#demo/sales-forecast-dashboard" className="showcase-card reveal reveal-up animation-delay-400">
            <div className="showcase-bg" style={{ backgroundImage: `url(${dashboardImg})` }}></div>
            <div className="showcase-content">
              <p className="demo-tag">Analytics Hub</p>
              <h4>Sales Analytics & Dashboard</h4>
              <p className="showcase-desc">
                Interactive data visualization platform converting raw sales data into actionable trends 
                using advanced Power BI integration and automated data refresh cycles.
              </p>
              <div className="showcase-footer">
                <span className="button primary">View Demo ›</span>
              </div>
            </div>
          </a>

          {/* Project 3: Live GPS */}
          <a href="#demo/live-gps-monitoring" className="showcase-card reveal reveal-up animation-delay-600">
            <div className="showcase-bg" style={{ backgroundImage: `url(${liveGpsImg})` }}></div>
            <div className="showcase-content">
              <p className="demo-tag">Fleet Monitoring</p>
              <h4>Live Fleet GPS Tracking</h4>
              <p className="showcase-desc">
                High-performance monitoring tool utilizing React-based map overlays and SQL-optimized 
                location data to provide real-time visibility across the entire fleet.
              </p>
              <div className="showcase-footer">
                <span className="button primary">View Demo ›</span>
              </div>
            </div>
          </a>

          {/* Project 4: Dummy / Future Project A */}
          <a href="#" className="showcase-card reveal reveal-up animation-delay-2000">
            <div className="showcase-bg" style={{ backgroundColor: '#1a1a1a', backgroundImage: 'linear-gradient(45deg, #071624, #3a4efc)' }}></div>
            <div className="showcase-content">
              <p className="demo-tag">Upcoming</p>
              <h4>Inventory Management Pro</h4>
              <p className="showcase-desc">
                Automated stock tracking system featuring barcode integration and low-stock 
                predictive alerts using custom Dataverse logic and Power Automate.
              </p>
              <div className="showcase-footer">
                <span className="button primary">Coming Soon ›</span>
              </div>
            </div>
          </a>

          {/* Project 5: Dummy / Future Project B */}
          <a href="#" className="showcase-card reveal reveal-up animation-delay-4000">
            <div className="showcase-bg" style={{ backgroundColor: '#1a1a1a', backgroundImage: 'linear-gradient(45deg, #071624, #ff0000)' }}></div>
            <div className="showcase-content">
              <p className="demo-tag">System Architecture</p>
              <h4>Enterprise Data Bridge</h4>
              <p className="showcase-desc">
                High-speed data ingestion pipeline bridging on-premise SQL databases with 
                Azure Lakehouse via secure gateways and custom REST API endpoints.
              </p>
              <div className="showcase-footer">
                <span className="button primary">Under Development ›</span>
              </div>
            </div>
          </a>
        </div>

        <div className="custom-scrollbar-container">
          <div 
            className="custom-scrollbar-fill" 
            style={{ 
              width: `${Math.max(scrollProgress, 10)}%` 
            }}
          ></div>
        </div>

        <div className="carousel-controls">
            <button onClick={() => scroll('left')} className="nav-btn left" aria-label="Scroll Left">
              <ChevronLeft size={24} />
            </button>
            <span className="carousel-page-indicator">{currentPage}/{totalCards}</span>
            <button onClick={() => scroll('right')} className="nav-btn right" aria-label="Scroll Right">
              <ChevronRight size={24} />
            </button>
        </div>


      </section>





  <div className="portfolio-page">
    <main>
        <section id="tech-stack" className="section card-group">
          <div className="section-header">
            <h2>Tools &amp; Tech I utilize</h2>
            <p>Hands-on experience building Power Apps and scalable data solutions.</p>
          </div>

          <article className="card">
            <h3>Data Pipeline &amp; Ingestions</h3>
            <div className="skill-grid">
              <div
                className="skill-item"
                onMouseEnter={() => webScrapingIconRef.current?.startAnimation()}
                onMouseLeave={() => webScrapingIconRef.current?.stopAnimation()}
              >
                <div className="skill-icon-box">
                  <BrandChromeIcon ref={webScrapingIconRef} size={32} />
                </div>
                <h4>Web Scraping</h4>
                <p>Extract and transform web data into actionable insights using Python and Selenium.</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon-box">
                  <Network size={32} className="lucide-skill-icon icon-twist" />
                </div>
                <h4>Microsoft Graph API</h4>
                <p>Integrate Microsoft 365 services to build connected applications and dashboards.</p>
              </div>
              <div
                className="skill-item"
                onMouseEnter={() => sharePointIconRef.current?.startAnimation()}
                onMouseLeave={() => sharePointIconRef.current?.stopAnimation()}
              >
                <div className="skill-icon-box">
                  <Cloud3Icon ref={sharePointIconRef} size={32} />
                </div>
                <h4>SharePoint REST API</h4>
                <p>Connect to SharePoint data sources and sync information across enterprise systems.</p>
              </div>
              <div
                className="skill-item"
                onMouseEnter={() => dataverseIconRef.current?.startAnimation()}
                onMouseLeave={() => dataverseIconRef.current?.stopAnimation()}
              >
                <div className="skill-icon-box">
                  <Stack3Icon ref={dataverseIconRef} size={32} />
                </div>
                <h4>Microsoft Dataverse</h4>
                <p>
                    Unified enterprise data across applications using a scalable cloud service, 
                    automating complex business logic and ensuring consistency through a centralized 
                    API-first infrastructure
                </p>
              </div>
              <div
                className="skill-item"
                onMouseEnter={() => powerAutomateIconRef.current?.startAnimation()}
                onMouseLeave={() => powerAutomateIconRef.current?.stopAnimation()}
              >
                <div className="skill-icon-box">
                  <PlugConnectedIcon ref={powerAutomateIconRef} size={32} />
                </div>
                <h4>Power Automate</h4>
                <p>Build intelligent workflows that automate business processes end-to-end.</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon-box">
                  <Warehouse size={32} className="lucide-skill-icon icon-spin" />
                </div>
                <h4>Microsoft Lakehouse</h4>
                <p>Design scalable data architectures combining analytics with data lake capabilities.</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon-box">
                  <Server size={32} className="lucide-skill-icon icon-enlarge" />
                </div>
                <h4>On Premise Data Gateway</h4>
                <p>Securely connect on-premise systems to cloud services with enterprise-grade data bridges and hybrid integration.</p>
              </div>
              <div
                className="skill-item"
                onMouseEnter={() => githubIconRef.current?.startAnimation()}
                onMouseLeave={() => githubIconRef.current?.stopAnimation()}
              >
                <div className="skill-icon-box">
                  <GithubIcon ref={githubIconRef} size={32} />
                </div>
                <h4>Github</h4>
                <p>Manage code repositories, version control, and collaborative development workflows using Git and GitHub.</p>
              </div>
              <div
                className="skill-item"
                onMouseEnter={() => renderIconRef.current?.startAnimation()}
                onMouseLeave={() => renderIconRef.current?.stopAnimation()}
              >
                <div className="skill-icon-box">
                  <CodeXmlIcon ref={renderIconRef} size={32} />
                </div>
                <h4>Render</h4>
                <p>Deploy and host modern web applications with automatic scaling, continuous deployment, and managed infrastructure.</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon-box">
                  <Database size={32} className="lucide-skill-icon icon-bounce" />
                </div>
                <h4>T-SQL</h4>
                <p>Write and optimize SQL Server queries that can balance between time complexity, storage, and speed for managing data traffic.</p>
              </div>
            </div>
          </article>
        </section>

        <section id="skills" className="section stats-grid">
          <div className="section-header">
            <h2>Languages I use</h2>
            <p>A blend of Microsoft platforms, modern web, and data engineering skills.</p>
          </div>

          <div
            className="skill-card"
            onMouseEnter={() => pythonIconRef.current?.startAnimation()}
            onMouseLeave={() => pythonIconRef.current?.stopAnimation()}
          >
            <div className="language-icon-box">
              <PythonIcon ref={pythonIconRef} size={28} className="language-icon" />
            </div>
            <h3>Python</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-100" />
            </div>
            <p>10/10</p>
          </div>

          <div
            className="skill-card"
            onMouseEnter={() => restApiIconRef.current?.startAnimation()}
            onMouseLeave={() => restApiIconRef.current?.stopAnimation()}
          >
            <div className="language-icon-box">
              <LinkIcon ref={restApiIconRef} size={28} className="language-icon" />
            </div>
            <h3>REST Api</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-100" />
            </div>
            <p>10/10</p>
          </div>

          <div
            className="skill-card"
            onMouseEnter={() => reactIconRef.current?.startAnimation()}
            onMouseLeave={() => reactIconRef.current?.stopAnimation()}
          >
            <div className="language-icon-box">
              <BrandReactIcon ref={reactIconRef} size={28} className="language-icon" />
            </div>
            <h3>React.js</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-80" />
            </div>
            <p>8/10</p>
          </div>

          <div
            className="skill-card"
            onMouseEnter={() => nodeIconRef.current?.startAnimation()}
            onMouseLeave={() => nodeIconRef.current?.stopAnimation()}
          >
            <div className="language-icon-box">
              <NodejsIcon ref={nodeIconRef} size={28} className="language-icon" />
            </div>
            <h3>Node.js</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-80" />
            </div>
            <p>8/10</p>
          </div>

          <div
            className="skill-card"
            onMouseEnter={() => arduinoIconRef.current?.startAnimation()}
            onMouseLeave={() => arduinoIconRef.current?.stopAnimation()}
          >
            <div className="language-icon-box">
              <CpuIcon ref={arduinoIconRef} size={28} className="language-icon" />
            </div>
            <h3>Arduino</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-80" />
            </div>
            <p>5/10</p>
          </div>

          <div
            className="skill-card"
            onMouseEnter={() => cppIconRef.current?.startAnimation()}
            onMouseLeave={() => cppIconRef.current?.stopAnimation()}
          >
            <div className="language-icon-box">
              <TerminalIcon ref={cppIconRef} size={28} className="language-icon" />
            </div>
            <h3>C++</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-50" />
            </div>
            <p>5/10</p>
          </div>

          <div
            className="skill-card"
            onMouseEnter={() => dotnetIconRef.current?.startAnimation()}
            onMouseLeave={() => dotnetIconRef.current?.stopAnimation()}
          >
            <div className="language-icon-box">
              <LibraryIcon ref={dotnetIconRef} size={28} className="language-icon" />
            </div>
            <h3>.NET SDK</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-50" />
            </div>
            <p>5/10</p>
          </div>


        </section>

        <section id="architecture" className="section architecture">
          <div className="section-header">
            <h2>Workspace Architecture I'm familiar with</h2>
            <p>
              Building solutions across low-code, web, and automation platforms with end-to-end architecture in mind.
            </p>
          </div>
          <div className="architecture-list">
            <article className="architecture-card">
              <div className="architecture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </div>
              <div>
                <h4>Power App Code Apps + React + Vite</h4>
                <p>Combine Power Platform with modern React tooling for polished, hybrid enterprise apps.</p>
              </div>
            </article>
            <article className="architecture-card">
              <div className="architecture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="6" rx="8" ry="3" />
                  <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
                  <path d="M4 12c0 1.657 3.582 3 8 3s8-1.343 8-3" />
                </svg>
              </div>
              <div>
                <h4>T-SQL + Microsoft On-premise Gateway</h4>
                <p>Design data pipelines and gateways that keep enterprise systems connected and secure.</p>
              </div>
            </article>
            <article className="architecture-card">
              <div className="architecture-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 7l-3 5 3 5" />
                  <path d="M16 7l3 5-3 5" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                </svg>
              </div>
              <div>
                <h4>Python + Selenium + PyQT + pyodbc</h4>
                <p>Automate browser workflows, build desktop UIs, and connect to data sources with Python tooling.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section low-tech card-group">
          <div className="section-header">
            <h2>Start Up Company? No problem!</h2>
            <p>I offer low tech solutions using free and practical alternatives that still scalable and flexible in future developments.</p>
          </div>
          <article className="card">
            <ul>
              <li>Design systems & dashboards using Google Spreadsheets & Excel with Google APIs</li>
              <li>Microsoft Power BI data visualization</li>
              <li>Alternative solutions for expensive APIs through web scraping</li>
            </ul>
          </article>
        </section>

        <section id="contact" className="section contact-section">
          <div className="card contact-card">
            <div>
              <p className="eyebrow">Ready to start?</p>
              <h2>Let's build your next Power App or data pipeline.</h2>
              <p>
                I offer in-depth system development for Microsoft Power Platform, data
                engineering, automation, and low-code dashboard solutions.
              </p>
            </div>
            <div className="contact-actions">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=christianerrolapolinariosinag@example.com&su=Let%27s%20work%20together&body=Hi%20Christian%2C%0A%0AI%27m%20interested%20in%20your%20Power%20Apps%20and%20data%20pipeline%20expertise.%20I%27d%20like%20to%20discuss%20how%20you%20can%20help%20transform%20our%20business%20with%20innovative%20solutions." className="button primary" target="_blank" rel="noopener noreferrer">Email me</a>
              <a href="#" className="button secondary">Download resume</a>
            </div>
          </div>
        </section>

        <section className="section cta">
          <div className="card cta-card">
            <h2>Project based opportunities are welcome!</h2>
            <p>
              I am available for project-based work and ready to turn your business
              process challenges into efficient low-code and data-driven solutions.
            </p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=christianerrolapolinariosinag@example.com&su=Project%20Opportunity%20-%20Let%27s%20Collaborate&body=Hi%20Christian%2C%0A%0AI%20have%20an%20exciting%20project-based%20opportunity%20that%20aligns%20perfectly%20with%20your%20expertise.%20I%27d%20love%20to%20discuss%20the%20details%20and%20explore%20how%20we%20can%20turn%20our%20business%20challenges%20into%20efficient%20solutions." className="button primary" target="_blank" rel="noopener noreferrer">Consult pricing</a>
          </div>
        </section>
      </main>
    </div>
  </div>
  </>
  )
}

export default PortfolioPage
