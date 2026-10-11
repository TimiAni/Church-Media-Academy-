import React, { useState } from 'react';
import {
  Calendar,
  Image as ImageIcon,
  FolderOpen,
  ArrowLeft,
  Filter,
  Maximize2,
  Tag
} from 'lucide-react';
import { useCMS } from '../lib/cmsContext';
import { Lightbox } from '../components/Lightbox';
import { GalleryAlbum, GalleryImage } from '../types';
import { MediaFallbackCard } from '../components/MediaFallbackCard';

interface GalleryProps {
  navigate: (route: string) => void;
}

export const Gallery: React.FC<GalleryProps> = () => {
  const { galleryAlbums } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter only published albums
  const publishedAlbums = galleryAlbums.filter(a => a.is_published);

  const categories = [
    'all',
    'Training Workshop',
    'Church Conference',
    'Live Production',
    'Technical Operation'
  ];

  const filteredAlbums = publishedAlbums.filter(album => {
    return selectedCategory === 'all' || album.category === selectedCategory;
  });

  // Open lightbox for an album's photos
  const handleOpenPhoto = (images: GalleryImage[], index: number) => {
    const published = images.filter(img => img.is_published);
    if (published.length === 0) return;
    setLightboxImages(published);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNextPhoto = () => {
    setLightboxIndex(prev => (prev + 1) % lightboxImages.length);
  };

  const handlePrevPhoto = () => {
    setLightboxIndex(prev => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  return (
    <div className="space-y-10 sm:space-y-14 py-8 sm:py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm text-[#064E3B] rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden border border-emerald-100 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-2.5">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 inline-block">
              Visual Documentation
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#064E3B] leading-snug">
              Event & Training <span className="shimmer-text">Gallery</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Explore authentic photographs from Church Media Academy workshops, live church sound and streaming calibrations across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* If viewing a single album */}
        {activeAlbum ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Back button and Album Metadata */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <button
                onClick={() => setActiveAlbum(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#064E3B] px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Albums</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-100 text-[11px]">
                  {activeAlbum.category}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{activeAlbum.event_date}</span>
                </span>
              </div>
            </div>

            {/* Album Header Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#064E3B]">
                {activeAlbum.title}
              </h2>
              <p className="text-xs font-medium text-emerald-700 mt-0.5">
                Event: {activeAlbum.event_name}
              </p>
              {activeAlbum.description && (
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {activeAlbum.description}
                </p>
              )}
            </div>

            {/* Photos Grid in Album */}
            {activeAlbum.images.filter(img => img.is_published).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeAlbum.images
                  .filter(img => img.is_published)
                  .map((image, index) => (
                    <div
                      key={image.id}
                      onClick={() => handleOpenPhoto(activeAlbum.images, index)}
                      className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="aspect-4/3 bg-slate-900 overflow-hidden relative">
                        {image.image_url ? (
                          <img
                            src={image.image_url}
                            alt={image.title || 'Church Media session photograph'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <MediaFallbackCard
                            type="event"
                            title={image.title || activeAlbum.title}
                            subtitle={image.caption || activeAlbum.event_name}
                            aspect="4:3"
                          />
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[11px] font-medium flex items-center gap-1">
                            <Maximize2 className="w-3 h-3" />
                            <span>View Photo</span>
                          </span>
                        </div>
                      </div>

                      <div className="p-3">
                        <h4 className="text-xs font-bold text-[#064E3B] truncate">
                          {image.title || `Photograph 0${index + 1}`}
                        </h4>
                        {image.caption && (
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {image.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-slate-700">No photos in this album yet</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Photographs uploaded via the Admin Dashboard will appear here.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Albums List View */
          <div className="space-y-6">
            {/* Filter segmented buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#064E3B] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'All Albums' : cat}
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-slate-500 font-medium">
                Showing {filteredAlbums.length} published albums
              </div>
            </div>

            {/* Albums Cards Grid */}
            {filteredAlbums.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredAlbums.map(album => {
                  const publishedCount = album.images.filter(img => img.is_published).length;
                  return (
                    <div
                      key={album.id}
                      onClick={() => setActiveAlbum(album)}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        {/* Cover Image */}
                        <div className="relative aspect-video bg-slate-900 overflow-hidden">
                          {album.cover_url ? (
                            <img
                              src={album.cover_url}
                              alt={album.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <MediaFallbackCard
                              type="event"
                              title={album.title}
                              subtitle={album.event_name}
                              aspect="16:9"
                            />
                          )}

                          <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5 text-emerald-400" />
                            <span>{album.event_date}</span>
                          </div>

                          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white px-1.5 py-0.5 rounded text-[10px] font-mono">
                            {publishedCount} {publishedCount === 1 ? 'photo' : 'photos'}
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4">
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                            <Tag className="w-2.5 h-2.5" />
                            <span>{album.category}</span>
                          </div>
                          <h3 className="text-sm font-bold text-[#064E3B] mt-0.5 group-hover:text-emerald-700 transition-colors line-clamp-1">
                            {album.title}
                          </h3>
                          <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                            {album.event_name}
                          </p>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                            {album.description || 'Session photographs documenting practical audio-visual training.'}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-700 group-hover:underline flex items-center gap-1 text-[11px]">
                          <FolderOpen className="w-3 h-3" />
                          <span>Open Album</span>
                        </span>
                        <span className="text-slate-400 text-[11px]">View photographs →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
                <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-slate-700">No albums in this category</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-0.5">
                  Select &quot;All Albums&quot; or upload new photographs via the Admin Dashboard.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Lightbox Component */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
        />
      )}
    </div>
  );
};
