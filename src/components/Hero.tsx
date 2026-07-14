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
      className="relative py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden text-center"
      style={{
        background: 'linear-gradient(135deg, #1a3a5c 0%, #2d5a87 50%, #3d7ab5 100%)'
      }}
      id="hero-section"
    >
      {/* Wave element or subtle design lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 50 Q25 30 50 50 T100 50 V100 H0 Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm font-sans">
          Find Your Dream Property
        </h1>
        <p className="text-sm sm:text-base text-white/90 font-medium">
          Search over 8 lakh+ properties across India
        </p>

        {/* Search Panel Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto text-left border border-slate-100">
          {/* Tabs bar */}
          <div className="flex border-b border-blue-50 bg-blue-50/50">
            {['Buy', 'Rent', 'New Launch', 'Commercial', 'Plots/Land', 'Projects'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveSearchTab(tab);
                  if (tab === 'Rent') setQuickType('Rent');
                  else setQuickType('Buy');
                }}
                className={`flex-1 py-3.5 px-2 text-center text-xs sm:text-sm font-bold transition-all cursor-pointer border-b-2 ${
                  activeSearchTab === tab 
                    ? 'text-slate-900 border-[#0078db] bg-white font-extrabold' 
                    : 'text-slate-600 border-transparent hover:text-[#0078db] hover:bg-blue-50/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search fields input bar */}
          <div className="p-4 sm:p-5 flex flex-col md:flex-row gap-3 items-center">
            {/* Property Type Dropdown */}
            <div className="relative w-full md:w-48">
              <button
                onClick={() => {
                  setPropMenuOpen(!propMenuOpen);
                  setBudgetMenuOpen(false);
                }}
                className="w-full py-3 px-4 border border-slate-200 rounded-lg bg-white text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between hover:border-[#0078db] transition-colors cursor-pointer"
              >
                <span>{propertyType}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>
              {propMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 max-h-60 overflow-y-auto animate-in fade-in duration-100">
                  {['All Residential', 'Flat/Apartment', 'Independent House', 'Villa', 'Builder Floor', 'Studio Apartment'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setPropertyType(item);
                        setPropMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs sm:text-sm hover:bg-blue-50 hover:text-[#0078db] transition-colors cursor-pointer ${
                        propertyType === item ? 'bg-blue-50 text-[#0078db] font-bold' : 'text-slate-700'
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
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Enter Locality / Project / Society / Landmark"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchClick();
                }}
                className="w-full py-3 pl-10 pr-4 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium focus:outline-none focus:border-[#0078db] focus:ring-2 focus:ring-[#0078db]/10 transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Budget Dropdown */}
            <div className="relative w-full md:w-44">
              <button
                onClick={() => {
                  setBudgetMenuOpen(!budgetMenuOpen);
                  setPropMenuOpen(false);
                }}
                className="w-full py-3 px-4 border border-slate-200 rounded-lg bg-white text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between hover:border-[#0078db] transition-colors cursor-pointer"
              >
                <span>{budget}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>
              {budgetMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1 max-h-60 overflow-y-auto animate-in fade-in duration-100">
                  {['Any Budget', '₹ 10 Lac - 20 Lac', '₹ 20 Lac - 50 Lac', '₹ 50 Lac - 1 Cr', '₹ 1 Cr - 2 Cr', '₹ 2 Cr+'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setBudget(item);
                        setBudgetMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs sm:text-sm hover:bg-blue-50 hover:text-[#0078db] transition-colors cursor-pointer ${
                        budget === item ? 'bg-blue-50 text-[#0078db] font-bold' : 'text-slate-700'
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
              className="w-full md:w-auto py-3 px-8 bg-[#0078db] hover:bg-[#005ca8] text-white text-xs sm:text-sm font-extrabold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
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

