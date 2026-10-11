import React from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  User
} from 'lucide-react';
import { useCMS } from '../lib/cmsContext';

interface ContactProps {
  navigate: (route: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ navigate }) => {
  const { siteSettings } = useCMS();

  return (
    <div className="space-y-10 sm:space-y-14 py-8 sm:py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm text-[#064E3B] rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden border border-emerald-100 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-2.5">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 inline-block">
              Direct Communication
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#064E3B] leading-snug">
              Contact <span className="shimmer-text">Church Media Academy</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              We are ready to assist your church with technical training, live broadcast setup, and media ministry guidance. Reach out directly below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Official Contact Cards */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          {/* Identity Block */}
          <div className="border-b border-slate-100 pb-6 space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Academy Information</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#064E3B]">
              {siteSettings.brand_name || 'CHURCH MEDIA ACADEMY'}
            </h2>
            <div className="pt-1 text-xs text-slate-600 space-y-1">
              <p className="flex items-center gap-2 text-slate-800 font-medium">
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span>Founder & Lead Trainer: <strong>{siteSettings.founder_name}</strong> (Timi Ani)</span>
              </p>
              <p className="text-[11px] text-slate-500">
                {siteSettings.founder_title}
              </p>
              <p className="flex items-center gap-2 text-slate-700 pt-0.5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Location: <strong>{siteSettings.location}</strong> (Serving Worldwide)</span>
              </p>
            </div>
          </div>

          {/* Action Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Channel 1: WhatsApp */}
            <div className="bg-emerald-50/70 rounded-xl border border-emerald-100 p-5 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-[#064E3B] text-sm">WhatsApp</h3>
                <p className="text-[11px] text-slate-600">
                  Direct message line for immediate inquiries and workshop dates.
                </p>
                <p className="text-xs font-mono font-bold text-emerald-800 pt-0.5">
                  {siteSettings.phone}
                </p>
              </div>

              <a
                href={siteSettings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 text-xs font-bold text-center rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                CHAT ON WHATSAPP
              </a>
            </div>

            {/* Channel 2: Email */}
            <div className="bg-emerald-50/40 rounded-xl border border-emerald-100 p-5 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-[#064E3B] text-sm">Official Email</h3>
                <p className="text-[11px] text-slate-600">
                  Formal invitations and organizational training requests.
                </p>
                <p className="text-[10px] font-mono text-emerald-900 font-semibold pt-0.5 break-all">
                  {siteSettings.email}
                </p>
              </div>

              <a
                href={`mailto:${siteSettings.email}`}
                className="w-full py-2 px-3 text-xs font-bold text-center rounded-lg bg-[#064E3B] hover:bg-[#047857] text-white transition-colors"
              >
                SEND AN EMAIL
              </a>
            </div>

            {/* Channel 3: Book Training */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-700">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Online Booking</h3>
                <p className="text-[11px] text-slate-600">
                  Provide equipment details and request your custom workshop.
                </p>
                <p className="text-[10px] text-slate-500 pt-0.5">
                  Includes WhatsApp summary
                </p>
              </div>

              <button
                onClick={() => navigate('/book-training')}
                className="w-full py-2 px-3 text-xs font-bold text-center rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                BOOK TRAINING
              </button>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[11px]">
              Church Media Academy treats all enquiries with ministerial discretion.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
