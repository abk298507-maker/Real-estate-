import React from 'react';
import { Search, ChevronLeft, ChevronRight, Locate, Mic, Sparkles, Navigation } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  setQuickSearch: (query: string) => void;
  setQuickType: (type: 'Buy' | 'Sell' | 'Rent') => void;
  onFilterChange?: (filters: {
    tab: string;
    propertyType: string;
    budget: string;
    searchQuery: string;
    chips: string[];
  }) => void;
}

const sharmaPropBanner = new URL('../assets/images/sharma_prop_banner_1784025905695.jpg', import.meta.url).href;

const HERO_SLIDES = [
  {
    image: sharmaPropBanner,
    badge: "🔥 New Launch",
    heading: "", // Empty to show the beautiful pre-rendered text in the mockup banner!
    subtitle: "",
    project: "GRATITUDE 84 & LAMOSE",
    rera: "Rera No: GGM/1034/766/2026",
    logoText: "GRATITUDE 84",
    isMockupBanner: true
  },
  {
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77d61?w=1600&h=900&fit=crop",
    badge: "⭐ Hot Listing",
    heading: "ELITE RESIDENTIAL & COMMERCIAL PLOTS",
    subtitle: "Best Plots & Land near Yamuna Expressway",
    project: "LAMOSE LANDS",
    rera: "Rera No: HR/REP/2026/89",
    logoText: "LAMOSE",
    isMockupBanner: false
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop",
    badge: "💎 Premium Asset",
    heading: "STATE-OF-THE-ART OFFICE SPACES",
    subtitle: "Ready for Business | Sector 62, Noida",
    project: "SHARMA METRO MART",
    rera: "Rera No: UP-RERA-2026-042",
    logoText: "METRO MART",
    isMockupBanner: false
  }
];

export default function Hero({ setActiveTab, setQuickSearch, setQuickType, onFilterChange }: HeroProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [activeSearchTab, setActiveSearchTab] = React.useState<string>('Buy');
  const [propertyType, setPropertyType] = React.useState<string>('All Residential');
  const [budget, setBudget] = React.useState<string>('Budget');
  const [searchText, setSearchText] = React.useState<string>('');
  const [selectedChips, setSelectedChips] = React.useState<string[]>([]);

  const [propMenuOpen, setPropMenuOpen] = React.useState(false);
  const [budgetMenuOpen, setBudgetMenuOpen] = React.useState(false);

  // Locator & Microphone simulating states
  const [isDetectingLocation, setIsDetectingLocation] = React.useState(false);
  const [isListeningVoice, setIsListeningVoice] = React.useState(false);
  const [voiceWave, setVoiceWave] = React.useState<string>('Click to say something...');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Trigger filters on any state change
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        tab: activeSearchTab,
        propertyType,
        budget,
        searchQuery: searchText,
        chips: selectedChips
      });
    }
  }, [activeSearchTab, propertyType, budget, searchText, selectedChips]);

  // Slides auto-cycle
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleChipToggle = (chip: string) => {
    setSelectedChips(prev => 
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const handleSearchClick = () => {
    setQuickSearch(searchText);
    if (activeSearchTab === 'Rent') {
      setQuickType('Rent');
      setActiveTab('noida');
    } else if (activeSearchTab === 'Buy') {
      setQuickType('Buy');
      setActiveTab('yamuna');
    } else {
      setQuickType('Buy');
      setActiveTab('categories');
    }
    showToast(`Searching for properties in "${searchText || 'all locations'}"...`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // GPS/Target Locator Click Simulation
  const handleLocateClick = () => {
    setIsDetectingLocation(true);
    showToast("📍 Accessing your GPS coordinates...");
    
    setTimeout(() => {
      setIsDetectingLocation(false);
      const randomLocs = ["Sector 62, Noida", "Yamuna Expressway, Greater Noida", "Tech Zone 4, Greater Noida", "Sector 150, Noida", "Siddharth Vihar, Ghaziabad"];
      const picked = randomLocs[Math.floor(Math.random() * randomLocs.length)];
      setSearchText(picked);
      showToast(`🎯 Auto-detected Location: ${picked}`);
    }, 1500);
  };

  // Microphone click Simulation
  const handleMicClick = () => {
    setIsListeningVoice(true);
    setVoiceWave("🎙️ Listening... Speak now (e.g. 3 BHK flat for sale)");
    showToast("🎤 Voice Assistant Activated. Speak your requirement.");

    setTimeout(() => {
      setVoiceWave("🔊 Processing your request...");
    }, 2000);

    setTimeout(() => {
      setIsListeningVoice(false);
      const voiceSearches = [
        "Ready to move 3 BHK flats under 1 Cr Noida",
        "Villa plots near Yamuna Expressway",
        "Premium commercial independent shops for lease",
        "Affordable 2 BHK apartments in Greater Noida West"
      ];
      const picked = voiceSearches[Math.floor(Math.random() * voiceSearches.length)];
      setSearchText(picked);
      showToast(`✏️ Translated Voice Input: "${picked}"`);
    }, 3500);
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section 
      className="relative min-h-[520px] lg:min-h-[580px] flex flex-col items-center justify-center overflow-hidden text-center transition-all duration-1000 bg-slate-950"
      id="hero-section"
    >
      {/* Dynamic Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
          style={{ 
            backgroundImage: activeSlideData.isMockupBanner 
              ? `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.05)), url('${activeSlideData.image}')`
              : `linear-gradient(rgba(0, 20, 50, 0.65), rgba(0, 10, 30, 0.85)), url('${activeSlideData.image}')`,
          }}
        />
        {/* Soft bottom vignette overlay */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-100 via-[#f4f5f7]/60 to-transparent pointer-events-none z-10" />
      </div>

      {/* Carousel Controls */}
      <button 
        onClick={handlePrevSlide}
        className="absolute left-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 bg-black/35 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10"
        title="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={handleNextSlide}
        className="absolute right-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 bg-black/35 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10"
        title="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Hero Slide content & overlay matching 99acres */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 space-y-6">
        
        {/* Slide dynamic banner info */}
        {!activeSlideData.isMockupBanner ? (
          <div className="space-y-4 animate-in fade-in duration-500">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#0078db]/20 border border-[#0078db]/35 px-4 py-1.5 rounded-full text-blue-300 text-xs font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{activeSlideData.badge}</span>
            </div>

            {/* Large display typography */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md font-sans uppercase leading-tight max-w-4xl mx-auto">
              {activeSlideData.heading}
            </h1>

            {/* Subtitle / Details */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-slate-200 text-sm sm:text-base font-semibold">
              <span>{activeSlideData.subtitle}</span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="bg-white/10 px-2.5 py-0.5 rounded text-amber-400 text-xs font-mono font-bold tracking-tight">
                {activeSlideData.rera}
              </span>
            </div>

            {/* Explore Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('recommended-properties-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  showToast(`Viewing listings of project ${activeSlideData.project}...`);
                }}
                className="bg-white hover:bg-slate-50 text-[#005ca8] font-black text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Explore {activeSlideData.project}</span>
                <span className="font-mono text-base font-black">→</span>
              </button>
            </div>
          </div>
        ) : (
          /* Large empty spacing to allow the 99acres mockup banner's graphics and text to shine without overlay clutter */
          <div className="h-28 sm:h-36" />
        )}

        {/* Dynamic simulation banner cards (G84 and LAMOSE style logos) */}
        {!activeSlideData.isMockupBanner && (
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2 opacity-85 hover:opacity-100 transition-opacity">
            <div className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl text-left backdrop-blur-xs flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-extrabold rounded-lg flex items-center justify-center text-xs">
                G84
              </div>
              <div>
                <p className="text-[10px] text-white font-black leading-none uppercase">GRATITUDE 84</p>
                <span className="text-[8px] text-slate-400">Sector 84, GGN</span>
              </div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl text-left backdrop-blur-xs flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-extrabold rounded-lg flex items-center justify-center text-xs">
                LM
              </div>
              <div>
                <p className="text-[10px] text-white font-black leading-none uppercase">LAMOSE RESIDENCY</p>
                <span className="text-[8px] text-slate-400">Yamuna Expressway</span>
              </div>
            </div>
          </div>
        )}

        {/* 99acres Styled Search Panel Overlap */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto text-left border border-slate-200 mt-6 relative z-30 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Tab Selection Bar with 'Post Property FREE' Badge on Right */}
          <div className="flex flex-col sm:flex-row border-b border-slate-100 bg-slate-50/50 justify-between items-stretch sm:items-center px-2">
            <div className="flex flex-wrap overflow-x-auto scrollbar-none">
              {['Buy', 'Rent', 'New Launch', 'Commercial', 'Plots/Land', 'Projects'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveSearchTab(tab);
                    if (tab === 'Rent') setQuickType('Rent');
                    else setQuickType('Buy');
                    showToast(`Switched search mode to "${tab}"`);
                  }}
                  className={`py-4 px-4 text-center text-xs sm:text-sm font-bold transition-all cursor-pointer border-b-2 relative whitespace-nowrap ${
                    activeSearchTab === tab 
                      ? 'text-[#0078db] border-[#0078db] bg-white font-black' 
                      : 'text-slate-600 border-transparent hover:text-[#0078db]'
                  }`}
                >
                  <span>{tab}</span>
                  {tab === 'New Launch' && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Right Side: Post Property FREE */}
            <button
              onClick={() => setActiveTab('post-property')}
              className="py-3 px-4 text-right text-xs sm:text-sm font-extrabold text-[#34a853] hover:text-[#2e934a] flex items-center justify-end gap-1.5 cursor-pointer whitespace-nowrap border-t sm:border-t-0 border-slate-100"
            >
              <span>Post Property</span>
              <span className="bg-[#34a853] text-white text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider">
                FREE
              </span>
            </button>
          </div>

          {/* Search Row Input Bar */}
          <div className="p-4 sm:p-5 flex flex-col md:flex-row gap-3 items-center">
            
            {/* Property Category Filter Dropdown */}
            <div className="relative w-full md:w-56">
              <button
                onClick={() => {
                  setPropMenuOpen(!propMenuOpen);
                  setBudgetMenuOpen(false);
                }}
                className="w-full py-3 px-4 border border-slate-200 rounded-xl bg-white text-xs sm:text-sm font-black text-slate-800 flex items-center justify-between hover:border-[#0078db] transition-colors cursor-pointer shadow-xs"
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-400">🔽</span>
                  <span>{propertyType}</span>
                </span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>
              {propMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-150 rounded-xl shadow-xl z-50 py-1.5 max-h-60 overflow-y-auto animate-in fade-in duration-100">
                  {['All Residential', 'Flats', 'Plots', 'Commercial', 'Independent House'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setPropertyType(item);
                        setPropMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm hover:bg-blue-50 hover:text-[#0078db] transition-colors cursor-pointer ${
                        propertyType === item ? 'bg-blue-50 text-[#0078db] font-extrabold' : 'text-slate-700 font-semibold'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input Box with Locator/Mic Icons inside */}
            <div className="relative flex-1 w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4.5 h-4.5 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder='Search "Flats for rent, sale or plots near me..."'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchClick();
                }}
                className="w-full py-3 pl-11 pr-24 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:border-[#0078db] focus:ring-2 focus:ring-[#0078db]/10 transition-all text-slate-800 placeholder-slate-400 shadow-xs"
              />

              {/* Locator and Microphone Actions directly inside Search Input to look extremely clean */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleLocateClick}
                  className={`p-1.5 rounded-full hover:bg-slate-100 text-blue-600 transition-colors cursor-pointer ${isDetectingLocation ? 'animate-spin' : ''}`}
                  title="Detect My Location"
                >
                  <Locate className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-200" />
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`p-1.5 rounded-full hover:bg-slate-100 text-blue-600 transition-colors cursor-pointer ${isListeningVoice ? 'animate-bounce text-red-500 bg-red-50' : ''}`}
                  title="Voice Search Assistant"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Budget Range Selector */}
            <div className="relative w-full md:w-44">
              <button
                onClick={() => {
                  setBudgetMenuOpen(!budgetMenuOpen);
                  setPropMenuOpen(false);
                }}
                className="w-full py-3 px-4 border border-slate-200 rounded-xl bg-white text-xs sm:text-sm font-black text-slate-800 flex items-center justify-between hover:border-[#0078db] transition-colors cursor-pointer shadow-xs"
              >
                <span>{budget}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>
              {budgetMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-150 rounded-xl shadow-xl z-50 py-1.5 max-h-60 overflow-y-auto animate-in fade-in duration-100">
                  {['Any Budget', '₹ 10 Lac - 20 Lac', '₹ 20 Lac - 50 Lac', '₹ 50 Lac - 1 Cr', '₹ 1 Cr - 2 Cr', '₹ 2 Cr+'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setBudget(item);
                        setBudgetMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm hover:bg-blue-50 hover:text-[#0078db] transition-colors cursor-pointer ${
                        budget === item ? 'bg-blue-50 text-[#0078db] font-extrabold' : 'text-slate-700 font-semibold'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Action Button */}
            <button
              onClick={handleSearchClick}
              className="w-full md:w-auto py-3 px-8 bg-[#0078db] hover:bg-[#005ca8] text-white text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-[#0078db]/20 transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap uppercase tracking-wider"
            >
              Search
            </button>
          </div>
        </div>

        {/* Recent searches row from the 99acres mockup */}
        <div className="text-slate-200 text-xs font-semibold flex flex-wrap items-center justify-center gap-2.5 pt-2 relative z-20">
          <span className="opacity-80">Recent searches:</span>
          <button 
            onClick={() => setSearchText("Greater Noida")}
            className="text-white hover:underline transition-all hover:text-blue-200"
          >
            Buy in Greater Noida
          </button>
          <span className="opacity-50">•</span>
          <button 
            onClick={() => {
              setActiveTab('categories');
              showToast("Opening all category property listings...");
            }}
            className="text-white hover:underline transition-all hover:text-blue-200 font-extrabold"
          >
            View all searches
          </button>
        </div>

        {/* Interactive Voice Helper Banner */}
        {isListeningVoice && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-3 max-w-xl mx-auto shadow-lg flex items-center gap-3 justify-center animate-pulse border border-white/10 z-45 relative">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">{voiceWave}</span>
          </div>
        )}

        {/* Temporary simulation Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-10 right-5 z-50 bg-slate-900/95 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl border border-slate-750 font-semibold animate-in slide-in-from-bottom duration-200 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0078db] animate-ping" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Quick Filter Chips matching 99acres */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {['2 BHK', '3 BHK', 'Ready to Move', 'Under Construction', 'Furnished', 'Semi-Furnished'].map((chip) => {
            const isActive = selectedChips.includes(chip);
            return (
              <button
                key={chip}
                onClick={() => handleChipToggle(chip)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#0078db] text-white border-[#0078db] font-extrabold shadow-md' 
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

