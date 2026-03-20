import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Narrative from './components/Narrative';
import Workers from './components/Workers';
import HowItWorks from './components/HowItWorks';
import DesktopMockup from './components/DesktopMockup';
import Features from './components/Features';
import Stats from './components/Stats';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployeeProfilePage from './pages/EmployeeProfilePage';
import DashboardPage from './pages/DashboardPage';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function HomePage() {
  const [isLoading, setIsLoading] = useState(() => !sessionStorage.getItem('veda-loaded'));
  const hasResizedRef = useRef(false);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
    if (!hasResizedRef.current) {
      hasResizedRef.current = true;
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  return (
    <div className="app-root">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen 
            key="loader" 
            onLoadingComplete={() => {
              sessionStorage.setItem('veda-loaded', '1');
              setIsLoading(false);
            }} 
          />
        )}
      </AnimatePresence>

      <main 
        className="app-main-content" 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: 'opacity 1s cubic-bezier(0.23, 1, 0.32, 1)',
          pointerEvents: isLoading ? 'none' : 'auto',
          position: 'relative'
        }}
      >
        <Navbar />
        <Hero />
        <Narrative />
        <Workers />
        <HowItWorks />
        <DesktopMockup />
        <Features />
        <Stats />
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/:tab" element={<DashboardPage />} />
            <Route path="/employees/:slug" element={<EmployeeProfilePage />} />
          </Routes>
        </MotionConfig>
      </LazyMotion>
    </BrowserRouter>
  );
}

export default App;
