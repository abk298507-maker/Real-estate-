import React from 'react';
import { 
  Building, 
  Building2, 
  Phone, 
  MessageSquare, 
  User, 
  Heart, 
  Eye, 
  CheckCircle, 
  X, 
  MapPin, 
  Percent, 
  Clock, 
  Plus, 
  ArrowRight, 
  Star, 
  Smartphone,
  ShieldCheck,
  Briefcase,
  Users,
  Trash2,
  CheckCircle2,
  Send
} from 'lucide-react';
import { PropertyItem, InquiryFormData, ActiveTab } from '../types';
import { OFFICE_CONTACT } from '../data';

// --- STUCK IN FORM POPUP COMPONENT ---
interface StuckInFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phone: string) => void;
}

export function StuckInFormPopup({ isOpen, onClose, onSubmit }: StuckInFormPopupProps) {
  const [phone, setPhone] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    onSubmit(phone);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPhone('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-emerald-500/30 rounded-3xl w-full max-w-md p-6 relative shadow-2xl overflow-hidden">
        {/* Top diagonal visual accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 hover:bg-slate-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5 pt-3">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
                ⚡ Stuck in the Form?
              </span>
              <h3 className="text-xl font-extrabold text-white tracking-tight mt-2">
                Let us call you back!
              </h3>
              <p className="text-xs text-slate-400">
                Give us your mobile number and one of our Sharma Prop Mart experts will reach you in 5 minutes!
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Your Contact Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white placeholder-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono tracking-wide"
                />
                <Phone className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-3.5 px-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10 uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>Request Direct Call</span>
            </button>

            <div className="text-center space-y-1.5 pt-2 border-t border-slate-800/60">
              <p className="text-[10px] text-slate-500 font-medium">Or here's a new and simpler way</p>
              <a
                href={`https://wa.me/${OFFICE_CONTACT.rawPhone2}?text=Hi%20Sharma%20Prop%20Mart,%20I%20got%20stuck%20while%20browsing.%20Please%20help%20me.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-emerald-400/20" />
                <span>To Post via WhatsApp click here</span>
              </a>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-black text-white">Callback Requested!</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              We received your phone number <span className="font-mono text-emerald-400 font-bold">{phone}</span>. Our desk representative is calling you shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


// --- POST PROPERTY STEP WIZARD COMPONENT ---
interface PostPropertyWizardProps {
  onPropertyCreated: (property: PropertyItem) => void;
  triggerStuckModal: () => void;
}

export function PostPropertyWizard({ onPropertyCreated, triggerStuckModal }: PostPropertyWizardProps) {
  const [propertyCategory, setPropertyCategory] = React.useState<'Residential' | 'Commercial'>('Residential');
  const [propertyType, setPropertyType] = React.useState('Flat/Apartment');
  const [step, setStep] = React.useState(1);
  const [sector, setSector] = React.useState('');
  const [blocks, setBlocks] = React.useState('');
  const [size, setSize] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [region, setRegion] = React.useState<'Yamuna Expressway' | 'Greater Noida'>('Yamuna Expressway');
  const [details, setDetails] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const residentialTypes = [
    'Flat/Apartment',
    'Independent House / Villa',
    'Independent / Builder Floor',
    'Plot / Land',
    '1 RK/ Studio Apartment',
    'Serviced Apartment',
    'Farmhouse',
    'Other'
  ];

  const commercialTypes = [
    'Office Space',
    'Commercial Shop',
    'Showroom',
    'Warehouse / Godown',
    'Industrial Plot',
    'Hotel / Guest House',
    'Other'
  ];

  const currentTypes = propertyCategory === 'Residential' ? residentialTypes : commercialTypes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sector.trim() || !contact.trim()) {
      alert('Please fill out Sector and Contact details.');
      return;
    }

    const nextId = Date.now();
    const newProperty: PropertyItem = {
      id: nextId,
      region: region,
      sector: sector.trim().toUpperCase(),
      details: details.trim() || `${propertyType} in ${sector.trim().toUpperCase()} (${propertyCategory})`,
      blocks: blocks.trim() || '-',
      size: size.trim() || '300 MTR',
      price: price.trim() ? `₹ ${price.trim()}` : 'On Request',
      purpose: 'Sell'
    };

    onPropertyCreated(newProperty);
    setSuccess(true);
    
    // Send standard SMS/WA notification mock
    setTimeout(() => {
      // reset form
      setSector('');
      setBlocks('');
      setSize('');
      setPrice('');
      setDetails('');
      setContact('');
      setStep(1);
      setSuccess(false);
    }, 4000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden" id="post-property-wizard">
      <div className="absolute top-0 right-0 bg-emerald-500/10 px-4 py-2 rounded-bl-3xl border-l border-b border-emerald-500/20 text-[10px] font-black tracking-wider text-emerald-400 uppercase">
        🚀 FAST SUBMIT
      </div>

      {success ? (
        <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">Property Listed Successfully!</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Your {propertyType} inside <span className="text-white font-extrabold">{sector.toUpperCase()}</span> has been securely written to the local database list. Buyers can find this immediately.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setSuccess(false)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-2.5 px-6 rounded-xl cursor-pointer"
            >
              List Another Property
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Post Your Property in 3 Simple Steps
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Are you an owner, broker or builder? Fill details below to fetch maximum buyers instantly.
            </p>
          </div>

          {/* Stepper Header */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => {
                  if (s < step || (s === 2 && sector) || (s === 3 && sector && size)) {
                    setStep(s);
                  }
                }}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  step === s 
                    ? 'bg-emerald-500 text-slate-950 font-black scale-105' 
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-950/20 text-[10px] flex items-center justify-center font-black">
                  {s}
                </span>
                <span>{s === 1 ? 'Category' : s === 2 ? 'Details' : 'Contact'}</span>
              </button>
            ))}

            <div className="ml-auto">
              <button
                onClick={triggerStuckModal}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold bg-amber-500/5 hover:bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/10 flex items-center gap-1"
              >
                <span>Stuck? Call Us</span>
              </button>
            </div>
          </div>

          {/* STEP 1: CATEGORY & TYPE */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  What kind of property do you have?
                </label>
                
                {/* Residential / Commercial tabs */}
                <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 max-w-xs">
                  {(['Residential', 'Commercial'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setPropertyCategory(cat);
                        setPropertyType(cat === 'Residential' ? 'Flat/Apartment' : 'Office Space');
                      }}
                      className={`flex-1 text-xs font-extrabold py-2 rounded-lg transition-all ${
                        propertyCategory === cat 
                          ? 'bg-slate-900 text-emerald-400 border border-slate-800 shadow-md' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property types tag list */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Select Property Subtype
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {currentTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPropertyType(t)}
                      className={`text-xs px-4 py-3 rounded-xl border font-bold transition-all ${
                        propertyType === t 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-black' 
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs py-3 px-6 rounded-xl flex items-center gap-1 cursor-pointer transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Region/Location
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Yamuna Expressway">Yamuna Expressway</option>
                    <option value="Greater Noida">Greater Noida</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Sector / Area Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SEC-18 PKT-3, ALPHA-2"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-700 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Plot Blocks / Pocket subdivisions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. A, B, C or G-Block"
                    value={blocks}
                    onChange={(e) => setBlocks(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-700 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Size / Sizing Area (Sq. Yards / MTR)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 120 MTR, 300 SqYd"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-700 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Expected Price Value (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1.25 Cr, 45 Lakhs"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-700 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Short Description / Details
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Corner park facing plot, direct registry"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-700 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white font-extrabold text-xs py-3 px-5 rounded-xl"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!sector.trim()) {
                      alert('Please specify the Sector Name.');
                      return;
                    }
                    setStep(3);
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs py-3 px-6 rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONTACT INFOMATION */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-4">
                <div className="space-y-1.5 bg-slate-950 p-4 rounded-2xl border border-slate-850">
                  <span className="text-[10px] font-black text-emerald-400 tracking-wider block uppercase">Listing review</span>
                  <h4 className="font-extrabold text-white text-sm">{propertyType} in {sector.toUpperCase()}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-mono">
                    Region: {region} | Size: {size || '300 MTR'} | Price: {price ? `₹ ${price}` : 'On Request'}
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Your contact details for the buyer to reach you *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Phone number / Email / Username"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 placeholder-slate-700 text-xs rounded-xl p-4 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800/60 gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white font-extrabold text-xs py-3 px-5 rounded-xl"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-3.5 px-6 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/15"
                >
                  <span>Start now, it's FREE</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[10px] text-slate-500">* Available with Owner Assist Plans.</p>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}


// --- ACTIVE BROKER ROSTER & LEAD ASSIGNER (MASTER USER ONLY) ---
interface Broker {
  id: string;
  name: string;
  phone: string;
  specialization: string;
  activeLeadsCount: number;
}

export function MasterBrokerRoster() {
  const [brokers, setBrokers] = React.useState<Broker[]>(() => {
    const saved = localStorage.getItem('sharma_brokers_roster');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'b1', name: 'Ravi Sharma', phone: '+91 98123 45678', specialization: 'Yamuna Authority Plots', activeLeadsCount: 4 },
      { id: 'b2', name: 'Anil Kumar', phone: '+91 81780 97230', specialization: 'Greater Noida West Flats', activeLeadsCount: 2 },
      { id: 'b3', name: 'Sanjay Dutt', phone: '+91 99990 12345', specialization: 'Commercial Shops & Showrooms', activeLeadsCount: 5 }
    ];
  });

  const [newBrokerName, setNewBrokerName] = React.useState('');
  const [newBrokerPhone, setNewBrokerPhone] = React.useState('');
  const [newBrokerSpec, setNewBrokerSpec] = React.useState('Yamuna Authority Plots');
  const [isAdding, setIsAdding] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('sharma_brokers_roster', JSON.stringify(brokers));
  }, [brokers]);

  const handleAddBroker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrokerName.trim() || !newBrokerPhone.trim()) return;

    const added: Broker = {
      id: 'b_' + Date.now(),
      name: newBrokerName.trim(),
      phone: newBrokerPhone.trim(),
      specialization: newBrokerSpec,
      activeLeadsCount: 0
    };

    setBrokers([...brokers, added]);
    setNewBrokerName('');
    setNewBrokerPhone('');
    setIsAdding(false);
  };

  const handleDeleteBroker = (id: string) => {
    if (window.confirm('Remove this broker from the master roster?')) {
      setBrokers(brokers.filter(b => b.id !== id));
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h4 className="font-extrabold text-white text-base flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <span>Master Agent / Broker Roster</span>
          </h4>
          <p className="text-xs text-slate-500">Manage real estate desks authorized to deal with client leads.</p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 px-3.5 rounded-xl cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Broker</span>
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAddBroker} className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Broker Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Singh"
                value={newBrokerName}
                onChange={(e) => setNewBrokerName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">WhatsApp/Phone</label>
              <input
                type="text"
                required
                placeholder="+91 99999 88888"
                value={newBrokerPhone}
                onChange={(e) => setNewBrokerPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 text-xs focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Specialization</label>
              <select
                value={newBrokerSpec}
                onChange={(e) => setNewBrokerSpec(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-300 rounded-lg p-2.5 text-xs focus:outline-none"
              >
                <option value="Yamuna Authority Plots">Yamuna Authority Plots</option>
                <option value="Greater Noida West Flats">Greater Noida West Flats</option>
                <option value="Commercial Shops & Showrooms">Commercial Shops & Showrooms</option>
                <option value="General Circle Land Deeds">General Circle Land Deeds</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-1.5 rounded-lg text-xs font-bold"
            >
              Save Broker
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brokers.map((b) => (
          <div key={b.id} className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl space-y-3 hover:border-slate-800 transition-all relative group">
            <button
              onClick={() => handleDeleteBroker(b.id)}
              className="absolute top-3 right-3 text-slate-600 hover:text-red-400 p-1 rounded hover:bg-slate-900 transition-colors opacity-0 group-hover:opacity-100"
              title="Delete broker"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <div>
              <span className="text-[9px] font-bold text-emerald-400 uppercase bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
                Desk Officer
              </span>
              <h5 className="font-extrabold text-white text-base mt-1.5">{b.name}</h5>
              <p className="text-slate-400 text-xs font-mono">{b.phone}</p>
            </div>

            <div className="border-t border-slate-850/60 pt-2.5 text-xs">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Specialization</span>
              <p className="font-bold text-slate-300">{b.specialization}</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-850 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-slate-400 flex justify-between items-center">
              <span>Active Assigned Leads</span>
              <span className="text-emerald-400 font-black bg-emerald-400/10 rounded-full px-2 py-0.5 font-mono">{b.activeLeadsCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// --- 99ACRES USER PROFILE & EXPERIENCE DRAWER (SCREENSHOT 3) ---
interface UserProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  allListings: PropertyItem[];
  setActiveTab: (tab: ActiveTab) => void;
  triggerPostProperty: () => void;
}

export function UserProfileDrawer({ 
  isOpen, 
  onClose, 
  allListings, 
  setActiveTab,
  triggerPostProperty 
}: UserProfileDrawerProps) {
  const [userRole, setUserRole] = React.useState<'guest' | 'normal' | 'master'>(() => {
    const saved = localStorage.getItem('spm_user_role');
    return (saved as any) || 'guest';
  });
  
  const [username, setUsername] = React.useState(() => {
    return localStorage.getItem('spm_username') || '';
  });

  const [password, setPassword] = React.useState('');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [error, setError] = React.useState('');

  // 99acres dynamic search activity
  const [viewedIds, setViewedIds] = React.useState<number[]>([]);
  const [shortlistedIds, setShortlistedIds] = React.useState<number[]>([]);
  const [contactedIds, setContactedIds] = React.useState<number[]>([]);

  // Reload statistics dynamically
  React.useEffect(() => {
    if (!isOpen) return;
    
    const viewed = JSON.parse(localStorage.getItem('spm_viewed_properties') || '[]');
    const shortlisted = JSON.parse(localStorage.getItem('sharma_shortlisted_properties') || '[]');
    const contacted = JSON.parse(localStorage.getItem('sharma_contacted_properties') || '[]');

    setViewedIds(viewed);
    setShortlistedIds(shortlisted);
    setContactedIds(contacted);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    if (username.toLowerCase() === 'master' || password === 'master') {
      setUserRole('master');
      localStorage.setItem('spm_user_role', 'master');
      localStorage.setItem('spm_username', 'Master User');
      setError('');
      setIsLoggingIn(false);
    } else {
      setUserRole('normal');
      localStorage.setItem('spm_user_role', 'normal');
      localStorage.setItem('spm_username', username);
      setError('');
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setUserRole('guest');
    setUsername('');
    setPassword('');
    localStorage.removeItem('spm_user_role');
    localStorage.removeItem('spm_username');
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col justify-between animate-in slide-in-from-right duration-300 overflow-y-auto">
      {/* 1. Header Profile block */}
      <div className="p-5 border-b border-slate-850 bg-slate-950/80 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              {userRole === 'guest' ? (
                <>
                  <h4 className="font-extrabold text-white text-base">Welcome</h4>
                  <p className="text-xs text-slate-500 font-medium">Guest Profile</p>
                </>
              ) : userRole === 'master' ? (
                <>
                  <h4 className="font-extrabold text-white text-base flex items-center gap-1">
                    <span>Master User</span>
                    <span className="text-[8px] bg-amber-500/15 border border-amber-500/35 text-amber-400 font-bold px-1.5 py-0.5 rounded">👑 Admin</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">Sharma Prop Mart Owner</p>
                </>
              ) : (
                <>
                  <h4 className="font-extrabold text-white text-base truncate max-w-[150px]">{username}</h4>
                  <p className="text-xs text-slate-400">Owner / Broker Profile</p>
                </>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Login trigger or logout */}
        {userRole === 'guest' ? (
          !isLoggingIn ? (
            <button
              onClick={() => setIsLoggingIn(true)}
              className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-3 rounded-xl transition-all uppercase tracking-widest cursor-pointer"
            >
              Login/ Register Now
            </button>
          ) : (
            <form onSubmit={handleLogin} className="mt-4 bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-3 animate-in fade-in duration-200">
              <div className="space-y-1">
                <label className="text-[9px] text-slate-500 font-bold uppercase block">Name / Username</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master, Broker Rohit"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-slate-500 font-bold uppercase block">Passcode (Type "master" for Master User)</label>
                <input
                  type="password"
                  placeholder="Password / PIN code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsLoggingIn(false)}
                  className="flex-1 bg-slate-950 hover:bg-slate-800 text-slate-400 py-1 rounded text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-1 rounded text-xs font-black"
                >
                  Enter
                </button>
              </div>
            </form>
          )
        ) : (
          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-slate-950 hover:bg-slate-800 text-red-400 border border-slate-800 hover:border-slate-700 font-bold text-xs py-2 rounded-xl transition-all cursor-pointer"
          >
            Log Out Account
          </button>
        )}
      </div>

      {/* 2. Scrollable Body options */}
      <div className="flex-1 p-5 space-y-6">
        {/* Quick posting channels */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              onClose();
              triggerPostProperty();
            }}
            className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 p-4 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group"
          >
            <div>
              <h5 className="font-extrabold text-white text-sm">Post Property</h5>
              <p className="text-[10px] text-slate-500 mt-0.5">Sell/ Rent faster with Sharma Prop Mart</p>
            </div>
            <div className="bg-emerald-500/10 p-1.5 rounded-lg text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <Plus className="w-4 h-4" />
            </div>
          </button>

          <a
            href={`https://wa.me/${OFFICE_CONTACT.rawPhone2}?text=Hi%20Sharma%20Prop%20Mart,%20I%20want%20to%2520sell%20my%20property.%20Details:%20`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 p-4 rounded-2xl flex items-center justify-between text-left transition-all block cursor-pointer group"
          >
            <div>
              <h5 className="font-extrabold text-white text-sm">Post Property via WhatsApp</h5>
              <p className="text-[10px] text-slate-500 mt-0.5">Faster property posting experience</p>
            </div>
            <div className="bg-emerald-500/10 p-1.5 rounded-lg text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <MessageSquare className="w-4 h-4 fill-emerald-500/10" />
            </div>
          </a>

          <button
            onClick={() => {
              onClose();
              setActiveTab('categories');
            }}
            className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 p-4 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group"
          >
            <div>
              <h5 className="font-extrabold text-white text-sm">Search Properties</h5>
              <p className="text-[10px] text-slate-500 mt-0.5">Explore residential and commercial plots</p>
            </div>
            <div className="bg-emerald-500/10 p-1.5 rounded-lg text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {userRole === 'master' && (
            <button
              onClick={() => {
                onClose();
                setActiveTab('admin');
              }}
              className="w-full bg-gradient-to-r from-amber-950/40 to-slate-950 border border-amber-500/20 p-4 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer group hover:border-amber-500/40"
            >
              <div>
                <h5 className="font-extrabold text-amber-400 text-sm flex items-center gap-1">
                  <span>👑 Admin Dashboard</span>
                </h5>
                <p className="text-[10px] text-slate-400 mt-0.5">Full control panel & broker roster</p>
              </div>
              <div className="bg-amber-500/10 p-1.5 rounded-lg text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </button>
          )}
        </div>

        {/* PROPERTY SEARCH ACTIVITY BLOCK */}
        <div className="space-y-3.5 border-t border-slate-850 pt-5">
          <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
            Your Property Search Activity
          </h5>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Viewed */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex flex-col items-center">
              <Eye className="w-4 h-4 text-slate-400 mb-1" />
              <span className="font-mono font-black text-white text-base">{viewedIds.length}</span>
              <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest mt-0.5">Viewed</span>
            </div>

            {/* Shortlisted */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex flex-col items-center">
              <Heart className="w-4 h-4 text-red-400 mb-1 fill-red-400/15" />
              <span className="font-mono font-black text-white text-base">{shortlistedIds.length}</span>
              <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest mt-0.5">Shortlisted</span>
            </div>

            {/* Contacted */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex flex-col items-center">
              <Phone className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="font-mono font-black text-white text-base">{contactedIds.length}</span>
              <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest mt-0.5">Contacted</span>
            </div>
          </div>
        </div>

        {/* Display Shortlisted Items List */}
        {shortlistedIds.length > 0 && (
          <div className="space-y-2 border-t border-slate-850 pt-5">
            <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
              Shortlisted Sectors
            </h5>
            <div className="space-y-2 max-h-[140px] overflow-y-auto">
              {shortlistedIds.map(id => {
                const p = allListings.find(item => item.id === id);
                if (!p) return null;
                return (
                  <div key={id} className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <h6 className="font-extrabold text-white text-[11px] uppercase tracking-wide">{p.sector}</h6>
                      <p className="text-[9px] text-slate-500">{p.region}</p>
                    </div>
                    <span className="font-bold text-emerald-400 text-[10px] font-mono">{p.price || 'Call'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. Get App Banner at bottom */}
      <div className="p-5 border-t border-slate-850 bg-slate-950 sticky bottom-0 z-10 text-center space-y-3">
        <div className="flex items-center justify-between bg-slate-900 border border-slate-850 p-3 rounded-xl text-left">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h6 className="font-black text-white text-xs">Search faster with App</h6>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] font-bold text-slate-400">4.5 Rating</span>
                <div className="flex items-center text-amber-400">
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  <Star className="w-2.5 h-2.5 fill-amber-400/40" />
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => alert('App coming soon to Google Play Store & iOS App Store!')}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-lg cursor-pointer uppercase tracking-wider"
          >
            Get App
          </button>
        </div>

        <p className="text-[9px] text-slate-600">
          Sharma Prop Mart Services Desk • All rights reserved 2026
        </p>
      </div>
    </div>
  );
}
