import React from 'react';
import { motion } from 'framer-motion';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    title: 'Choose Your Teammate',
    description: 'Pick the role you need help with, just like hiring for a job.',
  },
  {
    num: '02',
    title: 'Share What You Need',
    description: 'Explain your situation once. Your teammate understands, asks questions, and gets clarity.',
  },
  {
    num: '03',
    title: 'They Take It Forward',
    description: 'They plan, track, and execute without you chasing them.',
  },
  {
    num: '04',
    title: 'You Stay in Control',
    description: 'You approve key decisions and see progress in real time.',
  },
];

const HowItWorks = () => {
  return (
    <section className="howitworks-section" id="how-it-works">
      <div className="howitworks-container">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="howitworks-header"
        >
          <span className="section-label">How It Works</span>
          <h2>It feels like someone is finally <span className="text-gradient-accent">handling things for you</span></h2>
        </motion.div>

        <div className="steps-timeline">
          <div className="timeline-line" />
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className={`step-item ${index % 2 === 0 ? 'step-left' : 'step-right'}`}
            >
              <div className="step-dot">
                <span className="step-num">{step.num}</span>
              </div>
              <div className="step-content glass-panel">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
