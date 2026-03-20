import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { employees } from '../data/employees';
import './Workers.css';

const workerIcons = {
  emma: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="M18 5v17"/><path d="M6 5v17"/></svg>,
  liam: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>,
  noah: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  ava: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  ethan: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  maya: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  sofia: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838.838-2.872a2 2 0 0 1 .506-.855z"/></svg>,
  arjun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
};

const Workers = () => {
  const orderedWorkers = [...employees].sort((a, b) => {
    if (a.name === 'Emma') return -1;
    if (b.name === 'Emma') return 1;
    return 0;
  });

  return (
    <section className="workers-section" id="workers">
      <div className="workers-container">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="workers-header"
        >
          <span className="section-label">Meet Your Team</span>
          <h2>Hire the exact <span className="text-gradient-accent">teammate you need</span></h2>
          <p className="workers-intro">Real employee profiles. Clear ownership. Reliable execution.</p>
        </motion.div>

        <div className="workers-grid">
          {orderedWorkers.map((worker, index) => (
            <motion.div
              key={worker.name}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="worker-card glass-panel"
              style={{ '--worker-color': worker.color }}
            >
              <div className="worker-card-header">
                <div className="worker-avatar" style={{ '--worker-color': worker.color }}>
                  {worker.name.slice(0, 1)}
                </div>
                <div className="worker-head-copy">
                  <h3 className="worker-name">{worker.name}</h3>
                  <span className="worker-role">{worker.role}</span>
                  <span className="worker-employee-tag">{worker.employeeTag}</span>
                </div>
                <div className="worker-icon" style={{ color: worker.color }}>
                  {workerIcons[worker.slug]}
                </div>
              </div>
              <div className="worker-content-scroll">
                <p className="worker-specialty">{worker.specialty}</p>
                <p className="worker-desc">{worker.description}</p>
                <div className="worker-tasks">
                  {worker.tasks.map((task) => (
                    <span key={task} className="worker-task-tag">{task}</span>
                  ))}
                </div>
              </div>
              <div className="worker-footer">
                <Link className="worker-hire-btn" to={`/employees/${worker.slug}`}>
                  <span>View profile</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
              <div className="worker-card-glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workers;
