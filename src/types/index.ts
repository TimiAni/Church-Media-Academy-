export type EnquiryStatus =
  | 'New'
  | 'Contacted'
  | 'In Discussion'
  | 'Confirmed'
  | 'Completed'
  | 'Closed';

export interface GalleryImage {
  id: string;
  album_id: string;
  image_url: string;
  title: string;
  caption?: string;
  is_cover: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  event_name: string;
  event_date: string;
  description: string;
  cover_url: string;
  category: 'Training Workshop' | 'Church Conference' | 'Live Production' | 'Technical Operation' | 'General';
  is_published: boolean;
  created_at: string;
  images: GalleryImage[];
}

export interface TrainingProgram {
  id: string;
  title: string;
  category: string;
  description: string;
  topics: string[];
  image_url?: string;
  is_published: boolean;
  sort_order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  icon_name: string;
  deliverables: string[];
  is_published: boolean;
  sort_order: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  client_or_church: string;
  image_url?: string;
  external_link?: string;
  completion_date: string;
  is_published: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  is_published: boolean;
  sort_order: number;
}

export interface Enquiry {
  id: string;
  full_name: string;
  organization: string;
  phone: string;
  email: string;
  location: string;
  request_type: 'Training Workshop' | 'Professional Service' | 'Consultation' | 'Custom Request';
  topic_or_service: string;
  format: 'On-site (At Church)' | 'Online / Virtual' | 'Hybrid' | 'Flexible';
  preferred_date?: string;
  additional_info: string;
  status: EnquiryStatus;
  created_at: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  episode_number?: string;
  description: string;
  audio_url?: string;       // Direct audio URL or uploaded mp3/m4a
  youtube_url?: string;     // YouTube link or embed URL
  duration?: string;        // e.g. "24:15"
  published_date: string;   // e.g. "2026-10-10"
  speaker_or_guest?: string;// e.g. "Timi Ani"
  cover_image?: string;
  is_published: boolean;
  sort_order: number;
}

export interface SiteSettings {
  brand_name: string;
  tagline: string;
  founder_name: string;
  founder_title: string;
  founder_bio: string;
  founder_image: string;
  email: string;
  phone: string;
  whatsapp_url: string;
  location: string;
  
  // Hero Section
  hero_badge_text: string;
  hero_headline: string;
  hero_subheading: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  
  // Key Stats Strip
  stat_1_number: string;
  stat_1_label: string;
  stat_2_number: string;
  stat_2_label: string;
  stat_3_number: string;
  stat_3_label: string;
  stat_4_number: string;
  stat_4_label: string;
  
  // What We Do Section
  what_we_do_badge: string;
  what_we_do_title: string;
  what_we_do_subtitle: string;
  
  // Founder Feature Section
  founder_section_badge: string;
  founder_section_heading: string;
  founder_summary: string;
  founder_point_1_title: string;
  founder_point_1_desc: string;
  founder_point_2_title: string;
  founder_point_2_desc: string;
  
  // Bottom Call To Action Banner
  cta_banner_title: string;
  cta_banner_text: string;
  cta_banner_btn_primary: string;
  cta_banner_btn_secondary: string;

  // About Page Mission / Vision / Philosophy
  about_mission: string;
  about_vision: string;
  about_philosophy: string;
}
