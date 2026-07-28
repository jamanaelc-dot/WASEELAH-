import React from 'react';
import { CloudCheck, RefreshCw, Layers, Radio, ExternalLink, ShieldCheck } from 'lucide-react';
import { SyncStats } from '../types';

interface RealtimeSyncBarProps {
  stats: SyncStats;
  onSimulateSync: () => void;
  onManualRefresh: () => void;
}

export const RealtimeSyncBar: React.FC<RealtimeSyncBarProps> = ({
  stats,
  onSimulateSync,
  onManualRefresh,
}) => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Real-time Cloud Metrics */}
        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Firestore Live Stream</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CloudCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Synced Record Count:</span>
            <span className="font-bold text-slate-200">{stats.totalSyncedTasks} items</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Latency:</span>
            <span className="font-mono font-medium text-cyan-300">{stats.latencyMs} ms</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400/80" />
            <span>Database:</span>
            <span className="font-mono text-[11px] text-slate-400">Cloud Firestore Realtime</span>
          </div>
        </div>

        {/* Right: Actions for Real-Time Sync Testing */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSimulateSync}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-900/40 hover:bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 hover:text-indigo-200 font-medium text-[11px] transition-colors"
            title="Open a second window to observe live updates synced instantly across both views"
          >
            <ExternalLink className="w-3 h-3 text-indigo-400" />
            <span>Test Multi-Device Sync</span>
          </button>

          <button
            onClick={onManualRefresh}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            title="Force refresh realtime snapshot"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
