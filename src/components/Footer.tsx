import { ActiveTab } from '../types';
import { Phone, Mail, MapPin, Building, MessageSquare } from 'lucide-react';
import { OFFICE_CONTACT } from '../data';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900" id="app-footer">
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand & Mission Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 text-slate-950 p-2 rounded-lg font-extrabold text-lg">
                SPM
              </div>
              <h3 className="font-extrabold text-xl text-white tracking-tight">
                SHARMA PROP MART
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Your premium destination for buying, selling, renting, and building custom quality properties in Greater Noida and the Yamuna Expressway authority plot zones. Real estate built on 18+ years of trust.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ● Government Approved Formats
              </span>
            </div>
          </div>

          {/* Quick Region Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-6 border-l-2 border-emerald-500 pl-3">
              Prime Authorities
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => setActiveTab('yamuna')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Yamuna Expressway Sector 18</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('yamuna')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Yamuna Expressway Sector 20</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('noida')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Greater Noida Alpha, Beta, Gamma</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('noida')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Greater Noida Delta, Sigma, Omicron</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('inquiry')}
                  className="text-emerald-400 font-medium hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Submit Custom Requirement Form →</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Address 2 / Corporate Address & Contacts */}
          <div>
            <h4 className="font-bold text-white text-base mb-6 border-l-2 border-emerald-500 pl-3">
              Contact Information
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 animate-pulse" />
                <p className="leading-relaxed">
                  <strong>Headquarters:</strong><br />
                  166 A, 3rd Floor, Above Durbar Restaurant, Pratap Nagar, Mayur Vihar Phase-1, New Delhi - 110091
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-950">
                <a 
                  href={`tel:${OFFICE_CONTACT.phone}`} 
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span>{OFFICE_CONTACT.phone}</span>
                </a>
                <a 
                  href={`mailto:${OFFICE_CONTACT.email}`} 
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-emerald-500" />
                  <span>{OFFICE_CONTACT.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright/legal info as specified in the template */}
      <div className="bg-slate-950 py-6 border-t border-slate-900/40 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 SHARMA PROPERTIES & SHARMA PROP MART. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href={`tel:${OFFICE_CONTACT.phone}`} className="hover:text-slate-300">Call Now</a>
            <span>•</span>
            <span className="text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">RERA Delhi & UP Guidance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
