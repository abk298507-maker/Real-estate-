import React from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, Zap, Award, Search, ClipboardList } from 'lucide-react';
import { OFFICE_CONTACT, COMPANY_STATS } from '../data';
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
    <div className="relative bg-slate-950 border-b border-slate-900 overflow-hidden min-h-[80vh] flex flex-col justify-center" id="hero-section">
      {/* Dynamic Background Image Section with subtle overlay to match screenshot */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000"
          alt="Sharma Prop Mart Premium Building"
          className="w-full h-full object-cover object-center opacity-40 blur-[1px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/70 via-black/50 to-slate-950"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        {/* On mobile: Centered single column. On desktop: Balanced centered column layout */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight uppercase font-sans">
              SHARMA PROP MART
            </h1>

            <p className="text-white text-base sm:text-xl lg:text-2xl font-extrabold tracking-wide max-w-3xl mx-auto leading-relaxed">
              Real Estate Builders & Construction Company
            </p>
          </div>

          {/* Quick CTAs: Stacked vertically on mobile, centered horizontally/vertically as in screenshot */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4">
            <a
              href={`https://wa.me/${OFFICE_CONTACT.rawPhone2}?text=Hello%20I%20want%20to%20discuss%20property%20requirements%20with%20Sharma%20Prop%20Mart`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#12cf64] hover:bg-[#10b857] text-white px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-emerald-950/20 text-center active:scale-95 duration-150 cursor-pointer"
            >
              <span>📱 WhatsApp Inquiry</span>
            </a>
            <button
              onClick={() => setActiveTab('inquiry')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl text-center active:scale-95 duration-150 border border-slate-200 cursor-pointer"
            >
              <span>📋 Submit Requirement</span>
            </button>
          </div>

          {/* Micro trust badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-white/10 max-w-xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Legal Title</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-bold">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Allotments</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Hidden Fees</span>
            </div>
          </div>
        </div>

        {/* Clean, collapsible property search tool for desktop */}
        <div className="mt-12 max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-2xl hidden md:block text-left">
          <h3 className="text-lg font-extrabold text-white mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-400" />
            <span>Interactive Property Finder</span>
          </h3>
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                Intention:
              </label>
              <select 
                value={searchIntent} 
                onChange={(e) => setSearchIntent(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-855 text-white rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Buy">Buy Property</option>
                <option value="Sell">Sell Property</option>
                <option value="Rent">Rent Property</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                Region:
              </label>
              <select 
                value={regionIntent} 
                onChange={(e) => setRegionIntent(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-855 text-white rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
              >
                <option value="yamuna">Yamuna Expressway</option>
                <option value="noida">Greater Noida</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Search Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
