import React, { useEffect } from 'react';
import {
  X,
  Home,
  Info,
  GraduationCap,
  Layers,
  Headphones,
  Image,
  HelpCircle,
  Mail,
  Calendar,
  MessageCircle,
  Shield,
  ChevronRight
} from 'lucide-react';
import { useCMS } from '../lib/cmsContext';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: string;
  navigate: (route: string) => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  currentRoute,
  navigate
}) => {
  const { siteSettings, adminUser } = useCMS();

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = (path: string) => {
    navigate(path);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      label: 'Home',
      path: '/',
      icon: <Home className="w-4 h-4 text-emerald-600" />,
      desc: 'Academy overview & training tracks'
    },
    {
      label: 'About Us',
      path: '/about',
      icon: <Info className="w-4 h-4 text-emerald-600" />,
      desc: 'Our calling, mission & Timi Ani profile'
    },
    {
      label: 'Training Programmes',
      path: '/training-sessions',
      icon: <GraduationCap className="w-4 h-4 text-teal-600" />,
      desc: '8 hands-on practical syllabi'
    },
    {
      label: 'Church Services',
      path: '/services',
      icon: <Layers className="w-4 h-4 text-emerald-700" />,
      desc: 'Audio, broadcast & media consulting'
    },
    {
      label: 'Podcasts',
      path: '/podcasts',
      icon: <Headphones className="w-4 h-4 text-cyan-600" />,
      desc: 'Practical audio & video podcast sessions'
    },
    {
      label: 'Photo Gallery',
      path: '/gallery',
      icon: <Image className="w-4 h-4 text-amber-600" />,
      desc: 'Past training workshops & event photos'
    },
    {
      label: 'Book Training',
      path: '/book-training',
      icon: <Calendar className="w-4 h-4 text-emerald-600" />,
      desc: 'Schedule on-site church training'
    },
    {
      label: 'FAQ',
      path: '/faq',
      icon: <HelpCircle className="w-4 h-4 text-teal-600" />,
      desc: 'Answers to common questions & bookings'
    },
    {
      label: 'Contact Us',
      path: '/contact',
      icon: <Mail className="w-4 h-4 text-emerald-600" />,
      desc: 'Reach out, direct enquiry & details'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        aria-label="Close navigation overlay"
      />

      {/* Slide-out drawer panel */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="bg-[#064E3B] text-white p-4.5 sm:p-5 flex items-center justify-between border-b border-emerald-900/60 shadow-sm">
          <div className="min-w-0 pr-3">
            <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-white truncate">
              {siteSettings.brand_name || 'CHURCH MEDIA ACADEMY'}
            </h2>
            <p className="text-[10px] font-medium text-emerald-200/90 uppercase tracking-wide truncate">
              Equipping the Church · Empowering the Media
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Strip */}
        <div className="p-3 bg-emerald-50/70 border-b border-emerald-100 flex gap-2">
          <button
            onClick={() => handleLinkClick('/book-training')}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold text-center shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Training</span>
          </button>
          <a
            href={siteSettings.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold text-center shadow-xs transition-colors flex items-center justify-center gap-1.5 shrink-0"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>

        {/* Navigation items list */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-1.5 divide-y divide-slate-100">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 pt-1 pb-1">
              All Academy Pages
            </p>
            {navItems.map(item => {
              const isActive = currentRoute === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-emerald-500/15 border border-emerald-200 text-[#064E3B] font-bold shadow-2xs'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-[#064E3B] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-700'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-bold truncate ${
                          isActive ? 'text-[#064E3B]' : 'text-slate-800'
                        }`}
                      >
                        {item.label}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive
                        ? 'text-emerald-700 translate-x-0.5'
                        : 'text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Contact & Admin Strip in Drawer */}
          <div className="pt-3 space-y-2">
            <a
              href={siteSettings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (+234 703 218 7266)</span>
            </a>

            <button
              onClick={() => handleLinkClick(adminUser ? '/admin/dashboard' : '/admin/login')}
              className="w-full p-2 rounded-xl text-[11px] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>{adminUser ? 'Open Admin Dashboard' : 'Administrator Portal Login'}</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-[10px] text-slate-500">
            Church Media Academy · Nigeria
          </p>
        </div>
      </div>
    </div>
  );
};
