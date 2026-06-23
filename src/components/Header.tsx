import React from 'react';
import { ActiveTab } from '../types';
import { Phone, MessageSquare, Menu, X, Landmark } from 'lucide-react';
import { OFFICE_CONTACT } from '../data';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'yamuna', label: 'Yamuna Expressway' },
    { id: 'noida', label: 'Greater Noida' },
    { id: 'inquiry', label: 'Post Requirement' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleTabClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 text-white shadow-xl backdrop-blur-md border-b border-amber-500/20" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleTabClick('home')}
            id="brand-logo-container"
          >
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-xl text-slate-950 shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-400 bg-clip-text text-transparent">
                SHARMA
              </span>
              <span className="block text-xs font-bold text-amber-500 tracking-widest uppercase">
                PROP MART
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" id="desktop-navbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Call-to-Actions */}
          <div className="hidden lg:flex items-center gap-4" id="header-cta">
            <a
              href={`tel:${OFFICE_CONTACT.phone}`}
              className="flex items-center gap-2 text-slate-300 hover:text-amber-400 font-medium text-sm transition-colors"
            >
              <div className="bg-slate-800 p-2 rounded-full border border-slate-700">
                <Phone className="w-4 h-4 text-amber-400" />
              </div>
              <span>{OFFICE_CONTACT.phone}</span>
            </a>
            <a
              href={`${OFFICE_CONTACT.whatsappUrlBase}?text=Hello%20I%20need%20property%20details`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all scale-100 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href={`${OFFICE_CONTACT.whatsappUrlBase}?text=Hello%20I%20need%20property%20details`}
              className="bg-emerald-600 p-2.5 rounded-lg text-white"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-850 rounded-lg hover:bg-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200" id="mobile-navbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium text-base transition-colors flex justify-between items-center ${
                activeTab === item.id
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              {activeTab === item.id && (
                <span className="w-1.5 h-1.5 bg-slate-950 rounded-full"></span>
              )}
            </button>
          ))}
          
          <div className="pt-4 border-t border-slate-850 space-y-3">
            <a
              href={`tel:${OFFICE_CONTACT.phone}`}
              className="flex items-center gap-3 px-4 py-2 text-slate-300 text-sm font-medium hover:text-amber-400"
            >
              <Phone className="w-5 h-5 text-amber-500" />
              <span>Call Us: {OFFICE_CONTACT.phone}</span>
            </a>
            <div className="px-4">
              <a
                href={`${OFFICE_CONTACT.whatsappUrlBase}?text=Hello%20I%20need%20property%20details`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold text-center"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
