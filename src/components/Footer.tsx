import React from 'react';
import { Mail, MessageCircle, MapPin, Shield, Headphones } from 'lucide-react';
import { useCMS } from '../lib/cmsContext';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { siteSettings, adminUser } = useCMS();

  return (
    <footer className="bg-[#064E3B] text-emerald-100/90 border-t border-emerald-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Column 1: Brand Wordmark & Lead Trainer (4 cols) */}
          <div className="md:col-span-5 space-y-2.5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {siteSettings.brand_name || 'CHURCH MEDIA ACADEMY'}
              </h3>
              <p className="text-[10px] sm:text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                {siteSettings.tagline || 'Equipping the Church. Empowering the Media.'}
              </p>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-sm">
              Hands-on media, sound, and digital training for church media teams across Nigeria.
            </p>
            <p className="text-[11px] text-emerald-200/90 pt-1">
              <span className="text-emerald-300 font-semibold">Lead Trainer:</span> {siteSettings.founder_name || 'Timi Ani'}
            </p>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-emerald-100/80">
              <button
                onClick={() => navigate('/')}
                className="hover:text-white transition-colors text-left text-[11px]"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/training-sessions')}
                className="hover:text-white transition-colors text-left text-[11px]"
              >
                Training
              </button>
              <button
                onClick={() => navigate('/about')}
                className="hover:text-white transition-colors text-left text-[11px]"
              >
                About
              </button>
              <button
                onClick={() => navigate('/services')}
                className="hover:text-white transition-colors text-left text-[11px]"
              >
                Services
              </button>
              <button
                onClick={() => navigate('/podcasts')}
                className="hover:text-white transition-colors text-left text-[11px] flex items-center gap-1 font-semibold text-emerald-300"
              >
                <Headphones className="w-3 h-3 text-emerald-300" />
                <span>Podcast</span>
              </button>
              <button
                onClick={() => navigate('/gallery')}
                className="hover:text-white transition-colors text-left text-[11px]"
              >
                Gallery
              </button>
              <button
                onClick={() => navigate('/book-training')}
                className="hover:text-white transition-colors text-left text-[11px]"
              >
                Book
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="hover:text-white transition-colors text-left text-[11px]"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Column 3: Contact Channels & Direct Action (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">
              Get In Touch
            </h4>
            <div className="space-y-1.5 text-xs text-emerald-100/80">
              <a
                href={siteSettings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors text-[11px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>WhatsApp: {siteSettings.phone}</span>
              </a>

              <a
                href={`mailto:${siteSettings.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors text-[11px] truncate"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span className="truncate">{siteSettings.email}</span>
              </a>

              <div className="flex items-center gap-2 text-emerald-200/80 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>{siteSettings.location}</span>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => navigate('/book-training')}
                className="py-1.5 px-3.5 text-[11px] font-bold rounded-lg bg-emerald-400 hover:bg-emerald-300 text-[#064E3B] transition-colors shadow-2xs"
              >
                Request Church Training
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & admin portal */}
        <div className="mt-8 pt-4 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-emerald-200/70">
          <p>
            © {new Date().getFullYear()} Church Media Academy. Equipping church media teams with excellence.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(adminUser ? '/admin/dashboard' : '/admin/login')}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
