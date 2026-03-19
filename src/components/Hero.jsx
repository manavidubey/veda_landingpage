import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './Hero.css';

const useTypingEffect = (words, typingSpeed = 100, deletingSpeed = 60, pauseDuration = 2000) => {
  const [currentText, setCurrentText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && currentText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setCurrentText(prev =>
          isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return currentText;
};

const Hero = () => {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [interactiveBackground, setInteractiveBackground] = useState(true);
  const typedWord = useTypingEffect(
    ['Read medical reports', 'Build your portfolio', 'Find your next job', 'Manage your finances', 'Challenge your thinking', 'Write your content'],
    80, 50, 1600
  );

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const cores = navigator.hardwareConcurrency || 8;
    const memory = navigator.deviceMemory || 8;
    const lowPowerDevice = cores <= 6 || memory <= 4;
    setInteractiveBackground(hasFinePointer && !prefersReducedMotion && !lowPowerDevice);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!interactiveBackground) return;

    let rafId = null;
    let pending = false;
    let nextX = section.clientWidth / 2;
    let nextY = section.clientHeight / 2;

    const flush = () => {
      section.style.setProperty('--cursor-x', `${nextX}px`);
      section.style.setProperty('--cursor-y', `${nextY}px`);
      pending = false;
      rafId = null;
    };

    const handlePointerMove = (event) => {
      const rect = section.getBoundingClientRect();
      nextX = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
      nextY = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(flush);
      }
    };

    const handlePointerLeave = () => {
      nextX = section.clientWidth / 2;
      nextY = section.clientHeight / 2;
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(flush);
      }
    };

    section.style.setProperty('--cursor-x', `${nextX}px`);
    section.style.setProperty('--cursor-y', `${nextY}px`);
    section.addEventListener('pointermove', handlePointerMove, { passive: true });
    section.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [interactiveBackground]);

  return (
    <section ref={sectionRef} className={`hero-section ${interactiveBackground ? 'hero-section--interactive' : 'hero-section--lite'}`}>
      <motion.div
        className="hero-background"
      >
        <div className="hero-fluid-layer" aria-hidden="true"></div>
        {interactiveBackground && <div className="hero-cursor-blob" aria-hidden="true"></div>}
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </motion.div>

      <div className="hero-content">
        <motion.div
          className="hero-text-wrapper"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-badge glass-panel"
          >
            <span className="badge-dot" /> Coming Soon!
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-title"
          >
            Your Work. <span className="text-gradient-accent">Handled.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-meet-line"
          >
            Meet Your New Teammates!
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-subtitle"
          >
            No follow-ups. No delays. Just progress.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-typing"
          >
            Hire a Teammate to <span className="typing-word text-gradient-accent">{typedWord}</span><span className="typing-cursor">|</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="hero-cta-row"
          >
            <button className="hero-btn hero-btn--primary">
              Get Your First Teammate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </button>
            <button className="hero-btn hero-btn--ghost">
              Watch It Work
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="scroll-indicator"
      >
        <div className="mouse-icon">
          <div className="mouse-wheel"></div>
        </div>
        <span className="scroll-text">Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;
