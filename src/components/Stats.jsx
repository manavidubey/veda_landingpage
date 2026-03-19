import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Stats.css';

const stats = [
  { value: '120+', label: 'Human Hours Saved / Month', countTo: 120, suffix: '+' },
  { value: '70%', label: 'Lower Operating Cost', countTo: 70, suffix: '%' },
  { value: '5x', label: 'Faster Execution Speed', countTo: 5, suffix: 'x' },
  { value: '24/7', label: 'Always-On Coverage', countTo: 24, suffix: '/7' },
  { value: '<2m', label: 'Average Time To Start', countTo: 2, prefix: '<', suffix: 'm' },
  { value: '0', label: 'Manual Follow-Ups Needed', countTo: 0 },
];

const marqueeItems = [
  'Medical Report Reading',
  'College Admissions',
  'Portfolio Design',
  'Job Search',
  'Financial Analysis',
  'Content Writing',
  'Code Development',
  'Strategy & Debate',
  'Resume Building',
  'Research & Analysis',
  'Email Marketing',
  'Tax Preparation',
];

const CounterValue = ({ end, prefix = '', suffix = '', duration = 1200 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (end <= 0) {
      setValue(end);
      return;
    }

    let frameId;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.round(progress * end));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return (
    <span className="stat-value text-gradient-accent">
      {prefix}{value}{suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="stat-item"
            >
              {typeof stat.countTo === 'number' ? (
                <CounterValue
                  end={stat.countTo}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              ) : (
                <span className="stat-value text-gradient-accent">{stat.value}</span>
              )}
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Capability Marquee */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
