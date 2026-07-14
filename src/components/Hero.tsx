import React from 'react';
import { Search } from 'lucide-react';
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

export default function Hero({ setActiveTab, setQuickSearch, setQuickType, onFilterChange }: HeroProps) {
  const [activeSearchTab, setActiveSearchTab] = React.useState<string>('Buy');
  const [propertyType, setPropertyType] = React.useState<string>('All Residential');
  const [budget, setBudget] = React.useState<string>('Budget');
  const [searchText, setSearchText] = React.useState<string>('');
  const [selectedChips, setSelectedChips] = React.useState<string[]>([]);

  const [propMenuOpen, setPropMenuOpen] = React.useState(false);
  const [budgetMenuOpen, setBudgetMenuOpen] = React.useState(false);

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
  };

  return (
    <section 
      className="relative min-h-[500px] py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden text-center bg-slate-900"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 20, 45, 0.7), rgba(0, 10, 25, 0.85)), url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=900&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll'
      }}
      id="hero-section"
    >
      {/* Decorative backdrop overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none opacity-90" />

      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-6">
        {/* Top small badge */}
        <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-black uppercase tracking-wider animate-pulse">
          <span>🔥 New Launch</span>
        </div>

        {/* Big elegant display heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md font-sans uppercase">
          A Premium Residential Experience
        </h1>
        
        {/* Subtitle location */}
        <p className="text-sm sm:text-lg text-slate-200 font-medium tracking-wide drop-shadow-xs max-w-2xl mx-auto">
          Explore Best Properties & Plots in Your City
        </p>

        {/* Explore Now Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              const el = document.getElementById('recommended-properties-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white hover:bg-slate-50 text-[#005ca8] font-black text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore Now</span>
            <span className="font-mono text-base font-black">→</span>
          </button>
        </div>
 
        {/* Search Panel Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto text-left border border-slate-150 mt-8">
          {/* Tabs bar */}
          <div className="flex flex-col sm:flex-row border-b border-slate-100 bg-slate-50/50 justify-between items-stretch sm:items-center px-2">
            <div className="flex flex-wrap overflow-x-auto scrollbar-none">
              {['Buy', 'Rent', 'New Launch', 'Commercial', 'Plots/Land', 'Projects'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveSearchTab(tab);
                    if (tab === 'Rent') setQuickType('Rent');
                    else setQuickType('Buy');
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

            {/* Right side tab: Post Property FREE */}
            <button
              onClick={() => setActiveTab('post-property')}
              className="py-3 px-4 text-right text-xs sm:text-sm font-extrabold text-emerald-600 hover:text-emerald-700 flex items-center justify-end gap-1.5 cursor-pointer whitespace-nowrap border-t sm:border-t-0 border-slate-100"
            >
              <span>Post Property</span>
              <span className="bg-emerald-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                FREE
              </span>
            </button>
          </div>
 
          {/* Search fields input bar */}
          <div className="p-4 sm:p-5 flex flex-col md:flex-row gap-3 items-center">
            {/* Property Type Dropdown */}
            <div className="relative w-full md:w-52">
              <button
                onClick={() => {
                  setPropMenuOpen(!propMenuOpen);
                  setBudgetMenuOpen(false);
                }}
                className="w-full py-3 px-4 border border-slate-200 rounded-xl bg-white text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between hover:border-[#0078db] transition-colors cursor-pointer shadow-xs"
              >
                <span className="flex items-center gap-1">
                  <span>🔽</span>
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
                      className={`w-full text-left px-4 py-2 text-xs sm:text-sm hover:bg-blue-50 hover:text-[#0078db] transition-colors cursor-pointer ${
                        propertyType === item ? 'bg-blue-50 text-[#0078db] font-extrabold' : 'text-slate-700 font-semibold'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
 
            {/* Main Search Input */}
            <div className="relative flex-1 w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder='Search "Flats for rent, sale or plots near me..."'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchClick();
                }}
                className="w-full py-3 pl-11 pr-4 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-[#0078db] focus:ring-2 focus:ring-[#0078db]/10 transition-all text-slate-850 placeholder-slate-400 shadow-xs"
              />
            </div>
 
            {/* Budget Dropdown */}
            <div className="relative w-full md:w-44">
              <button
                onClick={() => {
                  setBudgetMenuOpen(!budgetMenuOpen);
                  setPropMenuOpen(false);
                }}
                className="w-full py-3 px-4 border border-slate-200 rounded-xl bg-white text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between hover:border-[#0078db] transition-colors cursor-pointer shadow-xs"
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
                      className={`w-full text-left px-4 py-2 text-xs sm:text-sm hover:bg-blue-50 hover:text-[#0078db] transition-colors cursor-pointer ${
                        budget === item ? 'bg-blue-50 text-[#0078db] font-extrabold' : 'text-slate-700 font-semibold'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
 
            {/* Search Button */}
            <button
              onClick={handleSearchClick}
              className="w-full md:w-auto py-3 px-8 bg-[#0078db] hover:bg-[#005ca8] text-white text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-[#0078db]/15 transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap uppercase tracking-wider"
            >
              Search
            </button>
          </div>
        </div>
 
        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {['2 BHK', '3 BHK', 'Ready to Move', 'Under Construction', 'Furnished', 'Semi-Furnished'].map((chip) => {
            const isActive = selectedChips.includes(chip);
            return (
              <button
                key={chip}
                onClick={() => handleChipToggle(chip)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-white text-[#005ca8] border-white font-extrabold shadow-sm' 
                    : 'bg-white/15 text-white border-white/20 hover:bg-white/25 hover:border-white/40'
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

