import React from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  Upload, 
  Plus, 
  Trash2, 
  Smartphone, 
  Building, 
  Home, 
  MapPin, 
  Printer, 
  Copy, 
  Check, 
  Info, 
  Palette, 
  Eye, 
  ListChecks,
  Compass,
  ArrowRight,
  Sparkle
} from 'lucide-react';
import { PropertyItem } from '../types';

const bannerMockupUrl = new URL('../assets/images/sharma_prop_banner_1784025905695.jpg', import.meta.url).href;
const uiMockupUrl = new URL('../assets/images/sharma_prop_ui_mockup_1784025918563.jpg', import.meta.url).href;

interface PostPropertyProps {
  onAddListing: (newListing: PropertyItem) => void;
  setActiveTab: (tab: any) => void;
  setNotification: (msg: string | null) => void;
}

export default function PostProperty({ onAddListing, setActiveTab, setNotification }: PostPropertyProps) {
  // Mode selector: 'form' for posting a property, 'banner' for print-ready banner designer
  const [activeSubMode, setActiveSubMode] = React.useState<'form' | 'banner'>('form');

  // FORM WIZARD STATE (99acres inspired style)
  const [step, setStep] = React.useState<number>(1);
  const [formData, setFormData] = React.useState({
    purpose: 'Sell' as 'Sell' | 'Rent',
    propertyType: 'Residential' as 'Residential' | 'Commercial',
    subType: 'Flat/Apartment',
    bhk: '3 BHK',
    location: '',
    sector: '',
    area: '1450',
    price: '1.25',
    ownerName: '',
    phone: '',
    description: '',
    agreeToRera: true
  });

  // Photo uploads mock state
  const [uploadedPhotos, setUploadedPhotos] = React.useState<string[]>([
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop'
  ]);
  const [photoDragActive, setPhotoDragActive] = React.useState(false);

  // Verification state
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState('');
  const [isOtpVerified, setIsOtpVerified] = React.useState(false);

  // PRINT BANNER STATE
  const [bannerConfig, setBannerConfig] = React.useState({
    heading: 'SHARMA PROP MART',
    subHeading: 'Trusted Real Estate Services since 2008',
    highlightText: 'POST YOUR PROPERTY FOR FREE!',
    hindiHighlight: 'अपनी प्रॉपर्टी फ्री में लिस्ट करें!',
    servicesList: [
      'Sell | Rent | Lease | PG (बेचें या किराए पर दें)',
      'Plots, Flats, Independent Houses & Commercial Shops',
      'Direct Buyers & Tenants - No Brokerage! (सीधे ग्राहक पाएं - कोई कमीशन नहीं)',
      'RERA Verified Deals & 100% Legal Registration Safety'
    ],
    phone: '+91 81780 97230',
    address: '166 A, Mayur Vihar Phase-1, New Delhi - 110091',
    colorTheme: 'royal-blue', // 'royal-blue' | 'deep-teal' | 'gold-luxury' | 'emerald'
    aspectRatio: '6x3' // '6x3' | '5x3' | 'a5'
  });

  const [copiedText, setCopiedText] = React.useState(false);

  // Helper lists matching 99acres and mockup
  const subTypesList = formData.propertyType === 'Residential' 
    ? ['Flat/Apartment', 'Independent House / Villa', 'Builder Floor', 'Plot / Land', 'Studio Apartment', 'Penthouse']
    : ['Commercial Shop', 'Office Space', 'Warehouse/Godown', 'Showroom', 'Industrial Land', 'Hotel/Guest House'];

  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Plot', 'Commercial Space'];

  // Handle drag/drop photos
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setPhotoDragActive(true);
    } else if (e.type === 'dragleave') {
      setPhotoDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPhotoDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Add a mockup photo representing the uploaded file
      const randomImages = [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop'
      ];
      const nextImg = randomImages[Math.floor(Math.random() * randomImages.length)];
      setUploadedPhotos(prev => [...prev, nextImg]);
      setNotification('Photo added to gallery!');
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const randomImages = [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop'
      ];
      const nextImg = randomImages[Math.floor(Math.random() * randomImages.length)];
      setUploadedPhotos(prev => [...prev, nextImg]);
      setNotification('Photo uploaded!');
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const handleDeletePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // OTP Verification mockup
  const triggerOtp = () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number first.');
      return;
    }
    setOtpSent(true);
    setNotification('Mock OTP Code [ 9945 ] sent to ' + formData.phone);
    setTimeout(() => setNotification(null), 3000);
  };

  const verifyOtp = () => {
    if (otpCode === '9945' || otpCode === '1234') {
      setIsOtpVerified(true);
      setNotification('Phone verified successfully! ✔️');
      setTimeout(() => setNotification(null), 2000);
    } else {
      alert('Invalid code! Try entering "9945" or "1234" for the sandbox bypass.');
    }
  };

  // Submit form to list property locally
  const handleFormSubmit = () => {
    if (!formData.agreeToRera) {
      alert('Please agree to RERA & Fair Price guidelines.');
      return;
    }
    if (!isOtpVerified && formData.phone) {
      alert('Please complete phone verification or enter mock OTP "9945" to proceed.');
      return;
    }

    const priceText = formData.purpose === 'Sell' 
      ? `₹ ${formData.price} Cr` 
      : `₹ ${parseFloat(formData.price) * 10} Thousand / month`;

    const newListing: PropertyItem = {
      id: Date.now(),
      region: formData.location.toLowerCase().includes('yamuna') ? 'Yamuna Expressway' : 'Greater Noida',
      sector: formData.sector || 'Sector 18',
      details: `${formData.bhk} ${formData.subType} - ${formData.description || 'Spacious property listed directly by verified owner'}`,
      blocks: 'Block A',
      size: `${formData.area} sqft`,
      price: priceText,
      photoUrl: uploadedPhotos[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
      purpose: formData.purpose,
      contactNumber: formData.phone || '+91 81780 97230',
      postedDate: 'Posted Today',
      beds: formData.bhk,
      agentName: formData.ownerName || 'Verified Owner'
    };

    onAddListing(newListing);
    setStep(4); // Success step
  };

  // Copy Canva banner promo context
  const handleCopyBannerText = () => {
    const textToCopy = `
SHARMA PROP MART PRINT BANNER BLUEPRINT
========================================
Heading: ${bannerConfig.heading}
Sub-Heading: ${bannerConfig.subHeading}
Highlight Text 1: ${bannerConfig.highlightText}
Highlight Text 2 (Hindi): ${bannerConfig.hindiHighlight}

Services Offered:
${bannerConfig.servicesList.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Contact Hotline: ${bannerConfig.phone}
Corporate Address: ${bannerConfig.address}
Suggested Sizes: 6x3 Feet (Flex), 5x3 Feet (Flex) or A5 Flyer/Handout
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setNotification('Banner copywriting blueprint copied to clipboard!');
    setTimeout(() => {
      setCopiedText(false);
      setNotification(null);
    }, 2500);
  };

  // Theme-specific styles for flex banner preview
  const getBannerThemeClasses = () => {
    switch (bannerConfig.colorTheme) {
      case 'deep-teal':
        return {
          background: 'linear-gradient(135deg, #0f2d37 0%, #174b59 60%, #206d7e 100%)',
          textAccent: 'text-amber-300',
          badgeBg: 'bg-amber-400 text-slate-900',
          borderAccent: 'border-amber-400',
          cardBg: 'bg-teal-900/40 border-teal-800'
        };
      case 'gold-luxury':
        return {
          background: 'linear-gradient(135deg, #111111 0%, #1e1e1e 60%, #2e2e2e 100%)',
          textAccent: 'text-[#d4af37]',
          badgeBg: 'bg-[#d4af37] text-black',
          borderAccent: 'border-[#d4af37]',
          cardBg: 'bg-zinc-900/60 border-zinc-800'
        };
      case 'emerald':
        return {
          background: 'linear-gradient(135deg, #052e16 0%, #064e3b 60%, #0f766e 100%)',
          textAccent: 'text-yellow-300',
          badgeBg: 'bg-yellow-400 text-slate-950',
          borderAccent: 'border-yellow-400',
          cardBg: 'bg-emerald-950/40 border-emerald-900'
        };
      case 'royal-blue':
      default:
        return {
          background: 'linear-gradient(135deg, #1a3a5c 0%, #2d5a87 60%, #0078db 100%)',
          textAccent: 'text-yellow-400',
          badgeBg: 'bg-yellow-400 text-slate-950',
          borderAccent: 'border-yellow-400',
          cardBg: 'bg-white/10 border-white/10'
        };
    }
  };

  const themeColors = getBannerThemeClasses();

  return (
    <div className="space-y-10 max-w-6xl mx-auto" id="post-property-main-view">
      
      {/* Dynamic Tab Selector */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveSubMode('form')}
            className={`flex-1 sm:flex-none py-2.5 px-6 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeSubMode === 'form'
                ? 'bg-[#0078db] text-white shadow-md'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ListChecks className="w-4 h-4" />
            <span>Post Property Form</span>
          </button>
          
          <button
            onClick={() => setActiveSubMode('banner')}
            className={`flex-1 sm:flex-none py-2.5 px-6 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeSubMode === 'banner'
                ? 'bg-[#0078db] text-white shadow-md'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Flex Banner Blueprint & Copy</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#ff6b35]/10 text-[#ff6b35] rounded-full text-[10px] font-black uppercase tracking-wider border border-[#ff6b35]/25">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Zero Brokerage Allotments</span>
        </div>
      </div>

      {/* SUB-VIEW 1: ACTIVE POSTING FORM */}
      {activeSubMode === 'form' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form container Left */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-150 shadow-sm p-6 sm:p-8 space-y-8">
            
            {/* Horizontal Step Indicator */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-6">
              {[
                { s: 1, label: 'Basic Info' },
                { s: 2, label: 'Property Photos' },
                { s: 3, label: 'Pricing & Owner' },
                { s: 4, label: 'Listing Live!' }
              ].map((stepObj) => (
                <div key={stepObj.s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center transition-all ${
                    step === stepObj.s 
                      ? 'bg-[#0078db] text-white ring-4 ring-blue-100'
                      : step > stepObj.s
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step > stepObj.s ? '✓' : stepObj.s}
                  </div>
                  <span className={`text-xs font-bold hidden sm:inline ${
                    step === stepObj.s ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    {stepObj.label}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1: PROPERTY BASIC DETAILS */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-[#091e42]">Tell us about your property</h3>
                  <p className="text-xs text-slate-500 font-medium">All fields marked with * are necessary to generate direct authority links.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Purpose Toggle */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">You want to *</label>
                    <div className="flex gap-2">
                      {['Sell', 'Rent'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, purpose: p as any }))}
                          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold border transition-all cursor-pointer ${
                            formData.purpose === p 
                              ? 'bg-blue-50 text-[#0078db] border-[#0078db] font-black shadow-inner' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {p === 'Sell' ? 'Sell Property' : 'Rent Out'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Type Toggle */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Property category *</label>
                    <div className="flex gap-2">
                      {['Residential', 'Commercial'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, propertyType: c as any, subType: c === 'Residential' ? 'Flat/Apartment' : 'Commercial Shop' }))}
                          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold border transition-all cursor-pointer ${
                            formData.propertyType === c 
                              ? 'bg-blue-50 text-[#0078db] border-[#0078db] font-black shadow-inner' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub Types Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Property sub-type *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {subTypesList.map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, subType: st }))}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer truncate ${
                          formData.subType === st 
                            ? 'bg-[#0078db] text-white border-[#0078db] font-extrabold shadow-sm' 
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* BHK Configurations if Residential */}
                {formData.propertyType === 'Residential' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Bedrooms configuration (BHK) *</label>
                    <div className="flex flex-wrap gap-2">
                      {bhkOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, bhk: b }))}
                          className={`py-2 px-4 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                            formData.bhk === b 
                              ? 'bg-[#0078db] text-white border-[#0078db]' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">City / Expressway region *</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#0078db]"
                    >
                      <option value="">-- Select Authority Region --</option>
                      <option value="Yamuna Expressway (SEC-18 / SEC-20)">Yamuna Expressway Authority Zone</option>
                      <option value="Greater Noida West (Alpha / Beta / Delta)">Greater Noida Sector Hubs</option>
                      <option value="Noida Core (Sector 62 / Sector 50)">Noida Extension / Expressways</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Sector & Pocket / Society *</label>
                    <input
                      type="text"
                      placeholder="e.g. SEC-18 Pocket 3, Alpha-I, Swarn Nagari"
                      value={formData.sector}
                      onChange={(e) => setFormData(prev => ({ ...prev, sector: e.target.value }))}
                      className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#0078db]"
                    />
                  </div>
                </div>

                {/* Continue button */}
                <div className="pt-4">
                  <button
                    type="button"
                    disabled={!formData.location || !formData.sector}
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#0078db] hover:bg-[#005ca8] disabled:bg-slate-100 disabled:text-slate-400 text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Photos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PHOTOS LOADING DOCK */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-[#091e42]">Upload Property Photos</h3>
                  <p className="text-xs text-slate-500 font-medium">Properties with images receive up to 8x higher organic conversion from real buyers.</p>
                </div>

                {/* Drag and Drop Box */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center gap-3 relative ${
                    photoDragActive 
                      ? 'border-[#0078db] bg-blue-50/50' 
                      : 'border-slate-300 bg-slate-50 hover:bg-slate-50/50'
                  }`}
                >
                  <Upload className="w-10 h-10 text-slate-400 animate-bounce" />
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">Drag & Drop photos here</p>
                    <p className="text-xs text-slate-400 mt-1">Supports JPEG, PNG up to 10MB each</p>
                  </div>
                  
                  <span className="text-xs text-slate-400 font-bold">or</span>
                  
                  <label className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50">
                    <span>Browse Local Files</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>

                {/* Uploaded Gallery */}
                {uploadedPhotos.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Your Photo Gallery ({uploadedPhotos.length})</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {uploadedPhotos.map((url, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden aspect-video border border-slate-150">
                          <img src={url} alt="Listing Photo" className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleDeletePhoto(index)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions row */}
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 sm:flex-none px-8 py-3.5 bg-[#0078db] hover:bg-[#005ca8] text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Pricing & Owner</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PRICING & OTP MOBILE */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-[#091e42]">Pricing & Verified Owner Details</h3>
                  <p className="text-xs text-slate-500 font-medium">To keep Sharma Prop Mart 100% scam-free, we verify owner phone numbers via SMS OTP.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Area input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Built-up / Plot Area (sq. ft.) *</label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                      className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#0078db]"
                    />
                  </div>

                  {/* Price input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      {formData.purpose === 'Sell' ? 'Expected Price (in Crores)' : 'Expected Rent (in Thousands / month)'} *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#0078db]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Owner Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Owner Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar Sharma"
                      value={formData.ownerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                      className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#0078db]"
                    />
                  </div>

                  {/* Phone Input with Mock SMS Verification */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">WhatsApp Contact Number *</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="10-digit Mobile"
                          value={formData.phone}
                          disabled={isOtpVerified}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-white disabled:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl pl-12 pr-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#0078db]"
                        />
                      </div>
                      {!isOtpVerified && (
                        <button
                          type="button"
                          onClick={triggerOtp}
                          className="px-4 py-2 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-xl cursor-pointer"
                        >
                          {otpSent ? 'Resend' : 'Send OTP'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* OTP Validation Box */}
                {otpSent && !isOtpVerified && (
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Smartphone className="w-4 h-4 text-[#0078db]" />
                      <span>Enter 4-Digit OTP Code sent to your mobile:</span>
                    </div>
                    <div className="flex gap-3 items-center">
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="e.g. 9945"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-28 bg-white border border-slate-300 rounded-xl text-center font-mono font-black text-lg py-1.5 focus:outline-none focus:border-[#0078db] text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={verifyOtp}
                        className="px-6 py-2 bg-[#0078db] hover:bg-[#005ca8] text-white text-xs font-black rounded-xl cursor-pointer"
                      >
                        Verify OTP
                      </button>
                    </div>
                    <p className="text-[10px] text-[#0078db] font-bold">
                      💡 Sandbox Test Override: Enter code <strong className="font-extrabold underline">9945</strong> or <strong className="font-extrabold underline">1234</strong> to skip!
                    </p>
                  </div>
                )}

                {/* Consent & Guidelines */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs font-medium text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={formData.agreeToRera}
                      onChange={(e) => setFormData(prev => ({ ...prev, agreeToRera: e.target.checked }))}
                      className="mt-0.5 accent-[#0078db] rounded"
                    />
                    <span>I certify that this property is legally registered under Yamuna Authority / RERA regulations and is listed with 100% fair pricing.</span>
                  </label>
                </div>

                {/* Actions row */}
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!formData.ownerName || !formData.phone || (!isOtpVerified && formData.phone.length > 0)}
                    onClick={handleFormSubmit}
                    className="flex-1 sm:flex-none px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-100 disabled:text-slate-400 text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit Listing & Make Live</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS COMPLETED */}
            {step === 4 && (
              <div className="text-center py-12 px-4 space-y-6 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 border-2 border-emerald-100 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
                  🎉
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#091e42]">Your Property is Now LIVE!</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">
                    Outstanding! Your listing has been added to our live local storage database. You can instantly see it listed in the sector tables or category hub.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 max-w-lg mx-auto text-left border border-slate-200 space-y-2 text-xs text-slate-600">
                  <p><strong>Property:</strong> {formData.bhk} {formData.subType}</p>
                  <p><strong>Region/Pocket:</strong> {formData.sector}, {formData.location ? formData.location.split(' (')[0] : 'Greater Noida'}</p>
                  <p><strong>Price expectation:</strong> {formData.purpose === 'Sell' ? `₹ ${formData.price} Cr` : `₹ ${formData.price}k / month`}</p>
                  <p><strong>Contact phone:</strong> +91 {formData.phone}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto pt-4">
                  <button
                    onClick={() => {
                      if (formData.location.toLowerCase().includes('yamuna')) {
                        setActiveTab('yamuna');
                      } else {
                        setActiveTab('noida');
                      }
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-[#0078db] hover:bg-[#005ca8] text-white text-xs font-black rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    View Listed Tables
                  </button>
                  
                  <button
                    onClick={() => {
                      setStep(1);
                      setFormData({
                        purpose: 'Sell',
                        propertyType: 'Residential',
                        subType: 'Flat/Apartment',
                        bhk: '3 BHK',
                        location: '',
                        sector: '',
                        area: '1450',
                        price: '1.25',
                        ownerName: '',
                        phone: '',
                        description: '',
                        agreeToRera: true
                      });
                      setIsOtpVerified(false);
                      setOtpSent(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-xl transition-all cursor-pointer"
                  >
                    Post Another Property
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Form Side Guide cards Right */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">💯</span>
                <h4 className="font-extrabold text-[#091e42] text-sm sm:text-base">Sharma Prop Mart Guide</h4>
              </div>
              
              <ul className="space-y-3.5 text-xs text-slate-500 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-[#0078db] mt-0.5">✔️</span>
                  <span><strong>No Aggressive Brokerage:</strong> Direct dealing between owners, verified buyers & tenants.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0078db] mt-0.5">✔️</span>
                  <span><strong>Local Security Checks:</strong> Allotment registry databases verified for clear title safety.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0078db] mt-0.5">✔️</span>
                  <span><strong>WhatsApp Direct Routing:</strong> Leads automatically forward to our active support desks to assist registration.</span>
                </li>
              </ul>
            </div>

            {/* Micro FAQ widget */}
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 space-y-4 text-xs">
              <h4 className="font-extrabold text-[#005ca8] flex items-center gap-1.5 uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>Frequently Asked</span>
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="font-extrabold text-slate-800">Q: Is it genuinely free?</p>
                  <p className="text-slate-500 mt-0.5">Yes, posting your property for basic directory view is 100% free with zero commission.</p>
                </div>
                <div>
                  <p className="font-extrabold text-slate-800">Q: How do buyers reach me?</p>
                  <p className="text-slate-500 mt-0.5">Verified buyers click "Contact Owner" and our system routes the pre-filled WhatsApp lead safely to you.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SUB-VIEW 2: DYNAMIC FLEX BANNER BLUEPRINT DESIGNER */}
      {activeSubMode === 'banner' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Editor Panel Left */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-[#091e42] flex items-center gap-1.5">
                <Palette className="w-5 h-5 text-[#0078db]" />
                <span>Configure Banner Blueprint</span>
              </h3>
              <p className="text-xs text-slate-400 font-medium">Update text below to regenerate the real-time high contrast flex banner blueprint.</p>
            </div>

            {/* Size selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Select Display Size</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '6x3', label: '6x3 Feet Flex' },
                  { id: '5x3', label: '5x3 Feet Flex' },
                  { id: 'a5', label: 'A5 Pamphlet' }
                ].map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setBannerConfig(prev => ({ ...prev, aspectRatio: size.id }))}
                    className={`py-2 px-1 rounded-xl text-[10px] font-black text-center border transition-all cursor-pointer ${
                      bannerConfig.aspectRatio === size.id 
                        ? 'bg-blue-50 text-[#0078db] border-[#0078db] font-black' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors theme selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Select Design Palette</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'royal-blue', label: '🔵 Royal Blue & Gold' },
                  { id: 'deep-teal', label: '🟢 Corporate Teal' },
                  { id: 'gold-luxury', label: '⚫ Gold & Dark Charcoal' },
                  { id: 'emerald', label: '🟢 Emerald Green' }
                ].map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setBannerConfig(prev => ({ ...prev, colorTheme: theme.id }))}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-bold text-left border transition-all cursor-pointer ${
                      bannerConfig.colorTheme === theme.id 
                        ? 'bg-blue-50 text-[#0078db] border-[#0078db] font-extrabold' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Heading Inputs */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Shop / Company Heading</label>
                <input
                  type="text"
                  value={bannerConfig.heading}
                  onChange={(e) => setBannerConfig(prev => ({ ...prev, heading: e.target.value }))}
                  className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0078db]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Sub Heading description</label>
                <input
                  type="text"
                  value={bannerConfig.subHeading}
                  onChange={(e) => setBannerConfig(prev => ({ ...prev, subHeading: e.target.value }))}
                  className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0078db]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Highlight Promo (English)</label>
                <input
                  type="text"
                  value={bannerConfig.highlightText}
                  onChange={(e) => setBannerConfig(prev => ({ ...prev, highlightText: e.target.value }))}
                  className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0078db]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Highlight Promo (Hindi Translation)</label>
                <input
                  type="text"
                  value={bannerConfig.hindiHighlight}
                  onChange={(e) => setBannerConfig(prev => ({ ...prev, hindiHighlight: e.target.value }))}
                  className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0078db]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Hotline Contacts</label>
                <input
                  type="text"
                  value={bannerConfig.phone}
                  onChange={(e) => setBannerConfig(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0078db]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Shop Address</label>
                <input
                  type="text"
                  value={bannerConfig.address}
                  onChange={(e) => setBannerConfig(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0078db]"
                />
              </div>
            </div>

            {/* Quick action copies */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={handleCopyBannerText}
                className="w-full py-3 bg-[#0078db] hover:bg-[#005ca8] text-white text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedText ? 'Copied Details!' : 'Copy Copywriting Details'}</span>
              </button>
            </div>
          </div>

          {/* Banner Render Preview Right */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-[#091e42] text-sm sm:text-base flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-emerald-500" />
                    <span>Live Blueprint Render</span>
                  </h4>
                  <p className="text-xs text-slate-400">High-contrast, professional, print-ready CSS representation.</p>
                </div>
                
                <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                  Verified Vector Assets
                </span>
              </div>

              {/* Dynamic Aspect Ratio outer container */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-8 flex items-center justify-center">
                
                {/* Visual Banner Component */}
                <div 
                  id="print-banner-element"
                  className="w-full text-white shadow-2xl rounded-xl overflow-hidden p-6 sm:p-10 flex flex-col justify-between border-4 relative tracking-wide select-none transition-all duration-300"
                  style={{
                    background: themeColors.background,
                    borderColor: bannerConfig.colorTheme === 'gold-luxury' ? '#d4af37' : '#ffffff',
                    // Render 6x3 or 5x3 or A5 aspect ratio
                    aspectRatio: bannerConfig.aspectRatio === '6x3' ? '2 / 1' : bannerConfig.aspectRatio === '5x3' ? '5 / 3' : '1 / 1.41',
                    maxWidth: bannerConfig.aspectRatio === 'a5' ? '400px' : '100%'
                  }}
                >
                  {/* Decorative design lines */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-bl-full pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-tr-full pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex justify-between items-start border-b border-white/10 pb-4">
                    <div>
                      <h1 className="text-xl sm:text-3xl font-extrabold tracking-[0.1em]">
                        {bannerConfig.heading}
                      </h1>
                      <p className="text-[9px] sm:text-xs text-white/80 font-bold mt-1 uppercase tracking-wider">
                        ★ {bannerConfig.subHeading}
                      </p>
                    </div>

                    <div className={`px-3 py-1 rounded text-[9px] sm:text-[10px] font-black tracking-widest uppercase ${themeColors.badgeBg}`}>
                      RERA APPROVED
                    </div>
                  </div>

                  {/* Highlight Main Stripe */}
                  <div className="my-4 text-center space-y-2 py-3 bg-black/15 border-t border-b border-white/5">
                    <h2 className={`text-lg sm:text-4xl font-extrabold tracking-tight ${themeColors.textAccent}`}>
                      {bannerConfig.highlightText}
                    </h2>
                    <h3 className="text-sm sm:text-2xl font-black text-white bg-red-600 px-3 py-1.5 inline-block rounded border border-red-500 shadow-md">
                      {bannerConfig.hindiHighlight}
                    </h3>
                  </div>

                  {/* Bullet points services list */}
                  <div className="space-y-2 my-2 text-left">
                    {bannerConfig.servicesList.map((service, sIdx) => (
                      <p key={sIdx} className="text-[10px] sm:text-sm font-semibold flex items-center gap-1.5 text-white/95">
                        <span className={themeColors.textAccent}>✔</span>
                        <span>{service}</span>
                      </p>
                    ))}
                  </div>

                  {/* Footer Hotline & Address block */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center text-lg shadow-md">
                        📞
                      </div>
                      <div>
                        <p className="text-[9px] text-white/70 font-bold uppercase tracking-wider">Call / WhatsApp Direct Hotline</p>
                        <p className={`text-sm sm:text-xl font-black ${themeColors.textAccent}`}>
                          {bannerConfig.phone}
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right max-w-xs space-y-0.5">
                      <p className="text-[9px] text-white/70 font-bold uppercase tracking-wider">Corporate Address / Shop Location</p>
                      <p className="text-[10px] sm:text-xs text-white font-medium line-clamp-2">
                        📍 {bannerConfig.address}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Flex printing tips */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1">
                  <Printer className="w-4 h-4 text-[#0078db]" />
                  <span>Flex Printing & Canva Tips:</span>
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500 font-semibold">
                  <div className="space-y-1">
                    <p className="text-slate-800">1. High-Contrast Printing</p>
                    <p className="text-[11px] leading-relaxed">Ensure you ask the flex designer for a "High Contrast Satin Finish Glossy Flex" to make the yellow highlighting color pop in low lighting.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-800">2. True-to-Scale Dimensions</p>
                    <p className="text-[11px] leading-relaxed">The {bannerConfig.aspectRatio === '6x3' ? '6x3 (72" x 36")' : bannerConfig.aspectRatio === '5x3' ? '5x3 (60" x 36")' : 'A5 (5.8" x 8.3")'} ratio matches standard industrial flex machines exactly. No stretching will occur.</p>
                  </div>
                </div>
              </div>

              {/* AI STUDIO COMPANION GENERATED DESIGNS SECTION */}
              <div className="border-t border-slate-100 pt-8 space-y-6">
                <div className="space-y-1">
                  <h4 className="font-black text-[#091e42] text-sm sm:text-base flex items-center gap-2">
                    <Sparkle className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
                    <span>AI Studio Generated Marketing Designs</span>
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">Download or review these premium visual drafts generated live using modern AI diffusion blueprints.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Banner Mockup */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-xs">
                    <div className="relative group overflow-hidden rounded-xl aspect-[16/9] border border-slate-200 bg-white">
                      <img 
                        src={bannerMockupUrl} 
                        alt="Sharma Prop Mart Premium Flex Banner Design" 
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-300" 
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-black uppercase px-2.5 py-1 rounded">
                        Flex Banner 16:9
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-extrabold text-slate-800 text-xs">Premium Flex Banner Blueprint</h5>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">Includes the Royal Blue and Gold corporate motif, modern apartment rendering, and high-visibility yellow "Post Property FREE" highlight box.</p>
                    </div>
                    <div className="pt-1">
                      <a 
                        href={bannerMockupUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0078db] hover:bg-[#005ca8] text-white text-[10px] font-black rounded-lg transition-all"
                      >
                        <span>Open High-Res Banner ↗</span>
                      </a>
                    </div>
                  </div>

                  {/* App UI Mockup */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3 shadow-xs">
                    <div className="relative group overflow-hidden rounded-xl aspect-[16/9] border border-slate-200 bg-white">
                      <img 
                        src={uiMockupUrl} 
                        alt="Sharma Prop Mart App UI Design Mockup" 
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-300" 
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-black uppercase px-2.5 py-1 rounded">
                        App UI Mockup
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-extrabold text-slate-800 text-xs">Mobile App Signup & Profile Interface</h5>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">Clean user dashboard mockup containing interactive tabs: "My Activity", "Recently Searched", "Shortlisted", and the prominent "Post Property FREE" tag.</p>
                    </div>
                    <div className="pt-1">
                      <a 
                        href={uiMockupUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0078db] hover:bg-[#005ca8] text-white text-[10px] font-black rounded-lg transition-all"
                      >
                        <span>Open High-Res App Mockup ↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
