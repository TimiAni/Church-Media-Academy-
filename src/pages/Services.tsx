import React from 'react';
import {
  Palette,
  Camera,
  Radio,
  Globe,
  Share2,
  Headphones,
  CheckCircle,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { useCMS } from '../lib/cmsContext';

interface ServicesProps {
  navigate: (route: string) => void;
  onSelectServiceForBooking?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({
  navigate,
  onSelectServiceForBooking
}) => {
  const { services, siteSettings } = useCMS();

  const publishedServices = services.filter(s => s.is_published);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-6 h-6 text-emerald-600" />;
      case 'Camera':
        return <Camera className="w-6 h-6 text-teal-600" />;
      case 'Radio':
        return <Radio className="w-6 h-6 text-emerald-600" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-teal-600" />;
      case 'Share2':
        return <Share2 className="w-6 h-6 text-emerald-600" />;
      default:
        return <Headphones className="w-6 h-6 text-emerald-600" />;
    }
  };

  const handleEnquireService = (title: string) => {
    if (onSelectServiceForBooking) {
      onSelectServiceForBooking(title);
    }
    navigate('/book-training');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10 sm:space-y-14 py-8 sm:py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm text-[#064E3B] rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden border border-emerald-100 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-2.5">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 inline-block">
              Agency & Technical Production
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#064E3B] leading-snug">
              Professional Church Media & <span className="shimmer-text">Creative Services</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Beyond training, Church Media Academy delivers turnkey creative design, conference livestream production, photography, and auditorium AV overhaul services.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {publishedServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-sm transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                    {getServiceIcon(service.icon_name)}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">
                    Professional Service
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#064E3B]">
                    {service.title}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {service.full_description || service.short_description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Key Deliverables:
                  </h4>
                  <div className="space-y-1.5">
                    {service.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleEnquireService(service.title)}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-[#064E3B] hover:bg-[#047857] text-white transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Enquire For Your Church</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`${siteSettings.whatsapp_url}?text=${encodeURIComponent(
                    `Hello Timi Ani, our ministry is interested in your "${service.title}" service.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Discuss on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Production Standard Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Broadcast Reliability
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#064E3B]">
              Special Church Conferences & Conventions
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Planning your annual convention or revival programme? Hire our specialized team for multi-camera video mixing, wireless audio, and livestream management.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={() => navigate('/book-training')}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-[#064E3B] hover:bg-[#047857] text-white text-center shadow-2xs"
            >
              Request Event Production
            </button>
            <a
              href={siteSettings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-center flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Timi Ani</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
