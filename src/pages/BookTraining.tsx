import React, { useState } from 'react';
import {
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Calendar,
  Building,
  User,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useCMS } from '../lib/cmsContext';

interface BookTrainingProps {
  navigate: (route: string) => void;
  preselectedTopic?: string;
}

export const BookTraining: React.FC<BookTrainingProps> = ({
  preselectedTopic = ''
}) => {
  const { siteSettings, submitEnquiry, trainingPrograms, services } = useCMS();

  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [requestType, setRequestType] = useState<
    'Training Workshop' | 'Professional Service' | 'Consultation' | 'Custom Request'
  >('Training Workshop');
  const [topicOrService, setTopicOrService] = useState(
    preselectedTopic || 'Live Streaming, Sound & Broadcast Production'
  );
  const [format, setFormat] = useState<
    'On-site (At Church)' | 'Online / Virtual' | 'Hybrid' | 'Flexible'
  >('On-site (At Church)');
  const [preferredDate, setPreferredDate] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Generate encoded WhatsApp message string from entered inputs
  const buildWhatsAppMessage = () => {
    const text = `*CHURCH MEDIA ACADEMY TRAINING / SERVICE ENQUIRY*
----------------------------------------
*Name:* ${fullName.trim() || 'Visitor'}
*Church / Ministry:* ${organization.trim() || 'Not specified'}
*Phone:* ${phone.trim()}
*Email:* ${email.trim() || 'Not specified'}
*Location:* ${location.trim() || 'Nigeria'}
*Request Type:* ${requestType}
*Topic / Service:* ${topicOrService}
*Format:* ${format}
*Preferred Date:* ${preferredDate.trim() || 'Flexible'}
*Details / Notes:* ${additionalInfo.trim() || 'None provided'}
----------------------------------------
_Sent via Church Media Academy Website_`;
    return encodeURIComponent(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !phone.trim() || !organization.trim()) {
      setErrorMessage('Please provide your Full Name, Church / Ministry, and Phone Number.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitEnquiry({
        full_name: fullName.trim(),
        organization: organization.trim(),
        phone: phone.trim(),
        email: email.trim(),
        location: location.trim(),
        request_type: requestType,
        topic_or_service: topicOrService,
        format,
        preferred_date: preferredDate.trim(),
        additional_info: additionalInfo.trim()
      });

      setIsSubmitting(false);
      setSubmittedSuccess(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch {
      setIsSubmitting(false);
      setErrorMessage(
        'An unexpected error occurred while saving your enquiry. You can connect with Timi Ani directly on WhatsApp using the button below.'
      );
    }
  };

  const handleOpenWhatsAppDirect = () => {
    const url = `${siteSettings.whatsapp_url}?text=${buildWhatsAppMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-10 sm:space-y-14 py-8 sm:py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm text-[#064E3B] rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden border border-emerald-100 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-2.5">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 inline-block">
              Training & Service Bookings
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#064E3B] leading-snug">
              Book Church Training or <span className="shimmer-text">Request Services</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Complete the form below to request a workshop for your church media crew. Your request can also be forwarded directly to Timi Ani on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Information Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 sm:p-8 shadow-xs">
            {submittedSuccess ? (
              <div className="space-y-5 text-center py-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-[#064E3B]">
                    Enquiry Successfully Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{fullName}</strong>. Your training request for{' '}
                    <strong>{organization}</strong> has been received. Our team will review your requirements.
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800 max-w-md mx-auto text-left flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Please Note:</strong> A training request is not confirmed until curriculum, dates, and logistics have been mutually agreed upon.
                  </p>
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={handleOpenWhatsAppDirect}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Prefilled Details to Timi Ani on WhatsApp</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setFullName('');
                      setOrganization('');
                      setPhone('');
                      setEmail('');
                      setAdditionalInfo('');
                    }}
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-[#064E3B]">
                    Training & Service Details
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Fields marked with an asterisk (<span className="text-red-500">*</span>) are required.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p>{errorMessage}</p>
                      <button
                        type="button"
                        onClick={handleOpenWhatsAppDirect}
                        className="text-xs font-bold underline text-red-800"
                      >
                        Click here to send details via WhatsApp instead →
                      </button>
                    </div>
                  </div>
                )}

                {/* Row 1: Name and Organisation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pastor David Adeleke"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Church or Organisation <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Grace Baptist Church, Lagos"
                        value={organization}
                        onChange={e => setOrganization(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +234 803 123 4567"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        placeholder="e.g. media@yourchurch.org"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Location & Request Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Location / State / City
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Ikeja, Lagos, Nigeria"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Request Type
                    </label>
                    <select
                      value={requestType}
                      onChange={e =>
                        setRequestType(
                          e.target.value as 'Training Workshop' | 'Professional Service' | 'Consultation' | 'Custom Request'
                        )
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none bg-white text-slate-800"
                    >
                      <option value="Training Workshop">Church Media Training Workshop</option>
                      <option value="Professional Service">Professional Production / Service</option>
                      <option value="Consultation">Sanctuary AV Acoustic Consultation</option>
                      <option value="Custom Request">Customized Ministry Package</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Topic / Service and Format */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Specific Track or Service
                    </label>
                    <select
                      value={topicOrService}
                      onChange={e => setTopicOrService(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none bg-white text-slate-800"
                    >
                      <optgroup label="Training Programmes">
                        {trainingPrograms.map(p => (
                          <option key={p.id} value={p.title}>
                            {p.title}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Professional Services">
                        {services.map(s => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </optgroup>
                      <option value="Custom Curated Package">Other / Custom Curated Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Delivery Format
                    </label>
                    <select
                      value={format}
                      onChange={e =>
                        setFormat(
                          e.target.value as 'On-site (At Church)' | 'Online / Virtual' | 'Hybrid' | 'Flexible'
                        )
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none bg-white text-slate-800"
                    >
                      <option value="On-site (At Church)">On-site (At Church Auditorium)</option>
                      <option value="Online / Virtual">Online / Virtual (Interactive Zoom)</option>
                      <option value="Hybrid">Hybrid (On-site + Virtual)</option>
                      <option value="Flexible">Flexible / Open to Recommendation</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Preferred Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Date or Preferred Timeframe
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Next month, last weekend of November"
                      value={preferredDate}
                      onChange={e => setPreferredDate(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 6: Additional Information */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Equipment & Needs (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly tell us about your equipment (e.g. digital mixer, ATEM switcher, cameras) or specific challenges."
                    value={additionalInfo}
                    onChange={e => setAdditionalInfo(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  />
                </div>

                {/* Disclaimer Note */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    Training bookings are subject to schedule availability and will be confirmed after discussion.
                  </p>
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold rounded-lg bg-[#064E3B] hover:bg-[#047857] text-white shadow-2xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Saving Enquiry...' : 'Submit Training Enquiry'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenWhatsAppDirect}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enquire via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-[#064E3B] text-white p-6 rounded-xl space-y-4 border border-emerald-900">
              <h4 className="text-sm font-bold text-white">
                Direct Contact Channel
              </h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Prefer speaking directly with Timi Ani before submitting? Feel free to reach out.
              </p>

              <div className="space-y-2.5 text-xs pt-2 border-t border-emerald-800/80">
                <a
                  href={siteSettings.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-200 hover:text-white"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                  <span>WhatsApp: {siteSettings.phone}</span>
                </a>

                <a
                  href={`mailto:${siteSettings.email}`}
                  className="flex items-center gap-2 text-emerald-200 hover:text-white break-all"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                  <span>{siteSettings.email}</span>
                </a>

                <div className="flex items-center gap-2 text-emerald-200/80">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                  <span>{siteSettings.location} · Serving Worldwide</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                What to Expect
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">1.</span>
                  <span><strong>Consultation:</strong> We discuss your gear list and pain points.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">2.</span>
                  <span><strong>Custom Syllabus:</strong> Tailored modules addressing your specific challenges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">3.</span>
                  <span><strong>Hands-On Training:</strong> Practical exercises with your equipment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">4.</span>
                  <span><strong>Mentoring:</strong> 30-day remote support for questions.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
