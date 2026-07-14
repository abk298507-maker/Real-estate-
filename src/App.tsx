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
import PostProperty from './components/PostProperty';
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

const DEFAULT_RECOMMENDED_PROPERTIES = [
  {
    id: 1,
    price: "₹ 1.25 Cr",
    pricePerSqft: "₹ 8,500/sqft",
    name: "Luxury 3 BHK Apartment in Sector 62",
    location: "Sector 62, Noida",
    area: "1,450 sqft",
    bhk: "3 BHK",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    badges: ["rera", "verified"],
    posted: "Posted 2 days ago"
  },
  {
    id: 2,
    price: "₹ 85 Lac",
    pricePerSqft: "₹ 7,200/sqft",
    name: "Spacious 2 BHK with Balcony",
    location: "Dwarka, Delhi",
    area: "1,180 sqft",
    bhk: "2 BHK",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
    badges: ["new", "featured"],
    posted: "Posted today"
  },
  {
    id: 3,
    price: "₹ 2.8 Cr",
    pricePerSqft: "₹ 12,000/sqft",
    name: "Premium 4 BHK Villa with Garden",
    location: "Golf Course Road, Gurgaon",
    area: "2,350 sqft",
    bhk: "4 BHK",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    badges: ["rera", "featured"],
    posted: "Posted 5 days ago"
  },
  {
    id: 4,
    price: "₹ 45 Lac",
    pricePerSqft: "₹ 5,800/sqft",
    name: "Affordable 1 BHK Studio Apartment",
    location: "Greater Noida West",
    area: "775 sqft",
    bhk: "1 BHK",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    badges: ["verified"],
    posted: "Posted 1 week ago"
  },
  {
    id: 5,
    price: "₹ 1.8 Cr",
    pricePerSqft: "₹ 9,200/sqft",
    name: "Modern 3 BHK with Smart Home",
    location: "Whitefield, Bangalore",
    area: "1,950 sqft",
    bhk: "3 BHK",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    badges: ["rera", "new", "featured"],
    posted: "Posted 3 days ago"
  },
  {
    id: 6,
    price: "₹ 3.5 Cr",
    pricePerSqft: "₹ 15,000/sqft",
    name: "Penthouse with Terrace Pool",
    location: "Bandra, Mumbai",
    area: "2,800 sqft",
    bhk: "4 BHK",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    badges: ["rera", "verified", "featured"],
    posted: "Posted yesterday"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('home');
  const [quickSearch, setQuickSearch] = React.useState<string>('');
  const [quickType, setQuickType] = React.useState<'Buy' | 'Sell' | 'Rent'>('Buy');

  // Interactive filters matching the mockup
  const [heroFilters, setHeroFilters] = React.useState({
    tab: 'Buy',
    propertyType: 'All Residential',
    budget: 'Budget',
    searchQuery: '',
    chips: [] as string[]
  });

  const filteredRecommended = React.useMemo(() => {
    return DEFAULT_RECOMMENDED_PROPERTIES.filter(p => {
      // Filter by text search
      if (heroFilters.searchQuery) {
        const q = heroFilters.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesLoc = p.location.toLowerCase().includes(q);
        if (!matchesName && !matchesLoc) return false;
      }
      // Filter by property type
      if (heroFilters.propertyType !== 'All Residential') {
        const typeLower = heroFilters.propertyType.toLowerCase();
        if (typeLower === 'flats' || typeLower === 'flat/apartment') {
          if (!p.name.toLowerCase().includes('apartment') && !p.name.toLowerCase().includes('flat') && !p.name.toLowerCase().includes('bhk')) return false;
        } else if (typeLower === 'plots' || typeLower === 'plots/land') {
          if (!p.name.toLowerCase().includes('plot') && !p.name.toLowerCase().includes('land')) return false;
        } else if (typeLower === 'commercial') {
          if (!p.name.toLowerCase().includes('commercial') && !p.name.toLowerCase().includes('office') && !p.name.toLowerCase().includes('shop')) return false;
        } else if (typeLower === 'independent house' || typeLower === 'villa') {
          if (!p.name.toLowerCase().includes('house') && !p.name.toLowerCase().includes('villa') && !p.name.toLowerCase().includes('home')) return false;
        } else {
          if (!p.name.toLowerCase().includes(typeLower)) return false;
        }
      }
      // Filter by budget
      if (heroFilters.budget !== 'Budget' && heroFilters.budget !== 'Any Budget') {
        // Simple heuristic based on price string
        if (heroFilters.budget.includes('10 Lac') && !p.price.includes('Lac')) return false;
        if (heroFilters.budget.includes('50 Lac') && (!p.price.includes('Lac') && !p.price.includes('Cr'))) return false;
        if (heroFilters.budget.includes('2 Cr') && !p.price.includes('Cr')) return false;
      }
      // Filter by chips
      if (heroFilters.chips.length > 0) {
        for (const chip of heroFilters.chips) {
          if (chip === '2 BHK' && p.bhk !== '2 BHK') return false;
          if (chip === '3 BHK' && p.bhk !== '3 BHK') return false;
          if (chip === 'Ready to Move' && p.status !== 'Ready to Move') return false;
          if (chip === 'Under Construction' && p.status !== 'Under Construction') return false;
        }
      }
      return true;
    });
  }, [heroFilters]);

  const [shortlistedIds, setShortlistedIds] = React.useState<number[]>(() => {
    const saved = localStorage.getItem('sharma_shortlisted_ids');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const handleToggleShortlist = (id: number) => {
    let next;
    if (shortlistedIds.includes(id)) {
      next = shortlistedIds.filter(x => x !== id);
      setNotification('Removed from shortlist');
    } else {
      next = [...shortlistedIds, id];
      setNotification('Added to shortlist!');
    }
    setShortlistedIds(next);
    localStorage.setItem('sharma_shortlisted_ids', JSON.stringify(next));
    setTimeout(() => setNotification(null), 2500);
  };

  const handleContactClick = (propertyName: string) => {
    setInquiryData({
      name: '',
      phone: '',
      type: 'Buy',
      location: propertyName,
      message: `Hi Sharma Prop Mart, I am interested in knowing more about "${propertyName}". Please contact me immediately. Thank you.`
    });
    setNotification(`Prefilled inquiry for ${propertyName}!`);
    setActiveTab('inquiry');
    setTimeout(() => setNotification(null), 3000);
  };

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
    <div 
      className="min-h-screen font-sans flex flex-col justify-between text-slate-800 relative bg-[#f4f5f7]" 
      id="app-root-container"
    >
      {/* Dynamic Temporary Alert Notice */}
      {notification && (
        <div className="fixed top-24 right-5 z-50 bg-[#0078db] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-extrabold animate-bounce border border-white/20">
          <Sparkles className="w-4 h-4 fill-white animate-spin" />
          <span>{notification}</span>
        </div>
      )}

      {/* Modern Sticky Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenProfile={() => setIsProfileOpen(true)} 
        onOpenPostProperty={() => setActiveTab('post-property')}
      />

      {/* Hero Section displayed on Homepage */}
      {activeTab === 'home' && (
        <Hero 
          setActiveTab={setActiveTab} 
          setQuickSearch={setQuickSearch}
          setQuickType={setQuickType}
          onFilterChange={setHeroFilters}
        />
      )}

      <main className="flex-grow">
        {/* VIEW: HOME VIEW */}
        {activeTab === 'home' && (
          <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* SECTION: RECOMMENDED PROPERTIES */}
            <section id="recommended-properties-section" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#091e42] tracking-tight">
                    Recommended Properties
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">
                    Curated especially for you • Real-time update
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('categories')}
                  className="text-sm font-extrabold text-[#0078db] hover:text-[#005ca8] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>View All Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {filteredRecommended.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecommended.map((p) => {
                    const isShortlisted = shortlistedIds.includes(p.id);
                    return (
                      <div 
                        key={p.id}
                        className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                      >
                        {/* Image Wrapper */}
                        <div className="relative h-56 overflow-hidden bg-slate-100">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {/* Badges row */}
                          <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
                            {p.badges.map((badge) => (
                              <span 
                                key={badge}
                                className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm border ${
                                  badge === 'rera' ? 'bg-[#0078db] text-white border-[#0078db]' :
                                  badge === 'verified' ? 'bg-emerald-600 text-white border-emerald-600' :
                                  badge === 'featured' ? 'bg-amber-500 text-slate-900 border-amber-500' :
                                  'bg-slate-900 text-white border-slate-900'
                                }`}
                              >
                                {badge}
                              </span>
                            ))}
                          </div>

                          {/* Heart Shortlist toggle */}
                          <button
                            onClick={() => handleToggleShortlist(p.id)}
                            className="absolute top-3.5 right-3.5 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:text-rose-600 transition-colors shadow-md cursor-pointer hover:scale-105 active:scale-95"
                            title={isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              fill={isShortlisted ? "#e11d48" : "none"} 
                              stroke={isShortlisted ? "#e11d48" : "currentColor"} 
                              className="w-5 h-5"
                              strokeWidth="2.5"
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            {/* Price & Rate/sqft row */}
                            <div className="flex justify-between items-baseline">
                              <span className="text-xl font-black text-[#0078db]">{p.price}</span>
                              <span className="text-xs font-semibold text-slate-500">{p.pricePerSqft}</span>
                            </div>

                            {/* Property Name */}
                            <h3 className="font-extrabold text-[#091e42] text-sm sm:text-base mt-2 line-clamp-1 group-hover:text-[#0078db] transition-colors">
                              {p.name}
                            </h3>

                            {/* Location with map pin */}
                            <p className="text-xs text-slate-500 font-bold flex items-center gap-1 mt-1">
                              <span className="text-slate-400">📍</span>
                              <span>{p.location}</span>
                            </p>
                          </div>

                          {/* Quick details specs layout */}
                          <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-100 text-center text-xs">
                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Area</span>
                              <span className="font-extrabold text-slate-700">{p.area}</span>
                            </div>
                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</span>
                              <span className="font-extrabold text-slate-700">{p.bhk}</span>
                            </div>
                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                              <span className="font-extrabold text-slate-700 truncate block">{p.status}</span>
                            </div>
                          </div>

                          {/* Action footer */}
                          <div className="flex justify-between items-center pt-1 gap-2">
                            <span className="text-[11px] font-semibold text-slate-400">
                              {p.posted}
                            </span>
                            <button
                              onClick={() => handleContactClick(p.name)}
                              className="px-5 py-2.5 bg-[#0078db] hover:bg-[#005ca8] text-white text-xs font-extrabold rounded-lg shadow-sm transition-colors cursor-pointer"
                            >
                              Contact Owner
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 max-w-lg mx-auto shadow-sm">
                  <div className="text-4xl text-slate-300">🔍</div>
                  <h3 className="font-bold text-slate-700">No properties match your current filters</h3>
                  <p className="text-slate-500 text-xs">
                    Try checking other filter chips or search tags to find matching recommendations.
                  </p>
                  <button 
                    onClick={() => setHeroFilters({
                      tab: 'Buy',
                      propertyType: 'All Residential',
                      budget: 'Budget',
                      searchQuery: '',
                      chips: []
                    })}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </section>

            {/* SECTION: POPULAR CITIES */}
            <section id="popular-cities-section" className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#091e42] tracking-tight">
                  Popular Cities
                </h2>
                <p className="text-slate-500 text-sm font-medium">
                  Find premium real estate hubs across top destinations
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  'Delhi NCR', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune',
                  'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida', 'Chandigarh', 'Jaipur'
                ].map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setHeroFilters(prev => ({ ...prev, searchQuery: city }));
                      setNotification(`Active city set to ${city}!`);
                      setTimeout(() => setNotification(null), 2500);
                      // Scroll to hero section search result
                      document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-3 bg-white hover:bg-[#0078db] hover:text-white border border-slate-200 rounded-xl font-bold text-xs sm:text-sm text-slate-700 shadow-sm transition-all cursor-pointer text-center whitespace-nowrap active:scale-[0.98]"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </section>

            {/* SECTION: SERVICES BENTO GRID */}
            <section id="services-grid" className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#091e42] tracking-tight">
                  Our Professional Services
                </h2>
                <p className="text-slate-500 text-sm font-medium">
                  We guide you through every stage of your real estate investment journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Home Loans',
                    desc: 'Compare & apply for best home loan rates from premium trusted banking partners.',
                    emoji: '🏦',
                    badge: '6.5% starts'
                  },
                  {
                    title: 'Property Valuation',
                    desc: 'Know the right market value of your property using actual authority circle data.',
                    emoji: '📊',
                    badge: '100% Free'
                  },
                  {
                    title: 'Legal Services',
                    desc: 'Verified legal assistance for registry, allotment, transfer paperwork and approvals.',
                    emoji: '⚖️',
                    badge: 'Expert advice'
                  },
                  {
                    title: 'Vastu Consultation',
                    desc: 'Expert vastu advice from premium certified consultants to align solar orbit peace.',
                    emoji: '🧭',
                    badge: 'Harmonized'
                  }
                ].map((serv, i) => (
                  <div 
                    key={i}
                    onClick={() => {
                      setInquiryData(prev => ({
                        ...prev,
                        message: `Hello, I am interested in seeking your expert "${serv.title}" services. Please guide me immediately.`
                      }));
                      setActiveTab('inquiry');
                      setNotification(`Inquiry prefilled for ${serv.title}!`);
                      setTimeout(() => setNotification(null), 2500);
                    }}
                    className="bg-white rounded-2xl border border-slate-150 p-6 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-4xl">{serv.emoji}</span>
                        <span className="text-[10px] font-black uppercase text-[#0078db] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {serv.badge}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-[#091e42] text-lg mt-4 group-hover:text-[#0078db] transition-colors">
                        {serv.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {serv.desc}
                      </p>
                    </div>
                    <div className="mt-4 text-xs font-bold text-[#0078db] flex items-center gap-1">
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION: WHY CHOOSE US */}
            <section id="why-choose-us" className="bg-gradient-to-br from-[#1a3a5c] to-[#2d5a87] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  <circle cx="90" cy="10" r="30" fill="white" />
                </svg>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-[10px] font-extrabold tracking-widest text-[#0078db] bg-white px-3 py-1 rounded-full uppercase">
                    Sharma Prop Mart
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    Why Choose Sharma Prop Mart?
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    With over 30+ years of direct field experience in New Delhi, Greater Noida, and Yamuna Expressway, we offer verified listings, legal registry safety, and direct channel deals without markups.
                  </p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: '30+ Years Experience',
                      desc: 'Trusted by thousands of families in Alpha, Beta, Delta & premium sectors.'
                    },
                    {
                      title: 'Transparent Deals',
                      desc: 'No hidden charges or unexpected markups. Full legal paperwork transparency.'
                    },
                    {
                      title: 'Authority verified',
                      desc: 'Direct checks with Yamuna Authority database to guarantee correct allotments.'
                    },
                    {
                      title: 'Instant Support',
                      desc: 'Active WhatsApp links & dedicated managers to assist round the clock.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10">
                      <h4 className="font-extrabold text-white text-sm sm:text-base">✔️ {item.title}</h4>
                      <p className="text-xs text-white/85 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION: INVESTOR TESTIMONIALS */}
            <section id="investor-testimonials" className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#091e42] tracking-tight">
                  What Our Investors Say
                </h2>
                <p className="text-slate-500 text-sm font-medium">
                  Verified stories of long-term legal security and investment returns
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Rajinder Prasad',
                    role: 'Retired Govt. Officer',
                    location: 'Mayur Vihar, Delhi',
                    quote: 'We bought a 300 Mtr plot in Yamuna Expressway Sector 18 through Sharma Prop Mart. The entire documentation, from allotment checks to registry filing, was handled cleanly without any hassle. Highly recommended!',
                    initials: 'RP'
                  },
                  {
                    name: 'Anjali Singhal',
                    role: 'IT Consultant',
                    location: 'Greater Noida West',
                    quote: 'Direct, transparent dealing without aggressive markups is their biggest USP. I sold my Greater Noida Sector flat within 2 weeks at a very fair market price. Extremely professional and humble staff!',
                    initials: 'AS'
                  },
                  {
                    name: 'Devender Rawat',
                    role: 'Business Owner',
                    location: 'Indirapuram',
                    quote: 'Outstanding construction support in Sigma-II. They built our residential villa exactly on schedule, keeping RERA standards in mind and utilizing certified, premium quality building materials throughout.',
                    initials: 'DR'
                  }
                ].map((test, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between space-y-6 shadow-sm"
                  >
                    <div className="space-y-4">
                      {/* Star indicators */}
                      <div className="flex gap-1 text-amber-500">
                        {[...Array(5)].map((_, si) => (
                          <Star key={si} className="w-4 h-4 fill-amber-500 stroke-0" />
                        ))}
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed">
                        "{test.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0078db] font-black flex items-center justify-center text-sm shadow-inner">
                        {test.initials}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#091e42] text-xs sm:text-sm">{test.name}</h4>
                        <p className="text-[11px] text-slate-500">{test.role} • {test.location}</p>
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

        {/* VIEW: POST PROPERTY & BANNER DESIGNER */}
        {activeTab === 'post-property' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PostProperty 
              onAddListing={(newListing) => {
                const updated = [newListing, ...allListings];
                setAllListings(updated);
                localStorage.setItem('sharma_prop_listings', JSON.stringify(updated));
                setNotification('Property successfully listed on Sharma Prop Mart!');
                setTimeout(() => setNotification(null), 3000);
              }}
              setActiveTab={setActiveTab}
              setNotification={setNotification}
            />
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
          setActiveTab('post-property');
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
