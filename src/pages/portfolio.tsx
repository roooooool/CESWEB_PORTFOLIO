import tripDispatchImg from '../assets/TripDispatch-demo-thumbnail.png';
import dashboardImg from '../assets/Dashboard-demo-thumbnail.png';
import liveGpsImg from '../assets/LiveGPS-demo-thumbnail.png';
import { Globe, Network, Database, Zap, Warehouse } from 'lucide-react';

function PortfolioPage() {
  return (
    <div className="portfolio-page">
      <nav className="top-nav">
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#architecture">Architecture</a>
        <a href="#contact">Contact</a>
      </nav>

      <header className="hero">
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
      </header>

      <main>
        <section id="projects" className="section card-group">
          <div className="section-header">
            <h2>Projects I have created</h2>
            <p>Hands-on experience building Power Apps and scalable data solutions.</p>
          </div>

          <article className="card">
            <h3>Power Apps</h3>
            <div className="demo-grid">
              <a href="#demo/trip-dispatch" className="demo-card">
                <div className="demo-bg-image" style={{ backgroundImage: `url(${tripDispatchImg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(1px)' }}></div>
                <div className="demo-bg-overlay" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)' }}></div>
                <div>
                  <p className="demo-tag">Try demo</p>
                  <h4>Trip Dispatch</h4>
                </div>
                <span className="chevron">›</span>
              </a>
              <a href="#demo/sales-forecast-dashboard" className="demo-card">
                <div className="demo-bg-image" style={{ backgroundImage: `url(${dashboardImg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(1px)' }}></div>
                <div className="demo-bg-overlay" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)' }}></div>
                <div>
                  <p className="demo-tag">Try demo</p>
                  <h4>Sales Forecast &amp; Dashboard</h4>
                </div>
                <span className="chevron">›</span>
              </a>
              <a href="#demo/live-gps-monitoring" className="demo-card">
                <div className="demo-bg-image" style={{ backgroundImage: `url(${liveGpsImg})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(1px)' }}></div>
                <div className="demo-bg-overlay" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)' }}></div>
                <div>
                  <p className="demo-tag">Try demo</p>
                  <h4>Live GPS Monitoring</h4>
                </div>
                <span className="chevron">›</span>
              </a>
            </div>
          </article>

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
            </div>
          </article>
        </section>

        <section id="skills" className="section stats-grid">
          <div className="section-header">
            <h2>Tools &amp; languages I use</h2>
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
            <h2>Low Tech friendly (free)</h2>
            <p>Practical alternatives that keep costs low while delivering value.</p>
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
                I offer freelance services for Microsoft Power Platform, data
                engineering, automation, and low-code dashboard solutions.
              </p>
            </div>
            <div className="contact-actions">
              <a href="mailto:hello@example.com" className="button primary">Email me</a>
              <a href="#" className="button secondary">Download resume</a>
            </div>
          </div>
        </section>

        <section className="section cta">
          <div className="card cta-card">
            <h2>Freelance projects welcome</h2>
            <p>
              I am available for freelance work and ready to turn your business
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
