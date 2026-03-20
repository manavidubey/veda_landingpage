import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase';
import { getFirebaseAuthMessage } from '../lib/firebaseError';
import { ensureUserProfile } from '../lib/userStore';
import './Auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isFirebaseConfigured) {
      setError('Firebase config missing. Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_APP_ID in .env.');
      return;
    }

    try {
      setLoading(true);
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      await ensureUserProfile(credential.user);
      if (remember) {
        localStorage.setItem('veda-auth-remember', '1');
      } else {
        localStorage.removeItem('veda-auth-remember');
      }
      navigate('/dashboard');
    } catch (err) {
      setError(getFirebaseAuthMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');

    if (!isFirebaseConfigured) {
      setError('Firebase config missing. Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_APP_ID in .env.');
      return;
    }

    try {
      setGoogleLoading(true);
      const credential = await signInWithPopup(auth, googleProvider);
      await ensureUserProfile(credential.user);
      navigate('/dashboard');
    } catch (err) {
      if (err?.code === 'auth/popup-closed-by-user') return;
      setError(getFirebaseAuthMessage(err.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-grid-overlay" />
      <div className="auth-shell">
        <motion.aside
          className="auth-side"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link to="/" className="auth-brand">
            <img src="/logo_nobg.png" alt="Veda logo" />
            <span>VEDA</span>
          </Link>
          <h1>Welcome back. Your teammates already know what to do.</h1>
          <p>Sign in to continue with the right teammates and employees - never OOO, always in motion.</p>
          <div className="auth-points">
            <div className="auth-point"><span className="auth-point-dot" /> Pick up active work instantly</div>
            <div className="auth-point"><span className="auth-point-dot" /> See progress across every teammate</div>
            <div className="auth-point"><span className="auth-point-dot" /> Never OOO, always available</div>
            <div className="auth-point"><span className="auth-point-dot" /> Zero follow-up overhead</div>
          </div>
        </motion.aside>

        <motion.section
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2>Login</h2>
          <p className="auth-card-sub">Continue where your smartest hires left off.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="auth-row">
              <label className="auth-check">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span>Remember me</span>
              </label>
              <a className="auth-link" href="#">Forgot password?</a>
            </div>

            {error && <p className="auth-error">{error}</p>}
            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Login'}
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button className="auth-google-btn" type="button" onClick={handleGoogleLogin} disabled={googleLoading}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.2-1.4 3.6-5.4 3.6-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.6 3.2 14.5 2.3 12 2.3A9.7 9.7 0 0 0 2.3 12 9.7 9.7 0 0 0 12 21.7c5.6 0 9.3-3.9 9.3-9.4 0-.6-.1-1.1-.1-1.5z"/>
              </svg>
              {googleLoading ? 'Connecting...' : 'Continue with Google'}
            </button>
          </form>

          <p className="auth-switch">
            New to Veda? <Link to="/signup">Create an account</Link>
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default LoginPage;
