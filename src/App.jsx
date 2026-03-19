import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
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
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
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
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
        <div className="app-root">
          <AnimatePresence mode="wait">
            {isLoading && (
              <LoadingScreen 
                key="loader" 
                onLoadingComplete={() => setIsLoading(false)} 
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
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
