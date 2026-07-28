import React from 'react';
import { Database, Smartphone, Users, Wifi, Download, Zap } from 'lucide-react';
import { PresenceUser } from '../types';

interface HeaderProps {
  isConnected: boolean;
  activeUsers: PresenceUser[];
  onOpenApkModal: () => void;
  currentUser: { name: string; avatar: string };
  onOpenActivityFeed: () => void;
  activityCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  isConnected,
  activeUsers,
  onOpenApkModal,
  currentUser,
  onOpenActivityFeed,
  activityCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Live Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Database className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight leading-none">CloudSync</h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Zap className="w-3 h-3 text-indigo-400 animate-pulse" /> Live DB
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
              <span className={isConnected ? 'text-emerald-400 font-medium' : 'text-amber-400'}>
                {isConnected ? 'Real-Time Cloud Connected' : 'Syncing Offline'}
              </span>
            </p>
          </div>
        </div>

        {/* Center/Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Live Online Users Avatars */}
          <div className="hidden md:flex items-center gap-1 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-full">
            <Users className="w-3.5 h-3.5 text-slate-400 mr-1" />
            <div className="flex -space-x-2 overflow-hidden">
              {activeUsers.slice(0, 4).map((user) => (
                <img
                  key={user.id}
                  src={user.userAvatar}
                  alt={user.userName}
                  title={`${user.userName} (${user.device})`}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 object-cover"
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-300 ml-1.5">
              {activeUsers.length} Online
            </span>
          </div>

          {/* Activity Stream Button */}
          <button
            onClick={onOpenActivityFeed}
            className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700/50"
            title="Real-time Activity Log"
          >
            <Wifi className="w-4 h-4 text-cyan-400" />
            {activityCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {activityCount > 9 ? '9+' : activityCount}
              </span>
            )}
          </button>

          {/* Download APK / Install App Button */}
          <button
            onClick={onOpenApkModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] border border-emerald-400/30"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Get Mobile APK</span>
            <span className="sm:hidden">APK</span>
            <Download className="w-3.5 h-3.5 opacity-80" />
          </button>

          {/* User Profile Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full border border-indigo-500/40 object-cover bg-slate-800"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-200 truncate max-w-[100px]">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Cloud User
              </div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
