import React from 'react';
import { ActiveTab, InquiryFormData, PropertyItem } from './types';
import { 
  YAMUNA_EXPRESSWAY_LISTINGS, 
  GREATER_NOIDA_LISTINGS, 
  SERVICES, 
  OFFICE_CONTACT, 
  COMPANY_STATS,
  WHATSAPP_REPRESENTATIVES
} from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import PropertyTable from './components/PropertyTable';
import RequirementForm from './components/RequirementForm';
import AdminPanel from './components/AdminPanel';
import AllCategories from './components/AllCategories';
import PremiumServices from './components/PremiumServices';
import SearchSimulator from './components/SearchSimulator';
import { UserProfileDrawer, PostPropertyWizard, StuckInFormPopup } from './components/My99AcresServices';
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
  ChevronRight,
  Sparkles,
  ShieldCheck as ShieldIcon,
  Calculator,
  FileText,
  Percent,
  Eye,
  Users,
  Scale,
  FileSignature,
  FolderLock,
  X,
  Star,
  Flame,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('home');
  const [quickSearch, setQuickSearch] = React.useState<string>('');
  const [quickType, setQuickType] = React.useState<'Buy' | 'Sell' | 'Rent'>('Buy');

  // Real database simulation powered by local state & localStorage persistence
  const [allListings, setAllListings] = React.useState<PropertyItem[]>(() => {
    const saved = localStorage.getItem('sharma_prop_listings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If they have older/obsolete format without the rich Greater Noida data (e.g. no item with contactNumber)
        const hasOldFormat = parsed.some((item: any) => item.region === 'Greater Noida' && !item.contactNumber);
        if (hasOldFormat) {
          localStorage.removeItem('sharma_prop_listings');
        } else {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to load listings', e);
      }
    }
    // Default listings combined
    return [
      ...YAMUNA_EXPRESSWAY_LISTINGS.map(item => ({ ...item, region: 'Yamuna Expressway' as const })),
      ...GREATER_NOIDA_LISTINGS.map(item => ({ ...item, region: 'Greater Noida' as const }))
    ];
  });

  const [inquiries, setInquiries] = React.useState<(InquiryFormData & { id: string; date: string; status: 'New' | 'Contacted' | 'Closed' })[]>(() => {
    const saved = localStorage.getItem('sharma_prop_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load inquiries', e);
      }
    }
    return [];
  });

  const [whatsappNumbers, setWhatsappNumbers] = React.useState<typeof WHATSAPP_REPRESENTATIVES>(() => {
    const saved = localStorage.getItem('sharma_whatsapp_numbers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load whatsapp config', e);
      }
    }
    return WHATSAPP_REPRESENTATIVES;
  });

  // Filter listings by region dynamically so property tables match database live additions
  const yamunaListings = React.useMemo(() => {
    return allListings.filter(l => l.region === 'Yamuna Expressway');
  }, [allListings]);

  const noidaListings = React.useMemo(() => {
    return allListings.filter(l => l.region === 'Greater Noida');
  }, [allListings]);

  // Multi-state for requirement form
  const [inquiryData, setInquiryData] = React.useState<InquiryFormData>({
    name: '',
    phone: '',
    type: 'Buy',
    location: '',
    message: ''
  });

  const [notification, setNotification] = React.useState<string | null>(null);
  const [servicesSection, setServicesSection] = React.useState<'tools' | 'vas' | 'crm' | 'builder'>('tools');

  // User Profile Drawer and stuck modal state
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isPostPropertyOpen, setIsPostPropertyOpen] = React.useState(false);
  const [isStuckModalOpen, setIsStuckModalOpen] = React.useState(false);

  const handlePropertyCreated = (newItem: Omit<PropertyItem, 'id'>) => {
    const nextId = allListings.length > 0 ? Math.max(...allListings.map(l => l.id)) + 1 : 1;
    const added: PropertyItem = {
      ...newItem,
      id: nextId
    };
    const updated = [added, ...allListings];
    setAllListings(updated);
    localStorage.setItem('sharma_prop_listings', JSON.stringify(updated));
    setNotification('Property listed successfully! Available in database.');
    setIsPostPropertyOpen(false);
    setTimeout(() => setNotification(null), 4000);
  };

  // Auto-scroll when switching views
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Handle inquiry submission from form
  const handleInquirySubmit = (submitted: InquiryFormData & { representative: string; rawPhone: string }) => {
    const newInq = {
      ...submitted,
      id: 'inq_' + Date.now(),
      date: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      status: 'New' as const
    };

    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('sharma_prop_inquiries', JSON.stringify(updated));

    setNotification(`Dispatched to ${submitted.representative}! Saved in Admin Log.`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Handler for table row actions
  const handlePropertyRowAction = (actionType: 'Buy' | 'Sell' | 'Rent', item: PropertyItem) => {
    // Generate prefilled text
    const actionVerb = actionType === 'Buy' ? 'buying' : actionType === 'Sell' ? 'selling' : 'renting';
    const messageText = `Hi Sharma Prop Mart, I am interested in ${actionVerb} property inside ${item.sector}${item.blocks !== '-' ? ` (Blocks: ${item.blocks})` : ''}${item.size ? `, Size: ${item.size}` : ''} under the ${item.region} sector files. Please connect with legal quotes. Thank you.`;

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

  return (
    <div className="min-h-screen bg-slate-950 font-sans flex flex-col justify-between text-slate-100" id="app-root-container">
      {/* Dynamic Temporary Alert Notice */}
      {notification && (
        <div className="fixed top-24 right-5 z-50 bg-emerald-500 text-slate-950 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-extrabold animate-bounce border border-white/20">
          <Sparkles className="w-4 h-4 fill-slate-950 animate-spin" />
          <span>{notification}</span>
        </div>
      )}

      {/* Modern Sticky Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenProfile={() => setIsProfileOpen(true)} 
      />

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
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-emerald-500/30 transition-all cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/5"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all">
                  <Map className="w-40 h-40" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  Authority Plots
                </span>
                <h3 className="text-2xl font-extrabold mt-4 text-white">
                  Yamuna Expressway Sector Portal
                </h3>
                <p className="text-slate-400 text-sm mt-2 max-w-md leading-relaxed">
                  Browse standard 300 up to 4000 MTR plots in SEC-18 (Pockets 1-7) & SEC-20. Check blocks and request valuations.
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-sm text-emerald-400 font-bold group-hover:text-emerald-300">
                  <span>Explore Listings</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('noida')}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-emerald-500/30 transition-all cursor-pointer hover:shadow-2xl hover:shadow-emerald-500/5"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all">
                  <Building2 className="w-40 h-40" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  Established Areas
                </span>
                <h3 className="text-2xl font-extrabold mt-4 text-white">
                  Greater Noida Sector Listings
                </h3>
                <p className="text-slate-400 text-sm mt-2 max-w-md leading-relaxed">
                  Access alpha, beta, gamma, delta, sigma, and elite Swarn Nagari or NRI City sectors. Filter blocks instantly.
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-sm text-emerald-400 font-bold group-hover:text-emerald-300">
                  <span>Explore Listings</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* SERVICES CARD WORKSPACE */}
            <section id="services-component" className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Our Services
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {SERVICES.map((serv) => (
                  <div 
                    key={serv.id}
                    onClick={() => handleServiceCardClick(serv.id as any)}
                    className="bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-100 group"
                  >
                    {/* Centered Emoji Icon with large background rounded box */}
                    <div className="bg-slate-50 w-20 h-20 flex items-center justify-center rounded-2xl mb-6 shadow-sm text-4xl group-hover:scale-105 transition-transform duration-250">
                      {serv.icon}
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-xl sm:text-2xl mb-2">
                      {serv.title}
                    </h3>

                    <p className="text-slate-500 font-semibold text-sm leading-relaxed max-w-xs">
                      {serv.short}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION: WHY CHOOSE SHARMA PROP MART */}
            <section id="why-choose-section" className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Why Choose Sharma Prop Mart?
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  {
                    icon: '✔️',
                    colorClass: 'bg-emerald-500/10 text-emerald-400',
                    title: '30+ Years Experience',
                    desc: 'Trusted by thousands of families in Greater Noida & Yamuna Expressway.'
                  },
                  {
                    icon: '📍',
                    colorClass: 'bg-rose-500/10 text-rose-400',
                    title: 'Prime Locations',
                    desc: 'Expert knowledge of Alpha, Beta, Gamma, Delta & all major sectors.'
                  },
                  {
                    icon: '💯',
                    colorClass: 'bg-amber-500/10 text-amber-400',
                    title: 'Transparent Deals',
                    desc: 'No hidden charges. Best rates guaranteed.'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:border-slate-700 transition-all duration-300"
                  >
                    <div className={`${item.colorClass} w-16 h-16 flex items-center justify-center rounded-2xl mb-6 text-3xl font-extrabold shadow-sm`}>
                      {item.icon}
                    </div>

                    <h3 className="font-extrabold text-white text-lg sm:text-xl mb-3">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION: HOT LOCALITIES */}
            <section className="space-y-8" id="hot-localities-section">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-bold tracking-wider uppercase">
                  <Flame className="w-3.5 h-3.5 fill-red-500/20" />
                  <span>Greater Noida & Yamuna Hotbeds</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Premium High-Demand Localities
                </h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                  Based on live registration queries and investor transaction volumes over the last 90 days. Click any card to instantly filter properties.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    sector: 'Sector 18',
                    zone: 'Yamuna Expressway',
                    tab: 'yamuna',
                    query: 'SEC-18',
                    buyers: '120+ Active Buyers',
                    growth: '+15.4% YoY',
                    circleRate: '₹55,000 / sq.m.',
                    advantage: 'Immediate Yamuna Authority allotment & pocket parks'
                  },
                  {
                    sector: 'Sector 20',
                    zone: 'Yamuna Expressway',
                    tab: 'yamuna',
                    query: 'SEC-20',
                    buyers: '95+ Active Buyers',
                    growth: '+12.8% YoY',
                    circleRate: '₹52,000 / sq.m.',
                    advantage: 'Large scale plots with rapid industrial highway corridor links'
                  },
                  {
                    sector: 'Alpha-I',
                    zone: 'Greater Noida',
                    tab: 'noida',
                    query: 'ALPHA-I',
                    buyers: '140+ Active Buyers',
                    growth: '+10.2% YoY',
                    circleRate: '₹85,000 / sq.m.',
                    advantage: 'Highly established, near active Commercial hubs & metro'
                  },
                  {
                    sector: 'Swarn Nagari',
                    zone: 'Greater Noida',
                    tab: 'noida',
                    query: 'SWARN NAGARI',
                    buyers: '80+ Active Buyers',
                    growth: '+11.5% YoY',
                    circleRate: '₹95,000 / sq.m.',
                    advantage: 'Ultra-exclusive residential layout with elite villa layouts'
                  }
                ].map((loc, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setQuickSearch(loc.query);
                      setQuickType('Buy');
                      setActiveTab(loc.tab as any);
                    }}
                    className="bg-slate-900 border border-slate-800 hover:border-red-500/40 p-6 rounded-2xl group transition-all cursor-pointer hover:-translate-y-1.5 duration-200 relative overflow-hidden flex flex-col justify-between"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full group-hover:bg-red-500/10 transition-colors pointer-events-none" />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-extrabold text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20 block w-max">
                            {loc.zone}
                          </span>
                          <h3 className="text-xl font-extrabold text-white mt-2 group-hover:text-red-400 transition-colors">
                            {loc.sector}
                          </h3>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Market Interest:</span>
                          <span className="text-white font-bold">{loc.buyers}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Appreciation:</span>
                          <span className="text-emerald-400 font-bold">{loc.growth}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Avg Circle Rate:</span>
                          <span className="text-red-400 font-bold">{loc.circleRate}</span>
                        </div>
                      </div>

                      <p className="text-slate-400 text-xs leading-relaxed pt-2 border-t border-slate-850">
                        {loc.advantage}
                      </p>
                    </div>

                    <div className="mt-4 text-[11px] font-bold text-red-400 flex items-center gap-1">
                      <span>View Sectors Listing</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION: PRICE TRENDS */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-12 space-y-8 relative overflow-hidden" id="price-trends-section">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold tracking-wider uppercase">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Real-time Appraisals</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                    Average Price Trends & Circle Rates
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Compare circle rates set by Noida Authorities against premium market transaction rates. Track high-velocity residential growth parameters across different asset configurations.
                  </p>
                  <div className="pt-4 border-t border-slate-850 text-xs text-slate-400 space-y-2">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Yamuna Expressway average premium appreciation: <strong>+12.4% YoY</strong></span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Greater Noida Core sectors appreciation: <strong>+10.2% YoY</strong></span>
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      category: 'Yamuna Authority Plots',
                      size: 'Standard 300 Sq. Mtr.',
                      priceRange: '₹1.20 Cr - ₹2.35 Cr',
                      demand: 'Very High',
                      trend: '+15.4% YoY',
                      color: 'emerald'
                    },
                    {
                      category: 'Greater Noida West Flats',
                      size: 'Luxury 3 BHK Residentials',
                      priceRange: '₹85 Lakh - ₹1.70 Cr',
                      demand: 'High Stability',
                      trend: '+8.6% YoY',
                      color: 'amber'
                    },
                    {
                      category: 'Commercial Shops',
                      size: 'Premium Retail Outlets',
                      priceRange: '₹50 Lakh - ₹2.50 Cr',
                      demand: 'Steady Cashflow',
                      trend: '+11.2% YoY',
                      color: 'emerald'
                    },
                    {
                      category: 'Industrial / Institutional',
                      size: 'Greater Noida Green Belt',
                      priceRange: 'On Request',
                      demand: 'Highly Selective',
                      trend: 'Contact Gulshan',
                      color: 'slate'
                    }
                  ].map((trend, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 border border-slate-850 p-5 rounded-xl space-y-3 relative hover:border-slate-700 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-extrabold text-white text-sm">{trend.category}</h4>
                          <p className="text-[11px] text-slate-400">{trend.size}</p>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                          trend.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          trend.color === 'amber' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {trend.trend}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-850 flex justify-between items-center text-xs">
                        <span className="text-slate-400">Avg Market Rate:</span>
                        <span className="text-white font-extrabold">{trend.priceRange}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-500">Investor Demand Index:</span>
                        <span className="text-emerald-400 font-bold">{trend.demand}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION: TESTIMONIALS */}
            <section className="space-y-8" id="testimonials-section">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold tracking-wider uppercase">
                  <Star className="w-3.5 h-3.5 fill-amber-500/20" />
                  <span>Real Customer Feedback</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  What Our Valued Investors Say
                </h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                  Over 15+ years of delivering uncompromised legal verification and physical site allotment support across New Delhi, Greater Noida & Yamuna Expressway.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Rajinder Prasad',
                    role: 'Retired Government Officer',
                    location: 'Mayur Vihar, Delhi',
                    quote: 'We bought a 300 Mtr plot in Yamuna Expressway Sector 18 through Sharma Prop Mart. The entire documentation, from allotment checks to registry filing, was handled cleanly without any hassle. Highly recommended!',
                    initials: 'RP'
                  },
                  {
                    name: 'Anjali Singhal',
                    role: 'IT Consultant & Investor',
                    location: 'Greater Noida West',
                    quote: 'Direct, transparent dealing without aggressive markups is their biggest USP. I sold my Greater Noida Sector flat within 2 weeks at a very fair market price. Extremely professional and humble staff!',
                    initials: 'AS'
                  },
                  {
                    name: 'Devender Rawat',
                    role: 'Business Owner',
                    location: 'Indirapuram, Ghaziabad',
                    quote: 'Outstanding construction support in Sigma-II. They built our residential villa exactly on schedule, keeping RERA standards in mind and utilizing certified, premium quality building materials throughout.',
                    initials: 'DR'
                  }
                ].map((test, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-4">
                      {/* Star indicators */}
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(5)].map((_, si) => (
                          <Star key={si} className="w-4 h-4 fill-amber-400 stroke-0" />
                        ))}
                      </div>

                      <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed">
                        "{test.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-850">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-red-500 text-slate-950 font-extrabold flex items-center justify-center text-sm">
                        {test.initials}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-white text-xs sm:text-sm">{test.name}</h4>
                        <p className="text-[11px] text-slate-400">{test.role} • {test.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW: ALL CATEGORIES HUB */}
        {activeTab === 'categories' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AllCategories 
              setActiveTab={setActiveTab}
              setQuickSearch={setQuickSearch}
            />
          </div>
        )}

        {/* VIEW: DIGITAL SERVICES & TOOLS HUB */}
        {activeTab === 'services' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PremiumServices 
              setActiveTab={setActiveTab}
              setQuickSearch={setQuickSearch}
              activeSection={servicesSection}
              setActiveSection={setServicesSection}
            />
          </div>
        )}

        {/* VIEW: YAMUNA EXPRESSWAY */}
        {activeTab === 'yamuna' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PropertyTable 
              region="Yamuna Expressway"
              listings={yamunaListings}
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
              listings={noidaListings}
              onActionClick={handlePropertyRowAction}
              searchFilter={quickSearch}
            />
          </div>
        )}

        {/* VIEW: SEO RANK CHECKER & SEARCH SIMULATOR */}
        {activeTab === 'seo' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchSimulator />
          </div>
        )}

        {/* VIEW: REQUIREMENTS WORKFLOW */}
        {activeTab === 'inquiry' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RequirementForm 
              initialData={inquiryData}
              onSubmitSuccess={handleInquirySubmit}
            />
          </div>
        )}

        {/* VIEW: CONTACT PORTAL */}
        {activeTab === 'contact' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="contact-portal-layout">
            <div className="text-center space-y-4">
              <span className="text-xs font-black tracking-widest text-emerald-500 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
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
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/20 transition-colors space-y-6">
                <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl font-sans text-white">Office Address</h3>
                  <p className="text-xs text-emerald-500/80 font-bold tracking-widest uppercase mt-1">SHARMA PROPERTIES HQ</p>
                </div>
                <div className="space-y-4 text-slate-300 text-sm">
                  <p className="leading-relaxed">
                    <strong>Corporate Headquarters:</strong><br />
                    166 A, 3rd Floor, Above Durbar Restaurant,<br />
                    Pratap Nagar, Mayur Vihar Phase-1,<br />
                    New Delhi - 110091
                  </p>
                </div>
              </div>

              {/* Contact numbers */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/20 transition-colors space-y-6">
                <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl font-sans text-white">Direct Contacts</h3>
                  <p className="text-xs text-emerald-500/80 font-bold tracking-widest uppercase mt-1">SUPPORT HOTLINES</p>
                </div>
                <div className="space-y-4 text-slate-300 text-sm">
                  <div className="flex gap-3 items-center">
                    <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Phone Support:</p>
                      <a href={`tel:${OFFICE_CONTACT.phone}`} className="font-extrabold text-white text-base hover:text-emerald-400 transition-colors">
                        {OFFICE_CONTACT.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center pt-2 border-t border-slate-800">
                    <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 font-bold">Email Inbox:</p>
                      <a href={`mailto:${OFFICE_CONTACT.email}`} className="font-extrabold text-white hover:text-emerald-400 transition-colors text-sm break-all">
                        {OFFICE_CONTACT.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center pt-2 border-t border-slate-800">
                    <MessageSquare className="w-5 h-5 text-emerald-500 shrink-0 fill-emerald-500/10" />
                    <div>
                      <p className="text-xs text-slate-500 font-bold">WhatsApp Direct Desk 1:</p>
                      <a 
                        href={`https://wa.me/${whatsappNumbers[0]?.raw || '918178097230'}?text=Hello%20I%20am%20interested%20in%20your%20property`}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="font-extrabold text-emerald-400 hover:underline text-sm"
                      >
                        {whatsappNumbers[0]?.name || 'Inquiry Desk 1'} ({whatsappNumbers[0]?.phone || '+91 81780 97230'})
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* RERA and legal check */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/20 transition-colors space-y-6">
                <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl font-sans text-white">Trust Assurance</h3>
                  <p className="text-xs text-emerald-500/80 font-bold tracking-widest uppercase mt-1">GOVERNMENT GUIDELINES</p>
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
                    className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl text-xs transition-transform cursor-pointer"
                  >
                    Submit Layout Inquiry
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated interactive map placeholders with address pointer */}
            <div className="bg-slate-900 p-2 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative group h-[350px]">
              <div className="absolute inset-0 bg-slate-950 opacity-40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4 z-10">
                <span className="text-3xl text-slate-500">📍</span>
                <div className="space-y-1">
                  <h4 className="text-white font-extrabold text-lg">SHARMA PROPERTIES Office</h4>
                  <p className="text-slate-400 text-sm max-w-sm">Mayur Vihar Phase - 1, Above Durbar Restaurant & Near New Delhi metro corridor files</p>
                </div>
                <a 
                  href="https://maps.google.com/?q=Pratap+Nagar+Mayur+Vihar+Phase-1+New+Delhi"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="bg-slate-950 hover:bg-slate-800 text-emerald-500 border border-emerald-500/20 text-xs font-bold py-2.5 px-6 rounded-full transition-colors font-mono"
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

        {/* VIEW: ADMIN PANEL */}
        {activeTab === 'admin' && (
          <div className="py-4">
            <AdminPanel 
              listings={allListings}
              setListings={setAllListings}
              inquiries={inquiries}
              setInquiries={setInquiries}
              whatsappNumbers={whatsappNumbers}
              setWhatsappNumbers={setWhatsappNumbers}
            />
          </div>
        )}
      </main>

      {/* Persistence and Footer details */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Sticky Dynamic WhatsApp floater - opens the active representative's chat */}
      <a
        href={`https://wa.me/${whatsappNumbers[0]?.raw || OFFICE_CONTACT.rawPhone2}?text=Hello%20I%20am%2520interested%20in%20property%20listings`}
        target="_blank"
        referrerPolicy="no-referrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-400 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:shadow-emerald-500/30 font-bold text-3xl transition-all scale-100 active:scale-95 animate-bounce border-2 border-white/15"
        title="Direct WhatsApp Helpline Support"
        id="whatsapp-floating-trigger"
      >
        <MessageSquare className="w-7 h-7 fill-white stroke-0" />
      </a>

      {/* User Activity & Role Profiles Drawer */}
      <UserProfileDrawer 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        allListings={allListings}
        setActiveTab={(tab) => {
          setActiveTab(tab as any);
          setIsProfileOpen(false);
        }}
        triggerPostProperty={() => {
          setIsProfileOpen(false);
          setIsPostPropertyOpen(true);
        }}
      />

      {/* Post Property Multi-Step Wizard popup */}
      {isPostPropertyOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl p-2 sm:p-4">
            <button 
              onClick={() => setIsPostPropertyOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors z-20 cursor-pointer"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
            <PostPropertyWizard 
              onPropertyCreated={handlePropertyCreated}
              triggerStuckModal={() => setIsStuckModalOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Anti-stuck intelligent lead backup helper */}
      <StuckInFormPopup 
        isOpen={isStuckModalOpen}
        onClose={() => setIsStuckModalOpen(false)}
        onSubmit={(phone) => {
          // add callback or log to inquiries
          const newInq = {
            id: 'inq_stuck_' + Date.now(),
            name: 'Stuck Lead User',
            phone: phone,
            type: 'Buy' as const,
            location: 'Yamuna Expressway',
            message: 'User got stuck while filling form or posting property. Requested callback immediately.',
            date: new Date().toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }),
            status: 'New' as const
          };
          const updated = [newInq, ...inquiries];
          setInquiries(updated);
          localStorage.setItem('sharma_prop_inquiries', JSON.stringify(updated));
          setNotification('Callback registered. Our representative will contact you.');
          setTimeout(() => setNotification(null), 4000);
        }}
      />
    </div>
  );
}
