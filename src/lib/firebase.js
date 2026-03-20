import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBLYlE7NNeNV7-H4mKN7ekZG2GQ54JlZTY',
  authDomain: typeof window !== 'undefined' ? window.location.host : (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'veda-b2b38.firebaseapp.com'),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'veda-b2b38',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'veda-b2b38.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1001587333922',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1001587333922:web:4c75cd2b2439a9dbc0a37b',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-RE24EK0SFH',
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.appId);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export let analytics = null;
if (typeof window !== 'undefined') {
  isAnalyticsSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      analytics = null;
    });
}
