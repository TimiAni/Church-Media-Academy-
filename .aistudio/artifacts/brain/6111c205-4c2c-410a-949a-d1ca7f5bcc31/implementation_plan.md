# Church Media Academy — Website, Admin Dashboard & CMS

A modern, mobile-responsive web platform and Content Management System for Church Media Academy, founded by Timi Ani (Anifowose Timileyin Emmanuel) in Nigeria. The platform equips churches with media training, showcases professional creative and broadcast services, presents training event photograph albums with a lightbox, and empowers the administrator to manage all content without code.

---

> [!IMPORTANT] 
> **Architecture & Credentials Strategy**:
> - **Dual-Mode Persistence**: The application integrates natively with Supabase (`@supabase/supabase-js`) for Authentication, PostgreSQL tables, Row Level Security (RLS), and Storage. When Supabase environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are missing, the app gracefully switches to an active LocalStorage fallback with realistic initial academy records, so you can explore and manage everything immediately in the preview without broken screens.
> - **Instant Supabase Setup Guide & SQL Schema**: An exportable, production-ready `schema.sql` file will be provided in the codebase and accessible directly within the Admin Settings view, including table structures, RLS policies, and Storage bucket configurations.
> - **Authentication Safeguard**: Public user self-registration is strictly disabled. Authentication supports Supabase Email/Password, with a clean Demo Admin toggle enabled in the development preview for quick evaluation.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a dedicated, high-converting digital front door for Church Media Academy. Visitors explore 8 foundational training tracks, request tailored church media workshops, browse event photograph albums with an interactive lightbox, view professional production services, and submit booking enquiries with prefilled WhatsApp routing. An authenticated Admin Dashboard enables the founder to create albums, upload photographs, edit website text, manage training tracks, and update enquiry statuses directly from a phone, tablet, or desktop.
- **Target Audience**: Church pastors, media directors, sound engineers, church communication teams, Christian ministries, and creative volunteers across Nigeria and worldwide.
- **Key Value**: Bridges the technical and creative gap in modern church ministry, turning training inquiries into bookings while giving Timi Ani full control over his academy's content and portfolio without technical friction.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Color Palette**:
  - Primary Navy Blue: `#102A43` (Deep, authoritative header & primary brand headings)
  - Sky Blue: `#38BDF8` (High-intent interactive highlights, active tabs, buttons)
  - Ice Blue: `#F0F9FF` (Light, crisp background washes for contrast sections)
  - Dark Slate: `#334155` (High-contrast, legible body text)
  - Muted Slate: `#64748B` (Secondary descriptions, dates, unboxed metadata)
  - Light Border: `#E2E8F0` (Hairline structural cards and table dividers)
- **Typography**: Plus Jakarta Sans / Manrope paired with tabular figures (`tabular-nums`) for metrics, event dates, and counts.
- **Anti-Slop Restraint**: Zero floating pill boxes on static metadata (clean unboxed text with `·` separators), no mechanical `//` comments, clean single-elevation cards with hairline borders, and strict 60-30-10 color balance.

### Public Routes & User Flow
1. **Homepage (`/`)**:
   - *Hero Section*: Dominant headline ("EMPOWERING CHURCHES THROUGH MEDIA, CREATIVITY & TECHNOLOGY"), value proposition, primary action buttons ("Explore Training", "Book Training", "Chat on WhatsApp"), and key trust metrics.
   - *What We Do*: 8 concise training categories with bespoke visual icons and deep links.
   - *Professional Services*: 6 service spotlights (Graphic Design, Photography/Video, Live Streaming, Web Management, Social Media, Digital Consultation).
   - *Gallery Preview*: Recent published albums with cover photographs, dates, and "View All Gallery" button.
   - *About the Founder*: Spotlight on Timi Ani (Founder & Lead Trainer | Church Media Educator | Digital Ministry Trainer).
   - *Final CTA*: "Ready to equip your church media team?" with direct booking and contact triggers.
2. **About Page (`/about`)**:
   - The Academy's mission, vision, and core training philosophy.
   - Detailed biography of Timi Ani, his ministry background, and contact points.
3. **Training Programmes (`/training-sessions`)**:
   - The 8 core programmes:
     1. Graphic Design, Branding & Church Publicity, Church Website Design & Management
     2. Photography, Videography & Video Editing
     3. Live Streaming, Sound & Broadcast Production
     4. Church Projection, Presentation & Media Applications
     5. Social Media, Digital Marketing & Online Evangelism
     6. ICT, AI Tools & Digital Productivity
     7. Media Team Management & Technical Operations
     8. Custom On-Site Church Workshops
   - Topic breakdowns, practical curriculum highlights, and direct "Enquire About This Training" buttons.
4. **Services Page (`/services`)**:
   - Professional agency-grade creative and production services for church conferences, branding overhauls, live stream setups, and media audits.
5. **Gallery Page (`/gallery`)**:
   - Categorized albums (Workshops, Conferences, Practical Sessions, Sound & Broadcast).
   - Album cards with cover image, event name, date, and photo count.
   - Fullscreen Lightbox viewer with Next, Previous, Caption display, and keyboard navigation.
6. **Booking & Enquiries (`/book-training`)**:
   - Interactive booking form capturing: Full Name, Church/Organization, Phone, Email, Location, Request Type, Training Topic/Service, Format (Onsite/Online), Preferred Date, and Details.
   - Dual submission: stores securely in the database AND generates a pre-formatted, URL-encoded WhatsApp message to `+234 703 218 7266`.
   - Clear disclosure explaining confirmation requires mutual arrangement.
7. **Contact Page (`/contact`)**:
   - Official direct channels: Timi Ani contact details, WhatsApp button, Email link, Location card (Nigeria), and quick FAQ triggers.
8. **FAQ Page (`/faq`)**:
   - Searchable accordion answering common questions about logistics, equipment requirements, pricing models, and customized syllabi.
9. **Floating WhatsApp Button**:
   - Persistent, unobtrusive mobile floating button linking directly to `https://wa.me/2347032187266` with polite greeting.

---

## 3. Administrator Dashboard & CMS (`/admin/*`)

### Admin Navigation & Features
- **/admin/login**: Secure authentication using Supabase Auth (Email + Password) with validation, loading spinners, and demo quick-fill for local testing.
- **/admin/dashboard**: Central operational overview:
  - Metric counters: Total Gallery Photos, Published Albums, Active Training Tracks, Total Enquiries, and Unread Requests.
  - Quick action shortcuts: "Upload Photos", "Add Training Track", "Add Service", "Review Enquiries".
- **Gallery Manager**:
  - Create, edit, and delete albums.
  - Upload multiple photographs with image compression / validation.
  - Choose album cover, add captions and event dates, publish/unpublish toggle.
- **Training Programmes CMS**:
  - Add, edit, reorder, publish/unpublish training tracks and curriculum bullet points.
- **Services CMS**:
  - Manage agency offerings, descriptions, deliverables, and service icons.
- **Website Copy & Settings CMS**:
  - Live edit homepage hero headline, founder bio, email, WhatsApp number, and footer notes without code edits.
- **Enquiries Manager**:
  - View full client submission dossiers.
  - Status pipeline: `New` → `Contacted` → `In Discussion` → `Confirmed` → `Completed` → `Closed`.
  - Direct 1-click WhatsApp or Email reply buttons prefilled with the client's name and topic.
- **Supabase Connection & SQL Tools**:
  - Displays connection status (Connected / Local Demo Mode).
  - Copyable 1-click SQL migration snippet to run directly in Supabase SQL Editor.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PUBLIC VISITOR INTERFACE                        │
│  ┌───────────────┐ ┌────────────────┐ ┌─────────────┐ ┌──────────────┐ │
│  │ Homepage (/)  │ │ Programs & Svc │ │ Gallery     │ │ Book Training│ │
│  └───────┬───────┘ └───────┬────────┘ └──────┬──────┘ └──────┬───────┘ │
└──────────┼─────────────────┼─────────────────┼───────────────┼─────────┘
           │                 │                 │               │
           ▼                 ▼                 ▼               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    UNIFIED DATA LAYER (src/lib/cms.ts)                 │
│  - Supabase Client (@supabase/supabase-js)                             │
│  - Reactive LocalStorage Cache & Fallback Store                        │
│  - Realtime Optimistic UI & CRUD Handlers                              │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
               ┌───────────────────┴───────────────────┐
               ▼                                       ▼
┌───────────────────────────────┐     ┌──────────────────────────────────┐
│   SUPABASE CLOUD (If Linked)   │     │      AUTHENTICATED ADMIN CMS     │
│  • Auth: Timi Ani Admin Account│     │  • /admin/dashboard              │
│  • PostgreSQL: 8 Relational Tbl│     │  • Gallery & Multi-photo Upload  │
│  • Storage: 'gallery-images'   │     │  • Programs, Services & FAQ CMS  │
│  • Row Level Security (RLS)    │     │  • Enquiry Status Pipeline       │
└───────────────────────────────┘     └──────────────────────────────────┘
```

### Data Schema Overview
- `gallery_albums`: `id, title, event_name, event_date, description, cover_url, category, is_published, created_at`
- `gallery_images`: `id, album_id, image_url, title, caption, is_cover, is_published, display_order, created_at`
- `training_programs`: `id, title, category, description, topics (text[]), image_url, is_published, sort_order`
- `services`: `id, title, short_description, full_description, icon_name, is_published, sort_order`
- `enquiries`: `id, full_name, organization, phone, email, location, request_type, topic_or_service, format, preferred_date, additional_info, status, created_at`
- `site_settings`: Key-value store for hero text, founder bio, contact details, social links.

---

## 5. Verification & Testing Checklist

1. [ ] **Public Navigation**: Verify seamless transitions across all routes (`/`, `/about`, `/training-sessions`, `/services`, `/gallery`, `/book-training`, `/contact`, `/faq`).
2. [ ] **Brand Consistency**: Confirm Navy Blue `#102A43`, Sky Blue `#38BDF8`, and Ice Blue `#F0F9FF` are applied according to guidelines with zero unstyled elements.
3. [ ] **Responsive Lightbox**: Test gallery album grid and fullscreen lightbox on desktop and mobile viewports.
4. [ ] **Booking Workflow**: Submit a training booking enquiry; verify storage update and WhatsApp prefilled link with all attendee parameters.
5. [ ] **Admin Authentication**: Verify `/admin/login` gates access to `/admin/dashboard` and redirects unauthenticated visitors.
6. [ ] **CMS Operations**: Test adding/editing training sessions, publishing a gallery album, and updating enquiry statuses.
7. [ ] **Supabase Setup Assistance**: Verify that if Supabase keys are not in `.env`, the app gracefully works with full interactive preview and provides the setup instructions + SQL schema.
8. [ ] **Build & Compilation**: Run `compile_applet` and verify zero TypeScript, lint, or Vite bundling errors.
