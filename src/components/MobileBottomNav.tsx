import React from 'react';
import { Home, GraduationCap, Layers, Headphones, Menu, X } from 'lucide-react';

interface MobileBottomNavProps {
  currentRoute: string;
  navigate: (route: string) => void;
  onToggleMenu: () => void;
  isMenuOpen: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRoute,
  navigate,
  onToggleMenu,
  isMenuOpen
}) => {
  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      label: 'Home',
      path: '/',
      icon: <Home className="w-5 h-5" />
    },
    {
      label: 'Training',
      path: '/training-sessions',
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      label: 'Services',
      path: '/services',
      icon: <Layers className="w-5 h-5" />
    },
    {
      label: 'Podcasts',
      path: '/podcasts',
      icon: <Headphones className="w-5 h-5" />,
      badge: 'New'
    }
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1 select-none"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map(item => {
          const isActive = currentRoute === item.path && !isMenuOpen;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all relative min-w-[58px] touch-manipulation focus:outline-none ${
                isActive
                  ? 'text-[#064E3B] font-bold'
                  : 'text-slate-500 hover:text-slate-900 active:text-[#064E3B]'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors relative ${
                  isActive ? 'bg-emerald-100/90 text-[#064E3B]' : ''
                }`}
              >
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 px-1 py-0.2 bg-emerald-600 text-[8px] font-bold text-white rounded-full leading-tight">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#064E3B] mt-0.5" />
              )}
            </button>
          );
        })}

        {/* Menu toggle button */}
        <button
          onClick={onToggleMenu}
          className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all relative min-w-[58px] touch-manipulation focus:outline-none ${
            isMenuOpen
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          aria-label={isMenuOpen ? 'Close navigation drawer' : 'Open full navigation menu'}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              isMenuOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100/80 text-slate-700'
            }`}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">
            {isMenuOpen ? 'Close' : 'Menu'}
          </span>
          {isMenuOpen && (
            <span className="w-1 h-1 rounded-full bg-emerald-600 mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};
