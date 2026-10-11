import React from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle,
  Radio,
  Tv,
  Palette,
  Users
} from 'lucide-react';
import { useCMS } from '../lib/cmsContext';
import { MediaFallbackCard } from '../components/MediaFallbackCard';

interface AboutProps {
  navigate: (route: string) => void;
}

export const About: React.FC<AboutProps> = ({ navigate }) => {
  const { siteSettings } = useCMS();

  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm text-[#064E3B] rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden border border-emerald-100 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-2.5">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 inline-block">
              Our Calling & Mission
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#064E3B] leading-snug">
              Equipping the Church. <span className="shimmer-text">Empowering the Media.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Church Media Academy is a specialized ministry-training initiative established to raise spiritually grounded, technically competent, and creative media teams.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-emerald-100 p-6 space-y-3 hover:shadow-xs transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-xs">
              01
            </div>
            <h3 className="text-base font-bold text-[#064E3B]">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {siteSettings.about_mission}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-emerald-100 p-6 space-y-3 hover:shadow-xs transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-xs">
              02
            </div>
            <h3 className="text-base font-bold text-[#064E3B]">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {siteSettings.about_vision}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-emerald-100 p-6 space-y-3 hover:shadow-xs transition-shadow">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-xs">
              03
            </div>
            <h3 className="text-base font-bold text-[#064E3B]">Our Philosophy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {siteSettings.about_philosophy}
            </p>
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Founder Visual */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-slate-900 max-w-sm mx-auto">
                <MediaFallbackCard
                  type="management"
                  title="Anifowose Timileyin Emmanuel"
                  subtitle="Timi Ani · Founder & Lead Trainer"
                  aspect="1:1"
                />
                <div className="p-3 bg-white border-t border-slate-200">
                  <h4 className="font-bold text-[#064E3B] text-xs">
                    {siteSettings.founder_name}
                  </h4>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                    {siteSettings.founder_title}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>Based in Nigeria · Available Globally</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Bio Text */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Meet The Trainer
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#064E3B] tracking-tight">
                Anifowose Timileyin Emmanuel (Timi Ani)
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {siteSettings.founder_bio}
              </p>

              <div className="space-y-2 pt-1">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong>Practical Ministry Focus:</strong> Training tailored to realistic church volunteer dynamics and sanctuary equipment.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong>Accessible Teaching:</strong> Every technical principle is taught with clear, memorable applications.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong>Ongoing Mentorship:</strong> Continued guidance and encouragement for church teams post-training.
                  </p>
                </div>
              </div>

              {/* Smaller a tags */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={siteSettings.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Send an Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Church Media Matters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Biblical Excellence
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#064E3B]">
            Why Church Media Training Matters
          </h2>
          <p className="text-xs text-slate-600">
            Empowering technical stewards for unhindered transmission of the Word of God.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <Radio className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-[#064E3B] text-xs">Clarity Over Feedback</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Clean sanctuary audio ensures congregation members hear the Gospel without distraction.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <Tv className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-[#064E3B] text-xs">Global Digital Pulpit</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Your livestream is an open door for viewers worldwide seeking hope in Christ.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <Palette className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-[#064E3B] text-xs">Dignified Presentation</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Sermon series branding communicates intentionality and biblical stewardship.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <Users className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-[#064E3B] text-xs">Volunteer Confidence</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Trained teams operate with confidence rather than Sunday morning stress.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#059669] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Ready to bring Timi Ani to your assembly?
            </h3>
            <p className="text-xs text-emerald-100">
              Customized training bootcamps, equipment calibration, and team development.
            </p>
          </div>
          <button
            onClick={() => navigate('/book-training')}
            className="px-5 py-2.5 text-xs font-bold rounded-lg bg-white text-[#064E3B] hover:bg-emerald-50 whitespace-nowrap transition-colors shadow-2xs"
          >
            Book a Workshop
          </button>
        </div>
      </section>
    </div>
  );
};
