-- ==============================================================================
-- CHURCH MEDIA ACADEMY: SUPABASE POSTGRESQL SCHEMA & SECURITY POLICIES
-- Brand: Church Media Academy
-- Founder: Anifowose Timileyin Emmanuel (Timi Ani)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE (Key-Value or Singleton Configuration)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TRAINING PROGRAMMES TABLE
CREATE TABLE IF NOT EXISTS public.training_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    topics TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT,
    is_published BOOLEAN DEFAULT true NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROFESSIONAL SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Layers',
    deliverables TEXT[] NOT NULL DEFAULT '{}',
    is_published BOOLEAN DEFAULT true NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. GALLERY ALBUMS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    event_name TEXT NOT NULL,
    event_date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT DEFAULT '',
    cover_url TEXT DEFAULT '',
    category TEXT DEFAULT 'Training Workshop' NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    album_id UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    title TEXT DEFAULT '',
    caption TEXT DEFAULT '',
    is_cover BOOLEAN DEFAULT false NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PORTFOLIO PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    client_or_church TEXT NOT NULL,
    image_url TEXT,
    external_link TEXT,
    completion_date DATE DEFAULT CURRENT_DATE,
    is_published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. BOOKING & TRAINING ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    organization TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    location TEXT NOT NULL,
    request_type TEXT NOT NULL DEFAULT 'Training Workshop',
    topic_or_service TEXT NOT NULL,
    format TEXT NOT NULL DEFAULT 'On-site (At Church)',
    preferred_date TEXT,
    additional_info TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Discussion', 'Confirmed', 'Completed', 'Closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. FREQUENTLY ASKED QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General' NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES: Anyone can read published items
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Public read published training_programs" ON public.training_programs 
    FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public read published services" ON public.services 
    FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public read published albums" ON public.gallery_albums 
    FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public read published gallery images" ON public.gallery_images 
    FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public read published portfolio" ON public.portfolio_projects 
    FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Public read published faqs" ON public.faqs 
    FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

-- PUBLIC WRITE POLICY FOR ENQUIRIES: Visitors can submit an enquiry, but NEVER read other people's records
CREATE POLICY "Public insert enquiries" ON public.enquiries 
    FOR INSERT WITH CHECK (true);

-- ADMIN POLICIES: Authenticated administrators can manage everything
CREATE POLICY "Admin manage site_settings" ON public.site_settings 
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage training_programs" ON public.training_programs 
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage services" ON public.services 
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage gallery_albums" ON public.gallery_albums 
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage gallery_images" ON public.gallery_images 
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage portfolio" ON public.portfolio_projects 
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin read and update enquiries" ON public.enquiries 
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage faqs" ON public.faqs 
    FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================================================
-- STORAGE CONFIGURATION (Supabase Storage: 'gallery-photos')
-- ==============================================================================
-- Run this in SQL Editor to create public bucket:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery-photos', 'gallery-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public read, Authenticated upload & delete
CREATE POLICY "Public can view gallery photos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'gallery-photos');

CREATE POLICY "Authenticated users can upload photos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'gallery-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update/delete photos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'gallery-photos' AND auth.role() = 'authenticated');
