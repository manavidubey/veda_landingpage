import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [firstName, setFirstName] = useState('');

  const getFirstName = (user) => {
    const displayName = user?.displayName?.trim();
    if (displayName) {
      return displayName.split(/\s+/)[0];
    }

    const email = user?.email?.trim();
    if (email && email.includes('@')) {
      const localPart = email.split('@')[0] || '';
      const cleaned = localPart.split(/[._-]/)[0] || localPart;
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }

    return 'there';
  };

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 60;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirstName(getFirstName(user));
      } else {
        setFirstName('');
      }
    });

    return () => unsubscribe();
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

        {firstName ? (
          <div className="navbar-greeting">Hi, {firstName}</div>
        ) : (
          <div className="navbar-auth">
            <Link className="navbar-cta navbar-cta--ghost" to="/login">Login</Link>
            <Link className="navbar-cta" to="/signup">Sign Up</Link>
          </div>
        )}

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
            {firstName ? (
              <div className="navbar-greeting navbar-greeting--mobile">Hi, {firstName}</div>
            ) : (
              <div className="navbar-auth mobile-cta-row">
                <Link className="navbar-cta navbar-cta--ghost mobile-cta" to="/login">Login</Link>
                <Link className="navbar-cta mobile-cta" to="/signup">Sign Up</Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
