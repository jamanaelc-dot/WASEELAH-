export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskCategory = 'work' | 'personal' | 'urgent' | 'feature' | 'general';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  assignedTo?: string;
  createdBy: string;
  createdByName: string;
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
  subtasks?: { id: string; title: string; completed: boolean }[];
}

export interface Activity {
  id: string;
  action: 'created' | 'updated' | 'completed' | 'deleted' | 'restored';
  itemTitle: string;
  userName: string;
  timestamp: number;
}

export interface PresenceUser {
  id: string;
  userName: string;
  userAvatar: string;
  lastSeen: number;
  status: 'online' | 'idle';
  device: string;
}

export interface SyncStats {
  isOnline: boolean;
  isFirebaseConnected: boolean;
  totalSyncedTasks: number;
  lastSyncTime: Date | null;
  latencyMs: number;
  activeUsersCount: number;
}
