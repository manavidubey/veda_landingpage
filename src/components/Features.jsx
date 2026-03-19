import React from 'react';
import { motion } from 'framer-motion';
import './Features.css';

const features = [
  {
    id: '01',
    title: 'They Understand',
    description: 'They do not wait for perfect instructions. They figure things out.',
  },
  {
    id: '02',
    title: 'They Stay on Top of Things',
    description: 'Deadlines, details, and follow-ups are handled.',
  },
  {
    id: '03',
    title: 'They Deliver',
    description: 'Not drafts. Not half-work. Real outcomes you can use immediately.',
  }
];

const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="features-container">
        <div className="features-header">
          <motion.h2
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            They do not just help.<br/>They take <span className="text-gradient-accent">ownership.</span>
          </motion.h2>
        </div>
        
        <div className="features-cards">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="feature-card glass-panel"
            >
              <div className="feature-number">{feature.id}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
              <div className="card-glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
