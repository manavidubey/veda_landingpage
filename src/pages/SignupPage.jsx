import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase';
import { getFirebaseAuthMessage } from '../lib/firebaseError';
import './Auth.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!acceptedTerms) {
      setError('Please accept the Terms and Privacy Policy.');
      return;
    }

    try {
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (fullName.trim()) {
        await updateProfile(credential.user, { displayName: fullName.trim() });
      }
      navigate('/');
    } catch (err) {
      setError(getFirebaseAuthMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');

    if (!isFirebaseConfigured) {
      setError('Firebase config missing. Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_APP_ID in .env.');
      return;
    }

    try {
      setGoogleLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate('/');
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
          <h1>Make your first smartest hire in minutes.</h1>
          <p>Create your workspace and get the right teammates and employees for your exact workload.</p>
          <div className="auth-points">
            <div className="auth-point"><span className="auth-point-dot" /> Role-matched teammates from day one</div>
            <div className="auth-point"><span className="auth-point-dot" /> Never OOO, always available</div>
            <div className="auth-point"><span className="auth-point-dot" /> Start delegating in under 2 minutes</div>
            <div className="auth-point"><span className="auth-point-dot" /> High-quality output by default</div>
          </div>
        </motion.aside>

        <motion.section
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2>Create account</h2>
          <p className="auth-card-sub">Set up your workspace and onboard your first teammate.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Full name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div className="auth-field">
              <label>Work email</label>
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="auth-field">
              <label>Confirm password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            <label className="auth-check">
              <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
              <span>I agree to the Terms and Privacy Policy</span>
            </label>

            {error && <p className="auth-error">{error}</p>}
            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button className="auth-google-btn" type="button" onClick={handleGoogleSignup} disabled={googleLoading}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.2-1.4 3.6-5.4 3.6-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.6 3.2 14.5 2.3 12 2.3A9.7 9.7 0 0 0 2.3 12 9.7 9.7 0 0 0 12 21.7c5.6 0 9.3-3.9 9.3-9.4 0-.6-.1-1.1-.1-1.5z"/>
              </svg>
              {googleLoading ? 'Connecting...' : 'Continue with Google'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default SignupPage;
