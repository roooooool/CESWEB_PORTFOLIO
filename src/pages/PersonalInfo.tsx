/* src/pages/PersonalInfo.tsx */
//import React from 'react';
import './css/PersonalInfo.css'; 

const PersonalInfoPage = () => {
  return (
    <div className="resume-page">
      <section className="section resume-container">
        <div className="section-header">
          <h1>Christian Errol A. Sinag</h1>
          <p>Full-Stack Developer & Systems Engineer based in Manila.</p>
        </div>

        <div className="resume-grid">
          {/* MAIN CONTENT COLUMN */}
          <div className="resume-main">
            <article className="resume-block">
              <h3 className="resume-label">Work Experience</h3>
              
              <div className="resume-item">
                <div className="resume-date">2024 — Present</div>
                <div className="resume-content">
                  <h4>Full-Stack Developer & Systems Engineer</h4>
                  <p className="resume-org">Great Sierra Development Corporation (GSDC) - Logistics & Trucking</p>
                  <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '12px' }}>
                    Leading software development for a cement and Rebisco goods distribution company managing fleet logistics and delivery operations.
                  </p>
                  <ul>
                    <li>Developing enterprise logistics software, including "DISPATCH_APP_DMS" for real-time fleet management and delivery tracking.</li>
                    <li>Designing optimized SQL Server views and stored procedures to handle complex driver attendance, fuel tracking, and cargo management.</li>
                    <li>Implementing custom React table components with GPS mapping integrations for live monitoring of cement and goods deliveries.</li>
                    <li>Building data-driven dashboards for logistics optimization, route planning, and performance metrics.</li>
                  </ul>
                </div>
              </div>

              <div className="resume-item">
                <div className="resume-date">Sep 2021 — Jan 2022</div>
                <div className="resume-content">
                  <h4>On-Call Support (USA Logistics)</h4>
                  <p className="resume-org">Amazon [cite: 9, 10]</p>
                  <ul>
                    <li>Provided real-time support for delivery drivers regarding late orders, registration, and technical issues [cite: 18-20].</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="resume-block">
              <h3 className="resume-label">Education</h3>
              <div className="resume-item">
                <div className="resume-date">2018 — 2021</div>
                <div className="resume-content">
                  <h4>B.S. in Information Technology (Undergraduate)</h4>
                  <p className="resume-org">Santa Isabel College Manila [cite: 22]</p>
                </div>
              </div>
            </article>
          </div>

          {/* SIDEBAR COLUMN */}
          <aside className="resume-sidebar">
            <div className="sidebar-card">
                <h4>Contact Details</h4>
                <p>📍 Caloocan, Metro Manila</p>
                <p>
                    📧 <a href="mailto:christianerrolapolinariosinag@gmail.com">
                        christianerrolapolinariosinag@gmail.com
                    </a>
                </p>
                <p>
                    📱 <a href="tel:+639608490954">09608490954</a>
                </p>
            </div>

            <div className="sidebar-card">
              <h4>Hardware & Setup</h4>
              <div className="pill-group">
                <span>Computer Assembly [cite: 38]</span>
                <span>Router Config [cite: 48]</span>
                <span>OS Installation [cite: 45]</span>
                <span>Arduino [cite: 46]</span>
              </div>
            </div>

            <div className="sidebar-card">
              <h4>Languages</h4>
              <p><strong>Tagalog:</strong> Native [cite: 50]</p>
              <p><strong>English:</strong> Professional [cite: 51]</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default PersonalInfoPage;