import tripDispatchImg from '../assets/TripDispatch-demo-thumbnail.png';
import dashboardImg from '../assets/Dashboard-demo-thumbnail.png';
import liveGpsImg from '../assets/LiveGPS-demo-thumbnail.png';
import christianImg from '../assets/ChristianIDpicTransparent.png';

//components
import AsciiBackground from '../components/AsciiBackground';
import HeroCodePattern from '../components/HeroCodePattern';
import PythonIcon from '../components/ui/python-icon';
import BrandReactIcon from '../components/ui/brand-react-icon';
import NodejsIcon from '../components/ui/nodejs-icon';
import TerminalIcon from '../components/ui/terminal-icon';
import LibraryIcon from '../components/ui/library-icon';
import CpuIcon from '../components/ui/cpu-icon';
import LinkIcon from '../components/ui/link-icon';
import type { AnimatedIconHandle } from '../components/ui/types';

import ResumePDF from '../assets/RESUME - Sinag.pdf';

import { Database, Server, ChevronRight, ChevronLeft, Plus, Minus, ThumbsUp, Layers, Workflow, Terminal, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

function PortfolioPage() {

  // const initialization
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollbarFillRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const topNavRef = useRef<HTMLElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [techFilter, setTechFilter] = useState<'all' | 'frontend' | 'backend' | 'db' | 'cicd' | 'tools'>('all');
  const pythonIconRef = useRef<AnimatedIconHandle | null>(null);
  const restApiIconRef = useRef<AnimatedIconHandle | null>(null);
  const reactIconRef = useRef<AnimatedIconHandle | null>(null);
  const nodeIconRef = useRef<AnimatedIconHandle | null>(null);
  const arduinoIconRef = useRef<AnimatedIconHandle | null>(null);
  const cppIconRef = useRef<AnimatedIconHandle | null>(null);
  const dotnetIconRef = useRef<AnimatedIconHandle | null>(null);

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
    if (rafIdRef.current !== null) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      const node = scrollRef.current;
      if (!node) return;

      const totalScrollable = node.scrollWidth - node.clientWidth;
      if (totalScrollable <= 0) return;

      const progress = Math.max(10, Math.min(100, (node.scrollLeft / totalScrollable) * 100));

      if (scrollbarFillRef.current) {
        scrollbarFillRef.current.style.width = `${progress}%`;
      }

      // Calculate current page and only update state if integer page actually changed
      const page = Math.max(1, Math.min(totalCards, Math.ceil((node.scrollLeft / totalScrollable) * totalCards) || 1));
      setCurrentPage((prev) => (prev !== page ? page : prev));
    });
  };

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
      node.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        node.removeEventListener('scroll', handleScroll);
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      };
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
            <HeroCodePattern />
            <div className="hero-main reveal reveal-up animation-delay-200">
              <div className="hero-intro">
                <p className="eyebrow">Senior Power Apps Developer</p>
                <h1 className="text-gradient">Christian Errol A. Sinag</h1>
                <p className="hero-copy">
                  I design cloud-first business applications, intelligent data pipelines,
                  and low-tech-friendly solutions that help teams move faster and build
                  dashboards with Microsoft Power Apps and open-source tools.
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

            <div className="hero-back-pattern" aria-hidden="true" />

          </header>
        </section>

        <section
          id="projects"
          className="showcase-carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="carousel-header-wrapper">
            <div className="section-header">
              <h2>3+ Years of Hands-On Experience!</h2>
              <div className="header-description">
                <p>
                  Over the course of my career, I have specialized in bridging the gap between
                  complex logistical operations and data integration. My platform of experties includes
                  <strong> Power Apps (Canvas Apps & Code Apps)</strong>, <strong>Power Automate</strong>, and <strong>Sharepoint/Datavers/Microsoft Graph API</strong>.
                  I'm also available for <strong> project-based development </strong> and offer free and low-tech alternatives for startups and small businesses, such as <strong>Custom API Connectors</strong> and open-source <strong>Google API</strong>.
                </p>
              </div>
            </div>

          </div>
          <div className='carousel-title'><h2>View a Demo of Projects I made:</h2></div>
          <div
            className="carousel-track"
            ref={scrollRef}
            data-lenis-prevent
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Project 1: Trip Dispatch */}
            <a
              href="https://roooooool.github.io/DISPATCH_APP_DEMO/#/fleet"
              className="showcase-card reveal reveal-up animation-delay-200"
              target="_blank"
              rel="noopener noreferrer"
            >
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

            {/* Project 2: Sales Forecast wew23 */}
            <a
              href="https://roooooool.github.io/DISPATCH_APP_DEMO/#/fleet"
              className="showcase-card reveal reveal-up animation-delay-400"
              target="_blank"
              rel="noopener noreferrer"
            >              <div className="showcase-bg" style={{ backgroundImage: `url(${dashboardImg})` }}></div>
              <div className="showcase-content">
                <p className="demo-tag">Analytics Hub</p>
                <h4>Sales Analytics & Dashboard</h4>
                <p className="showcase-desc">
                  Interactive data visualization platform converting raw sales data into actionable trendss
                  using advanced Power BI integration and automated data refresh cycles.
                </p>
                <div className="showcase-footer">
                  <span className="button primary">View Demo ›</span>
                </div>
              </div>
            </a>

            {/* Project 3: Live GPS */}
            <a
              href="https://roooooool.github.io/DISPATCH_APP_DEMO/#/fleet"
              className="showcase-card reveal reveal-up animation-delay-600"
              target="_blank"
              rel="noopener noreferrer"
            >              <div className="showcase-bg" style={{ backgroundImage: `url(${liveGpsImg})` }}></div>
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
                <p className="demo-tag">Bots & AI Agent</p>
                <h4>Digital Web Assistant</h4>
                <p className="showcase-desc">
                  AI-powered assistant for reminding daily tasks, providing reports on live trip statuses and trucks maintenance schedule. Used to quickly retrieve information and automate routine queries, improving operational efficiency and response times.
                </p>
                <div className="showcase-footer">
                  <span className="button primary">View Demo</span>
                </div>
              </div>
            </a>

            {/* Project 5: Dummy / Future Project B */}
            <a href="#" className="showcase-card reveal reveal-up animation-delay-4000">
              <div className="showcase-bg" style={{ backgroundColor: '#1a1a1a', backgroundImage: 'linear-gradient(45deg, #071624, #ff0000)' }}></div>
              <div className="showcase-content">
                <p className="demo-tag">Data Integration & API</p>
                <h4>Custom Microsoft Connector</h4>
                <p className="showcase-desc">
                  Reusable Python connector for seamless integration with Microsoft services and APIs. Easily available through Pip and Github. For connectiong multi-platform data sources to Microsoft Power Platform, enabling custom workflows and data sync across services without needing to build a full custom connector from scratch.
                </p>
                <div className="showcase-footer">
                  <span className="button primary">View Documentation</span>
                </div>
              </div>
            </a>
          </div>

          <div className="custom-scrollbar-container">
            <div
              ref={scrollbarFillRef}
              className="custom-scrollbar-fill"
              style={{ width: '10%' }}
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
            <section id="tech-stack" className="section tech-stack-section card-group">
              <div className="section-header">
                <h2>Tech Stack &amp; Architecture</h2>
                <p>
                  A structured breakdown of modern frontend engineering, backend runtimes,
                  Microsoft Power Platform ecosystems, enterprise relational databases, and automated pipelines.
                </p>
              </div>

              {/* Category Filter Bar */}
              <div className="tech-stack-filter-bar" role="tablist" aria-label="Filter tech stack categories">
                <button
                  type="button"
                  className={`tech-filter-btn ${techFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setTechFilter('all')}
                >
                  <Sparkles size={14} />
                  <span>All Layers</span>
                  <span className="tech-filter-count">31</span>
                </button>
                <button
                  type="button"
                  className={`tech-filter-btn ${techFilter === 'frontend' ? 'active' : ''}`}
                  onClick={() => setTechFilter('frontend')}
                >
                  <Layers size={14} />
                  <span>Frontend</span>
                  <span className="tech-filter-count">6</span>
                </button>
                <button
                  type="button"
                  className={`tech-filter-btn ${techFilter === 'backend' ? 'active' : ''}`}
                  onClick={() => setTechFilter('backend')}
                >
                  <Server size={14} />
                  <span>Backend &amp; APIs</span>
                  <span className="tech-filter-count">10</span>
                </button>
                <button
                  type="button"
                  className={`tech-filter-btn ${techFilter === 'db' ? 'active' : ''}`}
                  onClick={() => setTechFilter('db')}
                >
                  <Database size={14} />
                  <span>Databases</span>
                  <span className="tech-filter-count">6</span>
                </button>
                <button
                  type="button"
                  className={`tech-filter-btn ${techFilter === 'cicd' ? 'active' : ''}`}
                  onClick={() => setTechFilter('cicd')}
                >
                  <Workflow size={14} />
                  <span>CI/CD &amp; Cloud</span>
                  <span className="tech-filter-count">4</span>
                </button>
                <button
                  type="button"
                  className={`tech-filter-btn ${techFilter === 'tools' ? 'active' : ''}`}
                  onClick={() => setTechFilter('tools')}
                >
                  <Terminal size={14} />
                  <span>Dev Tools</span>
                  <span className="tech-filter-count">5</span>
                </button>
              </div>

              <div className="tech-stack-grid">
                {/* 1. FRONTEND */}
                {(techFilter === 'all' || techFilter === 'frontend') && (
                  <article className="tech-stack-card tech-card--frontend" style={{ gridColumn: techFilter === 'frontend' ? 'span 12' : undefined }}>
                    <div className="tech-card-header">
                      <div className="tech-card-header-left">
                        <div className="tech-card-icon-wrap">
                          <Layers size={22} />
                        </div>
                        <div className="tech-card-titles">
                          <h3>Frontend Engineering</h3>
                          <span className="tech-card-layer-tag">Client Tier &amp; UI Architecture</span>
                        </div>
                      </div>
                      <span className="tech-card-count">6 Technologies</span>
                    </div>
                    <p className="tech-card-desc">
                      Reactive single-page web applications, component-driven design systems, and enterprise low-code client interfaces.
                    </p>
                    <div className="tech-chips-grid">
                      <div className="tech-chip">
                        <span className="tech-chip-name">React</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">TypeScript</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Vite</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Power Apps</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Tailwind CSS</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">HTML5 / CSS3</span>
                      </div>
                    </div>
                  </article>
                )}

                {/* 2. BACKEND & AUTOMATION */}
                {(techFilter === 'all' || techFilter === 'backend') && (
                  <article className="tech-stack-card tech-card--backend" style={{ gridColumn: techFilter === 'backend' ? 'span 12' : undefined }}>
                    <div className="tech-card-header">
                      <div className="tech-card-header-left">
                        <div className="tech-card-icon-wrap">
                          <Server size={22} />
                        </div>
                        <div className="tech-card-titles">
                          <h3>Backend &amp; Automation</h3>
                          <span className="tech-card-layer-tag">Services, APIs &amp; Workflows</span>
                        </div>
                      </div>
                      <span className="tech-card-count">10 Technologies</span>
                    </div>
                    <p className="tech-card-desc">
                      Server runtimes, REST microservices, enterprise connector APIs, and cloud automated process flows.
                    </p>
                    <div className="tech-chips-grid">
                      <div className="tech-chip">
                        <span className="tech-chip-name">Python</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Flask</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">.NET 10</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Node.js / JS</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Power Automate</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">MS Graph API</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">SharePoint API</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Google APIs</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">RESTful APIs</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Web Scraping</span>
                      </div>
                    </div>
                  </article>
                )}

                {/* 3. DATABASES */}
                {(techFilter === 'all' || techFilter === 'db') && (
                  <article className="tech-stack-card tech-card--db" style={{ gridColumn: techFilter === 'db' ? 'span 12' : undefined }}>
                    <div className="tech-card-header">
                      <div className="tech-card-header-left">
                        <div className="tech-card-icon-wrap">
                          <Database size={22} />
                        </div>
                        <div className="tech-card-titles">
                          <h3>Databases &amp; Storage</h3>
                          <span className="tech-card-layer-tag">Storage, Relational &amp; Hybrid</span>
                        </div>
                      </div>
                      <span className="tech-card-count">6 Technologies</span>
                    </div>
                    <p className="tech-card-desc">
                      Relational schemas, cloud dataverse tables, and enterprise hybrid data gateway relays.
                    </p>
                    <div className="tech-chips-grid">
                      <div className="tech-chip">
                        <span className="tech-chip-name">SQL Server (T-SQL)</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">MS Dataverse</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">On-Prem Gateway</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">SSMS</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">MS Lakehouse</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Query Tuning</span>
                      </div>
                    </div>
                  </article>
                )}

                {/* 4. CI/CD & CLOUD */}
                {(techFilter === 'all' || techFilter === 'cicd') && (
                  <article className="tech-stack-card tech-card--cicd" style={{ gridColumn: techFilter === 'cicd' ? 'span 12' : undefined }}>
                    <div className="tech-card-header">
                      <div className="tech-card-header-left">
                        <div className="tech-card-icon-wrap">
                          <Workflow size={22} />
                        </div>
                        <div className="tech-card-titles">
                          <h3>CI/CD &amp; Deployment</h3>
                          <span className="tech-card-layer-tag">Pipelines &amp; Cloud Hosting</span>
                        </div>
                      </div>
                      <span className="tech-card-count">4 Technologies</span>
                    </div>
                    <p className="tech-card-desc">
                      Collaborative version control, automated deployment pipelines, and modern cloud hosting platforms.
                    </p>
                    <div className="tech-chips-grid">
                      <div className="tech-chip">
                        <span className="tech-chip-name">GitHub</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">GitHub Actions</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">GitHub Pages</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Render</span>
                      </div>
                    </div>
                  </article>
                )}

                {/* 5. DEVELOPMENT TOOLS & IDE */}
                {(techFilter === 'all' || techFilter === 'tools') && (
                  <article className="tech-stack-card tech-card--tools" style={{ gridColumn: techFilter === 'tools' ? 'span 12' : undefined }}>
                    <div className="tech-card-header">
                      <div className="tech-card-header-left">
                        <div className="tech-card-icon-wrap">
                          <Terminal size={22} />
                        </div>
                        <div className="tech-card-titles">
                          <h3>Dev Tools &amp; Environment</h3>
                          <span className="tech-card-layer-tag">Workspace &amp; Package Tools</span>
                        </div>
                      </div>
                      <span className="tech-card-count">5 Technologies</span>
                    </div>
                    <p className="tech-card-desc">
                      Developer workspaces, CLI toolchains, and package managers configured for rapid delivery.
                    </p>
                    <div className="tech-chips-grid">
                      <div className="tech-chip">
                        <span className="tech-chip-name">VS Code</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Power Apps CLI</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Git</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">npm</span>
                      </div>
                      <div className="tech-chip">
                        <span className="tech-chip-name">Postman</span>
                      </div>
                    </div>
                  </article>
                )}
              </div>
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
                <article className="architecture-card architecture-card--featured">
                  <span className="architecture-recommended-badge">
                    <ThumbsUp size={18} aria-hidden="true" className="architecture-recommended-icon" />
                    <span className="architecture-recommended-text">PROFICIENT!</span>
                  </span>
                  <div className="architecture-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  </div>
                  <div className="architecture-content">
                    <h4>Power App Code Apps + React + Vite</h4>
                    <p>Combine Power Platform with modern React tooling for polished, hybrid enterprise apps.</p>
                    <div className="architecture-detail-grid">
                      <div className="architecture-panel">
                        <h5>Strengths</h5>
                        <ul>
                          <li className="architecture-bullet-item architecture-bullet-item--strength"><Plus size={14} aria-hidden="true" />Fast delivery through reusable Power Platform components and custom React modules.</li>
                          <li className="architecture-bullet-item architecture-bullet-item--strength"><Plus size={14} aria-hidden="true" />Clean UI layer with Vite build speed and modern TypeScript developer experience.</li>
                          <li className="architecture-bullet-item architecture-bullet-item--strength"><Plus size={14} aria-hidden="true" />Great for internal business apps needing both low-code agility and advanced UX.</li>
                        </ul>
                      </div>
                      <div className="architecture-panel architecture-panel--caution">
                        <h5>Tradeoffs</h5>
                        <ul>
                          <li className="architecture-bullet-item architecture-bullet-item--tradeoff"><Minus size={14} aria-hidden="true" />Governance is needed to avoid logic split between low-code and frontend codebases.</li>
                          <li className="architecture-bullet-item architecture-bullet-item--tradeoff"><Minus size={14} aria-hidden="true" />Requires clear deployment flow for environment variables, connectors, and app bundles.</li>
                        </ul>
                      </div>
                    </div>
                    <p className="architecture-note"><strong>Best fit:</strong> Enterprise teams that need quick iteration without sacrificing maintainable frontend quality.</p>
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
                  <div className="architecture-content">
                    <h4>T-SQL + Microsoft On-premise Gateway</h4>
                    <p>Design data pipelines and gateways that keep enterprise systems connected and secure.</p>
                    <div className="architecture-detail-grid">
                      <div className="architecture-panel">
                        <h5>Strengths</h5>
                        <ul>
                          <li className="architecture-bullet-item architecture-bullet-item--strength"><Plus size={14} aria-hidden="true" />Reliable bridge for legacy SQL Server workloads that cannot move fully to cloud yet.</li>
                          <li className="architecture-bullet-item architecture-bullet-item--strength"><Plus size={14} aria-hidden="true" />Fine-grained query control with T-SQL optimization for speed and reporting stability.</li>
                          <li className="architecture-bullet-item architecture-bullet-item--strength"><Plus size={14} aria-hidden="true" />Supports secure hybrid architecture across cloud dashboards and on-prem infrastructure.</li>
                        </ul>
                      </div>
                      <div className="architecture-panel architecture-panel--caution">
                        <h5>Tradeoffs</h5>
                        <ul>
                          <li className="architecture-bullet-item architecture-bullet-item--tradeoff"><Minus size={14} aria-hidden="true" />Gateway uptime, patching, and firewall rules must be actively maintained.</li>
                          <li className="architecture-bullet-item architecture-bullet-item--tradeoff"><Minus size={14} aria-hidden="true" />Heavy workloads need query tuning and indexing discipline to avoid bottlenecks.</li>
                        </ul>
                      </div>
                    </div>
                    <p className="architecture-note"><strong>Best fit:</strong> Organizations running critical on-prem databases that still need modern cloud reporting and automation.</p>
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
                  <div className="architecture-content">
                    <h4>Python + Selenium + PyQT + pyodbc</h4>
                    <p>Automate browser workflows, build desktop UIs, and connect to data sources with Python tooling.</p>
                    <div className="architecture-detail-grid">
                      <div className="architecture-panel">
                        <h5>Strengths</h5>
                        <ul>
                          <li className="architecture-bullet-item architecture-bullet-item--strength"><Plus size={14} aria-hidden="true" />Powerful for end-to-end automation from web data collection to local processing tools.</li>
                          <li className="architecture-bullet-item architecture-bullet-item--strength"><Plus size={14} aria-hidden="true" />PyQT desktop layer helps deliver internal operator apps with custom workflow controls.</li>
                          <li className="architecture-bullet-item architecture-bullet-item--strength"><Plus size={14} aria-hidden="true" />pyodbc integration supports direct data exchange with enterprise SQL environments.</li>
                        </ul>
                      </div>
                      <div className="architecture-panel architecture-panel--caution">
                        <h5>Tradeoffs</h5>
                        <ul>
                          <li className="architecture-bullet-item architecture-bullet-item--tradeoff"><Minus size={14} aria-hidden="true" />UI testing and browser automation can be brittle if target websites change often.</li>
                          <li className="architecture-bullet-item architecture-bullet-item--tradeoff"><Minus size={14} aria-hidden="true" />Desktop distribution needs packaging strategy for versioning and dependency updates.</li>
                        </ul>
                      </div>
                    </div>
                    <p className="architecture-note"><strong>Best fit:</strong> Teams needing practical automation and desktop-assisted operations connected to existing enterprise data.</p>
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
                  <a
                    href={ResumePDF}
                    className="button secondary"
                    download="RESUME - Christian Sinag.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download resume
                  </a>
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
                <a href="https://nxtwavestudioco.github.io/nextwave-studio/" className="button primary" target="_blank" rel="noopener noreferrer">Consult pricing</a>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default PortfolioPage
