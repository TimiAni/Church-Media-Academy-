import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GalleryImage } from '../types';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  if (!currentImage) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 text-white">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-medium text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800/60 tabular-nums">
            {currentIndex + 1} / {images.length}
          </span>
          <h3 className="text-sm font-medium text-slate-200 truncate max-w-md">
            {currentImage.title || 'Church Media Academy Photograph'}
          </h3>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Viewport with Previous & Next controls */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 select-none">
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-4 sm:left-8 z-10 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all focus:outline-none backdrop-blur-sm border border-white/10"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* The Image or Styled Fallback */}
        <div className="max-w-5xl max-h-[75vh] w-full flex items-center justify-center">
          {currentImage.image_url ? (
            <img
              src={currentImage.image_url}
              alt={currentImage.title || 'Church Media session photograph'}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full max-w-2xl aspect-video rounded-xl bg-gradient-to-br from-[#102A43] to-[#0A192F] border border-slate-700 p-8 flex flex-col items-center justify-center text-center text-white">
              <div className="p-4 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 mb-4">
                <ImageIcon className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-semibold text-white">
                {currentImage.title || 'Training Session Photograph'}
              </h4>
              <p className="text-sm text-slate-300 max-w-md mt-2">
                {currentImage.caption || 'Authentic church media training photograph taken during workshop.'}
              </p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 sm:right-8 z-10 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all focus:outline-none backdrop-blur-sm border border-white/10"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption Area */}
      {currentImage.caption && (
        <div className="bg-[#102A43]/90 border-t border-slate-800 text-center px-6 py-4">
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {currentImage.caption}
          </p>
        </div>
      )}
    </div>
  );
};
