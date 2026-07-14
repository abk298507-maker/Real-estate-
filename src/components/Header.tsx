import React from 'react';
import { ActiveTab } from '../types';
import { User, Settings, TrendingUp, Menu, X, Plus } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenProfile: () => void;
  onOpenPostProperty?: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenProfile, onOpenPostProperty }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#005ca8] to-[#0078db] text-white shadow-md" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Brand: Matching Screenshot style */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none shrink-0" 
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            id="brand-logo-container"
          >
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-[#005ca8] font-black text-lg shadow-sm">
              S
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-sans">
              Sharma Prop Mart
            </span>
          </div>

          {/* Navigation Links: Matching Mockup exactly */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-semibold" id="desktop-navbar">
            <button
              onClick={() => setActiveTab('home')}
              className={`relative py-1.5 cursor-pointer hover:opacity-100 transition-opacity ${
                activeTab === 'home' ? 'opacity-100 font-bold after:absolute after:bottom-[-12px] after:left-0 after:right-0 after:h-[2px] after:bg-white after:rounded-full' : 'opacity-85'
              }`}
            >
              For Buyers
            </button>
            <button
              onClick={() => setActiveTab('yamuna')}
              className={`relative py-1.5 cursor-pointer hover:opacity-100 transition-opacity ${
                activeTab === 'yamuna' ? 'opacity-100 font-bold after:absolute after:bottom-[-12px] after:left-0 after:right-0 after:h-[2px] after:bg-white after:rounded-full' : 'opacity-85'
              }`}
            >
              For Tenants
            </button>
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`relative py-1.5 cursor-pointer hover:opacity-100 transition-opacity ${
                activeTab === 'inquiry' ? 'opacity-100 font-bold after:absolute after:bottom-[-12px] after:left-0 after:right-0 after:h-[2px] after:bg-white after:rounded-full' : 'opacity-85'
              }`}
            >
              For Owners
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`relative py-1.5 cursor-pointer hover:opacity-100 transition-opacity ${
                activeTab === 'admin' ? 'opacity-100 font-bold after:absolute after:bottom-[-12px] after:left-0 after:right-0 after:h-[2px] after:bg-white after:rounded-full' : 'opacity-85'
              }`}
            >
              For Dealers
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`relative py-1.5 cursor-pointer hover:opacity-100 transition-opacity ${
                activeTab === 'seo' ? 'opacity-100 font-bold after:absolute after:bottom-[-12px] after:left-0 after:right-0 after:h-[2px] after:bg-white after:rounded-full' : 'opacity-85'
              }`}
            >
              Insights
            </button>
          </nav>

          {/* Header Actions: Matching Mockup buttons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0" id="header-cta">
            <button
              onClick={() => {
                if (onOpenPostProperty) {
                  onOpenPostProperty();
                } else {
                  setActiveTab('inquiry');
                }
              }}
              className="bg-white text-[#005ca8] hover:bg-slate-50 border border-transparent px-4 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <span>Post property</span>
              <span className="bg-[#ff6b35] text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-wide leading-none">
                FREE
              </span>
            </button>

            {/* User Profile avatar circle */}
            <button
              onClick={onOpenProfile}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-sm transition-all cursor-pointer border border-white/10"
              title="User Actions & History"
            >
              👤
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#005ca8] border-t border-white/10 text-white animate-in slide-in-from-top duration-200">
          <div className="px-4 py-4 space-y-3 font-semibold text-sm">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-white/10 px-3 rounded-lg"
            >
              For Buyers
            </button>
            <button
              onClick={() => {
                setActiveTab('yamuna');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-white/10 px-3 rounded-lg"
            >
              For Tenants
            </button>
            <button
              onClick={() => {
                setActiveTab('inquiry');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-white/10 px-3 rounded-lg"
            >
              For Owners
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-white/10 px-3 rounded-lg"
            >
              For Dealers
            </button>
            <button
              onClick={() => {
                setActiveTab('seo');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-white/10 px-3 rounded-lg"
            >
              Insights
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-white/10 px-3 rounded-lg text-emerald-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

