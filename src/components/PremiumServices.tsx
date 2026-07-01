import React from 'react';
import { 
  Building2, 
  Layers, 
  MapPin, 
  Phone, 
  CheckCircle, 
  TrendingUp, 
  PlusCircle, 
  FileText, 
  Calculator, 
  ShieldCheck, 
  UserCheck, 
  LineChart, 
  Globe, 
  Users, 
  BarChart3, 
  ArrowRight, 
  DollarSign, 
  Map, 
  Compass, 
  Award, 
  Star, 
  Search, 
  Bell, 
  Activity, 
  Briefcase, 
  Clock, 
  Eye, 
  Zap,
  BookOpen,
  Trash2,
  Mail,
  FileCheck,
  Send,
  Heart
} from 'lucide-react';
import { OFFICE_CONTACT } from '../data';
import { PropertyItem, ActiveTab } from '../types';

interface PremiumServicesProps {
  setActiveTab: (tab: ActiveTab) => void;
  setQuickSearch: (query: string) => void;
  activeSection?: 'tools' | 'vas' | 'crm' | 'builder';
  setActiveSection?: (section: 'tools' | 'vas' | 'crm' | 'builder') => void;
}

// Sub-tabs for the Services Workspace
type ServiceSection = 'tools' | 'vas' | 'crm' | 'builder';

export default function PremiumServices({ 
  setActiveTab, 
  setQuickSearch, 
  activeSection: propsActiveSection, 
  setActiveSection: propsSetActiveSection 
}: PremiumServicesProps) {
  const [localActiveSection, setLocalActiveSection] = React.useState<ServiceSection>('tools');
  const activeSection = propsActiveSection || localActiveSection;
  const setActiveSection = propsSetActiveSection || setLocalActiveSection;
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // ----------------------------------------------------
  // DATA 1: Property Valuation Calculator State
  // ----------------------------------------------------
  const [valRegion, setValRegion] = React.useState<'Yamuna Expressway' | 'Greater Noida'>('Yamuna Expressway');
  const [valSector, setValSector] = React.useState<string>('Sector 20');
  const [valSize, setValSize] = React.useState<number>(300); // Sq. Meters
  const [valIsCorner, setValIsCorner] = React.useState<boolean>(false);
  const [valIsParkFacing, setValIsParkFacing] = React.useState<boolean>(false);
  const [calculatedValuation, setCalculatedValuation] = React.useState<{
    ratePerSqm: number;
    basePrice: number;
    premiumAddon: number;
    totalPrice: number;
    formatted: string;
  } | null>(null);

  const calculateValuation = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate real rate logic in NCR/YEIDA
    let baseRate = 35000; // Sector 20 standard starting rate in 2026
    if (valRegion === 'Greater Noida') {
      baseRate = 48000; // Greater Noida premium sectors average rate
      if (valSector.toUpperCase().includes('ALPHA')) baseRate = 65000;
      else if (valSector.toUpperCase().includes('DELTA')) baseRate = 45000;
      else if (valSector.toUpperCase().includes('BETA')) baseRate = 58000;
    } else {
      // Yamuna Expressway
      if (valSector.toUpperCase().includes('18')) baseRate = 36000;
      else if (valSector.toUpperCase().includes('20')) baseRate = 38000;
      else if (valSector.toUpperCase().includes('22D')) baseRate = 32000;
    }

    const basePrice = baseRate * valSize;
    let markupPercent = 0;
    if (valIsCorner) markupPercent += 0.10; // 10% premium for corner plot
    if (valIsParkFacing) markupPercent += 0.05; // 5% premium for park facing

    const premiumAddon = basePrice * markupPercent;
    const totalPrice = basePrice + premiumAddon;

    const formatRupees = (num: number) => {
      if (num >= 10000000) {
        return `₹ ${(num / 10000000).toFixed(2)} Cr`;
      }
      return `₹ ${(num / 100000).toFixed(2)} Lakhs`;
    };

    setCalculatedValuation({
      ratePerSqm: baseRate,
      basePrice,
      premiumAddon,
      totalPrice,
      formatted: formatRupees(totalPrice)
    });
    showToast('Valuation generated successfully according to current market rates!');
  };

  // ----------------------------------------------------
  // DATA 2: Locality Insights
  // ----------------------------------------------------
  const [insightSector, setInsightSector] = React.useState<string>('Sector 20 YEIDA');
  const sectorsInsightsData: Record<string, {
    rating: number;
    schools: string;
    hospitals: string;
    metro: string;
    airport: string;
    sentiment: string;
    connectivity: string;
  }> = {
    'Sector 20 YEIDA': {
      rating: 4.8,
      schools: 'Gautam Buddha University Campus School (3 km)',
      hospitals: 'Yatharth Super Speciality Hospital (12 km), Divine Clinic (4 km)',
      metro: 'Sector 143 Aqua Line Metro Station (16 km), Proposed YEIDA Metro Corridor adjacent',
      airport: 'Noida International Airport, Jewar (18 km via Expressway)',
      sentiment: 'Highly Bullish. Fastest appreciating plots due to immediate proximity to Airport runway corridor.',
      connectivity: 'Excellent access via direct 120-meter Yamuna Expressway arterial link.'
    },
    'Sector 18 YEIDA': {
      rating: 4.7,
      schools: 'Galgotias University High School (4 km)',
      hospitals: 'Sharda University Hospital (14 km)',
      metro: 'Proposed YEIDA Metro Link Station at Sector-18 entrance',
      airport: 'Noida International Airport, Jewar (19 km)',
      sentiment: 'Very popular with retail residential plot buyers. Pocket I, J, 7B, 2C are high-density hotspots.',
      connectivity: 'Double side entry from 100-meter sector road.'
    },
    'Alpha-2 Greater Noida': {
      rating: 4.9,
      schools: 'Ryan International School (0.5 km), DPS Greater Noida (1.5 km)',
      hospitals: 'Kailash Hospital Greater Noida (1 km), Navin Hospital (1.2 km)',
      metro: 'Alpha 1 Metro Station (0.8 km) - Active Aqua Line',
      airport: 'Noida International Airport, Jewar (38 km via Yamuna Link)',
      sentiment: 'Established elite premium residential zone with 100% parks, wide commercial markets, and active occupancy.',
      connectivity: 'Fully motorable 60-meter avenues and direct link to Noida-Greater Noida Link road.'
    },
    'Beta-1 Greater Noida': {
      rating: 4.6,
      schools: 'Aster Public School (0.8 km), Pragyan School (1 km)',
      hospitals: 'Yatharth Super Speciality Hospital (2.5 km)',
      metro: 'Delta 1 Metro Station (1.5 km)',
      airport: 'Noida International Airport (40 km)',
      sentiment: 'Steady family locality. Premium parks, active gated security, and proximity to Commercial Pari Chowk.',
      connectivity: 'Interlocked wide sector roads with quick Pari Chowk entry/exit.'
    }
  };

  // ----------------------------------------------------
  // DATA 3: Rent Agreement Generator State
  // ----------------------------------------------------
  const [raLandlord, setRaLandlord] = React.useState<string>('');
  const [raTenant, setRaTenant] = React.useState<string>('');
  const [raRent, setRaRent] = React.useState<number>(18000);
  const [raDeposit, setRaDeposit] = React.useState<number>(36000);
  const [raSector, setRaSector] = React.useState<string>('Sector 20, Yamuna Expressway');
  const [raDuration, setRaDuration] = React.useState<number>(11); // standard 11 months
  const [raGenerated, setRaGenerated] = React.useState<boolean>(false);
  const [raSigned, setRaSigned] = React.useState<boolean>(false);

  // ----------------------------------------------------
  // DATA 4: Home Loan Calculator
  // ----------------------------------------------------
  const [loanIncome, setLoanIncome] = React.useState<number>(120000); // monthly income
  const [loanEmi, setLoanEmi] = React.useState<number>(15000); // current EMI
  const [loanTenure, setLoanTenure] = React.useState<number>(20); // years
  const [loanRate, setLoanRate] = React.useState<number>(8.5); // interest rate
  const [loanEligible, setLoanEligible] = React.useState<{
    maxEmi: number;
    principal: number;
    estimatedEmi: number;
  } | null>(null);

  const calculateLoan = () => {
    // Standard bank rule: 50% of net monthly income can go to EMIs
    const maxAllowedEmi = (loanIncome * 0.50) - loanEmi;
    if (maxAllowedEmi <= 0) {
      setLoanEligible({ maxEmi: 0, principal: 0, estimatedEmi: 0 });
      return;
    }

    // EMI calculation formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const monthlyRate = (loanRate / 12) / 100;
    const months = loanTenure * 12;

    // Derived P = EMI * ((1 + r)^n - 1) / (r * (1 + r)^n)
    const discountFactor = (Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months));
    const estimatedPrincipal = maxAllowedEmi * discountFactor;

    setLoanEligible({
      maxEmi: maxAllowedEmi,
      principal: Math.floor(estimatedPrincipal),
      estimatedEmi: Math.floor(maxAllowedEmi)
    });
  };

  React.useEffect(() => {
    calculateLoan();
  }, [loanIncome, loanEmi, loanTenure, loanRate]);

  // ----------------------------------------------------
  // DATA 5: Tenant Background Check Database / Tracker
  // ----------------------------------------------------
  const [tenantCheckName, setTenantCheckName] = React.useState<string>('');
  const [tenantAadhaar, setTenantAadhaar] = React.useState<string>('');
  const [tenantSubmitted, setTenantSubmitted] = React.useState<boolean>(false);
  const [tenantCheckStatus, setTenantCheckStatus] = React.useState<'pending' | 'police_verifying' | 'completed'>('pending');

  const submitTenantCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantCheckName || !tenantAadhaar) {
      showToast('Please fill all fields');
      return;
    }
    setTenantSubmitted(true);
    setTenantCheckStatus('pending');
    showToast('Tenant Verification Request registered with civil police databases.');

    // Simulating progress states
    setTimeout(() => {
      setTenantCheckStatus('police_verifying');
    }, 4000);
    setTimeout(() => {
      setTenantCheckStatus('completed');
    }, 12000);
  };

  // ----------------------------------------------------
  // DATA 6: Legal Advisory Services
  // ----------------------------------------------------
  const [legalTitleCheck, setLegalTitleCheck] = React.useState<string>('');
  const [legalReraNo, setLegalReraNo] = React.useState<string>('');
  const [legalRequested, setLegalRequested] = React.useState<boolean>(false);

  // ----------------------------------------------------
  // DATA 7: Dashboards & CRM Database Mocking
  // ----------------------------------------------------
  // List of saved/shortlisted items
  const [userShortlist, setUserShortlist] = React.useState<PropertyItem[]>([
    { id: 101, region: 'Yamuna Expressway', sector: 'Sector 20', blocks: 'Pocket-R', size: '300 MTR', details: 'East Facing plot near peripheral boundary corridor', price: '₹ 1.25 Cr' },
    { id: 102, region: 'Greater Noida', sector: 'Alpha-2', blocks: 'Block-G', size: '200 MTR', details: 'Corner park facing dual gate sector file', price: '₹ 1.95 Cr' }
  ]);

  const [alerts, setAlerts] = React.useState<{ id: number; sector: string; budget: string }[]>([
    { id: 1, sector: 'Sector 20 Yamuna Expressway', budget: 'Below ₹ 1.30 Cr' }
  ]);
  const [newAlertSector, setNewAlertSector] = React.useState<string>('');
  const [newAlertBudget, setNewAlertBudget] = React.useState<string>('');

  const addAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertSector) return;
    const added = {
      id: Date.now(),
      sector: newAlertSector,
      budget: newAlertBudget || 'No Limit'
    };
    setAlerts([...alerts, added]);
    setNewAlertSector('');
    setNewAlertBudget('');
    showToast('SMS & WhatsApp price drop alert configured successfully!');
  };

  // ----------------------------------------------------
  // AGENT LEADS & ANALYTICS CRM MOCK
  // ----------------------------------------------------
  const [crmLeads, setCrmLeads] = React.useState([
    { id: 1, name: 'Amit Kumar', phone: '+91 98100 23456', interest: 'Yamuna Sector 20 (300 MTR Plot)', date: 'Today, 10:15 AM', status: 'Pending Call', clicks: 4 },
    { id: 2, name: 'Dr. Rajesh Sharma', phone: '+91 88000 98765', interest: 'Alpha-2 Greater Noida Commercial Shop', date: 'Yesterday', status: 'Sent Brochure', clicks: 12 },
    { id: 3, name: 'Sanjay Bansal (NRI)', phone: '+44 7911 123456', interest: 'Builder Micro-site: Godrej Golf Links 4BHK Villa', date: '2 days ago', status: 'Scheduled Tour', clicks: 8 }
  ]);

  const updateLeadStatus = (leadId: number, nextStatus: string) => {
    setCrmLeads(crmLeads.map(l => l.id === leadId ? { ...l, status: nextStatus } : l));
    showToast(`Lead status updated to: ${nextStatus}`);
  };

  // ----------------------------------------------------
  // DATA 8: Premium Builder Micro-sites (Godrej & DLF)
  // ----------------------------------------------------
  const [selectedBuilder, setSelectedBuilder] = React.useState<'godrej' | 'dlf'>('godrej');
  const [selectedBhk, setSelectedBhk] = React.useState<2 | 3 | 4>(3);
  const [virtualTourActiveStep, setVirtualTourActiveStep] = React.useState<string>('Lobby Entrance');

  const builderProjects = {
    godrej: {
      name: 'Godrej Golf Links',
      location: 'Sector 27, Greater Noida',
      tagline: 'Super-Luxury Gated Township surrounding a pristine 9-Hole Golf Course',
      desc: 'Experience living in a fully private villa or low-rise apartment surrounded by direct fairways, private wellness clubhouses, and premium RERA certifications.',
      pricing: {
        2: '₹ 1.15 Cr onwards',
        3: '₹ 1.85 Cr onwards',
        4: '₹ 3.50 Cr onwards'
      },
      specs: {
        2: 'Super Area: 1350 Sq.Ft | Master Bedroom with attached balcony',
        3: 'Super Area: 1890 Sq.Ft | 3 Bedrooms + Servant Quarter + Study room',
        4: 'Super Area: 3200 Sq.Ft | Luxury Triplex Villa with private lawn & personal plunge pool'
      }
    },
    dlf: {
      name: 'DLF Star Towers',
      location: 'Omega Sector, Pari Chowk Central',
      tagline: 'Premium Business Complex & Commercial Showrooms with premium footfall',
      desc: 'The center point of commercial retail in Greater Noida. Direct high-speed escalators, absolute double glazed glass facade, high safety compliance.',
      pricing: {
        2: '₹ 85 Lakhs (Retail Shop)',
        3: '₹ 1.50 Cr (Pre-leased Office)',
        4: '₹ 2.80 Cr (Anchor Showroom)'
      },
      specs: {
        2: 'Carpet Area: 450 Sq.Ft | Double height ground floor retail space',
        3: 'Carpet Area: 1100 Sq.Ft | Premium office with executive washroom & central AC',
        4: 'Carpet Area: 2400 Sq.Ft | Massive multi-brand showroom with direct 120-meter road view'
      }
    }
  };

  const handleBookingRequest = (projectName: string) => {
    const text = `Hi Sharma Prop Mart, I am interested in booking or scheduling a site tour for the premium Builder Micro-site project: ${projectName}. Please connect me with our dedicated developer relationship desk.`;
    const url = `https://wa.me/${OFFICE_CONTACT.rawPhone2}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    showToast(`Redirecting to Developer Desk for ${projectName}...`);
  };

  return (
    <div className="space-y-12" id="premium-services-hub">
      
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-12 rounded-3xl border border-emerald-500/15 text-center space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <span className="text-xs font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400 animate-pulse" />
          PROP-TECH INTEGRATION SUITE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Sharma Prop Mart <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Digital Services</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Access our certified RERA tools, digital agreement desks, instant plot valuation engines, real-time price trend indices, and comprehensive broker/user portals.
        </p>

        {/* WORKSPACE SECTOR TAB DIRECT NAVIGATION */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
          <button
            onClick={() => setActiveSection('tools')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide cursor-pointer transition-all ${
              activeSection === 'tools' 
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            📊 Data & Smart Tools
          </button>
          
          <button
            onClick={() => setActiveSection('vas')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide cursor-pointer transition-all ${
              activeSection === 'vas' 
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            ⚡ Value Added Services (VAS)
          </button>

          <button
            onClick={() => setActiveSection('crm')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide cursor-pointer transition-all ${
              activeSection === 'crm' 
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            👥 Dashboards & Broker CRM
          </button>

          <button
            onClick={() => setActiveSection('builder')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide cursor-pointer transition-all ${
              activeSection === 'builder' 
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🏢 Builder Microsites & Spotlight
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------
          SECTION 1: DATA & SMART TOOLS
         ---------------------------------------------------- */}
      {activeSection === 'tools' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* SEO Rank Teaser */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-black tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                Search Ranking Active
              </span>
              <h4 className="text-white font-extrabold text-lg">Bing & Google SEO Index Simulator</h4>
              <p className="text-xs text-slate-400 max-w-xl">
                Type queries like <strong className="text-emerald-400">"greater noida property SALL"</strong> to check how your website sharmapropmart.com ranks at the top organic positions with optimized metatags.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('seo')}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
            >
              Open SERP Tool 💻
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Valuation Calculator: left col (lg:6) */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">Property Valuation Calculator</h3>
                <p className="text-xs text-slate-400">Calculate instant estimated rates for NCR authority plots</p>
              </div>
            </div>

            <form onSubmit={calculateValuation} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Region</label>
                  <select
                    value={valRegion}
                    onChange={(e) => {
                      const reg = e.target.value as any;
                      setValRegion(reg);
                      setValSector(reg === 'Yamuna Expressway' ? 'Sector 20' : 'Alpha-2');
                    }}
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl p-3 focus:outline-none"
                  >
                    <option value="Yamuna Expressway">Yamuna Expressway (YEIDA)</option>
                    <option value="Greater Noida">Greater Noida (Authority)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Sector</label>
                  {valRegion === 'Yamuna Expressway' ? (
                    <select
                      value={valSector}
                      onChange={(e) => setValSector(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl p-3 focus:outline-none"
                    >
                      <option value="Sector 20">Sector 20 YEIDA</option>
                      <option value="Sector 18">Sector 18 YEIDA</option>
                      <option value="Sector 22D">Sector 22D YEIDA</option>
                    </select>
                  ) : (
                    <select
                      value={valSector}
                      onChange={(e) => setValSector(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl p-3 focus:outline-none"
                    >
                      <option value="Alpha-2">Alpha-2</option>
                      <option value="Beta-1">Beta-1</option>
                      <option value="Delta-1">Delta-1</option>
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                    Plot Size: <span className="text-emerald-400 font-bold">{valSize} Sq.M</span>
                  </label>
                  <input
                    type="range"
                    min="120"
                    max="2000"
                    step="10"
                    value={valSize}
                    onChange={(e) => setValSize(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-900 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>120 Sq.M</span>
                    <span>300 Sq.M (Standard)</span>
                    <span>2000 Sq.M</span>
                  </div>
                </div>

                <div className="flex flex-col justify-end space-y-2">
                  <label className="flex items-center gap-2 text-slate-300 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={valIsCorner}
                      onChange={(e) => setValIsCorner(e.target.checked)}
                      className="rounded border-slate-800 bg-slate-900 text-emerald-500 focus:ring-0"
                    />
                    <span>Corner Plot (10% Location Markup)</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-300 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={valIsParkFacing}
                      onChange={(e) => setValIsParkFacing(e.target.checked)}
                      className="rounded border-slate-800 bg-slate-900 text-emerald-500 focus:ring-0"
                    />
                    <span>Park Facing (5% PLC Addition)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase py-3.5 rounded-xl cursor-pointer shadow-lg transition-transform hover:scale-[1.01]"
              >
                Estimate Market Valuation 🪙
              </button>
            </form>

            {calculatedValuation && (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4 animate-in slide-in-from-bottom-3 duration-300">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-400 font-bold uppercase">Estimated Valuation</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">
                    {calculatedValuation.formatted}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/40">
                    <span className="text-slate-500 block mb-1">Base Rate / Sq.M</span>
                    <span className="text-white font-extrabold">₹ {calculatedValuation.ratePerSqm}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/40">
                    <span className="text-slate-500 block mb-1">Base Price</span>
                    <span className="text-white font-extrabold">₹ {(calculatedValuation.basePrice / 100000).toFixed(1)} L</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/40">
                    <span className="text-slate-500 block mb-1">PLC Markup</span>
                    <span className="text-emerald-400 font-extrabold">₹ {(calculatedValuation.premiumAddon / 100000).toFixed(1)} L</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[10px] text-slate-500 leading-relaxed mb-3">
                    *This is a calculated market estimate based on authority transfer charges and pocket averages for 2026.
                  </p>
                  <a
                    href={`https://wa.me/${OFFICE_CONTACT.rawPhone2}?text=Hi Gulshan Sharma, I calculated an estimate of ${calculatedValuation.formatted} for a ${valSize} Sq.M plot in ${valSector} ${valRegion}. Please send me the latest matching property inventory listing portfolio.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black text-emerald-400 hover:text-emerald-300 hover:underline"
                  >
                    <span>Request Certified Legal Quote via WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Locality Insights & Reviews + Price Trends: right col (lg:5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Price Trends Widget */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <LineChart className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-extrabold text-white text-sm">Locality Price Trends (Y-o-Y)</h4>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  2022 - 2026
                </span>
              </div>

              {/* Simple Pure CSS Bar Trend Chart */}
              <div className="space-y-3.5 pt-1">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
                    <span>Yamuna Sector 20 (Avg / Sq.M)</span>
                    <span className="font-extrabold text-white">₹ 38,000 <span className="text-emerald-400 text-[10px] font-bold">(+110% in 4 yrs)</span></span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
                    <span>Yamuna Sector 18 (Avg / Sq.M)</span>
                    <span className="font-extrabold text-white">₹ 36,000 <span className="text-emerald-400 text-[10px] font-bold">(+95% in 4 yrs)</span></span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
                    <span>Alpha-2 Greater Noida</span>
                    <span className="font-extrabold text-white">₹ 65,000 <span className="text-emerald-400 text-[10px] font-bold">(+45% in 4 yrs)</span></span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
                    <span>Beta-1 Greater Noida</span>
                    <span className="font-extrabold text-white">₹ 58,000 <span className="text-emerald-400 text-[10px] font-bold">(+38% in 4 yrs)</span></span>
                  </div>
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Locality Smart Reviews & Proximity Checker */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-teal-400" />
                <h4 className="font-extrabold text-white text-sm">Locality Proximity & Insights</h4>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Select Neighborhood</label>
                <select
                  value={insightSector}
                  onChange={(e) => setInsightSector(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="Sector 20 YEIDA">Sector 20 Yamuna Expressway (YEIDA)</option>
                  <option value="Sector 18 YEIDA">Sector 18 Yamuna Expressway (YEIDA)</option>
                  <option value="Alpha-2 Greater Noida">Alpha-2 Greater Noida (Established)</option>
                  <option value="Beta-1 Greater Noida">Beta-1 Greater Noida (Residences)</option>
                </select>
              </div>

              {sectorsInsightsData[insightSector] && (
                <div className="space-y-3.5 pt-2 animate-in fade-in duration-200 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-white font-mono">{sectorsInsightsData[insightSector].rating} / 5.0 Rating</span>
                    <span className="text-slate-500 text-[10px]">(Verified Resident Surveys)</span>
                  </div>

                  <div className="space-y-2.5 border-t border-slate-850 pt-3">
                    <div>
                      <span className="text-slate-500 font-bold block text-[9px] uppercase font-mono">Infrastructure Sentiment</span>
                      <p className="text-slate-300 leading-relaxed">{sectorsInsightsData[insightSector].sentiment}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-850">
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Closest School</span>
                        <span className="text-white font-extrabold font-mono block truncate" title={sectorsInsightsData[insightSector].schools}>
                          {sectorsInsightsData[insightSector].schools.split('(')[0]}
                        </span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-850">
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Airport Distance</span>
                        <span className="text-emerald-400 font-extrabold font-mono block truncate">
                          {sectorsInsightsData[insightSector].airport.split('(')[0]}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 font-bold block text-[9px] uppercase font-mono">Metro Access</span>
                      <p className="text-slate-300">{sectorsInsightsData[insightSector].metro}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SECTION 2: VALUE ADDED SERVICES (VAS)
         ---------------------------------------------------- */}
      {activeSection === 'vas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
          
          {/* Rent Agreement Generator */}
          <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-850 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Online Rent Agreement</h3>
                  <p className="text-xs text-slate-400">Generate instantly formatted 11-month rental contracts</p>
                </div>
              </div>
              <span className="bg-blue-500/10 text-blue-400 font-mono text-[10px] font-black px-2 py-1 rounded border border-blue-500/20">
                E-STAMP READY
              </span>
            </div>

            {!raGenerated ? (
              <div className="space-y-4 pt-2 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Landlord Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Chandra Sharma"
                      value={raLandlord}
                      onChange={(e) => setRaLandlord(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tenant Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Abhay Kumar"
                      value={raTenant}
                      onChange={(e) => setRaTenant(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Monthly Rent Amount (₹)</label>
                    <input
                      type="number"
                      value={raRent}
                      onChange={(e) => setRaRent(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-lg focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Security Deposit (₹)</label>
                    <input
                      type="number"
                      value={raDeposit}
                      onChange={(e) => setRaDeposit(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-lg focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Property Layout Address</label>
                  <input
                    type="text"
                    placeholder="e.g. Plot No 45, Pocket G, Sector 20 Yamuna Expressway"
                    value={raSector}
                    onChange={(e) => setRaSector(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white p-2.5 rounded-lg focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (!raLandlord || !raTenant) {
                        showToast('Please enter both Landlord and Tenant full legal names!');
                        return;
                      }
                      setRaGenerated(true);
                      setRaSigned(false);
                      showToast('Drafting legal Rent Agreement document with custom biometric seal placeholders...');
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-400 text-slate-950 font-black tracking-wider uppercase py-3 rounded-xl cursor-pointer shadow-lg transition-transform hover:scale-[1.01]"
                  >
                    Draft Legal Rent Agreement 📝
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-2 text-xs">
                {/* Legal Draft Scroll Container */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 max-h-[220px] overflow-y-auto space-y-3 font-serif text-slate-300 leading-relaxed shadow-inner scrollbar-thin">
                  <div className="text-center border-b border-slate-800 pb-2">
                    <h5 className="font-extrabold text-white text-[11px] tracking-widest uppercase">RENT AGREEMENT DEED DEK</h5>
                    <p className="text-[9px] text-slate-500 font-mono">NON-JUDICIAL NCR E-STAMP (GOVERNMENT OF NCT DELHI & UP)</p>
                  </div>
                  <p>
                    This rent agreement is made on this <strong>{new Date().toLocaleDateString()}</strong> between landlord <strong>{raLandlord}</strong> (hereinafter called the First Party) and Tenant <strong>{raTenant}</strong> (hereinafter called the Second Party).
                  </p>
                  <p>
                    Whereas the landlord is the lawful owner of the premises located at <strong>{raSector}</strong> and has agreed to let out the same to the second party on a monthly lease amount of <strong>₹ {raRent} per month</strong>.
                  </p>
                  <p>
                    <strong>TERMS & CONDITIONS:</strong><br />
                    1. The lease duration is fixed for <strong>{raDuration} Months</strong>.<br />
                    2. The tenant has deposited <strong>₹ {raDeposit}</strong> as interest-free security deposit.<br />
                    3. The tenant shall pay utility electricity charges on time as per meter files.
                  </p>
                </div>

                {/* Digital Signature Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-850 pt-4">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">Biometric Status</span>
                    {raSigned ? (
                      <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Digitally Signed (RERA Verified)
                      </span>
                    ) : (
                      <span className="text-amber-500 font-bold">Awaiting Tenant OTP Signature</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!raSigned ? (
                      <button
                        onClick={() => {
                          setRaSigned(true);
                          showToast('Digital signature sealed securely using Aadhaar e-Sign API gateway!');
                        }}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-lg text-xs"
                      >
                        Sign with Aadhaar OTP ✍️
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          showToast('Downloading stamped PDF with integrated security seal...');
                        }}
                        className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-black px-4 py-2.5 rounded-lg text-xs"
                      >
                        Download PDF 📥
                      </button>
                    )}
                    <button
                      onClick={() => setRaGenerated(false)}
                      className="bg-slate-900 hover:bg-slate-850 text-slate-400 border border-slate-800 px-3 py-2 rounded-lg"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Home Loan Eligibility & Tenant background verification */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Home Loan Eligibility Simulator */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-extrabold text-white text-sm">Home Loan Partner Eligibility</h4>
                </div>
                <span className="text-[10px] text-slate-400 font-bold">PARTNER BANKS: SBI / HDFC</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Monthly Income (₹)</label>
                    <input
                      type="number"
                      value={loanIncome}
                      onChange={(e) => setLoanIncome(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-white p-2 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Existing EMIs (₹)</label>
                    <input
                      type="number"
                      value={loanEmi}
                      onChange={(e) => setLoanEmi(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-white p-2 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Loan Tenure: {loanTenure} Years</label>
                    <select
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-white p-2 rounded-lg text-xs"
                    >
                      <option value="10">10 Years</option>
                      <option value="15">15 Years</option>
                      <option value="20">20 Years</option>
                      <option value="25">25 Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Interest Rate: {loanRate}%</label>
                    <select
                      value={loanRate}
                      onChange={(e) => setLoanRate(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-white p-2 rounded-lg text-xs font-mono"
                    >
                      <option value="8.15">8.15% (SBI Special)</option>
                      <option value="8.50">8.50% (Standard)</option>
                      <option value="8.95">8.95% (HDFC Retail)</option>
                    </select>
                  </div>
                </div>

                {loanEligible && (
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850 flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 text-[9px] uppercase font-bold block">Maximum Eligible Loan Principal</span>
                      <span className="text-lg font-black text-emerald-400 font-mono">
                        ₹ {(loanEligible.principal / 100000).toFixed(1)} Lakhs
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const messageText = `Hi Sharma Prop Mart, I calculated my Loan Eligibility as ₹ ${(loanEligible.principal / 100000).toFixed(1)} Lakhs based on a monthly salary of ₹ ${loanIncome}. Please connect me with loan advisory agents.`;
                        window.open(`https://wa.me/${OFFICE_CONTACT.rawPhone2}?text=${encodeURIComponent(messageText)}`, '_blank');
                        showToast('Connecting with mortgage partner desk...');
                      }}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3.5 py-2 rounded-lg text-[10px] uppercase"
                    >
                      Direct Apply ⚡
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tenant Police Verification Request */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-850 pb-3">
                <UserCheck className="w-5 h-5 text-teal-400" />
                <div>
                  <h4 className="font-extrabold text-white text-sm">Tenant Background & Police Verification</h4>
                  <p className="text-[10px] text-slate-500">Fast online credentials screening and civil report checks</p>
                </div>
              </div>

              {!tenantSubmitted ? (
                <form onSubmit={submitTenantCheck} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Tenant Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Abhay Kumar"
                        value={tenantCheckName}
                        onChange={(e) => setTenantCheckName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-white p-2 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Aadhaar Number (UIDAI)</label>
                      <input
                        type="text"
                        maxLength={12}
                        placeholder="12-digit Aadhaar"
                        value={tenantAadhaar}
                        onChange={(e) => setTenantAadhaar(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-white p-2 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-850 text-emerald-400 font-extrabold text-xs uppercase py-2.5 rounded-lg border border-slate-800 cursor-pointer"
                  >
                    Initiate Tenant Screening 🔍
                  </button>
                </form>
              ) : (
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center bg-slate-900 p-3.5 rounded-xl border border-slate-850">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase font-bold">Verification Subject</span>
                      <strong className="text-white">{tenantCheckName}</strong>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      tenantCheckStatus === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                      tenantCheckStatus === 'police_verifying' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {tenantCheckStatus === 'pending' ? 'Aadhaar Verified' :
                       tenantCheckStatus === 'police_verifying' ? 'Civil Verification Pending' :
                       'Approved - Clean Record'
                      }
                    </span>
                  </div>

                  {/* Status Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>UIDAI Check</span>
                      <span>Civil Court Check</span>
                      <span>Police Desk Approval</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full" style={{ width: '33%' }} />
                      <div className={`h-full ${tenantCheckStatus !== 'pending' ? 'bg-blue-500' : 'bg-slate-900'}`} style={{ width: '34%' }} />
                      <div className={`h-full ${tenantCheckStatus === 'completed' ? 'bg-emerald-500' : 'bg-slate-900'}`} style={{ width: '33%' }} />
                    </div>
                  </div>

                  <button
                    onClick={() => setTenantSubmitted(false)}
                    className="text-[10px] text-slate-500 hover:text-emerald-400 underline block"
                  >
                    Verify Another Tenant
                  </button>
                </div>
              )}
            </div>

            {/* Legal Advisory & RERA Verification services */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-amber-400" />
                <div>
                  <h4 className="font-extrabold text-white text-sm">Property Legal Advisory (RERA Checks)</h4>
                  <p className="text-[10px] text-slate-500">Ensure absolute non-litigation safety on your property registry files</p>
                </div>
              </div>

              {!legalRequested ? (
                <div className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">RERA Number</label>
                      <input
                        type="text"
                        placeholder="e.g. UPRERAPRJ12345"
                        value={legalReraNo}
                        onChange={(e) => setLegalReraNo(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-white p-2 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Plot Location details</label>
                      <input
                        type="text"
                        placeholder="e.g. Sector 20 Pocket R"
                        value={legalTitleCheck}
                        onChange={(e) => setLegalTitleCheck(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-white p-2 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!legalTitleCheck) {
                        showToast('Please enter location details to check litigation status.');
                        return;
                      }
                      setLegalRequested(true);
                      showToast('Analyzing litigation databases and RERA registries for title checks...');
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase py-2.5 rounded-lg"
                  >
                    Generate Legal Title Deed Audit Report 📜
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5 text-xs bg-slate-900 p-4 rounded-xl border border-slate-850">
                  <div className="flex justify-between items-center">
                    <strong className="text-white text-xs uppercase font-bold tracking-wide">Deed Verification Checklist</strong>
                    <span className="text-emerald-400 font-extrabold font-mono text-[10px]">Title Cleared (RERA Verified)</span>
                  </div>
                  <ul className="space-y-2 text-slate-300 font-mono text-[11px]">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Zero outstanding dues certificate checked</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Local municipal registry non-dispute title</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> RERA compliance check certified</li>
                  </ul>
                  <button
                    onClick={() => {
                      const text = `Hi Sharma Prop Mart, I require a physical legal title verification report for my plot at ${legalTitleCheck}. Please connect me with our legal experts.`;
                      window.open(`https://wa.me/${OFFICE_CONTACT.rawPhone2}?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="w-full text-center text-xs font-bold text-amber-400 hover:underline pt-1 block"
                  >
                    Connect with Legal Expert on WhatsApp
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SECTION 3: USER & AGENT CRM DASHBOARD
         ---------------------------------------------------- */}
      {activeSection === 'crm' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
          
          {/* USER DASHBOARD PANEL */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-850 pb-4">
              <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">User / Owner Dashboard</h3>
                <p className="text-xs text-slate-400">Manage your saved properties & listing alerts</p>
              </div>
            </div>

            {/* Saved Shortlists */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                Shortlisted Properties ({userShortlist.length})
              </h4>
              <div className="space-y-3">
                {userShortlist.map((item, index) => (
                  <div key={index} className="bg-slate-900 p-3.5 rounded-xl border border-slate-850 flex justify-between items-start text-xs gap-3">
                    <div className="space-y-1">
                      <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-[9px] font-mono font-bold text-emerald-400 uppercase">
                        {item.region}
                      </span>
                      <strong className="text-white block pt-1">{item.sector} - {item.blocks}</strong>
                      <p className="text-[10px] text-slate-400 leading-tight line-clamp-1">{item.details}</p>
                    </div>
                    <div className="text-right shrink-0 space-y-1.5">
                      <span className="font-extrabold text-white font-mono block">{item.price}</span>
                      <button 
                        onClick={() => {
                          setUserShortlist(userShortlist.filter(us => us.id !== item.id));
                          showToast('Removed from shortlist');
                        }}
                        className="text-red-400 hover:text-red-300 font-bold text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Alert Center */}
            <div className="space-y-3.5 border-t border-slate-850 pt-5">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-emerald-400" />
                Price Drop Alert Manager
              </h4>

              <div className="space-y-3">
                {alerts.map((al) => (
                  <div key={al.id} className="flex justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-850 text-xs">
                    <div>
                      <strong className="text-white block font-mono text-[11px]">{al.sector}</strong>
                      <span className="text-slate-500 text-[10px]">Budget cap: {al.budget}</span>
                    </div>
                    <button
                      onClick={() => {
                        setAlerts(alerts.filter(a => a.id !== al.id));
                        showToast('Alert canceled');
                      }}
                      className="text-slate-500 hover:text-red-400 font-mono text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={addAlert} className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <input
                  type="text"
                  placeholder="Sector / Pocket"
                  value={newAlertSector}
                  onChange={(e) => setNewAlertSector(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-white rounded p-2 text-xs"
                />
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Budget Cap (e.g. 1.2 Cr)"
                    value={newAlertBudget}
                    onChange={(e) => setNewAlertBudget(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-white rounded p-2 text-xs w-full font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3.5 rounded text-xs"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* BROKER/AGENT CRM LEADS CONTROL CONSOLE */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-850 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Agent & Broker Console</h3>
                  <p className="text-xs text-slate-400">Live pipeline leads, call tracking metrics, and contact manager</p>
                </div>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold px-2 py-1 rounded border border-emerald-500/20">
                CRM INTERFACE
              </span>
            </div>

            {/* CRM Analytical Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-850 text-center space-y-1">
                <span className="text-slate-500 font-black text-[9px] uppercase block tracking-wider">Total Active Leads</span>
                <span className="text-xl font-black text-white font-mono">148</span>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-850 text-center space-y-1">
                <span className="text-slate-500 font-black text-[9px] uppercase block tracking-wider">Broker Number Clicks</span>
                <span className="text-xl font-black text-emerald-400 font-mono">512 Views</span>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-850 text-center space-y-1">
                <span className="text-slate-500 font-black text-[9px] uppercase block tracking-wider">Form Submissions</span>
                <span className="text-xl font-black text-blue-400 font-mono">36</span>
              </div>
            </div>

            {/* CRM Leads Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Real-Time Property Inquiries (Live Feed)
              </h4>

              <div className="space-y-3">
                {crmLeads.map((lead) => (
                  <div key={lead.id} className="bg-slate-900/80 hover:bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-3 text-xs transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2.5">
                      <div>
                        <strong className="text-white text-sm">{lead.name}</strong>
                        <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{lead.phone} • {lead.date}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono self-start sm:self-auto ${
                        lead.status.includes('Pending') ? 'bg-amber-500/10 text-amber-400' :
                        lead.status.includes('Sent') ? 'bg-blue-500/10 text-blue-400' :
                        'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {lead.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-slate-300">
                      <span>Interest: <strong className="text-white">{lead.interest}</strong></span>
                      <span className="text-slate-500 font-mono">({lead.clicks} Phone clicks)</span>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => updateLeadStatus(lead.id, 'Answering Quote')}
                        className="bg-slate-950 border border-slate-800 text-slate-300 hover:text-white px-2.5 py-1.5 rounded text-[10px] font-bold"
                      >
                        Start Call 📞
                      </button>
                      <button
                        onClick={() => updateLeadStatus(lead.id, 'Quote Sent')}
                        className="bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 px-2.5 py-1.5 rounded text-[10px] font-black transition-colors"
                      >
                        Send WhatsApp Brochure 💬
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SECTION 4: BUILDER MICROSITES & SPOTLIGHT LISTING
         ---------------------------------------------------- */}
      {activeSection === 'builder' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          
          {/* Builder Microsite Container */}
          <div className="bg-slate-950/80 border border-emerald-500/15 rounded-3xl p-6 sm:p-10 space-y-8">
            <div className="text-center space-y-2">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                CO-BRANDED BUILDER MICROSITES
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                Pre-Launched Mega Townships Portal
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
                Explore dedicated micro-pages for premium residential projects including digital floor plans, direct bookings, and custom layouts.
              </p>
            </div>

            {/* Builder Selector Tabs */}
            <div className="flex items-center justify-center gap-3 border-b border-slate-850 pb-4">
              <button
                onClick={() => {
                  setSelectedBuilder('godrej');
                  setSelectedBhk(3);
                }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedBuilder === 'godrej' 
                    ? 'bg-white text-slate-950 font-black' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Godrej Golf Links 🏌️‍♂️
              </button>
              <button
                onClick={() => {
                  setSelectedBuilder('dlf');
                  setSelectedBhk(3);
                }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedBuilder === 'dlf' 
                    ? 'bg-white text-slate-950 font-black' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                DLF Star Towers 🏙️
              </button>
            </div>

            {/* Project Details Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Project Details left (lg:6) */}
              <div className="lg:col-span-6 space-y-5 text-xs">
                <span className="text-emerald-400 font-bold tracking-wider uppercase font-mono text-[10px]">
                  📍 {builderProjects[selectedBuilder].location}
                </span>
                <h4 className="text-lg sm:text-2xl font-black text-white leading-tight">
                  {builderProjects[selectedBuilder].name}
                </h4>
                <p className="text-slate-300 font-bold leading-relaxed">
                  "{builderProjects[selectedBuilder].tagline}"
                </p>
                <p className="text-slate-400 leading-relaxed text-xs">
                  {builderProjects[selectedBuilder].desc}
                </p>

                {/* BHK Floor Plan Swappable Selector */}
                <div className="space-y-3.5 border-t border-slate-850 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 block uppercase font-black text-[9px]">Select Layout Floor Plan</span>
                    <span className="text-white font-extrabold text-xs">
                      {selectedBhk} BHK Luxury Layout
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {[2, 3, 4].map((b) => (
                      <button
                        key={b}
                        onClick={() => setSelectedBhk(b as any)}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                          selectedBhk === b 
                            ? 'bg-emerald-500 text-slate-950 font-black' 
                            : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {b} BHK
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 space-y-2 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Specifications:</span>
                      <span className="text-white text-right font-bold truncate max-w-[240px]">
                        {builderProjects[selectedBuilder].specs[selectedBhk]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estimate Pricing:</span>
                      <span className="text-emerald-400 font-black">
                        {builderProjects[selectedBuilder].pricing[selectedBhk]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleBookingRequest(builderProjects[selectedBuilder].name)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black tracking-wider uppercase text-xs px-6 py-3 rounded-xl cursor-pointer"
                  >
                    Schedule Developer Site Visit 🚘
                  </button>
                </div>
              </div>

              {/* Floor Plan & Virtual Tour Graphical Simulation right (lg:6) */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Dynamic Layout Blueprint</span>
                  <span className="text-[10px] text-slate-500 font-mono">SCALE 1:120</span>
                </div>

                {/* Simulated SVG/CSS blueprint render */}
                <div className="aspect-video bg-slate-950 rounded-xl relative border border-slate-850 overflow-hidden flex items-center justify-center p-6 shadow-inner">
                  
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  
                  {/* Simulated Blueprint Rooms based on BHK selections */}
                  <div className="w-full h-full border border-blue-500/20 rounded relative flex items-center justify-center font-mono text-[9px] text-blue-500/60 p-4">
                    {/* Living Room */}
                    <div className="absolute top-2 left-2 w-[45%] h-[55%] border border-dashed border-blue-500/30 flex flex-col items-center justify-center p-2 text-center">
                      <span>LIVING AREA</span>
                      <span className="text-[7px]">18.5 x 12.0 FT</span>
                    </div>
                    {/* Kitchen */}
                    <div className="absolute top-2 right-2 w-[45%] h-[30%] border border-dashed border-blue-500/30 flex flex-col items-center justify-center p-1 text-center">
                      <span>KITCHEN</span>
                      <span className="text-[7px]">10.0 x 8.0 FT</span>
                    </div>
                    {/* Balcony */}
                    <div className="absolute bottom-2 right-2 w-[45%] h-[20%] border border-dashed border-blue-500/30 flex flex-col items-center justify-center p-1 text-center">
                      <span>Balcony</span>
                      <span className="text-[7px]">12.0 x 4.0 FT</span>
                    </div>
                    {/* Master Bed */}
                    <div className="absolute bottom-2 left-2 w-[45%] h-[35%] border border-dashed border-blue-500/30 flex flex-col items-center justify-center p-1 text-center">
                      <span>MASTER BED</span>
                      <span className="text-[7px]">14.0 x 11.0 FT</span>
                    </div>
                    
                    {/* Extra Rooms for larger BHK plans */}
                    {selectedBhk >= 3 && (
                      <div className="absolute top-[35%] right-2 w-[45%] h-[35%] border border-dashed border-emerald-500/30 text-emerald-500/60 bg-emerald-500/5 flex flex-col items-center justify-center p-1 text-center">
                        <span>BEDROOM 2</span>
                        <span className="text-[7px]">12.0 x 10.0 FT</span>
                      </div>
                    )}
                    {selectedBhk >= 4 && (
                      <div className="absolute inset-x-[25%] bottom-[15%] w-[45%] h-[25%] border border-dashed border-amber-500/30 text-amber-500/60 bg-amber-500/5 flex flex-col items-center justify-center p-1 text-center">
                        <span>BEDROOM 3 / STUDY</span>
                        <span className="text-[7px]">10.0 x 10.0 FT</span>
                      </div>
                    )}
                    
                    <span className="absolute bottom-1 right-2 text-[8px] font-bold text-slate-600">Sharma Prop Mart Blueprint</span>
                  </div>
                </div>

                {/* Virtual Model Tour Step */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase font-bold">
                    <span>Virtual Scene Selector</span>
                    <span className="text-white">{virtualTourActiveStep}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {['Lobby Entrance', 'Show Kitchen Flat', 'Fitted Balcony view', 'Clubhouse Lounge'].map((step) => (
                      <button
                        key={step}
                        onClick={() => {
                          setVirtualTourActiveStep(step);
                          showToast(`Loaded virtual high-definition 3D tour render for: ${step}`);
                        }}
                        className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
                          virtualTourActiveStep === step 
                            ? 'bg-slate-950 text-emerald-400 border border-emerald-500/30 font-bold' 
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {step}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Premium Spotlight Listing Upgrade Info section */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center space-y-4">
            <div className="max-w-xl mx-auto space-y-3">
              <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                SPOTLIGHT PREMIUM UPGRADE
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Place Your Listing on the Top!
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Want to sell or lease your plot in 24 hours? Upgrade your listing to our Spotlight platform. We manually send verified physical GPS coordinates & video reports directly to premium buyers.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
              <a
                href={`https://wa.me/${OFFICE_CONTACT.rawPhone2}?text=Hi Gulshan Sharma, I want to upgrade my Yamuna / Noida plot to a Spotlight Verified Listing with direct drone and verification services.`}
                target="_blank"
                rel="noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl cursor-pointer"
              >
                Inquire Spotlight Package rates 🚀
              </a>
              <button
                onClick={() => {
                  showToast('Verification standard checklist: 1. Registry chain audit, 2. No-litigation transfer certificate, 3. Physical site tagging.');
                }}
                className="bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 px-5 py-3 rounded-xl"
              >
                View Verification Checklist
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Floating Interactive Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] bg-slate-950 border border-emerald-500/30 text-white rounded-2xl p-4 max-w-sm shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h6 className="text-xs font-black uppercase text-emerald-400 tracking-wider">Digital Desk Alert</h6>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{toastMessage}</p>
          </div>
        </div>
      )}

    </div>
  );
}
