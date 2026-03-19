import React from 'react';
import { motion } from 'framer-motion';
import './Narrative.css';

const Narrative = () => {
  return (
    <section className="narrative-section">
      <div className="narrative-container">
        <motion.div 
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="narrative-divider"
        />
        
        <motion.h2 
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="narrative-statement"
        >
          You were never meant to do all this alone.<br />
          <span className="text-gradient">Not tools. Not bots. Teammates.</span>
        </motion.h2>

        <div className="narrative-grid">
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="narrative-col glass-panel"
          >
            <div className="narrative-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-cyan"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <h3>One Worker, One Job</h3>
            <p>Applications. Deadlines. Decisions. Planning. Execution. It is too much for one person, and help is often slow, expensive, or unavailable when you need it most.</p>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="narrative-col glass-panel"
          >
            <div className="narrative-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-blue"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h3>Veda Gives You Something Different</h3>
            <p>A team that shows up every time, works while you rest, and does not forget, delay, or disappear. Each teammate is built for a specific role and takes ownership like a real person would.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Narrative;
