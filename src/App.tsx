import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMS } from './lib/cmsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileNavDrawer } from './components/MobileNavDrawer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { TrainingSessions } from './pages/TrainingSessions';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { BookTraining } from './pages/BookTraining';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Podcasts } from './pages/Podcasts';
import { MovingLinesBackground } from './components/MovingLinesBackground';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { adminUser } = useCMS();

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
      setIsMobileMenuOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setIsMobileMenuOpen(false);
    if (path !== currentRoute) {
      window.history.pushState({}, '', path);
      setCurrentRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route protection for Admin Dashboard
  const isDashboardRoute = currentRoute === '/admin/dashboard';

  // If trying to access dashboard while not authenticated, redirect to login
  if (isDashboardRoute && !adminUser) {
    return <AdminLogin navigate={navigate} />;
  }

  // Render view based on route
  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <Home navigate={navigate} />;
      case '/about':
        return <About navigate={navigate} />;
      case '/training-sessions':
        return (
          <TrainingSessions
            navigate={navigate}
            onSelectTopicForBooking={topic => setSelectedTopic(topic)}
          />
        );
      case '/services':
        return (
          <Services
            navigate={navigate}
            onSelectServiceForBooking={svc => setSelectedTopic(svc)}
          />
        );
      case '/podcasts':
        return <Podcasts navigate={navigate} />;
      case '/gallery':
        return <Gallery navigate={navigate} />;
      case '/book-training':
        return (
          <BookTraining
            navigate={navigate}
            preselectedTopic={selectedTopic}
          />
        );
      case '/contact':
        return <Contact navigate={navigate} />;
      case '/faq':
        return <FAQ navigate={navigate} />;
      case '/admin/login':
        return <AdminLogin navigate={navigate} />;
      case '/admin/dashboard':
        return <AdminDashboard navigate={navigate} />;
      default:
        // Handle 404 or unknown sub-paths gracefully by rendering Home
        return <Home navigate={navigate} />;
    }
  };

  const isPublicRoute = currentRoute !== '/admin/dashboard';

  return (
    <div className="relative min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Moving lines background */}
      <MovingLinesBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Show public header on non-dashboard routes */}
        {isPublicRoute && (
          <Header
            currentRoute={currentRoute}
            navigate={navigate}
            isMobileMenuOpen={isMobileMenuOpen}
            onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        )}

        {/* Mobile slide-over navigation drawer for all pages */}
        {isPublicRoute && (
          <MobileNavDrawer
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            currentRoute={currentRoute}
            navigate={navigate}
          />
        )}

        {/* Main page content with padding on mobile for sticky bottom navigation */}
        <main className={`flex-1 ${isPublicRoute ? 'pb-16 lg:pb-0' : ''}`}>
          {renderPage()}
        </main>

        {/* Show public footer on non-dashboard routes */}
        {isPublicRoute && <Footer navigate={navigate} />}

        {/* Floating WhatsApp button on public routes (offset for mobile bottom bar) */}
        {isPublicRoute && <FloatingWhatsApp />}

        {/* Mobile sticky bottom navigation bar for direct 1-tap navigation */}
        {isPublicRoute && (
          <MobileBottomNav
            currentRoute={currentRoute}
            navigate={navigate}
            onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            isMenuOpen={isMobileMenuOpen}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}
