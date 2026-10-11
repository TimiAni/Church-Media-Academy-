import React, { useState } from 'react';
import {
  Headphones,
  Play,
  Pause,
  ExternalLink,
  Clock,
  Calendar,
  User,
  Radio,
  Search,
  Volume2
} from 'lucide-react';
import { useCMS } from '../lib/cmsContext';

interface PodcastsProps {
  navigate: (route: string) => void;
}

export const Podcasts: React.FC<PodcastsProps> = ({ navigate }) => {
  const { podcasts, siteSettings } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAudioPlayingId, setActiveAudioPlayingId] = useState<string | null>(null);

  const publishedPodcasts = podcasts.filter(p => p.is_published);
  const filteredPodcasts = publishedPodcasts.filter(
    p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.speaker_or_guest && p.speaker_or_guest.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    try {
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        const id = urlParams.get('v');
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
    } catch {
      return null;
    }
    return null;
  };

  return (
    <div className="space-y-10 sm:space-y-12 py-3 sm:py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#064E3B] text-[10px] font-bold uppercase tracking-wider shadow-2xs">
          <Headphones className="w-3.5 h-3.5 text-emerald-600" />
          <span>Audio & Video Ministry Sessions</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#064E3B] tracking-tight">
          Church Media Academy Podcast
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
          Practical conversations, sound engineering secrets, livestreaming breakdowns, and digital ministry insights hosted by Timi Ani.
        </p>

        {/* Search bar */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search episode title, sound topic, or speaker..."
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/90 shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* Podcast Episodes Grid */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPodcasts.map(ep => {
            const youtubeEmbed = getYoutubeEmbedUrl(ep.youtube_url);
            const isPlaying = activeAudioPlayingId === ep.id;

            return (
              <div
                key={ep.id}
                className="bg-white/95 rounded-2xl border border-emerald-100/90 shadow-sm hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between space-y-4 relative overflow-hidden group"
              >
                <div className="space-y-3">
                  {/* Episode Pill & Speaker */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#064E3B] font-mono font-bold text-[10px]">
                        {ep.episode_number || 'EP'}
                      </span>
                      <span className="text-slate-500 flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{ep.published_date}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                      {ep.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{ep.duration}</span>
                        </span>
                      )}
                      {ep.speaker_or_guest && (
                        <span className="flex items-center gap-1 font-semibold text-emerald-800">
                          <User className="w-3 h-3 text-emerald-600" />
                          <span>{ep.speaker_or_guest}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-[#064E3B] group-hover:text-emerald-700 transition-colors leading-snug">
                      {ep.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {ep.description}
                    </p>
                  </div>

                  {/* Video Embed if YouTube is provided */}
                  {youtubeEmbed && (
                    <div className="rounded-xl overflow-hidden aspect-video bg-black shadow-xs border border-slate-200 mt-3">
                      <iframe
                        src={youtubeEmbed}
                        title={ep.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {/* Audio Player if Audio file or link provided */}
                  {ep.audio_url && (
                    <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 space-y-2 mt-2">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#064E3B]">
                        <span className="flex items-center gap-1.5">
                          <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                          <span>Audio Broadcast Track</span>
                        </span>
                        <span className="text-slate-400 text-[10px] font-mono">
                          {ep.duration || 'Listen Now'}
                        </span>
                      </div>
                      <audio
                        controls
                        className="w-full h-8"
                        src={ep.audio_url}
                        onPlay={() => setActiveAudioPlayingId(ep.id)}
                        onPause={() => {
                          if (isPlaying) setActiveAudioPlayingId(null);
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  {ep.youtube_url ? (
                    <a
                      href={ep.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] transition-colors shadow-2xs"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">
                      Audio Stream Available
                    </span>
                  )}

                  <button
                    onClick={() => navigate('/book-training')}
                    className="text-[11px] font-bold text-[#064E3B] hover:text-emerald-700 flex items-center gap-1"
                  >
                    <span>Request Workshop</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPodcasts.length === 0 && (
          <div className="text-center py-16 bg-white/90 rounded-2xl border border-dashed border-slate-300 space-y-3">
            <Radio className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No podcast episodes match your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching with different terms, or check back soon as Timi Ani publishes new church media training sessions.
            </p>
          </div>
        )}
      </section>

      {/* Suggest a Topic Banner */}
      <section className="bg-gradient-to-r from-[#064E3B] to-[#047857] text-white rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-md">
        <h3 className="text-base sm:text-lg font-bold">
          Want a specific audio or livestream topic covered on the podcast?
        </h3>
        <p className="text-xs text-emerald-100 max-w-md mx-auto">
          Send in your questions on sound consoles, camera switching, or volunteer leadership and Timi Ani will address them on the next episode.
        </p>
        <div className="pt-1">
          <a
            href={siteSettings.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#064E3B] font-bold text-xs hover:bg-emerald-50 transition-colors shadow-2xs"
          >
            <span>Suggest a Topic via WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
};
