import React, { useState } from 'react';
import {
  LayoutDashboard,
  Image as ImageIcon,
  BookOpen,
  Layers,
  Settings,
  Inbox,
  Database,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  ExternalLink,
  MessageCircle,
  Mail,
  Copy,
  Eye,
  EyeOff,
  Upload,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Headphones,
  Music,
  Mic,
  Play,
  Radio,
  Activity,
  RefreshCw
} from 'lucide-react';
import { useCMS } from '../../lib/cmsContext';
import { supabase } from '../../lib/supabase';
import { EnquiryStatus, GalleryAlbum, TrainingProgram, ServiceItem, PodcastEpisode } from '../../types';

interface AdminDashboardProps {
  navigate: (route: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigate }) => {
  const {
    adminUser,
    logoutAdmin,
    isSupabaseActive,
    siteSettings,
    updateSiteSettings,
    trainingPrograms,
    addTrainingProgram,
    updateTrainingProgram,
    deleteTrainingProgram,
    services,
    addService,
    updateService,
    deleteService,
    galleryAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    addImageToAlbum,
    updateImage,
    deleteImage,
    enquiries,
    updateEnquiryStatus,
    deleteEnquiry,
    podcasts,
    addPodcast,
    updatePodcast,
    deletePodcast,
    resetToDefaults
  } = useCMS();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'gallery' | 'training' | 'services' | 'podcasts' | 'settings' | 'enquiries' | 'supabase'
  >('overview');

  // Status Filter for enquiries
  const [enquiryFilter, setEnquiryFilter] = useState<string>('all');

  // Album creation modal/form state
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newAlbumEvent, setNewAlbumEvent] = useState('');
  const [newAlbumDate, setNewAlbumDate] = useState(new Date().toISOString().split('T')[0]);
  const [newAlbumDesc, setNewAlbumDesc] = useState('');
  const [newAlbumCategory, setNewAlbumCategory] = useState<GalleryAlbum['category']>('Training Workshop');
  const [newAlbumCover, setNewAlbumCover] = useState('');

  // Selected album for photo uploads
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(
    galleryAlbums[0]?.id || null
  );

  // Photo upload form state
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [isPhotoCover, setIsPhotoCover] = useState(false);

  // New Training modal/form
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [trainingTitle, setTrainingTitle] = useState('');
  const [trainingCategory, setTrainingCategory] = useState('');
  const [trainingDesc, setTrainingDesc] = useState('');
  const [trainingTopicsText, setTrainingTopicsText] = useState('');

  // New Service modal/form
  const [showAddService, setShowAddService] = useState(false);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceShortDesc, setServiceShortDesc] = useState('');
  const [serviceFullDesc, setServiceFullDesc] = useState('');
  const [serviceDeliverablesText, setServiceDeliverablesText] = useState('');

  // Copy notification for SQL schema
  const [copiedSQL, setCopiedSQL] = useState(false);

  // Podcast form & modal state
  const [showAddPodcast, setShowAddPodcast] = useState(false);
  const [podcastTitle, setPodcastTitle] = useState('');
  const [podcastEpNumber, setPodcastEpNumber] = useState('');
  const [podcastDesc, setPodcastDesc] = useState('');
  const [podcastYoutubeUrl, setPodcastYoutubeUrl] = useState('');
  const [podcastAudioUrl, setPodcastAudioUrl] = useState('');
  const [podcastDuration, setPodcastDuration] = useState('');
  const [podcastSpeaker, setPodcastSpeaker] = useState('Timi Ani');
  const [editingPodcastId, setEditingPodcastId] = useState<string | null>(null);

  // Audio file upload state
  const [audioUploadFileName, setAudioUploadFileName] = useState('');

  // KPI Calculations
  const totalAlbums = galleryAlbums.length;
  const totalPhotos = galleryAlbums.reduce((sum, alb) => sum + alb.images.length, 0);
  const totalTrainingTracks = trainingPrograms.length;
  const totalServices = services.length;
  const totalPodcasts = podcasts.length;
  const totalEnquiries = enquiries.length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;

  const currentSelectedAlbum = galleryAlbums.find(a => a.id === selectedAlbumId);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const handleCreateAlbumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumTitle.trim() || !newAlbumEvent.trim()) return;

    const newId = createAlbum({
      title: newAlbumTitle.trim(),
      event_name: newAlbumEvent.trim(),
      event_date: newAlbumDate,
      description: newAlbumDesc.trim(),
      cover_url: newAlbumCover.trim(),
      category: newAlbumCategory,
      is_published: true
    });

    setSelectedAlbumId(newId);
    setShowCreateAlbum(false);
    setNewAlbumTitle('');
    setNewAlbumEvent('');
    setNewAlbumDesc('');
    setNewAlbumCover('');
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbumId) return;

    addImageToAlbum(selectedAlbumId, {
      title: newPhotoTitle.trim() || 'Training Photograph',
      caption: newPhotoCaption.trim(),
      image_url: newPhotoUrl.trim(),
      is_cover: isPhotoCover,
      is_published: true,
      display_order: 1
    });

    setNewPhotoTitle('');
    setNewPhotoCaption('');
    setNewPhotoUrl('');
    setIsPhotoCover(false);
  };

  // Image file upload simulation / local file reader
  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTrainingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainingTitle.trim()) return;

    const topicsArray = trainingTopicsText
      .split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    addTrainingProgram({
      title: trainingTitle.trim(),
      category: trainingCategory.trim() || 'Church Media Training',
      description: trainingDesc.trim(),
      topics: topicsArray.length > 0 ? topicsArray : ['Hands-on practical calibration', 'Live training drills'],
      is_published: true,
      sort_order: trainingPrograms.length + 1
    });

    setShowAddTraining(false);
    setTrainingTitle('');
    setTrainingCategory('');
    setTrainingDesc('');
    setTrainingTopicsText('');
  };

  const handleAddServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle.trim()) return;

    const delivsArray = serviceDeliverablesText
      .split('\n')
      .map(d => d.trim())
      .filter(d => d.length > 0);

    addService({
      title: serviceTitle.trim(),
      short_description: serviceShortDesc.trim(),
      full_description: serviceFullDesc.trim() || serviceShortDesc.trim(),
      icon_name: 'Layers',
      deliverables: delivsArray.length > 0 ? delivsArray : ['Full consultation & setup'],
      is_published: true,
      sort_order: services.length + 1
    });

    setShowAddService(false);
    setServiceTitle('');
    setServiceShortDesc('');
    setServiceFullDesc('');
    setServiceDeliverablesText('');
  };

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioUploadFileName(file.name);
      // Create an object URL or base64 data for local playback
      const reader = new FileReader();
      reader.onload = event => {
        if (event.target?.result) {
          setPodcastAudioUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePodcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!podcastTitle.trim()) return;

    if (editingPodcastId) {
      updatePodcast(editingPodcastId, {
        title: podcastTitle.trim(),
        episode_number: podcastEpNumber.trim() || undefined,
        description: podcastDesc.trim(),
        youtube_url: podcastYoutubeUrl.trim() || undefined,
        audio_url: podcastAudioUrl.trim() || undefined,
        duration: podcastDuration.trim() || undefined,
        speaker_or_guest: podcastSpeaker.trim() || 'Timi Ani'
      });
    } else {
      addPodcast({
        title: podcastTitle.trim(),
        episode_number: podcastEpNumber.trim() || `EP ${podcasts.length + 1 < 10 ? '0' : ''}${podcasts.length + 1}`,
        description: podcastDesc.trim(),
        youtube_url: podcastYoutubeUrl.trim() || undefined,
        audio_url: podcastAudioUrl.trim() || undefined,
        duration: podcastDuration.trim() || '25:00',
        published_date: new Date().toISOString().split('T')[0],
        speaker_or_guest: podcastSpeaker.trim() || 'Timi Ani',
        is_published: true,
        sort_order: podcasts.length + 1
      });
    }

    setShowAddPodcast(false);
    setEditingPodcastId(null);
    setPodcastTitle('');
    setPodcastEpNumber('');
    setPodcastDesc('');
    setPodcastYoutubeUrl('');
    setPodcastAudioUrl('');
    setPodcastDuration('');
    setPodcastSpeaker('Timi Ani');
    setAudioUploadFileName('');
  };

  const openEditPodcast = (pod: PodcastEpisode) => {
    setEditingPodcastId(pod.id);
    setPodcastTitle(pod.title);
    setPodcastEpNumber(pod.episode_number || '');
    setPodcastDesc(pod.description);
    setPodcastYoutubeUrl(pod.youtube_url || '');
    setPodcastAudioUrl(pod.audio_url || '');
    setPodcastDuration(pod.duration || '');
    setPodcastSpeaker(pod.speaker_or_guest || 'Timi Ani');
    setAudioUploadFileName(pod.audio_url ? 'Audio track attached' : '');
    setShowAddPodcast(true);
  };

  const copySchemaToClipboard = () => {
    const sql = `-- Supabase schema for Church Media Academy
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    event_name TEXT NOT NULL,
    event_date DATE DEFAULT CURRENT_DATE,
    description TEXT DEFAULT '',
    cover_url TEXT DEFAULT '',
    category TEXT DEFAULT 'Training Workshop',
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    album_id UUID REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    title TEXT DEFAULT '',
    caption TEXT DEFAULT '',
    is_cover BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    organization TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    location TEXT,
    request_type TEXT,
    topic_or_service TEXT,
    format TEXT,
    preferred_date TEXT,
    additional_info TEXT,
    status TEXT DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published albums" ON public.gallery_albums FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Public read published images" ON public.gallery_images FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');
CREATE POLICY "Public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage albums" ON public.gallery_albums FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage images" ON public.gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manage enquiries" ON public.enquiries FOR ALL USING (auth.role() = 'authenticated');`;

    navigator.clipboard.writeText(sql);
    setCopiedSQL(true);
    setTimeout(() => setCopiedSQL(false), 2500);
  };

  const [testStatus, setTestStatus] = useState<{
    testing: boolean;
    success: boolean | null;
    message: string;
    latency?: number;
  }>({ testing: false, success: null, message: '' });

  const runConnectionTest = async () => {
    setTestStatus({ testing: true, success: null, message: 'Pinging Supabase cloud endpoint...' });
    const start = performance.now();
    try {
      if (!supabase) {
        throw new Error('Supabase client is not configured.');
      }
      const { error } = await supabase.auth.getSession();
      const latency = Math.round(performance.now() - start);
      if (error) {
        setTestStatus({
          testing: false,
          success: false,
          message: `Supabase responded with error: ${error.message}`,
          latency
        });
      } else {
        setTestStatus({
          testing: false,
          success: true,
          message: `Live Supabase connection confirmed! Auth and API Gateway responded in ${latency}ms.`,
          latency
        });
      }
    } catch (err: unknown) {
      const latency = Math.round(performance.now() - start);
      const msg = err instanceof Error ? err.message : 'Failed to reach Supabase';
      setTestStatus({
        testing: false,
        success: false,
        message: msg,
        latency
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-[#064E3B] text-white border-b border-slate-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-base sm:text-lg tracking-tight">
              Church Media Academy
            </span>
            <span className="bg-sky-500/20 text-sky-300 text-[11px] font-mono px-2 py-0.5 rounded border border-sky-400/30">
              CMS Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-slate-300 block font-medium">
                {adminUser?.email || 'Timi Ani'}
              </span>
              <span className="text-[10px] text-sky-400 block">Lead Administrator</span>
            </div>

            <button
              onClick={() => navigate('/')}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#064E3B] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-[#064E3B] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4" />
                <span>Gallery & Albums</span>
              </div>
              <span className="text-[11px] font-mono opacity-80">{totalPhotos}</span>
            </button>

            <button
              onClick={() => setActiveTab('training')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'training'
                  ? 'bg-[#064E3B] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Training Programmes</span>
              </div>
              <span className="text-[11px] font-mono opacity-80">{totalTrainingTracks}</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'services'
                  ? 'bg-[#064E3B] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Services</span>
              </div>
              <span className="text-[11px] font-mono opacity-80">{totalServices}</span>
            </button>

            <button
              onClick={() => setActiveTab('podcasts')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'podcasts'
                  ? 'bg-[#064E3B] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Headphones className="w-4 h-4" />
                <span>Podcast Episodes</span>
              </div>
              <span className="text-[11px] font-mono opacity-80">{totalPodcasts}</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'enquiries'
                  ? 'bg-[#064E3B] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Enquiries</span>
              </div>
              {newEnquiriesCount > 0 && (
                <span className="bg-sky-500 text-white font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {newEnquiriesCount} new
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#064E3B] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Website Content</span>
            </button>

            <button
              onClick={() => setActiveTab('supabase')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'supabase'
                  ? 'bg-[#064E3B] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Supabase & SQL</span>
            </button>
          </div>

          {/* Quick status card */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2 shadow-sm">
            <p className="font-bold text-slate-800">Connection Mode</p>
            <div className="flex items-center gap-2 text-slate-600">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isSupabaseActive ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              <span>{isSupabaseActive ? 'Supabase Active' : 'Local Storage Mode'}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              All edits update live across the public site immediately.
            </p>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              {/* Header */}
              <div>
                <h1 className="text-2xl font-extrabold text-[#064E3B]">
                  Academy Dashboard Overview
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Real-time statistics from your Church Media Academy database.
                </p>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-medium text-slate-500 block">
                    Gallery Photos
                  </span>
                  <div className="text-2xl font-extrabold text-[#064E3B] font-mono tabular-nums">
                    {totalPhotos}
                  </div>
                  <span className="text-[11px] text-sky-600 font-medium">
                    in {totalAlbums} albums
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-medium text-slate-500 block">
                    Training Tracks
                  </span>
                  <div className="text-2xl font-extrabold text-[#064E3B] font-mono tabular-nums">
                    {totalTrainingTracks}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">
                    Published & Active
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-medium text-slate-500 block">
                    Total Enquiries
                  </span>
                  <div className="text-2xl font-extrabold text-[#064E3B] font-mono tabular-nums">
                    {totalEnquiries}
                  </div>
                  <span className="text-[11px] text-sky-600 font-medium">
                    {newEnquiriesCount} requiring review
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-medium text-slate-500 block">
                    Active Services
                  </span>
                  <div className="text-2xl font-extrabold text-[#064E3B] font-mono tabular-nums">
                    {totalServices}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Professional offerings
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-medium text-slate-500 block">
                    Podcast Episodes
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
                    {totalPodcasts}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">
                    Audio & YouTube
                  </span>
                </div>
              </div>

              {/* Action Shortcuts per prompt */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Quick Management Shortcuts
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className="p-3.5 rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 font-semibold text-xs transition-colors flex flex-col items-center justify-center gap-1.5 border border-sky-100"
                  >
                    <Upload className="w-4 h-4 text-sky-600" />
                    <span>UPLOAD PHOTOS</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('podcasts');
                      setShowAddPodcast(true);
                    }}
                    className="p-3.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold text-xs transition-colors flex flex-col items-center justify-center gap-1.5 border border-emerald-200"
                  >
                    <Headphones className="w-4 h-4 text-emerald-600" />
                    <span>NEW PODCAST</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('training');
                      setShowAddTraining(true);
                    }}
                    className="p-4 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold text-xs transition-colors flex flex-col items-center justify-center gap-2 border border-emerald-100"
                  >
                    <Plus className="w-5 h-5 text-emerald-600" />
                    <span>ADD TRAINING</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('services');
                      setShowAddService(true);
                    }}
                    className="p-4 rounded-lg bg-slate-50 text-slate-800 hover:bg-slate-100 font-semibold text-xs transition-colors flex flex-col items-center justify-center gap-2 border border-slate-200"
                  >
                    <Plus className="w-5 h-5 text-slate-600" />
                    <span>ADD SERVICE</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="p-4 rounded-lg bg-purple-50 text-purple-800 hover:bg-purple-100 font-semibold text-xs transition-colors flex flex-col items-center justify-center gap-2 border border-purple-100"
                  >
                    <Inbox className="w-5 h-5 text-purple-600" />
                    <span>VIEW ENQUIRIES</span>
                  </button>
                </div>
              </div>

              {/* Recent Enquiries snippet */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Recent Enquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs font-semibold text-sky-600 hover:underline"
                  >
                    View All ({totalEnquiries}) →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {enquiries.slice(0, 3).map(enq => (
                    <div key={enq.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{enq.full_name}</p>
                        <p className="text-slate-500">
                          {enq.organization} · {enq.topic_or_service}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-100 text-sky-800">
                          {enq.status}
                        </span>
                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
                          title="WhatsApp Reply"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GALLERY ADMINISTRATION */}
          {activeTab === 'gallery' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#064E3B]">
                    Gallery & Photo Management
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload photographs from workshops, create albums, and set captions.
                  </p>
                </div>

                <button
                  onClick={() => setShowCreateAlbum(true)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#064E3B] hover:bg-[#1b3a5a] text-white flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Album</span>
                </button>
              </div>

              {/* Create Album Form Modal */}
              {showCreateAlbum && (
                <div className="p-6 bg-white rounded-xl border border-sky-300 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 text-sm">Create New Gallery Album</h3>
                    <button
                      onClick={() => setShowCreateAlbum(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateAlbumSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Album Title
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Lagos Church Media Intensive"
                          value={newAlbumTitle}
                          onChange={e => setNewAlbumTitle(e.target.value)}
                          className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Event Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Media Ministry Summit 2026"
                          value={newAlbumEvent}
                          onChange={e => setNewAlbumEvent(e.target.value)}
                          className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Event Date
                        </label>
                        <input
                          type="date"
                          value={newAlbumDate}
                          onChange={e => setNewAlbumDate(e.target.value)}
                          className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={newAlbumCategory}
                          onChange={e =>
                            setNewAlbumCategory(e.target.value as GalleryAlbum['category'])
                          }
                          className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none bg-white"
                        >
                          <option value="Training Workshop">Training Workshop</option>
                          <option value="Church Conference">Church Conference</option>
                          <option value="Live Production">Live Production</option>
                          <option value="Technical Operation">Technical Operation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Cover Image URL (Optional)
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={newAlbumCover}
                          onChange={e => setNewAlbumCover(e.target.value)}
                          className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Album Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Brief summary of what this session covered..."
                        value={newAlbumDesc}
                        onChange={e => setNewAlbumDesc(e.target.value)}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowCreateAlbum(false)}
                        className="px-4 py-2 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-[#064E3B]"
                      >
                        Create Album
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Album Selector Tabs */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Active Album to Manage Photos:
                </label>
                <div className="flex flex-wrap gap-2">
                  {galleryAlbums.map(alb => (
                    <button
                      key={alb.id}
                      onClick={() => setSelectedAlbumId(alb.id)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-2 ${
                        selectedAlbumId === alb.id
                          ? 'bg-[#064E3B] text-white border-[#064E3B]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{alb.title}</span>
                      <span className="opacity-75 font-mono text-[10px]">
                        ({alb.images.length})
                      </span>
                      {!alb.is_published && (
                        <span className="text-[10px] text-amber-300">· Draft</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photos in Selected Album */}
              {currentSelectedAlbum && (
                <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-[#064E3B]">
                          {currentSelectedAlbum.title}
                        </h3>
                        <button
                          onClick={() =>
                            updateAlbum(currentSelectedAlbum.id, {
                              is_published: !currentSelectedAlbum.is_published
                            })
                          }
                          className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                            currentSelectedAlbum.is_published
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {currentSelectedAlbum.is_published ? 'Published' : 'Hidden / Draft'}
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {currentSelectedAlbum.event_name} · {currentSelectedAlbum.event_date}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this album and its photos?')) {
                            deleteAlbum(currentSelectedAlbum.id);
                            setSelectedAlbumId(galleryAlbums[0]?.id || null);
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Album</span>
                      </button>
                    </div>
                  </div>

                  {/* Upload Photo Form into this Album */}
                  <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-100 space-y-4">
                    <h4 className="text-xs font-bold text-sky-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-sky-600" />
                      <span>Upload / Add Photograph to this Album</span>
                    </h4>

                    <form onSubmit={handleAddPhotoSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Photo Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Sound Console EQ Practice"
                            value={newPhotoTitle}
                            onChange={e => setNewPhotoTitle(e.target.value)}
                            className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Photo Caption
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Volunteers calibrating audio matrix"
                            value={newPhotoCaption}
                            onChange={e => setNewPhotoCaption(e.target.value)}
                            className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      {/* Photo source options: File Picker or URL */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Option A: Choose Image File from Device
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoFileUpload}
                            className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-100 file:text-sky-800 hover:file:bg-sky-200"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Option B: Or Enter Image URL
                          </label>
                          <input
                            type="url"
                            placeholder="https://images..."
                            value={newPhotoUrl}
                            onChange={e => setNewPhotoUrl(e.target.value)}
                            className="w-full p-2 text-xs border border-slate-300 rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isPhotoCover}
                            onChange={e => setIsPhotoCover(e.target.checked)}
                            className="rounded text-sky-600 focus:ring-sky-400"
                          />
                          <span>Set as Album Cover</span>
                        </label>

                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#064E3B] hover:bg-[#1b3a5a] text-white flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Photo to Album</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* List of current photos in album */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Current Album Photos ({currentSelectedAlbum.images.length})
                    </h4>

                    {currentSelectedAlbum.images.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {currentSelectedAlbum.images.map(img => (
                          <div
                            key={img.id}
                            className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 relative"
                          >
                            <div className="aspect-video bg-slate-900 rounded overflow-hidden relative">
                              {img.image_url ? (
                                <img
                                  src={img.image_url}
                                  alt={img.title}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                                  <span>Preview Card</span>
                                </div>
                              )}
                              {img.is_cover && (
                                <span className="absolute top-1.5 left-1.5 bg-sky-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  COVER
                                </span>
                              )}
                            </div>

                            <p className="text-xs font-bold text-slate-800 truncate">
                              {img.title || 'Photograph'}
                            </p>
                            {img.caption && (
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                {img.caption}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                              <button
                                onClick={() =>
                                  updateImage(currentSelectedAlbum.id, img.id, {
                                    is_published: !img.is_published
                                  })
                                }
                                className={`text-[11px] font-semibold ${
                                  img.is_published ? 'text-emerald-700' : 'text-slate-400'
                                }`}
                              >
                                {img.is_published ? 'Published' : 'Hidden'}
                              </button>

                              <button
                                onClick={() =>
                                  deleteImage(currentSelectedAlbum.id, img.id)
                                }
                                className="text-red-500 hover:text-red-700 p-1"
                                title="Delete Photo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 py-6 text-center border border-dashed rounded-lg">
                        No photos in this album yet. Use the form above to add session photos.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TRAINING PROGRAMMES CMS */}
          {activeTab === 'training' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#064E3B]">
                    Training Programmes CMS
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage the 8 foundational curriculum tracks and practical topics.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddTraining(true)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#064E3B] hover:bg-[#1b3a5a] text-white flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Training Track</span>
                </button>
              </div>

              {/* Add Training Modal/Form */}
              {showAddTraining && (
                <div className="p-6 bg-white rounded-xl border border-sky-300 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 text-sm">Add New Training Track</h3>
                    <button
                      onClick={() => setShowAddTraining(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleAddTrainingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Programme Title
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Church Sound & Audio Mixing"
                          value={trainingTitle}
                          onChange={e => setTrainingTitle(e.target.value)}
                          className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Category
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Audio Engineering"
                          value={trainingCategory}
                          onChange={e => setTrainingCategory(e.target.value)}
                          className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Programme Description
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Comprehensive description of the skills trainees will gain..."
                        value={trainingDesc}
                        onChange={e => setTrainingDesc(e.target.value)}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Curriculum Topics (One per line)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Digital console gain structure&#10;Acoustic feedback prevention&#10;Broadcast vs Sanctuary mix"
                        value={trainingTopicsText}
                        onChange={e => setTrainingTopicsText(e.target.value)}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddTraining(false)}
                        className="px-4 py-2 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-[#064E3B]"
                      >
                        Save Programme
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Training Programs List */}
              <div className="space-y-4">
                {trainingPrograms.map(prog => (
                  <div
                    key={prog.id}
                    className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                          {prog.category}
                        </span>
                        <h3 className="font-bold text-[#064E3B] text-sm sm:text-base">
                          {prog.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 max-w-2xl line-clamp-2">
                        {prog.description}
                      </p>
                      <div className="text-[11px] text-slate-400">
                        {prog.topics.length} topics included
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() =>
                          updateTrainingProgram(prog.id, { is_published: !prog.is_published })
                        }
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          prog.is_published
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {prog.is_published ? 'Published' : 'Unpublished'}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete training track "${prog.title}"?`)) {
                            deleteTrainingProgram(prog.id);
                          }
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Training Track"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES CMS */}
          {activeTab === 'services' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#064E3B]">
                    Services Management
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage professional agency offerings, live streaming, and design deliverables.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddService(true)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#064E3B] hover:bg-[#1b3a5a] text-white flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              {/* Add Service Modal/Form */}
              {showAddService && (
                <div className="p-6 bg-white rounded-xl border border-sky-300 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 text-sm">Add New Professional Service</h3>
                    <button
                      onClick={() => setShowAddService(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleAddServiceSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Service Title
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Live Streaming and Multicam Broadcast"
                        value={serviceTitle}
                        onChange={e => setServiceTitle(e.target.value)}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Short Description
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Concise overview for cards..."
                        value={serviceShortDesc}
                        onChange={e => setServiceShortDesc(e.target.value)}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Deliverables (One per line)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Atem Mini video director service&#10;Dedicated matrix sound engineer&#10;Simulcast to Facebook & YouTube"
                        value={serviceDeliverablesText}
                        onChange={e => setServiceDeliverablesText(e.target.value)}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddService(false)}
                        className="px-4 py-2 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-[#064E3B]"
                      >
                        Save Service
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Services List */}
              <div className="space-y-4">
                {services.map(svc => (
                  <div
                    key={svc.id}
                    className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <h3 className="font-bold text-[#064E3B] text-sm sm:text-base">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-slate-500 max-w-2xl line-clamp-2">
                        {svc.short_description}
                      </p>
                      <div className="text-[11px] text-slate-400">
                        {svc.deliverables.length} deliverables listed
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() =>
                          updateService(svc.id, { is_published: !svc.is_published })
                        }
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          svc.is_published
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {svc.is_published ? 'Published' : 'Unpublished'}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete service "${svc.title}"?`)) {
                            deleteService(svc.id);
                          }
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ENQUIRIES MANAGEMENT */}
          {activeTab === 'enquiries' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#064E3B]">
                    Booking & Service Enquiries
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage client submissions, change statuses, and respond directly via WhatsApp or Email.
                  </p>
                </div>

                {/* Filter Selector */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-600">Status:</span>
                  <select
                    value={enquiryFilter}
                    onChange={e => setEnquiryFilter(e.target.value)}
                    className="p-2 border border-slate-300 rounded-lg bg-white text-xs focus:outline-none"
                  >
                    <option value="all">All Enquiries ({totalEnquiries})</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Discussion">In Discussion</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Enquiries Dossier List */}
              <div className="space-y-4">
                {enquiries
                  .filter(e => enquiryFilter === 'all' || e.status === enquiryFilter)
                  .map(enq => (
                    <div
                      key={enq.id}
                      className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#064E3B] text-base">
                              {enq.full_name}
                            </h3>
                            <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                              {enq.organization}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Submitted: {new Date(enq.created_at).toLocaleDateString()} · {enq.location}
                          </p>
                        </div>

                        {/* Status Pipeline Dropdown */}
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-bold text-slate-600">Status:</label>
                          <select
                            value={enq.status}
                            onChange={e =>
                              updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)
                            }
                            className={`p-1.5 text-xs font-semibold rounded-lg border focus:outline-none ${
                              enq.status === 'New'
                                ? 'bg-sky-50 border-sky-300 text-sky-800'
                                : enq.status === 'Confirmed'
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                : 'bg-slate-50 border-slate-300 text-slate-700'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                      </div>

                      {/* Details Strip */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
                        <div>
                          <span className="text-slate-400 block font-medium">Topic / Service:</span>
                          <span className="font-semibold text-slate-800">{enq.topic_or_service}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Preferred Format:</span>
                          <span className="font-semibold text-slate-800">{enq.format}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Target Date:</span>
                          <span className="font-semibold text-slate-800">
                            {enq.preferred_date || 'Flexible'}
                          </span>
                        </div>
                      </div>

                      {/* Notes / Gear info */}
                      {enq.additional_info && (
                        <div className="text-xs text-slate-600 bg-slate-50/70 p-3 rounded border border-slate-100">
                          <span className="font-bold text-slate-700 block mb-1">
                            Additional Information / Gear Notes:
                          </span>
                          <p className="leading-relaxed">{enq.additional_info}</p>
                        </div>
                      )}

                      {/* Contact & Reply Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-4 text-xs">
                          <span className="font-mono text-slate-700">Phone: {enq.phone}</span>
                          {enq.email && (
                            <span className="text-slate-600">Email: {enq.email}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${enq.full_name}, this is Timi Ani from Church Media Academy. Thank you for your training enquiry for ${enq.organization}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Reply via WhatsApp</span>
                          </a>

                          {enq.email && (
                            <a
                              href={`mailto:${enq.email}?subject=${encodeURIComponent(
                                `Church Media Academy Training — ${enq.organization}`
                              )}`}
                              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Email</span>
                            </a>
                          )}

                          <button
                            onClick={() => {
                              if (confirm('Delete this enquiry record?')) {
                                deleteEnquiry(enq.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                {enquiries.length === 0 && (
                  <p className="text-center py-12 text-slate-400 text-xs">
                    No enquiries recorded yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB: PODCAST EPISODES (AUDIO & YOUTUBE) */}
          {activeTab === 'podcasts' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#064E3B] flex items-center gap-2">
                    <Headphones className="w-6 h-6 text-emerald-600" />
                    <span>Church Media Academy Podcast</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload audio files or link YouTube video recordings to publish podcast episodes for church media operators.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingPodcastId(null);
                    setPodcastTitle('');
                    setPodcastEpNumber(`EP ${podcasts.length + 1 < 10 ? '0' : ''}${podcasts.length + 1}`);
                    setPodcastDesc('');
                    setPodcastYoutubeUrl('');
                    setPodcastAudioUrl('');
                    setPodcastDuration('25:00');
                    setPodcastSpeaker('Timi Ani');
                    setAudioUploadFileName('');
                    setShowAddPodcast(true);
                  }}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-[#064E3B] hover:bg-[#047857] text-white flex items-center gap-2 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Podcast Episode</span>
                </button>
              </div>

              {/* Add / Edit Episode Modal */}
              {showAddPodcast && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b pb-3">
                      <h3 className="font-bold text-[#064E3B] text-base flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-emerald-600" />
                        <span>{editingPodcastId ? 'Edit Podcast Episode' : 'Publish New Podcast Episode'}</span>
                      </h3>
                      <button
                        onClick={() => setShowAddPodcast(false)}
                        className="text-slate-400 hover:text-slate-600 p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSavePodcastSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                          <label className="block font-bold text-slate-700 mb-1">
                            Episode Code / Number
                          </label>
                          <input
                            type="text"
                            value={podcastEpNumber}
                            onChange={e => setPodcastEpNumber(e.target.value)}
                            placeholder="EP 01"
                            className="w-full p-2.5 border border-slate-300 rounded-lg font-mono font-bold"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">
                            Episode Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={podcastTitle}
                            onChange={e => setPodcastTitle(e.target.value)}
                            placeholder="e.g. Solving Sanctuary Audio Feedback & Gain Staging"
                            className="w-full p-2.5 border border-slate-300 rounded-lg font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Episode Summary / Notes *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={podcastDesc}
                          onChange={e => setPodcastDesc(e.target.value)}
                          placeholder="What will listeners learn in this episode? Discuss key takeaways, equipment tips, and spiritual guidance."
                          className="w-full p-2.5 border border-slate-300 rounded-lg leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Host / Speaker / Guest
                          </label>
                          <input
                            type="text"
                            value={podcastSpeaker}
                            onChange={e => setPodcastSpeaker(e.target.value)}
                            placeholder="Timi Ani"
                            className="w-full p-2.5 border border-slate-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Duration (MM:SS)
                          </label>
                          <input
                            type="text"
                            value={podcastDuration}
                            onChange={e => setPodcastDuration(e.target.value)}
                            placeholder="28:40"
                            className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      {/* YouTube Video Link */}
                      <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 space-y-1.5">
                        <label className="block font-bold text-red-950 flex items-center gap-1.5">
                          <span>📺 YouTube Video / Livestream Link</span>
                        </label>
                        <input
                          type="url"
                          value={podcastYoutubeUrl}
                          onChange={e => setPodcastYoutubeUrl(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                          className="w-full p-2 border border-red-200 rounded-lg bg-white"
                        />
                        <p className="text-[10px] text-red-700">
                          Paste any YouTube video or watch link. Listeners will be able to watch and listen directly.
                        </p>
                      </div>

                      {/* Audio File Upload or URL */}
                      <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-2">
                        <label className="block font-bold text-[#064E3B] flex items-center gap-1.5">
                          <Mic className="w-4 h-4 text-emerald-600" />
                          <span>🎙️ Upload Audio Track or Direct Audio URL</span>
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <span className="block text-[11px] font-medium text-slate-600 mb-1">
                              Upload Audio (.mp3, .wav, .m4a):
                            </span>
                            <label className="flex items-center justify-center gap-2 p-2 border border-dashed border-emerald-300 rounded-lg bg-white cursor-pointer hover:bg-emerald-50/50 transition-colors">
                              <Upload className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[11px] font-semibold text-emerald-800 truncate">
                                {audioUploadFileName || 'Choose Audio File'}
                              </span>
                              <input
                                type="file"
                                accept="audio/*"
                                onChange={handleAudioFileUpload}
                                className="hidden"
                              />
                            </label>
                          </div>

                          <div>
                            <span className="block text-[11px] font-medium text-slate-600 mb-1">
                              Or Paste Direct Audio MP3 URL:
                            </span>
                            <input
                              type="url"
                              value={podcastAudioUrl.startsWith('data:') ? '' : podcastAudioUrl}
                              onChange={e => {
                                setPodcastAudioUrl(e.target.value);
                                setAudioUploadFileName('');
                              }}
                              placeholder="https://.../podcast-episode.mp3"
                              className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                        </div>

                        {podcastAudioUrl && (
                          <div className="pt-2 border-t border-emerald-200">
                            <span className="block text-[10px] font-bold text-emerald-800 mb-1">
                              Audio Track Preview:
                            </span>
                            <audio controls className="w-full h-8" src={podcastAudioUrl} />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t">
                        <button
                          type="button"
                          onClick={() => setShowAddPodcast(false)}
                          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-[#064E3B] hover:bg-[#047857] text-white font-bold transition-colors shadow-2xs"
                        >
                          {editingPodcastId ? 'Save Changes' : 'Publish Episode'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Podcasts List */}
              <div className="space-y-4">
                {podcasts.map(ep => (
                  <div
                    key={ep.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-emerald-300 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-1 rounded bg-emerald-100 text-[#064E3B] font-mono font-bold text-xs">
                          {ep.episode_number || 'EP'}
                        </span>
                        <div>
                          <h3 className="font-bold text-[#064E3B] text-sm">
                            {ep.title}
                          </h3>
                          <p className="text-[11px] text-slate-500">
                            Speaker: {ep.speaker_or_guest || 'Timi Ani'} · {ep.published_date} · {ep.duration || '25 min'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {ep.youtube_url && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 flex items-center gap-1">
                            <span>YouTube Video</span>
                          </span>
                        )}
                        {ep.audio_url && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <Mic className="w-3 h-3 text-emerald-600" />
                            <span>Audio Track</span>
                          </span>
                        )}

                        <button
                          onClick={() => openEditPodcast(ep)}
                          className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                          title="Edit Episode"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete podcast "${ep.title}"?`)) {
                              deletePodcast(ep.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Episode"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ep.description}
                    </p>

                    {/* Quick Player Bar */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
                      {ep.audio_url && (
                        <div className="flex-1 min-w-[200px]">
                          <audio controls className="w-full h-8" src={ep.audio_url} />
                        </div>
                      )}

                      {ep.youtube_url && (
                        <a
                          href={ep.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] transition-colors shadow-2xs"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Watch on YouTube</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {podcasts.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 space-y-2">
                    <Headphones className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-500 font-medium">
                      No podcast episodes added yet. Click &quot;New Podcast Episode&quot; above to upload your first audio track or YouTube link.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: WEBSITE PAGES & SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#064E3B]">
                    Website Content & CMS
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Edit the Homepage sections, "What We Do", Founder details, and call-to-actions directly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset content to academy initial defaults?')) {
                      resetToDefaults();
                    }
                  }}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-red-600 bg-white border border-slate-200 rounded-lg flex items-center gap-1.5 self-start shadow-2xs hover:bg-red-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Defaults</span>
                </button>
              </div>

              {/* 1. HERO SECTION */}
              <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-2.5">
                  <h3 className="font-bold text-[#064E3B] text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Hero Section Copy & Action Buttons</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Homepage Top
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kicker Pill Badge
                    </label>
                    <input
                      type="text"
                      value={siteSettings.hero_badge_text || ''}
                      onChange={e => updateSiteSettings({ hero_badge_text: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Church Media Academy · Nigeria"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={siteSettings.hero_cta_primary || ''}
                      onChange={e => updateSiteSettings({ hero_cta_primary: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="EXPLORE TRAINING"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Secondary Button Text
                    </label>
                    <input
                      type="text"
                      value={siteSettings.hero_cta_secondary || ''}
                      onChange={e => updateSiteSettings({ hero_cta_secondary: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="BOOK TRAINING"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={siteSettings.hero_headline || ''}
                    onChange={e => updateSiteSettings({ hero_headline: e.target.value })}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold text-[#064E3B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hero Subtitle / Supporting Proposition
                  </label>
                  <textarea
                    rows={2}
                    value={siteSettings.hero_subheading || ''}
                    onChange={e => updateSiteSettings({ hero_subheading: e.target.value })}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* 2. KEY STATS STRIP */}
              <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-2.5">
                  <h3 className="font-bold text-[#064E3B] text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Homepage Key Stats (4 Metrics)</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Stats Strip
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500">Stat 1</span>
                    <input
                      type="text"
                      value={siteSettings.stat_1_number || ''}
                      onChange={e => updateSiteSettings({ stat_1_number: e.target.value })}
                      placeholder="50+"
                      className="w-full p-1.5 text-xs font-bold border border-slate-300 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={siteSettings.stat_1_label || ''}
                      onChange={e => updateSiteSettings({ stat_1_label: e.target.value })}
                      placeholder="Churches Equipped"
                      className="w-full p-1.5 text-xs border border-slate-300 rounded bg-white text-slate-600"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500">Stat 2</span>
                    <input
                      type="text"
                      value={siteSettings.stat_2_number || ''}
                      onChange={e => updateSiteSettings({ stat_2_number: e.target.value })}
                      placeholder="8"
                      className="w-full p-1.5 text-xs font-bold border border-slate-300 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={siteSettings.stat_2_label || ''}
                      onChange={e => updateSiteSettings({ stat_2_label: e.target.value })}
                      placeholder="Training Tracks"
                      className="w-full p-1.5 text-xs border border-slate-300 rounded bg-white text-slate-600"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500">Stat 3</span>
                    <input
                      type="text"
                      value={siteSettings.stat_3_number || ''}
                      onChange={e => updateSiteSettings({ stat_3_number: e.target.value })}
                      placeholder="100%"
                      className="w-full p-1.5 text-xs font-bold border border-slate-300 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={siteSettings.stat_3_label || ''}
                      onChange={e => updateSiteSettings({ stat_3_label: e.target.value })}
                      placeholder="Hands-On Practical"
                      className="w-full p-1.5 text-xs border border-slate-300 rounded bg-white text-slate-600"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500">Stat 4</span>
                    <input
                      type="text"
                      value={siteSettings.stat_4_number || ''}
                      onChange={e => updateSiteSettings({ stat_4_number: e.target.value })}
                      placeholder="30-Day"
                      className="w-full p-1.5 text-xs font-bold border border-slate-300 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={siteSettings.stat_4_label || ''}
                      onChange={e => updateSiteSettings({ stat_4_label: e.target.value })}
                      placeholder="Mentorship Follow-up"
                      className="w-full p-1.5 text-xs border border-slate-300 rounded bg-white text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* 3. WHAT WE DO SECTION */}
              <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-2.5">
                  <h3 className="font-bold text-[#064E3B] text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>"What We Do" Section Header</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('training')}
                    className="text-[11px] font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>Manage the 8 Training Tracks & Topics →</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      value={siteSettings.what_we_do_badge || ''}
                      onChange={e => updateSiteSettings({ what_we_do_badge: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Our Focus"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={siteSettings.what_we_do_title || ''}
                      onChange={e => updateSiteSettings({ what_we_do_title: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
                      placeholder="What We Do"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Section Subtitle / Description
                    </label>
                    <input
                      type="text"
                      value={siteSettings.what_we_do_subtitle || ''}
                      onChange={e => updateSiteSettings({ what_we_do_subtitle: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Practical, hands-on training tracks for church media departments:"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                  💡 Note: The tracks listed under "What We Do" automatically update whenever you add, edit, or publish tracks in the <strong>Training Programmes</strong> tab above.
                </p>
              </div>

              {/* 4. FOUNDER SECTION */}
              <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-2.5">
                  <h3 className="font-bold text-[#064E3B] text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Founder Spotlight (Timi Ani)</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Homepage Bio Card
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Founder Name
                    </label>
                    <input
                      type="text"
                      value={siteSettings.founder_name || ''}
                      onChange={e => updateSiteSettings({ founder_name: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={siteSettings.founder_section_heading || ''}
                      onChange={e => updateSiteSettings({ founder_section_heading: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-semibold"
                      placeholder="Meet the Founder: Timi Ani"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Founder Title & Credentials
                  </label>
                  <input
                    type="text"
                    value={siteSettings.founder_title || ''}
                    onChange={e => updateSiteSettings({ founder_title: e.target.value })}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Homepage Summary Text (Concise)
                  </label>
                  <textarea
                    rows={2}
                    value={siteSettings.founder_summary || ''}
                    onChange={e => updateSiteSettings({ founder_summary: e.target.value })}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                    <span className="text-[11px] font-bold text-slate-600 block">Approach Point 1</span>
                    <input
                      type="text"
                      value={siteSettings.founder_point_1_title || ''}
                      onChange={e => updateSiteSettings({ founder_point_1_title: e.target.value })}
                      placeholder="Ministry-First Approach"
                      className="w-full p-1.5 text-xs font-bold border border-slate-300 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={siteSettings.founder_point_1_desc || ''}
                      onChange={e => updateSiteSettings({ founder_point_1_desc: e.target.value })}
                      placeholder="Equipping media volunteers as ministers in the sanctuary."
                      className="w-full p-1.5 text-xs border border-slate-300 rounded bg-white text-slate-600"
                    />
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                    <span className="text-[11px] font-bold text-slate-600 block">Approach Point 2</span>
                    <input
                      type="text"
                      value={siteSettings.founder_point_2_title || ''}
                      onChange={e => updateSiteSettings({ founder_point_2_title: e.target.value })}
                      placeholder="Hands-On Sanctuary Practice"
                      className="w-full p-1.5 text-xs font-bold border border-slate-300 rounded bg-white"
                    />
                    <input
                      type="text"
                      value={siteSettings.founder_point_2_desc || ''}
                      onChange={e => updateSiteSettings({ founder_point_2_desc: e.target.value })}
                      placeholder="Calibrated directly on your church's sound, camera, and display equipment."
                      className="w-full p-1.5 text-xs border border-slate-300 rounded bg-white text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Biography (Used on About Page)
                  </label>
                  <textarea
                    rows={3}
                    value={siteSettings.founder_bio || ''}
                    onChange={e => updateSiteSettings({ founder_bio: e.target.value })}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* 5. CALL TO ACTION BANNER */}
              <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-2.5">
                  <h3 className="font-bold text-[#064E3B] text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Bottom Call to Action Banner</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Homepage Footer Banner
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={siteSettings.cta_banner_title || ''}
                    onChange={e => updateSiteSettings({ cta_banner_title: e.target.value })}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold text-[#064E3B]"
                    placeholder="READY TO EQUIP YOUR CHURCH MEDIA TEAM?"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Banner Subtitle / Supporting Pitch
                  </label>
                  <input
                    type="text"
                    value={siteSettings.cta_banner_text || ''}
                    onChange={e => updateSiteSettings({ cta_banner_text: e.target.value })}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Transform your audio clarity, livestream broadcast, and sermon visuals with practical on-site training."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={siteSettings.cta_banner_btn_primary || ''}
                      onChange={e => updateSiteSettings({ cta_banner_btn_primary: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-semibold"
                      placeholder="BOOK TRAINING"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Secondary Button Text
                    </label>
                    <input
                      type="text"
                      value={siteSettings.cta_banner_btn_secondary || ''}
                      onChange={e => updateSiteSettings({ cta_banner_btn_secondary: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-semibold"
                      placeholder="CONTACT US"
                    />
                  </div>
                </div>
              </div>

              {/* 6. CONTACT & LOCATION CHANNELS */}
              <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-2.5">
                  <h3 className="font-bold text-[#064E3B] text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Contact Channels & Location</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    Site-Wide
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={siteSettings.phone || ''}
                      onChange={e => updateSiteSettings({ phone: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Email
                    </label>
                    <input
                      type="email"
                      value={siteSettings.email || ''}
                      onChange={e => updateSiteSettings({ email: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Location / Region
                    </label>
                    <input
                      type="text"
                      value={siteSettings.location || ''}
                      onChange={e => updateSiteSettings({ location: e.target.value })}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Save notification */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All edits are automatically saved and active immediately across the public website.</span>
              </div>
            </div>
          )}

          {/* TAB 7: SUPABASE & SQL SETUP */}
          {activeTab === 'supabase' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div>
                <h1 className="text-2xl font-extrabold text-[#064E3B]">
                  Supabase Backend & Database Setup
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Connect your live Supabase project for persistent cloud storage and authentication.
                </p>
              </div>

              {/* Status Box */}
              <div
                className={`p-6 rounded-xl border ${
                  isSupabaseActive
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                } space-y-4`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-3.5 h-3.5 rounded-full ${
                        isSupabaseActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                      }`}
                    />
                    <div>
                      <h3 className="font-extrabold text-base text-[#064E3B]">
                        {isSupabaseActive
                          ? 'Supabase Cloud Connected & Ready'
                          : 'Running in Local Storage Sandbox Mode'}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Connected to project <span className="font-mono text-emerald-800 font-semibold">svxobflhnvaoyityxvpr</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={runConnectionTest}
                    disabled={testStatus.testing}
                    className="self-start sm:self-auto px-3.5 py-2 text-xs font-bold rounded-lg bg-[#064E3B] text-white hover:bg-emerald-800 flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testStatus.testing ? 'animate-spin' : ''}`} />
                    <span>{testStatus.testing ? 'Testing Endpoint...' : 'Test Connection'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-white/80 p-3.5 rounded-lg border border-emerald-200/60 font-mono">
                  <div>
                    <span className="text-slate-500 text-[11px] block font-sans font-semibold">Project Endpoint</span>
                    <span className="text-[#064E3B] font-semibold break-all">https://svxobflhnvaoyityxvpr.supabase.co</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block font-sans font-semibold">Publishable Key</span>
                    <span className="text-emerald-700 font-semibold break-all">sb_publishable_Bpfjrhret1...-jPJ</span>
                  </div>
                </div>

                {testStatus.message && (
                  <div
                    className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                      testStatus.success
                        ? 'bg-emerald-100/90 text-emerald-900 border border-emerald-300'
                        : 'bg-red-50 text-red-900 border border-red-200'
                    }`}
                  >
                    <Activity className="w-4 h-4 shrink-0" />
                    <span>{testStatus.message}</span>
                  </div>
                )}
              </div>

              {/* 3 Step Integration Guide */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="font-bold text-slate-800 text-base">
                  How to Connect Your Supabase Project (3 Easy Steps):
                </h3>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                    <p className="font-bold text-[#064E3B]">
                      Step 1: Run the Database Schema in Supabase
                    </p>
                    <p className="text-slate-600">
                      Open your Supabase project dashboard, navigate to the <strong>SQL Editor</strong> tab on the left, and paste the schema below. Click <strong>RUN</strong> to create all tables and security policies.
                    </p>
                    <button
                      onClick={copySchemaToClipboard}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#064E3B] text-white hover:bg-[#1b3a5a] flex items-center gap-2 transition-colors mt-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedSQL ? 'SQL Copied to Clipboard!' : 'Copy SQL Schema Script'}</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg space-y-1">
                    <p className="font-bold text-[#064E3B]">
                      Step 2: Add Your Supabase Keys to Environment
                    </p>
                    <p className="text-slate-600">
                      In your project root, set the following two variables in your environment or <code className="bg-slate-200 px-1 py-0.5 rounded">.env</code>:
                    </p>
                    <div className="font-mono text-[11px] bg-slate-900 text-sky-300 p-3 rounded-lg overflow-x-auto mt-2">
                      VITE_SUPABASE_URL=https://your-project-id.supabase.co<br />
                      VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg space-y-1">
                    <p className="font-bold text-[#064E3B]">
                      Step 3: Create Timi Ani&apos;s Administrator Account
                    </p>
                    <p className="text-slate-600">
                      In the Supabase dashboard, navigate to <strong>Authentication → Users</strong> and click <strong>Add User</strong>. Create Timi Ani&apos;s account (e.g. <code>anifowosetimileyinemmanuel@gmail.com</code>). You can now sign in directly!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
