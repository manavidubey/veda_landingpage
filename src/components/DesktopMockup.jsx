import React from 'react';
import { motion } from 'framer-motion';
import './DesktopMockup.css';

const DesktopMockup = () => {
  return (
    <section className="mockup-section" id="showcase">
      <div className="mockup-container">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mockup-header"
        >
          <span className="section-label">Your Team, In One Place</span>
          <h2>Track what everyone is working on <span className="text-gradient-accent">without follow-ups</span></h2>
          <p className="mockup-subtitle">No reminders. No chasing. No "just checking in." Things move automatically.</p>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="laptop-frame"
          style={{ perspective: '1200px' }}
        >
          <div className="laptop-lid">
            <div className="laptop-bezel">
              <div className="laptop-camera" />
            </div>
            <div className="laptop-screen">
              {/* Application UI */}
              <div className="app-ui">
                <div className="app-sidebar">
                  <div className="sb-logo">V</div>
                  <div className="sb-item sb-item--active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  </div>
                  <div className="sb-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </div>
                  <div className="sb-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  </div>
                  <div className="sb-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  </div>
                </div>

                <div className="app-main">
                  <div className="app-topbar">
                    <span className="topbar-title">Marketplace</span>
                    <div className="topbar-pills">
                      <span className="pill pill--active">Browse Workers</span>
                      <span className="pill">My Hires</span>
                      <span className="pill">History</span>
                    </div>
                  </div>

                  <div className="app-content">
                    {/* Worker listings */}
                    <div className="task-card-row">
                      <div className="mini-task-card">
                        <div className="mtc-status mtc-status--available" />
                        <div className="mtc-info">
                          <span className="mtc-name">MedRead - Your Medical Analyst</span>
                          <span className="mtc-meta">Ready when you are</span>
                        </div>
                        <span className="mtc-hire-btn">Ready</span>
                      </div>
                      <div className="mini-task-card">
                        <div className="mtc-status mtc-status--running" />
                        <div className="mtc-info">
                          <span className="mtc-name">Pathfinder - Your Admission Counsellor</span>
                          <div className="mtc-progress">
                            <div className="mtc-bar" style={{ width: '62%', background: 'linear-gradient(90deg, #a855f7, #c084fc)' }} />
                          </div>
                        </div>
                        <span className="mtc-pct">Working (62%)</span>
                      </div>
                      <div className="mini-task-card">
                        <div className="mtc-status mtc-status--done" />
                        <div className="mtc-info">
                          <span className="mtc-name">Contrarian - Your Strategy Partner</span>
                          <div className="mtc-progress">
                            <div className="mtc-bar" style={{ width: '100%', background: 'linear-gradient(90deg, #ef4444, #f87171)' }} />
                          </div>
                        </div>
                        <span className="mtc-pct" style={{ color: '#10b981' }}>Completed</span>
                      </div>
                      <div className="mini-task-card">
                        <div className="mtc-status mtc-status--available" />
                        <div className="mtc-info">
                          <span className="mtc-name">Hunter - Your Job Search Partner</span>
                          <span className="mtc-meta">Joining your team soon</span>
                        </div>
                        <span className="mtc-hire-btn">Soon</span>
                      </div>
                    </div>

                    <div className="app-grid-area">
                      <div className="chart-placeholder">
                        <div className="chart-label">Workers Hired This Month</div>
                        <div className="bar-chart">
                          <div className="bar" style={{ height: '30%' }} /><div className="bar" style={{ height: '55%' }} /><div className="bar" style={{ height: '45%' }} /><div className="bar" style={{ height: '72%' }} /><div className="bar bar--highlight" style={{ height: '90%' }} /><div className="bar" style={{ height: '60%' }} /><div className="bar" style={{ height: '85%' }} />
                        </div>
                      </div>
                      <div className="stats-mini">
                        <div className="stat-block"><span className="stat-val">34</span><span className="stat-lbl">Jobs Completed</span></div>
                        <div className="stat-block"><span className="stat-val">8</span><span className="stat-lbl">Workers Available</span></div>
                        <div className="stat-block"><span className="stat-val">$0</span><span className="stat-lbl">Hiring Overhead</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="laptop-base">
            <div className="laptop-touchpad" />
          </div>
          <div className="laptop-shadow" />
        </motion.div>
      </div>
    </section>
  );
};

export default DesktopMockup;
