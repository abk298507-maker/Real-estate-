import React from 'react';
import { ActiveTab, InquiryFormData, PropertyItem } from './types';
import { 
  YAMUNA_EXPRESSWAY_LISTINGS, 
  GREATER_NOIDA_LISTINGS, 
  SERVICES, 
  OFFICE_CONTACT, 
  COMPANY_STATS 
} from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import PropertyTable from './components/PropertyTable';
import RequirementForm from './components/RequirementForm';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Mail, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake, 
  Map, 
  FileCheck2, 
  Search,
  Building2,
  BookmarkCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('home');
  const [quickSearch, setQuickSearch] = React.useState<string>('');
  const [quickType, setQuickType] = React.useState<'Buy' | 'Sell' | 'Rent'>('Buy');

  // Multi-state for requirement form
  const [inquiryData, setInquiryData] = React.useState<InquiryFormData>({
    name: '',
    phone: '',
    type: 'Buy',
    location: '',
    message: ''
  });

  const [notification, setNotification] = React.useState<string | null>(null);

  // Auto-scroll when switching views
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Handler for table row actions
  const handlePropertyRowAction = (actionType: 'Buy' | 'Sell', item: PropertyItem) => {
    // Generate prefilled text
    const messageText = `Hi Sharma Prop Mart, I am interested in ${actionType.toLowerCase()}ing property inside ${item.sector}${item.blocks !== '-' ? ` (Blocks: ${item.blocks})` : ''}${item.size ? `, Size: ${item.size}` : ''} under the ${item.region} sector files. Please connect with legal quotes. Thank you.`;

    setInquiryData({
      name: '', // user fills
      phone: '', // user fills
      type: actionType,
      location: `${item.region} - ${item.sector}`,
      message: messageText
    });

    setNotification(`Pre-filled ${actionType} questionnaire for ${item.sector}!`);
    setActiveTab('inquiry');

    // Auto-clear notification after delay
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Switch to input view with custom options
  const handleServiceCardClick = (serviceType: 'buy' | 'sell' | 'rent' | 'build') => {
    const typeMap: Record<string, 'Buy' | 'Sell' | 'Rent' | 'Construction'> = {
      'buy': 'Buy',
      'sell': 'Sell',
      'rent': 'Rent',
      'build': 'Construction'
    };

    setInquiryData({
      name: '',
      phone: '',
      type: typeMap[serviceType] || 'Buy',
      location: serviceType === 'build' ? 'Greater Noida & Mayur Vihar' : '',
      message: serviceType === 'build' 
        ? 'Hi, I need an estimate or consulting service for construction of my building plot. Please reach out.'
        : `Hi, I am looking forward to ${serviceType} property. Please update me about appropriate properties.`
    });

    setActiveTab('inquiry');
  };

  const handleHeroIntents = (searchQuery: string, intentType: 'Buy' | 'Sell' | 'Rent') => {
    setQuickSearch(searchQuery);
    setInquiryData(prev => ({
      ...prev,
      type: intentType,
      location: searchQuery,
      message: `Hi, Looking forward to ${intentType.toLowerCase()}ing plots in sector ${searchQuery}.`
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans flex flex-col justify-between" id="app-root-container">
      {/* Dynamic Temporary Alert Notice */}
      {notification && (
        <div className="fixed top-24 right-5 z-50 bg-amber-500 text-slate-950 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-extrabold animate-bounce border border-white/20">
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>{notification}</span>
        </div>
      )}

      {/* Modern Sticky Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Section displayed on Homepage */}
      {activeTab === 'home' && (
        <Hero 
          setActiveTab={setActiveTab} 
          setQuickSearch={setQuickSearch}
          setQuickType={setQuickType}
        />
      )}

      <main className="flex-grow">
        {/* VIEW: HOME VIEW */}
        {activeTab === 'home' && (
          <div className="py-16 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Quick Portal Switcher Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
              <div 
                onClick={() => setActiveTab('yamuna')}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-amber-500/30 transition-all cursor-pointer hover:shadow-2xl hover:shadow-amber-500/5"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all">
                  <Map className="w-40 h-40" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  Authority Plots
                </span>
                <h3 className="text-2xl font-extrabold mt-4 text-white">
                  Yamuna Expressway Sector Portal
                </h3>
                <p className="text-slate-400 text-sm mt-2 max-w-md leading-relaxed">
                  Browse standard 300 up to 4000 MTR plots in SEC-18 (Pockets 1-7) & SEC-20. Check blocks and request valuations.
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-sm text-amber-400 font-bold group-hover:text-amber-300">
                  <span>Explore Listings</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('noida')}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-amber-500/30 transition-all cursor-pointer hover:shadow-2xl hover:shadow-amber-500/5"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all">
                  <Building2 className="w-40 h-40" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  Established Areas
                </span>
                <h3 className="text-2xl font-extrabold mt-4 text-white">
                  Greater Noida Sector Listings
                </h3>
                <p className="text-slate-400 text-sm mt-2 max-w-md leading-relaxed">
                  Access alpha, beta, gamma, delta, sigma, and elite Swarn Nagari or NRI City sectors. Filter blocks instantly.
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-sm text-amber-400 font-bold group-hover:text-amber-300">
                  <span>Explore Listings</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* SERVICES CARD WORKSPACE */}
            <section id="services-component" className="space-y-12">
              <div className="text-center space-y-4">
                <span className="text-xs font-black tracking-widest text-amber-500 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Expert Capabilities
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Our Exclusive Real Estate Services
                </h2>
                <p className="text-slate-400 text-sm max-w-xl mx-auto">
                  Providing full-cycle property solutions including physical visits, verification audits, premium construction estimates, and legal transfers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SERVICES.map((serv) => (
                  <div 
                    key={serv.id}
                    className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/30 transition-all group hover:-translate-y-1 duration-250 shadow-lg"
                  >
                    <div className="space-y-4">
                      {/* Emoji Icon Badge */}
                      <div className="bg-slate-950 w-12 h-12 flex items-center justify-center rounded-xl border border-slate-850 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors text-2xl">
                        {serv.id === 'buy' && '🏠'}
                        {serv.id === 'sell' && '🏢'}
                        {serv.id === 'rent' && '🔑'}
                        {serv.id === 'build' && '🏗'}
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-extrabold text-white text-lg group-hover:text-amber-400 transition-colors">
                          {serv.title}
                        </h3>
                        <p className="text-xs font-bold text-amber-500">
                          {serv.short}
                        </p>
                      </div>

                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {serv.description}
                      </p>

                      <ul className="space-y-2 pt-2 border-t border-slate-850">
                        {serv.benefits.map((b, bi) => (
                          <li key={bi} className="flex items-center gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleServiceCardClick(serv.id as any)}
                      className="mt-6 w-full py-2 px-4 rounded-xl text-xs font-bold bg-slate-950 hover:bg-slate-800 hover:text-white border border-slate-800 text-slate-300 transition-colors cursor-pointer"
                    >
                      Inquire on WhatsApp
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* WHY CHOOSE GULSHAN SHARMA DECK */}
            <section className="bg-slate-900/40 rounded-3xl p-8 sm:p-12 border border-slate-900/60 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-black tracking-widest text-amber-500 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Value Proposition
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Why Sharma Prop Mart is Trusted Since 2008
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Real Estate can be complex, especially with government authority plots in Yamuna Expressway. We bridge the gap with absolute verification, legally compliance paper checks, clean transactions, and strategic pricing. Our headquarters at Mayur Vihar, New Delhi guarantees local and physical accessibility whenever needed.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                  <div className="flex gap-3 items-start">
                    <div className="bg-amber-500/10 p-2 rounded-lg text-amber-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Legally Certified Listings</h4>
                      <p className="text-xs text-slate-400">Every sector parcel is pre-audited and cross-checked with respective authorities.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="bg-amber-500/10 p-2 rounded-lg text-amber-400">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Direct Customer Dealings</h4>
                      <p className="text-xs text-slate-400">We maintain direct, uninflated correspondence between sellers and buyers.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative CTA panel */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl text-center space-y-6">
                <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center text-amber-500 mx-auto text-3xl">
                  📞
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-white">Have a Specific Sector Plan?</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    Connect instantly with our Managing Consultant Gulshan Sharma.
                  </p>
                </div>
                <div className="space-y-2">
                  <a 
                    href={`tel:${OFFICE_CONTACT.phone}`}
                    className="block w-full bg-slate-950 hover:bg-slate-850/80 text-white font-bold py-2.5 rounded-lg text-xs tracking-wider uppercase border border-slate-800 transition-colors duration-100"
                  >
                    Call: {OFFICE_CONTACT.phone}
                  </a>
                  <a 
                    href={`${OFFICE_CONTACT.whatsappUrlBase}?text=Hello%20I%20want%20to%20discuss%20property`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors duration-100"
                  >
                    Discuss on WhatsApp
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: YAMUNA EXPRESSWAY */}
        {activeTab === 'yamuna' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PropertyTable 
              region="Yamuna Expressway"
              listings={YAMUNA_EXPRESSWAY_LISTINGS}
              onActionClick={handlePropertyRowAction}
              searchFilter={quickSearch}
            />
          </div>
        )}

        {/* VIEW: GREATER NOIDA */}
        {activeTab === 'noida' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PropertyTable 
              region="Greater Noida"
              listings={GREATER_NOIDA_LISTINGS}
              onActionClick={handlePropertyRowAction}
              searchFilter={quickSearch}
            />
          </div>
        )}

        {/* VIEW: REQUIREMENTS WORKFLOW */}
        {activeTab === 'inquiry' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RequirementForm 
              initialData={inquiryData}
              onSubmitSuccess={() => setNotification("WhatsApp Message Dispatched!")}
            />
          </div>
        )}

        {/* VIEW: CONTACT PORTAL */}
        {activeTab === 'contact' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="contact-portal-layout">
            <div className="text-center space-y-4">
              <span className="text-xs font-black tracking-widest text-amber-500 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Sharma Properties Headquarters & Contact Hub
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Connect directly or visit our office. We are located in Pratap Nagar, Mayur Vihar, New Delhi.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Address details */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-amber-500/20 transition-colors space-y-6">
                <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-amber-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl font-sans text-white">Office Address</h3>
                  <p className="text-xs text-amber-500/80 font-bold tracking-widest uppercase mt-1">SHARMA PROPERTIES HQ</p>
                </div>
                <div className="space-y-4 text-slate-300 text-sm">
                  <p className="leading-relaxed">
                    <strong>Corporate Headquarters:</strong><br />
                    166 A, 3rd Floor, Above Durbar Restaurant,<br />
                    Pratap Nagar, Mayur Vihar Phase-1,<br />
                    New Delhi - 110091
                  </p>
                  <p className="leading-relaxed text-slate-400 pt-3 border-t border-slate-800">
                    <strong>Branch Layout Desk:</strong><br />
                    Phase 1 - 166 A Pratap Nagar,<br />
                    Mayur Vihar, New Delhi - 110091
                  </p>
                </div>
              </div>

              {/* Contact numbers */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-amber-500/20 transition-colors space-y-6">
                <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-amber-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl font-sans text-white">Direct Contacts</h3>
                  <p className="text-xs text-amber-500/80 font-bold tracking-widest uppercase mt-1">GULSHAN SHARMA (DIRECTOR)</p>
                </div>
                <div className="space-y-4 text-slate-300 text-sm">
                  <div className="flex gap-3 items-center">
                    <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Phone Support:</p>
                      <a href={`tel:${OFFICE_CONTACT.phone}`} className="font-extrabold text-white text-base hover:text-amber-400 transition-colors">
                        {OFFICE_CONTACT.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center pt-2 border-t border-slate-800">
                    <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 font-bold">Email Inbox:</p>
                      <a href={`mailto:${OFFICE_CONTACT.email}`} className="font-extrabold text-white hover:text-amber-400 transition-colors text-sm break-all">
                        {OFFICE_CONTACT.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center pt-2 border-t border-slate-800">
                    <MessageSquare className="w-5 h-5 text-emerald-500 shrink-0 fill-emerald-500/10" />
                    <div>
                      <p className="text-xs text-slate-500 font-bold">WhatsApp Hotline:</p>
                      <a 
                        href={`${OFFICE_CONTACT.whatsappUrlBase}?text=Hello%20I%20am%20interested%20in%20your%20property`}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="font-extrabold text-emerald-400 hover:underline text-sm"
                      >
                        Send WhatsApp Message
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* RERA and legal check */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-amber-500/20 transition-colors space-y-6">
                <div className="bg-amber-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-amber-400">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl font-sans text-white">Trust Assurance</h3>
                  <p className="text-xs text-amber-500/80 font-bold tracking-widest uppercase mt-1">GOVERNMENT GUIDELINES</p>
                </div>
                <div className="space-y-4 text-slate-300 text-sm">
                  <p className="leading-relaxed text-xs">
                    We adhere to the Delhi Real Estate Authority & Uttar Pradesh RERA master standards:
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Verified registry checking before publishing.</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Full map visualization and demarcation verification.</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>No duplicate allocations checking on Authority Plots.</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setActiveTab('inquiry')}
                    className="w-full mt-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-transform"
                  >
                    Submit Layout Inquiry
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated interactive map placeholders with address pointer */}
            <div className="bg-slate-900 p-2 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative group h-[350px]">
              <div className="absolute inset-0 bg-slate-950 opacity-40"></div>
              {/* Nice real estate layout pattern or premium static simulated vector map background */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4 z-10">
                <span className="text-3xl text-slate-500">📍</span>
                <div className="space-y-1">
                  <h4 className="text-white font-extrabold text-lg">SHARMA PROPERTIES branch layout</h4>
                  <p className="text-slate-400 text-sm max-w-sm">Mayur Vihar Phase - 1, Above Durbar Restaurant & Near New Delhi metro corridor files</p>
                </div>
                <a 
                  href="https://maps.google.com/?q=Pratap+Nagar+Mayur+Vihar+Phase-1+New+Delhi"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="bg-slate-950 hover:bg-slate-800 text-amber-500 border border-amber-500/20 text-xs font-bold py-2.5 px-6 rounded-full transition-colors font-mono"
                >
                  View Physical Direction Route Map ↗
                </a>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200" 
                alt="Simulated Location Map" 
                className="w-full h-full object-cover filter blur-[2px] opacity-20"
              />
            </div>
          </div>
        )}
      </main>

      {/* Persistence and Footer details */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Sticky Dynamic WhatsApp floater - as requested in bottom fixed */}
      <a
        href={`${OFFICE_CONTACT.whatsappUrlBase}?text=Hello%20I%20am%20interested%20in%20your%20property`}
        target="_blank"
        referrerPolicy="no-referrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-400 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:shadow-emerald-500/30 font-bold text-3xl transition-all scale-100 active:scale-95 animate-bounce border-2 border-white/15"
        title="Direct WhatsApp Helpline Support"
        id="whatsapp-floating-trigger"
      >
        <MessageSquare className="w-7 h-7 fill-white stroke-0" />
      </a>
    </div>
  );
}
