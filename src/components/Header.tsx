import React from 'react';
import { ActiveTab } from '../types';
import { Phone, MessageSquare, ShieldCheck, User, Settings, TrendingUp } from 'lucide-react';
import { OFFICE_CONTACT } from '../data';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenProfile: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenProfile }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white text-slate-900 border-b border-slate-100 shadow-sm" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand: Vertical style matching the screenshot */}
          <div 
            className="flex flex-col leading-none font-black text-left text-xs sm:text-sm md:text-base tracking-tighter text-slate-900 uppercase cursor-pointer select-none shrink-0" 
            onClick={() => setActiveTab('home')}
            id="brand-logo-container"
          >
            <span>SHARMA</span>
            <span>PROP</span>
            <span>MART</span>
          </div>

          {/* Navigation Links: Directly visible horizontally on both mobile and desktop */}
          <nav className="flex items-center gap-3 sm:gap-6 md:gap-8 text-xs sm:text-sm md:text-base font-extrabold text-slate-900" id="desktop-navbar">
            <button
              onClick={() => setActiveTab('home')}
              className={`transition-all py-1.5 px-1 cursor-pointer ${
                activeTab === 'home'
                  ? 'text-emerald-600 border-b-2 border-emerald-500 font-black'
                  : 'text-slate-700 hover:text-black hover:border-b-2 hover:border-slate-300'
              }`}
              id="nav-home"
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`transition-all py-1.5 px-1 cursor-pointer ${
                activeTab === 'categories'
                  ? 'text-emerald-600 border-b-2 border-emerald-500 font-black'
                  : 'text-slate-700 hover:text-black hover:border-b-2 hover:border-slate-300'
              }`}
              id="nav-categories"
            >
              Listings
            </button>
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`transition-all py-1.5 px-1 cursor-pointer ${
                activeTab === 'inquiry'
                  ? 'text-emerald-600 border-b-2 border-emerald-500 font-black'
                  : 'text-slate-700 hover:text-black hover:border-b-2 hover:border-slate-300'
              }`}
              id="nav-inquiry"
            >
              Inquiry
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`transition-all py-1.5 px-1 cursor-pointer ${
                activeTab === 'contact'
                  ? 'text-emerald-600 border-b-2 border-emerald-500 font-black'
                  : 'text-slate-700 hover:text-black hover:border-b-2 hover:border-slate-300'
              }`}
              id="nav-contact"
            >
              Contact
            </button>
          </nav>

          {/* Premium Utility Desk (Hidden on ultra-small viewports to keep menu clean) */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0" id="header-cta">
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-emerald-600 border border-slate-200 hover:border-emerald-500/30 px-3 py-1.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer"
              title="My Search Activity"
            >
              <User className="w-3.5 h-3.5 fill-emerald-600/10" />
              <span>My Activity</span>
            </button>

            {/* Discrete Admin & SEO shortcuts */}
            <button
              onClick={() => setActiveTab('admin')}
              className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
              title="Admin Panel"
            >
              <Settings className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
              title="SEO SEO Rank Checker"
            >
              <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <a
              href={`tel:${OFFICE_CONTACT.phone}`}
              className="hidden lg:flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 font-medium text-xs transition-colors"
            >
              <div className="bg-slate-50 p-1.5 rounded-full border border-slate-100">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <span className="font-extrabold">{OFFICE_CONTACT.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
