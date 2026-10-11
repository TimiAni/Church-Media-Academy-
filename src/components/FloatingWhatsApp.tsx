import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useCMS } from '../lib/cmsContext';

export const FloatingWhatsApp: React.FC = () => {
  const { siteSettings } = useCMS();
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMessage = encodeURIComponent(
    'Hello Church Media Academy! I would like to enquire about church media training and services for our ministry.'
  );
  const targetUrl = `${siteSettings.whatsapp_url}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-5 sm:right-5 z-30 flex items-center flex-col items-end">
      {/* Tooltip notice */}
      {showTooltip && (
        <div className="mb-2 bg-white/95 backdrop-blur-md text-slate-800 p-2.5 rounded-xl shadow-lg border border-slate-200 max-w-xs text-[11px] animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold text-[#064e3b]">Chat with Timi Ani</p>
              <p className="text-slate-600 mt-0.5 leading-snug">
                Questions about audio, livestream, or team training? Tap to chat.
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp Button - Smaller, compact, elegant styling per user request */}
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-xs"
        aria-label="Chat with Church Media Academy on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 fill-white text-white shrink-0" />
        <span className="text-[11px] font-semibold pr-0.5 whitespace-nowrap">
          WhatsApp
        </span>
      </a>
    </div>
  );
};
