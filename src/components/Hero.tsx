import React from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, Zap, Award, Search } from 'lucide-react';
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
    <div className="relative bg-slate-900 border-b border-slate-800 overflow-hidden" id="hero-section">
      {/* Dynamic Background Image Section */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000"
          alt="Sharma Prop Mart Premium Building"
          className="w-full h-full object-cover object-center opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Main Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold tracking-wider uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Greater Noida & Yamuna Expressway Experts</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              SHARMA <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300 bg-clip-text text-transparent">
                PROP MART
              </span>
            </h1>

            <p className="text-amber-500 font-bold text-lg sm:text-xl uppercase tracking-widest block font-sans">
              Real Estate Builders & Construction Company
            </p>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Unlock verified, government-approved Authority Plots, Residential, Commercial Properties & master construction blueprints. Directly connected with New Delhi headquarters for verified and secure property transactions.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={`${OFFICE_CONTACT.whatsappUrlBase}?text=Hello%20I%20need%20property%20details`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-extrabold text-lg transition-all shadow-xl shadow-emerald-950/40 hover:shadow-emerald-600/20 text-center active:scale-95 duration-100"
              >
                <MessageSquare className="w-6 h-6 fill-white stroke-0" />
                <span>WhatsApp Inquiry</span>
              </a>
              <button
                onClick={() => setActiveTab('inquiry')}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-4 rounded-xl font-bold text-base transition-all hover:border-slate-600"
              >
                <span>Post Your Requirement</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Micro badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>100% Legal Title</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Instant Pre-fill</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
            </div>
          </div>

          {/* Dynamic Intention Form Box */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950/95 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl relative">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              Live Search Portal
            </div>

            <h3 className="text-xl font-extrabold text-white mb-6">
              Instant Property Finder
            </h3>

            <form onSubmit={handleSearchSubmit} className="space-y-4">
              {/* Type toggle: Buy / Sell / Rent */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  My Intention:
                </label>
                <div className="grid grid-cols-3 gap-2 bg-slate-850 p-1.5 rounded-lg border border-slate-850">
                  {(['Buy', 'Sell', 'Rent'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSearchIntent(t)}
                      className={`py-2 px-3 rounded-md text-xs font-bold tracking-wide transition-all ${
                        searchIntent === t
                          ? 'bg-amber-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Region of Interest:
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-850 p-1.5 rounded-lg border border-slate-850">
                  <button
                    type="button"
                    onClick={() => setRegionIntent('yamuna')}
                    className={`py-2 px-3 rounded-md text-xs font-bold transition-all truncate ${
                      regionIntent === 'yamuna'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Yamuna Expressway
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegionIntent('noida')}
                    className={`py-2 px-3 rounded-md text-xs font-bold transition-all truncate ${
                      regionIntent === 'noida'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Greater Noida
                  </button>
                </div>
              </div>

              {/* Search query field */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Sector keyword or pocket:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={regionIntent === 'yamuna' ? 'e.g. SEC-18, PKT-3, 300 MTR' : 'e.g. ALPHA-I, BETA-II, SIGMA'}
                    className="w-full bg-slate-850 border border-slate-800 text-white rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-200 placeholder-slate-500 font-medium"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
              >
                <span>Proceed to Active Listings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Company stats panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-16 border-t border-slate-800/60" id="stats-panel">
          {COMPANY_STATS.map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
