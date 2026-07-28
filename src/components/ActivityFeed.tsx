import React from 'react';
import { X, Activity as ActivityIcon, Clock, CheckCircle2, PlusCircle, Trash2, Edit3 } from 'lucide-react';
import { Activity } from '../types';

interface ActivityFeedProps {
  isOpen: boolean;
  onClose: () => void;
  activities: Activity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  isOpen,
  onClose,
  activities,
}) => {
  if (!isOpen) return null;

  const getActionIcon = (action: Activity['action']) => {
    switch (action) {
      case 'created':
        return <PlusCircle className="w-4 h-4 text-indigo-400" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'deleted':
        return <Trash2 className="w-4 h-4 text-rose-400" />;
      default:
        return <Edit3 className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h2 className="text-sm font-bold text-white">Live Cloud Activity Feed</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Activity Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activities.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No real-time events logged yet. Perform an action to see instant cloud synchronization!
            </div>
          ) : (
            activities.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                    {getActionIcon(act.action)}
                    <span className="capitalize text-slate-300">{act.userName}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] pl-5">
                  <span className="capitalize text-indigo-400 font-medium">{act.action}</span> "{act.itemTitle}"
                </p>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-[11px] text-slate-400 text-center font-mono">
          ⚡ Realtime Firestore Listener Active
        </div>

      </div>
    </div>
  );
};
