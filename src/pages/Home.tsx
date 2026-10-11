import React from 'react';
import {
  ArrowRight,
  MessageCircle,
  Radio,
  Camera,
  Palette,
  MonitorPlay,
  Share2,
  Cpu,
  Users,
  Layers,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Award,
  Video,
  GraduationCap,
  Headphones
} from 'lucide-react';
import { useCMS } from '../lib/cmsContext';
import { MediaFallbackCard } from '../components/MediaFallbackCard';

interface HomeProps {
  navigate: (route: string) => void;
}

export const Home: React.FC<HomeProps> = ({ navigate }) => {
  const { siteSettings, trainingPrograms } = useCMS();

  // Concise list categories with icons & themes
  const getCategoryTheme = (index: number) => {
    switch (index) {
      case 0:
        return {
          icon: <Palette className="w-4 h-4 text-emerald-700" />,
          bg: 'bg-emerald-50 border-emerald-200/80',
          accent: 'text-emerald-700'
        };
      case 1:
        return {
          icon: <Camera className="w-4 h-4 text-teal-700" />,
          bg: 'bg-teal-50 border-teal-200/80',
          accent: 'text-teal-700'
        };
      case 2:
        return {
          icon: <Radio className="w-4 h-4 text-emerald-600" />,
          bg: 'bg-emerald-50 border-emerald-200/80',
          accent: 'text-emerald-600'
        };
      case 3:
        return {
          icon: <MonitorPlay className="w-4 h-4 text-amber-700" />,
          bg: 'bg-amber-50 border-amber-200/80',
          accent: 'text-amber-700'
        };
      case 4:
        return {
          icon: <Share2 className="w-4 h-4 text-cyan-700" />,
          bg: 'bg-cyan-50 border-cyan-200/80',
          accent: 'text-cyan-700'
        };
      case 5:
        return {
          icon: <Cpu className="w-4 h-4 text-emerald-700" />,
          bg: 'bg-emerald-50 border-emerald-200/80',
          accent: 'text-emerald-700'
        };
      case 6:
        return {
          icon: <Users className="w-4 h-4 text-teal-700" />,
          bg: 'bg-teal-50 border-teal-200/80',
          accent: 'text-teal-700'
        };
      default:
        return {
          icon: <Layers className="w-4 h-4 text-emerald-700" />,
          bg: 'bg-emerald-50 border-emerald-200/80',
          accent: 'text-emerald-700'
        };
    }
  };

  return (
    <div className="space-y-10 sm:space-y-12 py-3 sm:py-5">
      {/* =========================================================================
          SECTION A: HERO SECTION (Fully Editable in Admin Dashboard)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-md p-6 sm:p-9 lg:p-12 text-center">
          {/* Subtle soft green ambient wash */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5 relative z-10">
            {/* Centered Kicker Pill with small editable span */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/70 shadow-2xs mx-auto">
              <div className="flex items-end gap-0.5 h-2.5">
                <span className="w-0.5 bg-emerald-500 rounded-full animate-pulse h-1.5" />
                <span className="w-0.5 bg-emerald-600 rounded-full animate-bounce h-2.5" />
                <span className="w-0.5 bg-emerald-400 rounded-full animate-pulse h-2" />
                <span className="w-0.5 bg-emerald-500 rounded-full animate-bounce h-2" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#064E3B]">
                {siteSettings.hero_badge_text || 'Church Media Academy · Nigeria'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            {/* Centralized Headline in Forest Green */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#064E3B] leading-snug sm:leading-tight max-w-2xl mx-auto">
              {siteSettings.hero_headline || 'EMPOWERING CHURCHES THROUGH MEDIA, CREATIVITY & TECHNOLOGY.'}
            </h1>

            {/* Concise Supporting Subheading */}
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              {siteSettings.hero_subheading || 'Practical media training and digital technical skills for churches and Christian organizations.'}
            </p>

            {/* Centralized Action Buttons with smaller a tags and buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <button
                onClick={() => navigate('/training-sessions')}
                className="group relative overflow-hidden flow-light-beam px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#059669] hover:from-[#047857] hover:to-[#10b981] text-white shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 transform hover:-translate-y-0.5"
              >
                <span>{siteSettings.hero_cta_primary || 'EXPLORE TRAINING'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/book-training')}
                className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold rounded-xl bg-white hover:bg-emerald-50 text-[#064E3B] border border-emerald-300 transition-all shadow-2xs hover:shadow-sm transform hover:-translate-y-0.5"
              >
                {siteSettings.hero_cta_secondary || 'BOOK TRAINING'}
              </button>

              <a
                href={siteSettings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-4.5 py-2 sm:py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-2xs hover:shadow-sm transition-all flex items-center gap-1.5 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>

            {/* Concise Trust Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] text-slate-600">
              <div className="flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Hands-On Training</span>
              </div>
              <div className="flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>On Your Church Equipment</span>
              </div>
              <div className="flex items-center gap-1 font-medium">
                <Award className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Ministry Focused</span>
              </div>
            </div>

            {/* Centralized Media Card with Tech Flow Effect */}
            <div className="pt-4 max-w-xl mx-auto relative">
              <div className="absolute -top-2.5 -left-2 sm:-left-4 z-20 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border border-emerald-200 text-[10px] font-bold text-[#064E3B] flex items-center gap-1 animate-float">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>🎙️ Sound & Broadcast</span>
              </div>

              <div className="absolute -bottom-2.5 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border border-emerald-200 text-[10px] font-bold text-[#064E3B] flex items-center gap-1 animate-float-delayed">
                <Video className="w-3 h-3 text-emerald-600" />
                <span>📹 Live Production</span>
              </div>

              <div className="rounded-2xl overflow-hidden border border-emerald-200 shadow-md bg-slate-900 flow-light-beam">
                <MediaFallbackCard
                  type="audio"
                  title="Sanctuary Media & Broadcast Production"
                  subtitle="Equipping volunteer teams with live sound, switching, and graphics."
                  aspect="16:9"
                />

                <div className="p-3 bg-[#063c2e] border-t border-emerald-900 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-medium text-white text-[11px]">
                      Trainer: {siteSettings.founder_name.split(' ')[0] || 'Timi Ani'}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate('/about')}
                    className="text-emerald-300 hover:text-white font-semibold flex items-center gap-0.5 text-[10px]"
                  >
                    <span>Read Bio</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY STATS STRIP (Editable in Admin Dashboard)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-100 shadow-2xs text-center space-y-0.5">
            <span className="text-xl sm:text-2xl font-extrabold text-[#064E3B] font-mono tabular-nums">
              {siteSettings.stat_1_number || '50+'}
            </span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {siteSettings.stat_1_label || 'Churches Equipped'}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-100 shadow-2xs text-center space-y-0.5">
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
              {siteSettings.stat_2_number || '8'}
            </span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {siteSettings.stat_2_label || 'Training Tracks'}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-100 shadow-2xs text-center space-y-0.5">
            <span className="text-xl sm:text-2xl font-extrabold text-[#064E3B] font-mono tabular-nums">
              {siteSettings.stat_3_number || '100%'}
            </span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {siteSettings.stat_3_label || 'Hands-On Practical'}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-100 shadow-2xs text-center space-y-0.5">
            <span className="text-xl sm:text-2xl font-extrabold text-teal-700 font-mono tabular-nums">
              {siteSettings.stat_4_number || '30-Day'}
            </span>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {siteSettings.stat_4_label || 'Mentorship Follow-up'}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE QUICK PAGE NAVIGATION STRIP (Mobile friendly page jumpers)
      ========================================================================= */}
      <section className="sm:hidden max-w-7xl mx-auto px-4">
        <div className="bg-white/95 rounded-2xl border border-emerald-100 p-3.5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="text-[11px] font-bold text-[#064E3B] uppercase tracking-wider">
              Explore Academy Pages
            </h3>
            <span className="text-[10px] text-emerald-700 font-medium">Quick Access</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left">
            <button
              onClick={() => navigate('/training-sessions')}
              className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2 hover:bg-emerald-100/80 active:scale-98 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-[#064E3B] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#064E3B] truncate">Training</p>
                <p className="text-[9px] text-slate-500 truncate">8 Hands-on tracks</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/services')}
              className="p-2 rounded-xl bg-teal-50/70 border border-teal-100 flex items-center gap-2 hover:bg-teal-100/80 active:scale-98 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-teal-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-teal-900 truncate">Services</p>
                <p className="text-[9px] text-slate-500 truncate">Sanctuary consult</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/podcasts')}
              className="p-2 rounded-xl bg-cyan-50/70 border border-cyan-100 flex items-center gap-2 hover:bg-cyan-100/80 active:scale-98 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-cyan-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Headphones className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-cyan-900 truncate">Podcasts</p>
                <p className="text-[9px] text-slate-500 truncate">Listen to audio</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/about')}
              className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2 hover:bg-emerald-100/80 active:scale-98 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#064E3B] truncate">About</p>
                <p className="text-[9px] text-slate-500 truncate">Vision & Timi Ani</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/gallery')}
              className="p-2 rounded-xl bg-amber-50/70 border border-amber-100 flex items-center gap-2 hover:bg-amber-100/80 active:scale-98 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-700 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Camera className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-amber-900 truncate">Gallery</p>
                <p className="text-[9px] text-slate-500 truncate">Workshop photos</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2 hover:bg-emerald-100/80 active:scale-98 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#064E3B] truncate">Contact</p>
                <p className="text-[9px] text-slate-500 truncate">Direct WhatsApp</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION B: WHAT WE DO (Editable in Admin Dashboard)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-emerald-100 p-5 sm:p-8 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              {siteSettings.what_we_do_badge || 'Our Focus'}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#064E3B] tracking-tight">
              {siteSettings.what_we_do_title || 'What We Do'}
            </h2>
            <p className="text-xs text-slate-500">
              {siteSettings.what_we_do_subtitle || 'Practical, hands-on training tracks for church media departments:'}
            </p>
          </div>

          {/* Clean concise list layout (Briefly listed items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {trainingPrograms.slice(0, 8).map((program, idx) => {
              const theme = getCategoryTheme(idx);
              return (
                <div
                  key={program.id}
                  onClick={() => navigate('/training-sessions')}
                  className="bg-emerald-50/40 hover:bg-emerald-50/90 border border-emerald-100/90 hover:border-emerald-300 rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border shadow-2xs ${theme.bg}`}>
                      {theme.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-[#064E3B] truncate group-hover:text-emerald-700 transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 truncate">
                        Hands-on practical training
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </div>
              );
            })}
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => navigate('/training-sessions')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#047857] hover:to-[#059669] rounded-lg transition-all shadow-xs"
            >
              <span>View All Training Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION C: ABOUT THE FOUNDER (Editable in Admin Dashboard)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-xs rounded-2xl border border-emerald-100 p-5 sm:p-8 lg:p-10 shadow-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-4">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm max-w-xs mx-auto bg-slate-900 group">
                <MediaFallbackCard
                  type="management"
                  title={siteSettings.founder_name || 'Anifowose Timileyin Emmanuel'}
                  subtitle={siteSettings.founder_title || 'Founder & Lead Trainer'}
                  aspect="1:1"
                />
                <div className="p-3 bg-white border-t border-slate-100 text-center sm:text-left">
                  <p className="text-xs font-bold text-[#064E3B]">
                    {siteSettings.founder_name || 'Timi Ani'}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-0.5 line-clamp-1">
                    {siteSettings.founder_title || 'Founder & Lead Trainer | Church Media Educator'}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3 text-center sm:text-left">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 inline-block">
                {siteSettings.founder_section_badge || 'Founder & Lead Trainer'}
              </span>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#064E3B] tracking-tight">
                {siteSettings.founder_section_heading || 'Meet the Founder: Timi Ani'}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                {siteSettings.founder_summary || 'Anifowose Timileyin Emmanuel (Timi Ani) equips churches with practical technical training and creative excellence.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100 text-left">
                  <h4 className="text-[11px] font-bold text-[#064E3B]">
                    {siteSettings.founder_point_1_title || 'Ministry-First Approach'}
                  </h4>
                  <p className="text-[10px] text-slate-600 mt-0.5">
                    {siteSettings.founder_point_1_desc || 'Equipping media volunteers as ministers in the sanctuary.'}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-100 text-left">
                  <h4 className="text-[11px] font-bold text-[#064E3B]">
                    {siteSettings.founder_point_2_title || 'Hands-On Sanctuary Practice'}
                  </h4>
                  <p className="text-[10px] text-slate-600 mt-0.5">
                    {siteSettings.founder_point_2_desc || "Calibrated directly on your church's sound, camera, and display equipment."}
                  </p>
                </div>
              </div>

              {/* Smaller a tag and button */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <button
                  onClick={() => navigate('/about')}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-[#064E3B] hover:bg-[#047857] text-white transition-all shadow-xs"
                >
                  Learn More About Timi Ani
                </button>
                <a
                  href={siteSettings.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-bold rounded-lg border border-emerald-300 text-[#064E3B] bg-white hover:bg-emerald-50 transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat With Timi Ani</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: FINAL CALL TO ACTION (Editable in Admin Dashboard)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#059669] text-white rounded-2xl p-6 sm:p-10 text-center space-y-4 shadow-lg relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-2 relative z-10">
            <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
              {siteSettings.cta_banner_title || 'READY TO EQUIP YOUR CHURCH MEDIA TEAM?'}
            </h2>
            <p className="text-xs text-emerald-100">
              {siteSettings.cta_banner_text || 'Transform your audio clarity, livestream broadcast, and sermon visuals with practical on-site training.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 relative z-10 pt-1">
            <button
              onClick={() => navigate('/book-training')}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-white text-[#064E3B] hover:bg-emerald-50 shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              {siteSettings.cta_banner_btn_primary || 'BOOK TRAINING'}
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-900/40 hover:bg-emerald-900/60 text-white border border-emerald-300/40 transition-all"
            >
              {siteSettings.cta_banner_btn_secondary || 'CONTACT US'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
