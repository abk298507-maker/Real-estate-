import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { ActiveTab } from '../types';
import { User, Settings, TrendingUp, Menu, X, Plus, Headphones, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenProfile: () => void;
  onOpenPostProperty?: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenProfile, onOpenPostProperty }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [citySelectorOpen, setCitySelectorOpen] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState('Noida');

  return (
    <header className="sticky top-0 z-50 bg-white text-slate-800 border-b border-slate-150 shadow-xs" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Brand: Matching 99acres mockup exactly */}
          <div className="flex items-center gap-4 shrink-0">
            <div 
              className="flex items-center gap-1.5 cursor-pointer select-none" 
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              id="brand-logo-container"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#005ca8] to-[#0078db] rounded-lg flex items-center justify-center text-white font-black text-xl shadow-md">
                S
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#091e42] font-sans uppercase">
                sharma<span className="text-[#34a853]"> prop mart</span>
              </span>
            </div>

            {/* "Buy in Noida 🔽" Selector */}
            <div className="relative hidden sm:block border-l border-slate-200 pl-4">
              <button
                onClick={() => setCitySelectorOpen(!citySelectorOpen)}
                className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700 hover:text-[#0078db] transition-colors"
              >
                <span>Buy in {selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {citySelectorOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white text-slate-800 rounded-lg shadow-xl py-1 w-36 z-50 text-xs font-semibold border border-slate-150 animate-in fade-in duration-100">
                  {['Noida', 'Greater Noida', 'Yamuna Exp', 'Delhi', 'Gurgaon'].map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCitySelectorOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 hover:text-[#005ca8]"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links with Hamburger Menu */}
          <div className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold">
            {/* Hamburger helper to quickly open categories */}
            <button
              onClick={() => setActiveTab('categories')}
              className="p-1 hover:bg-slate-150 rounded-lg transition-colors cursor-pointer text-slate-700"
              title="Browse Categories"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="flex items-center gap-6" id="desktop-navbar">
              <button
                onClick={() => setActiveTab('home')}
                className={`relative py-1 cursor-pointer transition-all ${
                  activeTab === 'home' ? 'text-[#0078db] font-extrabold after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[3px] after:bg-[#0078db] after:rounded-full' : 'text-slate-600 hover:text-[#0078db]'
                }`}
              >
                For Buyers
              </button>
              <button
                onClick={() => setActiveTab('yamuna')}
                className={`relative py-1 cursor-pointer transition-all ${
                  activeTab === 'yamuna' ? 'text-[#0078db] font-extrabold after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[3px] after:bg-[#0078db] after:rounded-full' : 'text-slate-600 hover:text-[#0078db]'
                }`}
              >
                For Tenants
              </button>
              <button
                onClick={() => setActiveTab('inquiry')}
                className={`relative py-1 cursor-pointer transition-all ${
                  activeTab === 'inquiry' ? 'text-[#0078db] font-extrabold after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[3px] after:bg-[#0078db] after:rounded-full' : 'text-slate-600 hover:text-[#0078db]'
                }`}
              >
                For Owners
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`relative py-1 cursor-pointer transition-all ${
                  activeTab === 'admin' ? 'text-[#0078db] font-extrabold after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[3px] after:bg-[#0078db] after:rounded-full' : 'text-slate-600 hover:text-[#0078db]'
                }`}
              >
                For Dealers & Builders
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`relative py-1 cursor-pointer transition-all flex items-center gap-1 ${
                  activeTab === 'seo' ? 'text-[#0078db] font-extrabold after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[3px] after:bg-[#0078db] after:rounded-full' : 'text-slate-600 hover:text-[#0078db]'
                }`}
              >
                <span>Insights</span>
                <span className="bg-red-500 text-[8px] font-black px-1 rounded-sm text-white uppercase animate-pulse leading-none py-0.5">
                  NEW
                </span>
              </button>
              <button
                onClick={() => setActiveTab('ai-dashboard')}
                className={`relative py-1 cursor-pointer transition-all flex items-center gap-1 ${
                  activeTab === 'ai-dashboard' ? 'text-[#34a853] font-extrabold after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[3px] after:bg-[#34a853] after:rounded-full' : 'text-slate-600 hover:text-[#34a853]'
                }`}
              >
                <span>AI Core</span>
                <span className="bg-purple-600 text-[8px] font-black px-1.5 py-0.5 rounded text-white uppercase leading-none">
                  Beta
                </span>
              </button>
            </nav>
          </div>

          {/* Header Actions: Matching Mockup buttons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0" id="header-cta">
            {/* Post Property Pill */}
            <button
              onClick={() => {
                if (onOpenPostProperty) {
                  onOpenPostProperty();
                } else {
                  setActiveTab('post-property');
                }
              }}
              className="bg-white border border-slate-200 text-slate-800 hover:border-[#34a853] hover:bg-emerald-50/10 px-4 py-1.5 rounded-full font-black text-xs flex items-center gap-1.5 transition-all shadow-xs hover:scale-[1.02] cursor-pointer"
            >
              <span className="font-bold text-slate-700">Post property</span>
              <span className="bg-[#34a853] text-white text-[8px] px-1.5 py-0.5 rounded font-black tracking-wide leading-none">
                FREE
              </span>
            </button>

            {/* Support Hotline Icon */}
            <button
              onClick={() => setActiveTab('contact')}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer relative"
              title="Help & Support Desk"
            >
              <Headphones className="w-4 h-4 text-slate-600" />
            </button>

            {/* User Profile / Authentication controls */}
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="px-3 py-1.5 bg-[#0078db] hover:bg-[#005ca8] text-white text-xs font-extrabold rounded-full transition-all cursor-pointer shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                  title="Sign In with Clerk"
                >
                  Sign In
                </button>
              </SignInButton>
              <button
                onClick={onOpenProfile}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-xs transition-all cursor-pointer border border-slate-200 relative"
                title="User Actions & History"
              >
                <span>👤</span>
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </SignedOut>

            <SignedIn>
              <button
                onClick={onOpenProfile}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-xs transition-all cursor-pointer border border-slate-200 relative"
                title="User Actions & History"
              >
                <span>👤</span>
              </button>
              <div className="flex items-center shrink-0 border border-slate-100 rounded-full p-0.5 shadow-inner">
                <UserButton />
              </div>
            </SignedIn>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-800 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 text-slate-800 animate-in slide-in-from-top duration-200 shadow-md">
          <div className="px-4 py-4 space-y-3 font-semibold text-sm">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-slate-50 px-3 rounded-lg text-slate-700"
            >
              For Buyers
            </button>
            <button
              onClick={() => {
                setActiveTab('yamuna');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-slate-50 px-3 rounded-lg text-slate-700"
            >
              For Tenants
            </button>
            <button
              onClick={() => {
                setActiveTab('inquiry');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-slate-50 px-3 rounded-lg text-slate-700"
            >
              For Owners
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-slate-50 px-3 rounded-lg text-slate-700"
            >
              For Dealers & Builders
            </button>
            <button
              onClick={() => {
                setActiveTab('seo');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-slate-50 px-3 rounded-lg text-slate-700 flex items-center gap-1.5"
            >
              <span>Insights</span>
              <span className="bg-red-500 text-[8px] font-black px-1.5 py-0.5 rounded text-white animate-pulse">
                NEW
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab('ai-dashboard');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-slate-50 px-3 rounded-lg text-slate-700 flex items-center gap-1.5"
            >
              <span>AI Core</span>
              <span className="bg-purple-600 text-[8px] font-black px-1.5 py-0.5 rounded text-white">
                BETA
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-slate-50 px-3 rounded-lg text-[#34a853]"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

