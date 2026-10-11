import React, { useState } from 'react';
import {
  ChevronDown,
  Search,
  HelpCircle,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useCMS } from '../lib/cmsContext';

interface FAQProps {
  navigate: (route: string) => void;
}

export const FAQ: React.FC<FAQProps> = ({ navigate }) => {
  const { faqs, siteSettings } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const publishedFaqs = faqs.filter(f => f.is_published);

  const filteredFaqs = publishedFaqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-10 sm:space-y-14 py-8 sm:py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm text-[#064E3B] rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden border border-emerald-100 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-2.5">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 inline-block">
              Clear Answers
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#064E3B] leading-snug">
              Frequently Asked <span className="shimmer-text">Questions</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Find answers to common questions about Church Media Academy workshops, travel arrangements, and volunteer readiness.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. equipment, on-site, travel, volunteers)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-2xs"
          />
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFaqs.length > 0 ? (
          <div className="space-y-3">
            {filteredFaqs.map(faq => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 focus:outline-none hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                        {faq.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#064E3B] leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-700' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-600">No questions match your search.</p>
          </div>
        )}
      </section>

      {/* Still Have Questions CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 sm:p-8 text-center space-y-3">
          <Sparkles className="w-5 h-5 text-emerald-600 mx-auto" />
          <h3 className="text-base sm:text-lg font-bold text-[#064E3B]">
            Still have a question not listed here?
          </h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            We are always happy to answer your specific church inquiries directly on WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <a
              href={siteSettings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask Timi Ani on WhatsApp</span>
            </a>
            <button
              onClick={() => navigate('/book-training')}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#064E3B] hover:bg-[#047857] text-white"
            >
              Submit an Enquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
