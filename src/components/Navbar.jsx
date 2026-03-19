import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 60;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
    >
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <img src="/logo_nobg.png" alt="Veda logo" className="logo-mark-img" />
          <span className="logo-text">VEDA</span>
        </a>

        <div className="navbar-links">
          <a href="#workers">Workers</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#showcase">Product</a>
        </div>

        <button className="navbar-cta">
          Get Started
        </button>

        <button className="navbar-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="navbar-mobile"
          >
            <a href="#workers" onClick={() => setMobileOpen(false)}>Workers</a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</a>
            <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#showcase" onClick={() => setMobileOpen(false)}>Product</a>
            <button className="navbar-cta mobile-cta">Get Started</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
