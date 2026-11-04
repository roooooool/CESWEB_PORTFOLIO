/* src/pages/PersonalInfo.tsx */
import './css/PersonalInfo.css';
import AsciiBackground from '../components/AsciiBackground';
import ResumePDF from '../assets/RESUME 2026 - Christian Errol A. Sinag.pdf';
import { Download } from 'lucide-react';

const PersonalInfoPage = () => {
  return (
    <>
    <AsciiBackground />
    <div className="resume-page">
      <section className="section resume-container">
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
          <a href="#portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem', fontSize: '0.8rem', borderRadius: '8px', background: 'rgba(34, 211, 238, 0.15)', color: '#67e8f9', border: '1px solid rgba(34, 211, 238, 0.4)', textDecoration: 'none' }}>← Back</a>
          <a href={ResumePDF} download="RESUME - Christian Sinag.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem', fontSize: '0.8rem', borderRadius: '8px', background: 'rgba(250, 204, 21, 0.15)', color: '#fde047', border: '1px solid rgba(250, 204, 21, 0.4)', textDecoration: 'none' }}><Download size={14} /> Download Resume</a>
        </div>
        <div className="section-header">
          <h1>Christian Errol A. Sinag</h1>
          <p>Full-Stack Developer &amp; Data Analyst based in Manila, Philippines.</p>
        </div>

        <div className="resume-grid">
          <div className="resume-main">
            <article className="resume-block">
              <h3 className="resume-label">Professional Summary</h3>
              <p className="resume-role-summary">
                Results-driven Full-Stack Developer &amp; Data Analyst with over 2 years of experience designing, building, and deploying end-to-end logistics applications, data automation workflows, and analytical dashboards. Skilled in React, Python, Node.js, SQL, and APIs, with proven expertise in transforming complex operational data into actionable insights and automated systems for fleet tracking, warehouse management, and trip dispatching.
              </p>
            </article>

            <article className="resume-block">
              <h3 className="resume-label">Work Experience</h3>

              <div className="resume-item highlight-role">
                <div className="resume-date">June 2024 — Present</div>
                <div className="resume-content">
                  <h4>Senior Power Apps &amp; Full-Stack Developer</h4>
                  <p className="resume-org">Great Sierra Development Corporation</p>
                  <ul className="resume-bullet-list">
                    <li>Designed, developed, and maintained full-stack web applications for logistics management, including trip dispatching, warehouse control, and driver payroll systems.</li>
                    <li>Built dynamic, trend-focused analytics dashboards to provide actionable business intelligence and operational oversight.</li>
                    <li>Developed automated data pipelines using Power Automate and Python to streamline data processing across multiple platforms.</li>
                    <li>Built custom data gateways and integrated multi-platform REST APIs, including Google Maps API, ManilaGPS, MyGeotab, and Microsoft Graph API to support real-time trucking tracking maps.</li>
                    <li>Developed custom web scrapers in Python to extract and ingest GPS data from partner systems lacking native API integrations.</li>
                    <li>Utilized Microsoft Power Code Apps (React frontend), Microsoft SQL Server 2019, and Microsoft cloud services for backend data management and infrastructure.</li>
                  </ul>
                </div>
              </div>

              <div className="resume-item">
                <div className="resume-date">Sep 2021 — Jan 2022</div>
                <div className="resume-content">
                  <h4>Amazon Flex Driver Support</h4>
                  <p className="resume-org">Amazon</p>
                  <ul className="resume-bullet-list">
                    <li>Provided real-time operational and technical support for Amazon delivery drivers across the United States.</li>
                    <li>Handled time-sensitive logistical updates, including order cancellations, route adjustments, driver payments, and location mapping.</li>
                    <li>Diagnosed technical software issues with the driver platform to ensure seamless delivery execution.</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="resume-block">
              <h3 className="resume-label">Education</h3>
              <div className="resume-item">
                <div className="resume-date">May 2021</div>
                <div className="resume-content">
                  <h4>B.S. in Information Technology (3rd Year Completed)</h4>
                  <p className="resume-org">Santa Isabel College Manila</p>
                </div>
              </div>
              <div className="resume-item">
                <div className="resume-date">Apr 2018</div>
                <div className="resume-content">
                  <h4>Senior High School Diploma – STEM Track</h4>
                  <p className="resume-org">Santa Isabel College Manila</p>
                </div>
              </div>
              <div className="resume-item">
                <div className="resume-date">May 2016</div>
                <div className="resume-content">
                  <h4>High School Diploma</h4>
                  <p className="resume-org">Cayetano Arellano High School</p>
                </div>
              </div>
            </article>
          </div>

          <aside className="resume-sidebar">
            <div className="sidebar-card">
                <h4>Contact Details</h4>
                <p>📍 Manila, Metro Manila, Philippines</p>
                <iframe
                  title="Manila map"
                  src="https://www.google.com/maps?q=Manila,+Philippines&output=embed"
                  style={{ width: '100%', height: '160px', border: 0, borderRadius: '8px', marginTop: '0.5rem' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <p>📧 <a href="mailto:christianerrolapolinariosinag@gmail.com">christianerrolapolinariosinag@gmail.com</a></p>
                <p>📱 +63 960 849 0954</p>
            </div>

            <div className="sidebar-card">
              <h4>Core Competencies</h4>
              <div className="pill-group">
                <span>Data Analytics &amp; Automation</span>
                <span>Trend Analysis</span>
                <span>Web Scraping (Python)</span>
                <span>React / TypeScript</span>
                <span>Node.js</span>
                <span>Power Apps SDK/CLI</span>
                <span>SQL Server 2019</span>
                <span>MS Dataverse</span>
                <span>REST APIs</span>
                <span>Power Automate</span>
                <span>GitHub</span>
                <span>Custom Devkit CLI</span>
              </div>
            </div>

            <div className="sidebar-card">
              <h4>Languages</h4>
              <p><strong>Tagalog:</strong> Native</p>
              <p><strong>English:</strong> Proficient</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
    </>
  );
};

export default PersonalInfoPage;
