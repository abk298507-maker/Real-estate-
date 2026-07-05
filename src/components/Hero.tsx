import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Search } from 'lucide-react';
import { OFFICE_CONTACT } from '../data';
import { ActiveTab } from '../types';

interface HeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  setQuickSearch: (query: string) => void;
  setQuickType: (type: 'Buy' | 'Sell' | 'Rent') => void;
}

export default function Hero({ setActiveTab, setQuickSearch, setQuickType }: HeroProps) {
  const [searchIntent, setSearchIntent] = React.useState<'Buy' | 'Sell' | 'Rent'>('Buy');
  const [regionIntent, setRegionIntent] = React.useState<'yamuna' | 'noida'>('yamuna');
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickType(searchIntent);
    setQuickSearch(searchQuery);
    setActiveTab(regionIntent);
  };

  return (
    <div className="relative bg-slate-950 min-h-[85vh] flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900" id="hero-section">
      {/* High-Resolution Aerial View Real Estate Background (Matching User's Uploaded Mockup) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2000"
          alt="Premium Aerial Real Estate Villa Pool"
          className="w-full h-full object-cover object-center brightness-[0.42] scale-100 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-slate-950/40 to-slate-950/90" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-10">
        {/* Brand Pre-header centered (matching 'Your Company' in the mockup) */}
        <div className="animate-fade-in-down">
          <span className="text-white/90 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-xs sm:text-sm font-black tracking-[0.25em] uppercase border border-white/20 shadow-lg inline-block">
            ✨ SHARMA PROP MART
          </span>
        </div>

        {/* Display Typography: "Find your perfect property" (Matching Mockup text) */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-xl font-sans">
            Find your perfect property
          </h1>

          <p className="text-slate-200 text-sm sm:text-lg lg:text-xl font-medium tracking-wide max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Find homes, rentals, and investment opportunities with local insight and clear guidance.
          </p>
        </div>

        {/* Centered Pill Buttons (Matching Mockup design exactly) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto pt-4">
          <button
            onClick={() => setActiveTab('categories')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-full font-extrabold text-base sm:text-lg transition-all shadow-xl hover:-translate-y-0.5 duration-200 cursor-pointer"
          >
            <span>Explore properties</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>
          
          <button
            onClick={() => setActiveTab('contact')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/50 hover:border-white px-8 py-4 rounded-full font-extrabold text-base sm:text-lg transition-all shadow-lg hover:-translate-y-0.5 duration-200 cursor-pointer"
          >
            <span>Contact</span>
          </button>
        </div>

        {/* Micro Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-white/10 max-w-xl mx-auto text-slate-300">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>30+ Years Trust</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Verified Allotments</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Legal Registry</span>
          </div>
        </div>

        {/* Compact Search Selector Bar (Kept for search power) */}
        <div className="mt-8 max-w-xl mx-auto bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-2xl hidden md:block text-left backdrop-blur-sm">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-wider">
                Intention
              </label>
              <select 
                value={searchIntent} 
                onChange={(e) => setSearchIntent(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 text-slate-300"
              >
                <option value="Buy">Buy Property</option>
                <option value="Sell">Sell Property</option>
                <option value="Rent">Rent Property</option>
              </select>
            </div>
            
            <div className="sm:col-span-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-wider">
                Region
              </label>
              <select 
                value={regionIntent} 
                onChange={(e) => setRegionIntent(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-500 text-slate-300"
              >
                <option value="yamuna">Yamuna Expressway</option>
                <option value="noida">Greater Noida</option>
              </select>
            </div>

            <div className="sm:col-span-4">
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Find Sector</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
