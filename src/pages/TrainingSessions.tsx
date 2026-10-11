import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  MessageCircle,
  Clock
} from 'lucide-react';
import { useCMS } from '../lib/cmsContext';
import { MediaFallbackCard } from '../components/MediaFallbackCard';

interface TrainingSessionsProps {
  navigate: (route: string) => void;
  onSelectTopicForBooking?: (topic: string) => void;
}

export const TrainingSessions: React.FC<TrainingSessionsProps> = ({
  navigate,
  onSelectTopicForBooking
}) => {
  const { trainingPrograms, siteSettings } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const publishedPrograms = trainingPrograms.filter(p => p.is_published);

  // Categories list
  const categories = ['all', ...Array.from(new Set(publishedPrograms.map(p => p.category)))];

  const filteredPrograms = publishedPrograms.filter(program => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleEnquireTrack = (topicTitle: string) => {
    if (onSelectTopicForBooking) {
      onSelectTopicForBooking(topicTitle);
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
              Training Programmes & Syllabi
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#064E3B] leading-snug">
              Equipping Church Media Departments With <span className="shimmer-text">Real Skills</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Explore our eight hands-on curriculum tracks tailored for church environments and volunteers.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-5 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics (e.g. sound, video, graphics)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <Filter className="w-3 h-3 text-slate-400 mr-1 hidden sm:inline" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors capitalize ${
                  selectedCategory === cat
                    ? 'bg-[#064E3B] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Programmes' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPrograms.length > 0 ? (
          <div className="space-y-6">
            {filteredPrograms.map((program, index) => (
              <div
                key={program.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-emerald-300 hover:shadow-sm transition-all p-5 sm:p-7"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Number and Media Thumbnail */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
                        Track 0{index + 1}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">
                        {program.category}
                      </span>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-2xs bg-slate-900">
                      {program.image_url ? (
                        <img
                          src={program.image_url}
                          alt={program.title}
                          className="w-full aspect-video object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <MediaFallbackCard
                          type={
                            program.title.toLowerCase().includes('sound')
                              ? 'audio'
                              : program.title.toLowerCase().includes('video')
                              ? 'video'
                              : program.title.toLowerCase().includes('graphic')
                              ? 'design'
                              : program.title.toLowerCase().includes('projection')
                              ? 'projection'
                              : 'default'
                          }
                          title={program.title}
                          subtitle="Curriculum Track"
                          aspect="16:9"
                        />
                      )}
                    </div>

                    <div className="p-2.5 bg-emerald-50/80 rounded-lg border border-emerald-100 text-[11px] text-emerald-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Weekend Bootcamp, Intensive, or Webinars</span>
                    </div>
                  </div>

                  {/* Right Column: Title, Description, Topics */}
                  <div className="lg:col-span-8 space-y-4">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#064E3B] leading-snug">
                        {program.title}
                      </h2>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {program.description}
                      </p>
                    </div>

                    {/* Topics Covered */}
                    <div className="space-y-1.5 pt-1">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Topics & Practical Work:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {program.topics.map((topic, tIdx) => (
                          <div
                            key={tIdx}
                            className="flex items-start gap-1.5 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => handleEnquireTrack(program.title)}
                        className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>Enquire About This Training</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={`${siteSettings.whatsapp_url}?text=${encodeURIComponent(
                          `Hello Timi Ani, I would like to ask about the "${program.title}" training track for our church.`
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-xs text-slate-500">
              No training programmes match your search criteria.
            </p>
          </div>
        )}
      </section>

      {/* Custom Training Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#059669] text-white rounded-2xl p-6 sm:p-10 text-center space-y-3">
          <Sparkles className="w-6 h-6 text-emerald-300 mx-auto" />
          <h3 className="text-lg sm:text-xl font-bold">
            Need a Tailored Curriculum for Your Setup?
          </h3>
          <p className="text-xs text-emerald-100 max-w-lg mx-auto">
            We curate bespoke bootcamps combining sound, broadcast, and projection tailored to your congregation and gear.
          </p>
          <div className="pt-1">
            <button
              onClick={() => navigate('/book-training')}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-white text-[#064E3B] hover:bg-emerald-50 transition-colors shadow-2xs"
            >
              Request Custom Church Media Training
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
