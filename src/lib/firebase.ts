import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp,
  enableIndexedDbPersistence
} from 'firebase/firestore';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged, 
  updateProfile,
  User 
} from 'firebase/auth';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { Task, Activity, PresenceUser } from '../types';

// Use AI Studio provisioned Firebase configuration with rules applied
const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

// Initialize App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with configured database ID
export const db = firebaseConfigJson.firestoreDatabaseId
  ? getFirestore(app, firebaseConfigJson.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Enable offline persistence
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence limited to one tab.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });
} catch (e) {
  console.warn('IndexedDB persistence setup skipped:', e);
}

// Collections references
export const tasksCollection = collection(db, 'tasks');
export const activitiesCollection = collection(db, 'activities');
export const presenceCollection = collection(db, 'presence');

// Helper functions for Tasks
export async function addTaskToCloud(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
  const newRef = doc(tasksCollection);
  const now = Date.now();
  const task: Task = {
    ...taskData,
    id: newRef.id,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(newRef, task);
  await logActivity('created', task.title, task.createdByName);
  return task;
}

export async function updateTaskInCloud(id: string, updates: Partial<Task>, userName: string) {
  const taskRef = doc(db, 'tasks', id);
  const updatePayload = {
    ...updates,
    updatedAt: Date.now(),
  };

  await updateDoc(taskRef, updatePayload);
  if (updates.title || updates.status) {
    const action = updates.status === 'completed' ? 'completed' : 'updated';
    await logActivity(action, updates.title || 'Task', userName);
  }
}

export async function deleteTaskFromCloud(id: string, itemTitle: string, userName: string) {
  const taskRef = doc(db, 'tasks', id);
  await deleteDoc(taskRef);
  await logActivity('deleted', itemTitle, userName);
}

export async function logActivity(action: Activity['action'], itemTitle: string, userName: string) {
  try {
    const actRef = doc(activitiesCollection);
    const activity: Activity = {
      id: actRef.id,
      action,
      itemTitle,
      userName,
      timestamp: Date.now(),
    };
    await setDoc(actRef, activity);
  } catch (e) {
    console.error('Failed to log activity:', e);
  }
}

export async function updatePresence(userId: string, userName: string, userAvatar: string) {
  try {
    const pRef = doc(db, 'presence', userId);
    const presenceData: PresenceUser = {
      id: userId,
      userName,
      userAvatar,
      lastSeen: Date.now(),
      status: 'online',
      device: window.navigator.userAgent.includes('Android') ? 'Android APK/Web' : 'Desktop / Web',
    };
    await setDoc(pRef, presenceData);
  } catch (e) {
    console.error('Failed to update presence:', e);
  }
}

export { signInAnonymously, onAuthStateChanged, updateProfile, onSnapshot, query, orderBy, limit };
