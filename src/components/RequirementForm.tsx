import React from 'react';
import { InquiryFormData } from '../types';
import { OFFICE_CONTACT } from '../data';
import { MessageSquare, ClipboardList, CheckCircle2, RefreshCw, Send, AlertCircle } from 'lucide-react';

interface RequirementFormProps {
  initialData: InquiryFormData;
  onSubmitSuccess?: () => void;
}

export default function RequirementForm({ initialData, onSubmitSuccess }: RequirementFormProps) {
  const [formData, setFormData] = React.useState<InquiryFormData>({
    name: '',
    phone: '',
    type: 'Buy',
    location: '',
    message: ''
  });

  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [inquirySent, setInquirySent] = React.useState(false);

  // Sync state if initialData changes (dynamic trigger from tables)
  React.useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length > 0 &&
      formData.phone.trim().length >= 10 &&
      formData.location.trim().length > 0 &&
      formData.message.trim().length > 0
    );
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      // Mark all as touched to trigger error states
      setTouched({
        name: true,
        phone: true,
        location: true,
        message: true
      });
      return;
    }

    // Standard requested format:
    // 📌 New Requirement
    // 👤 Name: ${name}
    // 📞 Phone: ${phone}
    // 🏷 Type: ${type}
    // 📍 Location: ${location}
    // 📝 Details: ${message}
    const text = `📌 New Requirement
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
🏷 Type: ${formData.type}
📍 Location: ${formData.location}
📝 Details: ${formData.message}`;

    const whatsappNumber = OFFICE_CONTACT.rawPhone;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp link in a new tab
    window.open(url, "_blank", "noopener,noreferrer");

    // Action feedback
    setInquirySent(true);
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      type: 'Buy',
      location: '',
      message: ''
    });
    setTouched({});
    setInquirySent(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden max-w-xl mx-auto" id="requirement-panel">
      {/* Top Banner accent */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-6 text-slate-950 flex items-center gap-3">
        <ClipboardList className="w-8 h-8 font-black shrink-0" />
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">
            Submit Requirement Portal
          </h2>
          <p className="text-xs font-semibold text-slate-900 mt-0.5">
            Pre-fills dynamically and forwards directly to Sharma Prop Mart on WhatsApp.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {inquirySent ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-3xl">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Requirement Prepared!</h3>
              <p className="text-sm text-slate-400 max-w-xs mx-auto">
                Opening WhatsApp to securely transfer your formatted requirement details to <strong>+91 {OFFICE_CONTACT.rawPhone}</strong>.
              </p>
            </div>
            
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={resetForm}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-extrabold tracking-wider uppercase py-2.5 px-4 rounded-lg transition-colors border border-slate-700"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit Another</span>
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold tracking-wider uppercase py-2.5 px-4 rounded-lg transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Retry Open Link</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendWhatsApp} className="space-y-5">
            {/* Input Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                placeholder="Enter your full name"
                className={`w-full bg-slate-950 border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-600 ${
                  touched.name && !formData.name.trim() 
                    ? 'border-red-500 ring-1 ring-red-500/20' 
                    : 'border-slate-800'
                }`}
                required
              />
              {touched.name && !formData.name.trim() && (
                <p className="text-red-500 text-xs font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 H-3" />
                  Please write your name.
                </p>
              )}
            </div>

            {/* Input Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-bold font-mono">
                  +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur('phone')}
                  placeholder="Enter 10-digit number"
                  maxLength={12}
                  className={`w-full bg-slate-950 border text-white rounded-xl pl-14 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-600 font-mono ${
                    touched.phone && formData.phone.trim().length < 10 
                      ? 'border-red-500 ring-1 ring-red-500/20' 
                      : 'border-slate-800'
                  }`}
                  required
                />
              </div>
              {touched.phone && formData.phone.trim().length < 10 && (
                <p className="text-red-500 text-xs font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 H-3" />
                  Please write a valid 10-digit mobile number.
                </p>
              )}
            </div>

            {/* Dropdown Type */}
            <div>
              <label htmlFor="type" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Requirement Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-medium"
              >
                <option value="Buy">Buy (Commercial / Residential)</option>
                <option value="Sell">Sell / Liquidate Asset</option>
                <option value="Rent">Rent (Short & Long Lease)</option>
                <option value="Construction">Construction Estimates & Service</option>
              </select>
            </div>

            {/* Input Location */}
            <div>
              <label htmlFor="location" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Location / Sector <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                onBlur={() => handleBlur('location')}
                placeholder="e.g. SEC-18 PKT-3, ALPHA-II, Yamuna Expressway"
                className={`w-full bg-slate-950 border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-600 ${
                  touched.location && !formData.location.trim() 
                    ? 'border-red-500 ring-1 ring-red-500/20' 
                    : 'border-slate-800'
                }`}
                required
              />
              {touched.location && !formData.location.trim() && (
                <p className="text-red-500 text-xs font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 H-3" />
                  Please clarify the location.
                </p>
              )}
            </div>

            {/* Input Message details */}
            <div>
              <label htmlFor="message" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Detailed requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur('message')}
                rows={4}
                placeholder="Please enter your detailed requirement..."
                className={`w-full bg-slate-950 border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-600 text-slate-200 ${
                  touched.message && !formData.message.trim() 
                    ? 'border-red-500 ring-1 ring-red-500/20' 
                    : 'border-slate-800'
                }`}
                required
              ></textarea>
              {touched.message && !formData.message.trim() && (
                <p className="text-red-500 text-xs font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 H-3" />
                  Please provide some detail.
                </p>
              )}
            </div>

            {/* Action button */}
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full text-slate-950 font-extrabold text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
                isFormValid() 
                  ? 'bg-emerald-500 hover:bg-emerald-400 hover:shadow-emerald-500/25 text-slate-950' 
                  : 'bg-slate-800 text-slate-500 border border-slate-850 cursor-not-allowed'
              }`}
            >
              <MessageSquare className="w-5 h-5 fill-slate-950 stroke-0" />
              <span>Send Details on WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
