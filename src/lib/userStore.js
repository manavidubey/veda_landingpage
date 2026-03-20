import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const USERS_COLLECTION = 'users';

export const ensureUserProfile = async (user, overrides = {}) => {
  if (!user?.uid) return;

  const userRef = doc(db, USERS_COLLECTION, user.uid);
  const snapshot = await getDoc(userRef);

  const profilePayload = {
    fullName: overrides.fullName || user.displayName || '',
    email: user.email || overrides.email || '',
    photoURL: user.photoURL || '',
    provider: user.providerData?.[0]?.providerId || 'password',
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
    ...overrides,
  };

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      ...profilePayload,
      createdAt: serverTimestamp(),
    });
    return;
  }

  await updateDoc(userRef, profilePayload);
};

export const subscribeUserProfile = (uid, onData, onError) => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  return onSnapshot(
    userRef,
    (snapshot) => {
      onData(snapshot.exists() ? snapshot.data() : null);
    },
    (error) => {
      if (onError) onError(error);
    }
  );
};

export const subscribeUserTasks = (uid, onData, onError) => {
  const tasksQuery = query(
    collection(db, USERS_COLLECTION, uid, 'tasks'),
    orderBy('updatedAt', 'desc'),
    limit(50)
  );
  return onSnapshot(
    tasksQuery,
    (snapshot) => {
      onData(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    },
    (error) => {
      if (onError) onError(error);
    }
  );
};

export const subscribeUserOutputs = (uid, onData, onError) => {
  const outputsQuery = query(
    collection(db, USERS_COLLECTION, uid, 'outputs'),
    orderBy('updatedAt', 'desc'),
    limit(50)
  );
  return onSnapshot(
    outputsQuery,
    (snapshot) => {
      onData(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    },
    (error) => {
      if (onError) onError(error);
    }
  );
};

export const subscribeUserNotifyRequests = (uid, onData, onError) => {
  const notifyQuery = query(
    collection(db, USERS_COLLECTION, uid, 'notifyRequests'),
    orderBy('updatedAt', 'desc'),
    limit(100)
  );
  return onSnapshot(
    notifyQuery,
    (snapshot) => {
      onData(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    },
    (error) => {
      if (onError) onError(error);
    }
  );
};

export const saveNotifyRequest = async (uid, slug, payload) => {
  if (!uid || !slug) return;
  const notifyRef = doc(db, USERS_COLLECTION, uid, 'notifyRequests', slug);
  await setDoc(
    notifyRef,
    {
      slug,
      ...payload,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
};
