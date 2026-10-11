import React from 'react';
import { Menu, X, MessageCircle, Shield } from 'lucide-react';
import { useCMS } from '../lib/cmsContext';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  navigate,
  isMobileMenuOpen = false,
  onToggleMobileMenu
}) => {
  const { siteSettings, adminUser } = useCMS();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Training', path: '/training-sessions' },
    { label: 'Services', path: '/services' },
    { label: 'Podcast', path: '/podcasts' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#064E3B] text-white border-b border-emerald-900/60 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-15 sm:h-18">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNav('/')}
            className="flex flex-col items-start text-left focus:outline-none group shrink-0 min-w-0"
            aria-label="Church Media Academy Home"
          >
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white group-hover:text-emerald-200 transition-colors truncate max-w-[190px] sm:max-w-none">
              {siteSettings.brand_name || 'CHURCH MEDIA ACADEMY'}
            </span>
            <span className="text-[9px] sm:text-[10px] font-medium text-emerald-200/90 tracking-wide uppercase whitespace-nowrap hidden sm:inline">
              Equipping the Church · Empowering the Media
            </span>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-emerald-100">
            {navLinks.map(link => {
              const isActive = currentRoute === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`whitespace-nowrap transition-colors relative py-1 focus:outline-none ${
                    isActive
                      ? 'text-emerald-300 font-semibold'
                      : 'hover:text-white text-emerald-100/90'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-300 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Admin & Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Direct WhatsApp link (Desktop / Tablet) */}
            <a
              href={siteSettings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white transition-all shadow-xs hover:shadow-sm whitespace-nowrap border border-emerald-600/70"
              title="Chat with Timi Ani on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNav('/book-training')}
              className="px-2.5 sm:px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-400 hover:bg-emerald-300 text-[#064E3B] shadow-xs hover:shadow-sm transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-300 active:scale-95"
            >
              <span className="sm:inline hidden">Book Training</span>
              <span className="inline sm:hidden">Book</span>
            </button>

            {/* Admin Portal Indicator Button (Desktop / Tablet) */}
            <button
              onClick={() => handleNav(adminUser ? '/admin/dashboard' : '/admin/login')}
              className="hidden sm:inline-flex p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
              title={adminUser ? 'Admin Dashboard' : 'Admin Login'}
              aria-label="Admin Portal"
            >
              <Shield className={`w-4 h-4 ${adminUser ? 'text-emerald-300' : 'text-emerald-200/70'}`} />
            </button>

            {/* Mobile Menu Toggle Button (Prominent, High-Contrast & Clearly Labeled) */}
            <button
              onClick={onToggleMobileMenu}
              className={`lg:hidden flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all active:scale-95 focus:outline-none shadow-xs ${
                isMobileMenuOpen
                  ? 'bg-emerald-700 text-white border-emerald-400/80 ring-2 ring-emerald-300/40'
                  : 'bg-emerald-800/90 hover:bg-emerald-700 text-white border-emerald-600/70 hover:border-emerald-400'
              }`}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-emerald-200" />
                  <span className="text-[11px] font-bold">Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-emerald-300" />
                  <span className="text-[11px] font-bold">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
