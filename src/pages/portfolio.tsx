import tripDispatchImg from '../assets/TripDispatch-demo-thumbnail.png';
import dashboardImg from '../assets/Dashboard-demo-thumbnail.png';
import liveGpsImg from '../assets/LiveGPS-demo-thumbnail.png';
import { Globe, Network, Database, Zap, Warehouse, Server, ChevronRight, ChevronLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function PortfolioPage() {

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCards = 5;

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




  return (
    <div className="portfolio-page">
      <nav className="top-nav">
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#architecture">Architecture</a>
        <a href="#resume">Personal Info</a>
        <a href="#contact">Contact</a>
      </nav>

      <header className="hero" style={{ position: 'relative' }}>
        <div>
          <p className="eyebrow">Senior Power Apps Developer</p>
          <h1>Christian Errol A. Sinag</h1>
          <p className="hero-copy">
            I design cloud-first business applications, intelligent data pipelines,
            and low-tech-friendly solutions that help teams move faster and build
            dashboards with modern Microsoft and open-source tools.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="button primary">View projects</a>
            <a href="#contact" className="button secondary">Contact me</a>
          </div>
        </div>
        <a href="#resume" className="hero-about-me" style={{ position: 'absolute', bottom: '1.75rem', right: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textDecoration: 'none', fontWeight: '600', cursor: 'pointer', transition: 'transform 180ms ease' }}>
          Learn More About Me
          <ChevronRight size={20} />
        </a>
      </header>

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
                I'm also availabe for <strong> Project-Based development </strong> and offers free & low tech alternative for startups and small businesses.
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
          <a href="#demo/trip-dispatch" className="showcase-card">
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
          <a href="#demo/sales-forecast-dashboard" className="showcase-card">
            <div className="showcase-bg" style={{ backgroundImage: `url(${dashboardImg})` }}></div>
            <div className="showcase-content">
              <p className="demo-tag">Analytics Hub</p>
              <h4>Sales Forecast & Dashboard</h4>
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
          <a href="#demo/live-gps-monitoring" className="showcase-card">
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
          <a href="#" className="showcase-card">
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
          <a href="#" className="showcase-card">
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





      <main>
        <section id="projects" className="section card-group">
          <div className="section-header">
            <h2>Tools &amp; Tech I utilize</h2>
            <p>Hands-on experience building Power Apps and scalable data solutions.</p>
          </div>

          <article className="card">
            <h3>Data Pipeline &amp; Ingestions</h3>
            <div className="skill-grid">
              <div className="skill-item">
                <div className="skill-icon-box">
                  <Globe size={32} />
                </div>
                <h4>Web Scraping</h4>
                <p>Extract and transform web data into actionable insights using Python and Selenium.</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon-box">
                  <Network size={32} />
                </div>
                <h4>Microsoft Graph API</h4>
                <p>Integrate Microsoft 365 services to build connected applications and dashboards.</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon-box">
                  <Database size={32} />
                </div>
                <h4>SharePoint REST API</h4>
                <p>Connect to SharePoint data sources and sync information across enterprise systems.</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon-box">
                  <Database size={32} />
                </div>
                <h4>Microsoft Dataverse</h4>
                <p>
                    Unified enterprise data across applications using a scalable cloud service, 
                    automating complex business logic and ensuring consistency through a centralized 
                    API-first infrastructure
                </p>
              </div>
              <div className="skill-item">
                <div className="skill-icon-box">
                  <Zap size={32} />
                </div>
                <h4>Power Automate</h4>
                <p>Build intelligent workflows that automate business processes end-to-end.</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon-box">
                  <Warehouse size={32} />
                </div>
                <h4>Microsoft Lakehouse</h4>
                <p>Design scalable data architectures combining analytics with data lake capabilities.</p>
              </div>
              <div className="skill-item">
                <div className="skill-icon-box">
                  <Server size={32} />
                </div>
                <h4>On Premise Data Gateway</h4>
                <p>Securely connect on-premise systems to cloud services with enterprise-grade data bridges and hybrid integration.</p>
              </div>
            </div>
          </article>
        </section>

        <section id="skills" className="section stats-grid">
          <div className="section-header">
            <h2>Languages I use</h2>
            <p>A blend of Microsoft platforms, modern web, and data engineering skills.</p>
          </div>

          <div className="skill-card">
            <h3>Python</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-100" />
            </div>
            <p>10/10</p>
          </div>

          <div className="skill-card">
            <h3>REST Api</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-100" />
            </div>
            <p>10/10</p>
          </div>

          <div className="skill-card">
            <h3>React</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-80" />
            </div>
            <p>8/10</p>
          </div>

          <div className="skill-card">
            <h3>Node JS</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-80" />
            </div>
            <p>8/10</p>
          </div>

          <div className="skill-card">
            <h3>Arduino</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-80" />
            </div>
            <p>5/10</p>
          </div>

          <div className="skill-card">
            <h3>C++</h3>
            <div className="skill-meter">
              <span className="meter-fill fill-50" />
            </div>
            <p>5/10</p>
          </div>

          <div className="skill-card">
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
              <a href="mailto:christianerrolapolinariosinag@example.com" className="button primary">Email me</a>
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
            <a href="mailto:hello@example.com" className="button primary">Contact me</a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default PortfolioPage
