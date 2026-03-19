import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="loading-content">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: 1
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="loading-logo"
        >
          <img src="/logo_nobg.png" alt="Veda logo" className="loading-logo-img" />
          <h2 className="loading-logo-text">VEDA</h2>
        </motion.div>

        <div className="loading-bar-wrapper">
          <div className="loading-bar-bg">
            <motion.div
              className="loading-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="loading-status">
            <span>Getting Things ready for you ...</span>
            <span>{Math.min(percent, 100)}%</span>
          </div>
        </div>
      </div>

      <div className="loading-grid" />
    </motion.div>
  );
};

export default LoadingScreen;
