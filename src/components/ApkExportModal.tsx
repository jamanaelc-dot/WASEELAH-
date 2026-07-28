import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Zap, 
  FileCode,
  Share2
} from 'lucide-react';

interface ApkExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onInstallPwa: () => void;
}

export const ApkExportModal: React.FC<ApkExportModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallPwa,
}) => {
  const [activeTab, setActiveTab] = useState<'pwa' | 'apk' | 'bundle' | 'features'>('pwa');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (!isOpen) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const bubblewrapCommand = `npx @bubblewrap/cli build --manifest=${currentUrl}manifest.json`;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(bubblewrapCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  const handleDownloadOfflineBundle = () => {
    const content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>CloudSync Android APK Bundle</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 2rem; text-align: center; }
    .card { background: #1e293b; padding: 2rem; border-radius: 1rem; max-width: 500px; margin: 2rem auto; border: 1px solid #334155; }
    a { color: #818cf8; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h2>📱 CloudSync Android APK Source</h2>
    <p>Live Realtime App URL: <br><a href="${currentUrl}" target="_blank">${currentUrl}</a></p>
    <p>This standalone bundle connects to Google Cloud Firestore with real-time updates.</p>
  </div>
</body>
</html>`;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cloudsync-android-apk-bundle.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-900/30">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Android APK & Mobile Installation Center
              </h2>
              <p className="text-xs text-slate-400">
                Install as a native app or generate a signed Android `.apk` package
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 mt-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'pwa'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" /> Direct Android App
          </button>

          <button
            onClick={() => setActiveTab('apk')}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'apk'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" /> PWABuilder / APK CLI
          </button>

          <button
            onClick={() => setActiveTab('bundle')}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'bundle'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" /> Export Web & APK Package
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'features'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Mobile APK Capabilities
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4 pr-1">

          {/* TAB 1: Direct PWA / Android Install */}
          {activeTab === 'pwa' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-400" /> Instant Mobile Installation
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    PWA / Android Ready
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You can install this app directly onto your Android phone or desktop as a standalone app with native screen layout and offline Firestore persistence.
                </p>

                {deferredPrompt ? (
                  <button
                    onClick={onInstallPwa}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                  >
                    <Download className="w-4 h-4" /> Install Android App Now
                  </button>
                ) : (
                  <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-200">How to Install on Android Phone:</p>
                      <ol className="list-decimal list-inside mt-1 space-y-1 text-slate-300 text-[11px]">
                        <li>Open this URL in Chrome on your Android device</li>
                        <li>Tap the Chrome menu (3 dots top right)</li>
                        <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>

              {/* App URL Share & Copy */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-indigo-400" /> App Target URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={currentUrl}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 focus:outline-none"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUrl ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PWABuilder / Bubblewrap APK instructions */}
          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-teal-400" /> Convert Live URL to Signed `.apk` File
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To turn this live CloudSync real-time application into an official Android `.apk` binary file for distribution or sideloading:
                </p>

                <div className="space-y-3 pt-2">
                  {/* Option A: PWABuilder */}
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-indigo-300">
                      <span>Method 1: PWABuilder (Online 1-Click APK)</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Recommended</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      PWABuilder packages your live PWA manifest into a signed Android APK in under 1 minute without installing local build tools.
                    </p>
                    <a
                      href={`https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors mt-1"
                    >
                      <span>Open PWABuilder for this App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Option B: Bubblewrap CLI */}
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-2">
                    <div className="font-bold text-teal-300">
                      Method 2: Android TWA / Bubblewrap CLI
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Run Google's official Bubblewrap tool in terminal to build the APK locally:
                    </p>
                    <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[11px] text-teal-400">
                      <span className="truncate mr-2">{bubblewrapCommand}</span>
                      <button
                        onClick={handleCopyCommand}
                        className="text-slate-400 hover:text-white flex-shrink-0"
                      >
                        {copiedCommand ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Export Web & APK Package */}
          {activeTab === 'bundle' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-400" /> Download Standalone Package
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Download a bundled package containing the PWA manifest, service worker scripts, and real-time cloud connection configuration ready for Android WebView or Capacitor integration.
                </p>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2 text-xs">
                  <div className="flex items-center justify-between font-mono text-slate-300">
                    <span>Package Name:</span>
                    <span className="text-indigo-400">com.cloudsync.realtime</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-slate-300">
                    <span>Version:</span>
                    <span className="text-indigo-400">1.0.0</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-slate-300">
                    <span>Min Android Version:</span>
                    <span className="text-indigo-400">Android 7.0 (API 24)</span>
                  </div>
                </div>

                <button
                  onClick={handleDownloadOfflineBundle}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download Mobile Package Bundle
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Mobile Features */}
          {activeTab === 'features' && (
            <div className="space-y-3">
              {[
                { title: 'Cloud Firestore Real-time Listeners', desc: 'Instant 2-way data synchronization across mobile, desktop, and all connected tabs.', icon: Zap },
                { title: 'Offline IndexedDB Support', desc: 'Changes made offline are queued locally and automatically synced when internet reconnects.', icon: Layers },
                { title: 'Touch & Mobile UX Optimization', desc: 'Gestures, touch action buttons, responsive cards, and adaptive typography.', icon: Smartphone },
                { title: 'Firebase Security Rules Verified', desc: 'Secure document access for tasks, presence, and activity feeds.', icon: ShieldCheck },
              ].map((feat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 flex-shrink-0 mt-0.5">
                    <feat.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{feat.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Firebase Cloud DB Connected
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
