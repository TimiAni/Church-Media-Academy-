import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  GalleryAlbum,
  GalleryImage,
  TrainingProgram,
  ServiceItem,
  FAQItem,
  SiteSettings,
  Enquiry,
  EnquiryStatus,
  PodcastEpisode
} from '../types';
import {
  initialSiteSettings,
  initialTrainingPrograms,
  initialServices,
  initialGalleryAlbums,
  initialFAQs,
  initialEnquiries,
  initialPodcastEpisodes
} from './initialData';
import { supabase, isSupabaseConfigured } from './supabase';

interface CMSContextType {
  siteSettings: SiteSettings;
  trainingPrograms: TrainingProgram[];
  services: ServiceItem[];
  galleryAlbums: GalleryAlbum[];
  faqs: FAQItem[];
  enquiries: Enquiry[];
  podcasts: PodcastEpisode[];
  adminUser: { email: string; isAuthenticated: boolean } | null;
  isSupabaseActive: boolean;
  
  // Settings operations
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  // Training operations
  addTrainingProgram: (prog: Omit<TrainingProgram, 'id'>) => void;
  updateTrainingProgram: (id: string, prog: Partial<TrainingProgram>) => void;
  deleteTrainingProgram: (id: string) => void;

  // Services operations
  addService: (svc: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, svc: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Gallery operations
  createAlbum: (album: Omit<GalleryAlbum, 'id' | 'created_at' | 'images'>) => string;
  updateAlbum: (id: string, album: Partial<GalleryAlbum>) => void;
  deleteAlbum: (id: string) => void;
  addImageToAlbum: (albumId: string, image: Omit<GalleryImage, 'id' | 'album_id' | 'created_at'>) => void;
  updateImage: (albumId: string, imageId: string, image: Partial<GalleryImage>) => void;
  deleteImage: (albumId: string, imageId: string) => void;

  // Podcast operations
  addPodcast: (podcast: Omit<PodcastEpisode, 'id'>) => void;
  updatePodcast: (id: string, podcast: Partial<PodcastEpisode>) => void;
  deletePodcast: (id: string) => void;

  // Enquiry operations
  submitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'status' | 'created_at'>) => Promise<{ success: boolean; enquiryId: string }>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  deleteEnquiry: (id: string) => void;

  // Auth operations
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginDemoAdmin: () => void;
  logoutAdmin: () => void;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  SETTINGS: 'cma_site_settings',
  PROGRAMS: 'cma_training_programs',
  SERVICES: 'cma_services',
  ALBUMS: 'cma_gallery_albums',
  FAQS: 'cma_faqs',
  ENQUIRIES: 'cma_enquiries',
  PODCASTS: 'cma_podcasts',
  ADMIN_SESSION: 'cma_admin_session'
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
      return saved ? { ...initialSiteSettings, ...JSON.parse(saved) } : initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PROGRAMS);
      return saved ? JSON.parse(saved) : initialTrainingPrograms;
    } catch {
      return initialTrainingPrograms;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : initialServices;
    } catch {
      return initialServices;
    }
  });

  const [galleryAlbums, setGalleryAlbums] = useState<GalleryAlbum[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ALBUMS);
      return saved ? JSON.parse(saved) : initialGalleryAlbums;
    } catch {
      return initialGalleryAlbums;
    }
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : initialFAQs;
    } catch {
      return initialFAQs;
    }
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ENQUIRIES);
      return saved ? JSON.parse(saved) : initialEnquiries;
    } catch {
      return initialEnquiries;
    }
  });

  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PODCASTS);
      return saved ? JSON.parse(saved) : initialPodcastEpisodes;
    } catch {
      return initialPodcastEpisodes;
    }
  });

  const [adminUser, setAdminUser] = useState<{ email: string; isAuthenticated: boolean } | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ADMIN_SESSION);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Local storage persistence
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [siteSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PROGRAMS, JSON.stringify(trainingPrograms));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [trainingPrograms]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ALBUMS, JSON.stringify(galleryAlbums));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [galleryAlbums]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.FAQS, JSON.stringify(faqs));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PODCASTS, JSON.stringify(podcasts));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [podcasts]);

  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(adminUser));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.ADMIN_SESSION);
      }
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [adminUser]);

  // Check Supabase session if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setAdminUser({
            email: session.user.email || 'admin@churchmediaacademy.org',
            isAuthenticated: true
          });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setAdminUser({
            email: session.user.email || 'admin@churchmediaacademy.org',
            isAuthenticated: true
          });
        } else if (!localStorage.getItem(LOCAL_STORAGE_KEYS.ADMIN_SESSION)) {
          setAdminUser(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  // CRUD actions
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
  };

  const addTrainingProgram = (prog: Omit<TrainingProgram, 'id'>) => {
    const newProg: TrainingProgram = {
      ...prog,
      id: `tp-${Date.now()}`
    };
    setTrainingPrograms(prev => [newProg, ...prev]);
  };

  const updateTrainingProgram = (id: string, updated: Partial<TrainingProgram>) => {
    setTrainingPrograms(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteTrainingProgram = (id: string) => {
    setTrainingPrograms(prev => prev.filter(p => p.id !== id));
  };

  const addService = (svc: Omit<ServiceItem, 'id'>) => {
    const newSvc: ServiceItem = {
      ...svc,
      id: `srv-${Date.now()}`
    };
    setServices(prev => [newSvc, ...prev]);
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const createAlbum = (albumData: Omit<GalleryAlbum, 'id' | 'created_at' | 'images'>) => {
    const newId = `alb-${Date.now()}`;
    const newAlbum: GalleryAlbum = {
      ...albumData,
      id: newId,
      created_at: new Date().toISOString(),
      images: []
    };
    setGalleryAlbums(prev => [newAlbum, ...prev]);
    return newId;
  };

  const updateAlbum = (id: string, updated: Partial<GalleryAlbum>) => {
    setGalleryAlbums(prev => prev.map(a => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteAlbum = (id: string) => {
    setGalleryAlbums(prev => prev.filter(a => a.id !== id));
  };

  const addImageToAlbum = (
    albumId: string,
    image: Omit<GalleryImage, 'id' | 'album_id' | 'created_at'>
  ) => {
    const newImg: GalleryImage = {
      ...image,
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      album_id: albumId,
      created_at: new Date().toISOString()
    };
    setGalleryAlbums(prev =>
      prev.map(a => {
        if (a.id !== albumId) return a;
        const updatedImages = [...a.images, newImg];
        const coverUrl = newImg.is_cover || !a.cover_url ? newImg.image_url : a.cover_url;
        return {
          ...a,
          cover_url: coverUrl,
          images: updatedImages
        };
      })
    );
  };

  const updateImage = (albumId: string, imageId: string, updated: Partial<GalleryImage>) => {
    setGalleryAlbums(prev =>
      prev.map(a => {
        if (a.id !== albumId) return a;
        const updatedImages = a.images.map(img => (img.id === imageId ? { ...img, ...updated } : img));
        return {
          ...a,
          images: updatedImages
        };
      })
    );
  };

  const deleteImage = (albumId: string, imageId: string) => {
    setGalleryAlbums(prev =>
      prev.map(a => {
        if (a.id !== albumId) return a;
        const filtered = a.images.filter(img => img.id !== imageId);
        return {
          ...a,
          images: filtered
        };
      })
    );
  };

  // Podcast CRUD actions
  const addPodcast = (podcastData: Omit<PodcastEpisode, 'id'>) => {
    const newPodcast: PodcastEpisode = {
      ...podcastData,
      id: `pod-${Date.now()}`
    };
    setPodcasts(prev => [newPodcast, ...prev]);
  };

  const updatePodcast = (id: string, updated: Partial<PodcastEpisode>) => {
    setPodcasts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deletePodcast = (id: string) => {
    setPodcasts(prev => prev.filter(p => p.id !== id));
  };

  const submitEnquiry = async (
    enquiryData: Omit<Enquiry, 'id' | 'status' | 'created_at'>
  ): Promise<{ success: boolean; enquiryId: string }> => {
    const newId = `enq-${Date.now()}`;
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: newId,
      status: 'New',
      created_at: new Date().toISOString()
    };

    setEnquiries(prev => [newEnquiry, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('enquiries').insert([
          {
            full_name: enquiryData.full_name,
            organization: enquiryData.organization,
            phone: enquiryData.phone,
            email: enquiryData.email,
            location: enquiryData.location,
            request_type: enquiryData.request_type,
            topic_or_service: enquiryData.topic_or_service,
            format: enquiryData.format,
            preferred_date: enquiryData.preferred_date || null,
            additional_info: enquiryData.additional_info,
            status: 'New'
          }
        ]);
      } catch (err) {
        console.warn('Supabase enquiry insert error:', err);
      }
    }

    return { success: true, enquiryId: newId };
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus) => {
    setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status } : e)));

    if (isSupabaseConfigured && supabase) {
      supabase.from('enquiries').update({ status }).eq('id', id).then(() => {});
    }
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
  };

  const loginAdmin = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass
        });
        if (error) {
          return { success: false, error: error.message };
        }
        if (data.user) {
          setAdminUser({
            email: data.user.email || email,
            isAuthenticated: true
          });
          return { success: true };
        }
      } catch (err: unknown) {
        return { success: false, error: (err as Error).message || 'Authentication error' };
      }
    }

    // Demo admin check when Supabase is not yet plugged in
    if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('timi')) {
      if (pass.length >= 4) {
        setAdminUser({
          email,
          isAuthenticated: true
        });
        return { success: true };
      }
      return { success: false, error: 'Password must be at least 4 characters for demo authentication.' };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. (Tip: In demo mode, use timi@churchmediaacademy.org or click Quick Demo Sign-In)'
    };
  };

  const loginDemoAdmin = () => {
    setAdminUser({
      email: 'timi@churchmediaacademy.org',
      isAuthenticated: true
    });
  };

  const logoutAdmin = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut().catch(() => {});
    }
    setAdminUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ADMIN_SESSION);
  };

  const resetToDefaults = () => {
    setSiteSettings(initialSiteSettings);
    setTrainingPrograms(initialTrainingPrograms);
    setServices(initialServices);
    setGalleryAlbums(initialGalleryAlbums);
    setFaqs(initialFAQs);
    setEnquiries(initialEnquiries);
    setPodcasts(initialPodcastEpisodes);
    localStorage.clear();
  };

  return (
    <CMSContext.Provider
      value={{
        siteSettings,
        trainingPrograms,
        services,
        galleryAlbums,
        faqs,
        enquiries,
        podcasts,
        adminUser,
        isSupabaseActive: isSupabaseConfigured,
        updateSiteSettings,
        addTrainingProgram,
        updateTrainingProgram,
        deleteTrainingProgram,
        addService,
        updateService,
        deleteService,
        createAlbum,
        updateAlbum,
        deleteAlbum,
        addImageToAlbum,
        updateImage,
        deleteImage,
        addPodcast,
        updatePodcast,
        deletePodcast,
        submitEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        loginAdmin,
        loginDemoAdmin,
        logoutAdmin,
        resetToDefaults
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
