import { GalleryAlbum, TrainingProgram, ServiceItem, FAQItem, SiteSettings, Enquiry, PodcastEpisode } from '../types';

export const initialSiteSettings: SiteSettings = {
  brand_name: 'CHURCH MEDIA ACADEMY',
  tagline: 'Equipping the Church. Empowering the Media.',
  founder_name: 'Anifowose Timileyin Emmanuel',
  founder_title: 'Founder & Lead Trainer | Church Media Educator | Digital Ministry Trainer',
  founder_bio: 'Anifowose Timileyin Emmanuel (affectionately known as Timi Ani) is a passionate Church Media Educator, Lead Trainer, and Digital Ministry Consultant dedicated to empowering local assemblies, ministries, and volunteers with the technical competence, spiritual sensitivity, and creative excellence required for contemporary ministry. Over the years, Timi Ani has trained hundreds of church media operators across sound engineering, multicam broadcast, church graphics, and digital evangelism.',
  founder_image: '',
  email: 'anifowosetimileyinemmanuel@gmail.com',
  phone: '+234 703 218 7266',
  whatsapp_url: 'https://wa.me/2347032187266',
  location: 'Nigeria',
  hero_badge_text: 'Church Media Academy · Nigeria',
  hero_headline: 'EMPOWERING CHURCHES THROUGH MEDIA, CREATIVITY & TECHNOLOGY.',
  hero_subheading: 'Practical media training and digital technical skills for churches and Christian organizations.',
  hero_cta_primary: 'EXPLORE TRAINING',
  hero_cta_secondary: 'BOOK TRAINING',
  
  stat_1_number: '50+',
  stat_1_label: 'Churches Equipped',
  stat_2_number: '8',
  stat_2_label: 'Training Tracks',
  stat_3_number: '100%',
  stat_3_label: 'Hands-On Practical',
  stat_4_number: '30-Day',
  stat_4_label: 'Mentorship Follow-up',

  what_we_do_badge: 'Our Focus',
  what_we_do_title: 'What We Do',
  what_we_do_subtitle: 'Practical, hands-on training tracks for church media departments:',

  founder_section_badge: 'Founder & Lead Trainer',
  founder_section_heading: 'Meet the Founder: Timi Ani',
  founder_summary: 'Anifowose Timileyin Emmanuel (Timi Ani) equips churches with practical technical training and creative excellence.',
  founder_point_1_title: 'Ministry-First Approach',
  founder_point_1_desc: 'Equipping media volunteers as ministers in the sanctuary.',
  founder_point_2_title: 'Hands-On Sanctuary Practice',
  founder_point_2_desc: "Calibrated directly on your church's sound, camera, and display equipment.",

  cta_banner_title: 'READY TO EQUIP YOUR CHURCH MEDIA TEAM?',
  cta_banner_text: 'Transform your audio clarity, livestream broadcast, and sermon visuals with practical on-site training.',
  cta_banner_btn_primary: 'BOOK TRAINING',
  cta_banner_btn_secondary: 'CONTACT US',

  about_mission: 'To equip Christian ministries and church technical teams with practical, high-standard media skills that amplify the Gospel message without technical distraction.',
  about_vision: 'A global body of Christ where every church assembly, irrespective of size, delivers media, sound, and visual communication with spiritual clarity and professional excellence.',
  about_philosophy: 'Media in the church is not mere entertainment or background technicality—it is digital stewardship and modern evangelism. When sound is clean, projection is readable, and visual design is inspiring, the Gospel is communicated without barriers.'
};

export const initialTrainingPrograms: TrainingProgram[] = [
  {
    id: 'tp-1',
    title: 'Graphic Design, Branding & Church Publicity, Church Website Design & Management',
    category: 'Creative & Digital Presence',
    description: 'Master sermon series artwork, visual identity systems, typography, bulletin layout, and building low-maintenance, secure church websites.',
    topics: [
      'Visual hierarchy and typography for church publicity',
      'Canva & Photoshop workflows for fast turnaround',
      'Sermon series branding and social media carousels',
      'Church website fundamentals, domain setup & sermon archiving',
      'Content management without coding for church secretariats'
    ],
    is_published: true,
    sort_order: 1
  },
  {
    id: 'tp-2',
    title: 'Photography, Videography & Video Editing',
    category: 'Visual Media Production',
    description: 'Capture authentic worship moments and create compelling short-form recap reels, testimony features, and promotional ministry videos.',
    topics: [
      'Sanctuary low-light camera settings and aperture control',
      'Framing worship, prayer moments, and pastor sermons respectfully',
      'Multi-angle video recording and stabilizer handling',
      'CapCut and Premiere Pro video editing workflows',
      'Color grading, audio synchronization, and sermon reel extraction'
    ],
    is_published: true,
    sort_order: 2
  },
  {
    id: 'tp-3',
    title: 'Live Streaming, Sound & Broadcast Production',
    category: 'Broadcast & Audio Engineering',
    description: 'Eliminate echo, feedback, and streaming dropouts. Deliver crystal-clear broadcast audio and multicam video streaming to YouTube and Facebook.',
    topics: [
      'Digital audio console gain staging, EQ, and compression for speech and choir',
      'Broadcast mix vs. sanctuary house sound separation (Matrix/Aux routing)',
      'OBS Studio, vMix, and ATEM Mini switcher workflows',
      'Internet bandwidth management, RTMP settings, and bitrate optimization',
      'Troubleshooting hum, ground loops, and wireless microphone dropouts'
    ],
    is_published: true,
    sort_order: 3
  },
  {
    id: 'tp-4',
    title: 'Church Projection, Presentation & Media Applications',
    category: 'Sanctuary Presentation',
    description: 'Deliver seamless hymn projection, scripture overlays, lower-thirds for live streams, and stage display monitoring for pastors.',
    topics: [
      'Mastery of ProPresenter, EasyWorship, and open-source church tools',
      'Creating dynamic motion scripture backgrounds without visual clutter',
      'Stage display / confidence monitors for pulpit countdown and notes',
      'NDI and HDMI distribution across sanctuary screens',
      'Emergency standby slides, service order preparation, and timing'
    ],
    is_published: true,
    sort_order: 4
  },
  {
    id: 'tp-5',
    title: 'Social Media, Digital Marketing & Online Evangelism',
    category: 'Digital Evangelism & Growth',
    description: 'Transform your church social media channels from passive noticeboards into active digital evangelism and visitor engagement engines.',
    topics: [
      'Developing weekly content calendars for Christian ministry',
      'Repurposing 60-minute Sunday sermons into high-impact 60-second reels',
      'Online community care, prayer request routing, and visitor follow-ups',
      'Meta advertising for church conferences and community outreach',
      'Analytics tracking: measuring real ministry engagement over vanity metrics'
    ],
    is_published: true,
    sort_order: 5
  },
  {
    id: 'tp-6',
    title: 'ICT, AI Tools & Digital Productivity',
    category: 'Technology & Productivity',
    description: 'Harness practical AI tools and cloud applications to streamline sermon transcription, research, event registrations, and church administration.',
    topics: [
      'Generative AI workflows for church administration and bulletin outlines',
      'AI sermon transcription, subtitle generation, and study guide drafting',
      'Google Workspace and cloud storage protocols for media team assets',
      'Online giving gateways, QR code registration, and attendee forms',
      'Data privacy, copyright compliance, and digital security for ministries'
    ],
    is_published: true,
    sort_order: 6
  },
  {
    id: 'tp-7',
    title: 'Media Team Management & Technical Operations',
    category: 'Leadership & Operations',
    description: 'Build, train, and retain a committed, spiritually grounded volunteer media crew that operates with punctuality, harmony, and joy.',
    topics: [
      'Recruiting, onboarding, and training church media volunteers',
      'Service cue sheets, headset communication etiquette, and Sunday checklists',
      'Preventing volunteer burnout and fostering team spiritual growth',
      'Equipment maintenance schedules, storage, and inventory tracking',
      'Handling live mistakes gracefully during public worship'
    ],
    is_published: true,
    sort_order: 7
  },
  {
    id: 'tp-8',
    title: 'Comprehensive On-Site Church Media Bootcamps',
    category: 'Hands-on Ministry Training',
    description: 'A dedicated 2-to-3 day intensive training session conducted right inside your church auditorium using your exact audio-visual equipment.',
    topics: [
      'Hands-on calibration of your church mixers, cameras, and projectors',
      'Live rehearsal simulations with the choir and preaching pastor',
      'Customized SOP manuals tailored to your church volunteer skills',
      'Direct Q&A and equipment troubleshooting with Timi Ani',
      'Post-bootcamp 30-day remote mentoring support'
    ],
    is_published: true,
    sort_order: 8
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Graphic Design and Printing',
    short_description: 'Inspiring sermon series art, conference publicity, physical banners, and digital graphics.',
    full_description: 'We craft cohesive, high-impact visual designs that communicate your ministry theme with dignity. From large-format outdoor church banners and stage backdrops to digital sermon thumbnails and flyers.',
    icon_name: 'Palette',
    deliverables: [
      'Sermon series full graphic package (Flyers, banners, lower-thirds, screens)',
      'Conference and convention publicity campaigns',
      'Print-ready artwork for billboards, roll-up banners, and bulletins',
      'Custom typography and brand guideline document'
    ],
    is_published: true,
    sort_order: 1
  },
  {
    id: 'srv-2',
    title: 'Photography and Video Production',
    short_description: 'Documentary-grade event photography, sermon clips, recap videos, and testimony films.',
    full_description: 'Our experienced visual storytellers capture reverent, emotion-filled moments of worship, fellowship, and preaching. We deliver edited photo catalogs and cinematic recap reels ready for broadcast.',
    icon_name: 'Camera',
    deliverables: [
      'Full-service multi-day conference photography and same-day highlights',
      'Cinematic sermon highlight reels and short-form video extraction',
      'Ministry testimony documentaries and baptism video stories',
      'High-resolution archival photo galleries'
    ],
    is_published: true,
    sort_order: 2
  },
  {
    id: 'srv-3',
    title: 'Live Streaming and Media Production',
    short_description: 'End-to-end multicam broadcast engineering, livestream stabilization, and pristine audio.',
    full_description: 'Expand your sanctuary beyond physical walls. We design, configure, and engineer reliable multi-camera live streams with dedicated broadcast sound mixing, ensuring your remote congregation experiences zero hitches.',
    icon_name: 'Radio',
    deliverables: [
      'Multi-camera switcher setup (Atem/vMix) and video director services',
      'Dedicated broadcast audio calibration and streaming matrix mix',
      'Simulcast routing to YouTube, Facebook, and custom ministry portals',
      'Lower-thirds, hymn lyrics, and scripture overlay integration'
    ],
    is_published: true,
    sort_order: 3
  },
  {
    id: 'srv-4',
    title: 'Website Design and Management',
    short_description: 'Mobile-responsive church websites with sermon archives, event registries, and giving.',
    full_description: 'Your church website is your digital front door. We build elegant, ultra-fast websites designed for easy reading by congregation members and effortless administration by your church staff.',
    icon_name: 'Globe',
    deliverables: [
      'Custom responsive church website with brand identity alignment',
      'Audio/Video sermon library and podcast feeds',
      'Integrated online giving and event registration forms',
      'Ongoing maintenance, security updates, and content management'
    ],
    is_published: true,
    sort_order: 4
  },
  {
    id: 'srv-5',
    title: 'Social Media Management',
    short_description: 'Strategic content creation, weekly sermon snippets, and intentional online community care.',
    full_description: 'Consistent, spiritually enriching digital presence that reaches seekers and nurtures believers throughout the week, beyond Sunday services.',
    icon_name: 'Share2',
    deliverables: [
      'Strategic weekly content scheduling across Instagram, YouTube, and Facebook',
      'Bespoke sermon quotes, video carousels, and devotionals',
      'Visitor engagement protocols and response handling',
      'Monthly reach and spiritual engagement analytics reports'
    ],
    is_published: true,
    sort_order: 5
  },
  {
    id: 'srv-6',
    title: 'Digital Consultation and ICT Support',
    short_description: 'Sanctuary AV acoustic audit, equipment procurement advisory, and system overhaul.',
    full_description: 'Avoid costly equipment mistakes. We provide objective technical audits of your auditorium acoustics, lighting, camera angles, and cables, helping leadership make wise, cost-effective media investments.',
    icon_name: 'Headphones',
    deliverables: [
      'On-site acoustic and audio-visual capability assessment',
      'Technical specification documentation for gear purchases',
      'Cable management, patchbay labeling, and rack organization',
      'Standard Operating Procedure (SOP) manuals for volunteer staff'
    ],
    is_published: true,
    sort_order: 6
  }
];

export const initialGalleryAlbums: GalleryAlbum[] = [
  {
    id: 'alb-1',
    title: 'National Church Media Intensive Workshop',
    event_name: 'Annual Media Excellence Summit',
    event_date: '2026-08-14',
    description: 'Practical 3-day media workshop covering digital mixing consoles, Atem multicam video switching, and church projection dynamics.',
    cover_url: '',
    category: 'Training Workshop',
    is_published: true,
    created_at: '2026-08-15T10:00:00Z',
    images: [
      {
        id: 'img-1-1',
        album_id: 'alb-1',
        image_url: '',
        title: 'Audio Console Gain Staging Practice',
        caption: 'Timi Ani guiding volunteer sound engineers through EQ curves and speech compression.',
        is_cover: true,
        is_published: true,
        display_order: 1,
        created_at: '2026-08-15T10:05:00Z'
      },
      {
        id: 'img-1-2',
        album_id: 'alb-1',
        image_url: '',
        title: 'Multicam Live Switching Drill',
        caption: 'Trainees operating the video switcher during a live rehearsal exercise.',
        is_cover: false,
        is_published: true,
        display_order: 2,
        created_at: '2026-08-15T10:10:00Z'
      },
      {
        id: 'img-1-3',
        album_id: 'alb-1',
        image_url: '',
        title: 'Camera Framing and Rule of Thirds',
        caption: 'Hands-on camera technique session for sanctuary live broadcast operators.',
        is_cover: false,
        is_published: true,
        display_order: 3,
        created_at: '2026-08-15T10:15:00Z'
      }
    ]
  },
  {
    id: 'alb-2',
    title: 'Worship Conference Live Broadcast Setup',
    event_name: 'Kingdom Praise Convention',
    event_date: '2026-06-22',
    description: 'Technical operations, audio splitters, and streaming engineering for an over 3,000-attendee praise conference.',
    cover_url: '',
    category: 'Live Production',
    is_published: true,
    created_at: '2026-06-23T14:30:00Z',
    images: [
      {
        id: 'img-2-1',
        album_id: 'alb-2',
        image_url: '',
        title: 'Main Broadcast Control Booth',
        caption: 'Monitoring 4 HD cameras and synchronized program audio during the keynote address.',
        is_cover: true,
        is_published: true,
        display_order: 1,
        created_at: '2026-06-23T14:35:00Z'
      },
      {
        id: 'img-2-2',
        album_id: 'alb-2',
        image_url: '',
        title: 'Stage Display & Hymn Projection',
        caption: 'Zero-latency confidence monitors displaying sermon scripture references.',
        is_cover: false,
        is_published: true,
        display_order: 2,
        created_at: '2026-06-23T14:40:00Z'
      }
    ]
  },
  {
    id: 'alb-3',
    title: 'Church Creative & Graphic Design Masterclass',
    event_name: 'Lagos Creative Ministry Bootcamp',
    event_date: '2026-04-10',
    description: 'Deep dive into sermon branding, visual clarity for projection screens, and social media sermon clip editing.',
    cover_url: '',
    category: 'Training Workshop',
    is_published: true,
    created_at: '2026-04-11T09:00:00Z',
    images: [
      {
        id: 'img-3-1',
        album_id: 'alb-3',
        image_url: '',
        title: 'Sermon Typography and Layout Review',
        caption: 'Participants refining flyer compositions for clarity and visual hierarchy.',
        is_cover: true,
        is_published: true,
        display_order: 1,
        created_at: '2026-04-11T09:05:00Z'
      }
    ]
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do we book a training session for our church media department?',
    answer: 'You can complete our short booking form on the Book Training page or reach out directly on WhatsApp (+234 703 218 7266). We discuss your church’s current technical setup, challenges, and goals, then agree on a tailored schedule and format.',
    category: 'Booking & Logistics',
    is_published: true,
    sort_order: 1
  },
  {
    id: 'faq-2',
    question: 'Can Church Media Academy conduct training directly at our church auditorium?',
    answer: 'Yes! We actively conduct on-site workshops across Nigeria and internationally. Training in your own auditorium allows us to calibrate your actual audio console, cameras, projectors, and network equipment.',
    category: 'Format & Location',
    is_published: true,
    sort_order: 2
  },
  {
    id: 'faq-3',
    question: 'Our media volunteers have very little technical experience. Will the training be too complex?',
    answer: 'Not at all. Our teaching philosophy emphasizes foundational clarity, simplicity, and hands-on practice. We demystify technical jargon and ensure volunteers build real confidence, whether handling sound, projection, or cameras.',
    category: 'Curriculum & Experience',
    is_published: true,
    sort_order: 3
  },
  {
    id: 'faq-4',
    question: 'Do you offer online or virtual training sessions?',
    answer: 'Yes, we provide structured interactive webinars and virtual coaching sessions via Zoom for remote churches, creative directors, and media personnel outside our immediate physical travel zones.',
    category: 'Format & Location',
    is_published: true,
    sort_order: 4
  },
  {
    id: 'faq-5',
    question: 'What equipment does our church need to have before the training starts?',
    answer: 'We train your team on whatever equipment your church currently possesses! Even with basic smartphone setups or entry-level analog mixers, we show you how to maximize your existing tools for top-tier output before purchasing upgrades.',
    category: 'Curriculum & Experience',
    is_published: true,
    sort_order: 5
  },
  {
    id: 'faq-6',
    question: 'Does Church Media Academy also offer professional media production services for conferences?',
    answer: 'Yes! In addition to training, our team provides turnkey live streaming, sound engineering, multi-camera switching, conference photography, and graphic design for conventions and Christian events.',
    category: 'Services',
    is_published: true,
    sort_order: 6
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-101',
    full_name: 'Pastor David Olatunji',
    organization: 'Grace Fellowship International',
    phone: '+234 802 345 6789',
    email: 'pastor.david@gracefellowship.org',
    location: 'Ibadan, Oyo State',
    request_type: 'Training Workshop',
    topic_or_service: 'Live Streaming, Sound & Broadcast Production',
    format: 'On-site (At Church)',
    preferred_date: 'Next Month (Weekend)',
    additional_info: 'Our online stream has persistent audio feedback and we recently acquired an ATEM Mini switcher that our volunteers need practical guidance on.',
    status: 'In Discussion',
    created_at: '2026-09-28T11:20:00Z'
  },
  {
    id: 'enq-102',
    full_name: 'Sister Blessing Adeyemi',
    organization: 'Covenant Life Assembly',
    phone: '+234 813 987 6543',
    email: 'media@covenantlife.org',
    location: 'Lekki, Lagos',
    request_type: 'Training Workshop',
    topic_or_service: 'Graphic Design, Branding & Church Publicity',
    format: 'Hybrid',
    preferred_date: 'Mid November',
    additional_info: 'We want our 8 creative volunteers to learn professional sermon series graphics and church website management.',
    status: 'New',
    created_at: '2026-10-04T15:45:00Z'
  }
];

export const initialPodcastEpisodes: PodcastEpisode[] = [
  {
    id: 'pod-1',
    title: 'Episode 1: Overcoming Sanctuary Audio Feedback & Gain Staging Mistakes',
    episode_number: 'EP 01',
    description: 'Timi Ani breaks down why church sound systems squeal and how volunteers can eliminate feedback using proper mic placement, EQ carving, and preamp gain staging.',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audio_url: '',
    duration: '24:18',
    published_date: '2026-10-05',
    speaker_or_guest: 'Timi Ani',
    is_published: true,
    sort_order: 1
  },
  {
    id: 'pod-2',
    title: 'Episode 2: Building Low-Stress Livestreaming Setups on a Budget',
    episode_number: 'EP 02',
    description: 'How local churches can deliver broadcast-grade streams with single or multicam switchers like ATEM Mini and OBS without breaking the bank.',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audio_url: '',
    duration: '31:45',
    published_date: '2026-09-22',
    speaker_or_guest: 'Timi Ani & Guest Sound Engineer',
    is_published: true,
    sort_order: 2
  },
  {
    id: 'pod-3',
    title: 'Episode 3: Shepherding Church Media Volunteers & Preventing Burnout',
    episode_number: 'EP 03',
    description: 'Media ministry is a spiritual assignment. Practical structures for church leaders to rotate technical teams, foster spiritual growth, and avoid volunteer exhaustion.',
    youtube_url: '',
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '18:50',
    published_date: '2026-09-10',
    speaker_or_guest: 'Timi Ani',
    is_published: true,
    sort_order: 3
  }
];

