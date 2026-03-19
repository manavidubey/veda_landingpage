import React from 'react';
import { motion } from 'framer-motion';
import './Workers.css';

const workers = [
  {
    name: 'MedRead',
    role: 'Your Medical Analyst',
    specialty: 'Healthcare & Diagnostics',
    description: 'Explains reports, flags concerns, and helps you understand what matters.',
    tasks: ['Lab Report Analysis', 'Symptom Checker', 'Drug Interactions', 'Health Summaries'],
    color: '#10b981',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
    ),
  },
  {
    name: 'Pathfinder',
    role: 'Your Admission Counsellor',
    specialty: 'Education & College Planning',
    description: 'Your personal counsellor for the entire application journey. From shortlisting universities to final submissions, they stay on top of everything so you do not have to.',
    tasks: ['University Shortlisting', 'SOP Strategy & Writing', 'Scholarship Search', 'Interview Prep'],
    color: '#a855f7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="M18 5v17"/><path d="M6 5v17"/></svg>
    ),
  },
  {
    name: 'Contrarian',
    role: 'Your Strategy Partner',
    specialty: 'Critical Thinking & Debate',
    description: 'Challenges your thinking and strengthens your decisions.',
    tasks: ['Idea Stress-Testing', 'Risk Analysis', 'Pitch Review', 'Decision Frameworks'],
    color: '#ef4444',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    ),
  },
  {
    name: 'Forge',
    role: 'Your Portfolio Designer',
    specialty: 'Personal Branding & Design',
    description: 'Builds a portfolio that actually gets noticed.',
    tasks: ['Portfolio Design', 'Case Study Writing', 'Personal Branding', 'Resume Overhaul'],
    color: '#f59e0b',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    ),
  },
  {
    name: 'Hunter',
    role: 'Your Job Search Partner',
    specialty: 'Career & Recruitment',
    description: 'Finds roles, applies, and keeps track of everything.',
    tasks: ['Job Matching', 'Resume Tailoring', 'Cover Letters', 'Interview Coaching'],
    color: '#00d2ff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    ),
  },
  {
    name: 'Ledger',
    role: 'Your Finance Manager',
    specialty: 'Finance & Accounting',
    description: 'Keeps your money organized, optimized, and growing.',
    tasks: ['Expense Tracking', 'Budgeting', 'Tax Prep', 'Financial Reports'],
    color: '#06b6d4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
  },
  {
    name: 'Scribe',
    role: 'Your Content Partner',
    specialty: 'Writing & Copywriting',
    description: 'Writes content that sounds like you - only better.',
    tasks: ['Blog Articles', 'Ad Copy', 'Social Media', 'Email Campaigns'],
    color: '#ec4899',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838.838-2.872a2 2 0 0 1 .506-.855z"/></svg>
    ),
  },
  {
    name: 'Cipher',
    role: 'Your Developer',
    specialty: 'Software Engineering',
    description: 'Builds and ships code like a dedicated engineer on your team.',
    tasks: ['Full-Stack Dev', 'Bug Fixing', 'API Development', 'Code Review'],
    color: '#3b82f6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
  },
];

const Workers = () => {
  const orderedWorkers = [...workers].sort((a, b) => {
    if (a.name === 'Pathfinder') return -1;
    if (b.name === 'Pathfinder') return 1;
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
          <p className="workers-intro">Each one is focused, reliable, and always on.</p>
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
                <div className="worker-icon" style={{ color: worker.color }}>
                  {worker.icon}
                </div>
                <div>
                  <h3 className="worker-name">{worker.name}</h3>
                  <span className="worker-role">{worker.role}</span>
                </div>
              </div>
              <p className="worker-specialty">{worker.specialty}</p>
              <p className="worker-desc">{worker.description}</p>
              <div className="worker-tasks">
                {worker.tasks.map((task) => (
                  <span key={task} className="worker-task-tag">{task}</span>
                ))}
              </div>
              <div className="worker-hire-btn">
                <span>{worker.name === 'Pathfinder' ? 'Currently working with students' : 'Joining your team soon'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
