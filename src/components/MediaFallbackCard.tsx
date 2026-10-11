import React from 'react';
import { Camera, Radio, Tv, Layers, Palette, Users, MonitorPlay, Sparkles } from 'lucide-react';

interface MediaFallbackCardProps {
  type?: 'audio' | 'video' | 'camera' | 'projection' | 'design' | 'management' | 'event' | 'default';
  title?: string;
  subtitle?: string;
  aspect?: '16:9' | '4:3' | '1:1' | 'auto';
  className?: string;
}

export const MediaFallbackCard: React.FC<MediaFallbackCardProps> = ({
  type = 'default',
  title,
  subtitle,
  aspect = '16:9',
  className = ''
}) => {
  const getIcon = () => {
    switch (type) {
      case 'audio':
        return <Radio className="w-7 h-7 text-emerald-300" />;
      case 'video':
        return <Tv className="w-7 h-7 text-emerald-300" />;
      case 'camera':
        return <Camera className="w-7 h-7 text-emerald-300" />;
      case 'projection':
        return <MonitorPlay className="w-7 h-7 text-emerald-300" />;
      case 'design':
        return <Palette className="w-7 h-7 text-emerald-300" />;
      case 'management':
        return <Users className="w-7 h-7 text-emerald-300" />;
      default:
        return <Layers className="w-7 h-7 text-emerald-300" />;
    }
  };

  const aspectClass =
    aspect === '16:9'
      ? 'aspect-video'
      : aspect === '4:3'
      ? 'aspect-4/3'
      : aspect === '1:1'
      ? 'aspect-square'
      : 'min-h-[220px]';

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#022c22] text-white flex flex-col justify-between p-5 rounded-xl border border-emerald-700/50 shadow-inner select-none ${aspectClass} ${className}`}
    >
      {/* Background architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }} 
      />

      {/* Glow highlight */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Top bar with icon */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
          {getIcon()}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-200 tracking-wide uppercase">
          <Sparkles className="w-3 h-3 text-emerald-300" />
          <span>Church Media</span>
        </div>
      </div>

      {/* Bottom labels */}
      <div className="relative z-10 mt-auto pt-3">
        {title && (
          <h4 className="text-sm font-semibold text-white tracking-tight line-clamp-2">
            {title}
          </h4>
        )}
        {subtitle && (
          <p className="text-[11px] text-emerald-100/80 mt-0.5 line-clamp-2 font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
