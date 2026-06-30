import React from 'react';
import { PropertyItem, InquiryFormData } from '../types';
import { OFFICE_CONTACT, WHATSAPP_REPRESENTATIVES } from '../data';
import { 
  ShieldCheck, Lock, Unlock, Plus, Edit2, Trash2, CheckCircle2, 
  Trash, Save, X, Phone, Clipboard, Building2, Eye, FileText, Check, AlertCircle, RefreshCw, Users
} from 'lucide-react';
import { MasterBrokerRoster } from './My99AcresServices';

interface AdminPanelProps {
  listings: PropertyItem[];
  setListings: React.Dispatch<React.SetStateAction<PropertyItem[]>>;
  inquiries: (InquiryFormData & { id: string; date: string; status: 'New' | 'Contacted' | 'Closed' })[];
  setInquiries: React.Dispatch<React.SetStateAction<(InquiryFormData & { id: string; date: string; status: 'New' | 'Contacted' | 'Closed' })[]>>;
  whatsappNumbers: typeof WHATSAPP_REPRESENTATIVES;
  setWhatsappNumbers: React.Dispatch<React.SetStateAction<typeof WHATSAPP_REPRESENTATIVES>>;
}

export default function AdminPanel({
  listings,
  setListings,
  inquiries,
  setInquiries,
  whatsappNumbers,
  setWhatsappNumbers
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [passcode, setPasscode] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  // Active sub-tab inside Admin Panel
  const [adminTab, setAdminTab] = React.useState<'properties' | 'inquiries' | 'whatsapp' | 'brokers'>('properties');

  // Editing state for properties
  const [editingPropertyId, setEditingPropertyId] = React.useState<number | null>(null);
  const [newProp, setNewProp] = React.useState<Omit<PropertyItem, 'id'>>({
    region: 'Yamuna Expressway',
    sector: '',
    details: '',
    blocks: '',
    size: '',
    price: '',
    photoUrl: '',
    purpose: 'Both'
  });
  const [isAdding, setIsAdding] = React.useState(false);

  // Editing state for active helpline numbers
  const [editingContactId, setEditingContactId] = React.useState<string | null>(null);
  const [editContactVal, setEditContactVal] = React.useState({ name: '', phone: '', raw: '', purpose: '' });

  // Load Brokers roster for Lead Assignment
  const brokersList = React.useMemo(() => {
    const saved = localStorage.getItem('sharma_brokers_roster');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 'b1', name: 'Ravi Sharma', phone: '+91 98123 45678', specialization: 'Yamuna Authority Plots', activeLeadsCount: 4 },
      { id: 'b2', name: 'Anil Kumar', phone: '+91 81780 97230', specialization: 'Greater Noida West Flats', activeLeadsCount: 2 },
      { id: 'b3', name: 'Sanjay Dutt', phone: '+91 99990 12345', specialization: 'Commercial Shops & Showrooms', activeLeadsCount: 5 }
    ];
  }, [adminTab]);

  const handleAssignBroker = (id: string, brokerName: string) => {
    const updated = inquiries.map(inq => {
      if (inq.id === id) {
        return { ...inq, assignedBroker: brokerName };
      }
      return inq;
    });
    setInquiries(updated as any);
    localStorage.setItem('sharma_prop_inquiries', JSON.stringify(updated));
  };

  // Handle passcode auth (Simulated login)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234' || passcode.toLowerCase() === 'admin' || passcode === '') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect passcode! Try using "1234" or leave it blank.');
    }
  };

  // Add listing
  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.sector.trim() || !newProp.blocks.trim()) {
      alert('Please fill out Sector name and blocks.');
      return;
    }

    const nextId = listings.length > 0 ? Math.max(...listings.map(l => l.id)) + 1 : 1;
    const addedItem: PropertyItem = {
      id: nextId,
      region: newProp.region,
      sector: newProp.sector.trim().toUpperCase(),
      details: newProp.details.trim() || `${newProp.sector.trim().toUpperCase()} premium layout`,
      blocks: newProp.blocks.trim(),
      size: newProp.region === 'Yamuna Expressway' ? (newProp.size?.trim() || '300 MTR') : undefined,
      price: newProp.price?.trim() || undefined,
      photoUrl: newProp.photoUrl?.trim() || undefined,
      purpose: newProp.purpose
    };

    const updated = [addedItem, ...listings];
    setListings(updated);
    localStorage.setItem('sharma_prop_listings', JSON.stringify(updated));

    // Reset adding form
    setNewProp({
      region: 'Yamuna Expressway',
      sector: '',
      details: '',
      blocks: '',
      size: '',
      price: '',
      photoUrl: '',
      purpose: 'Both'
    });
    setIsAdding(false);
  };

  // Delete listing
  const handleDeleteProperty = (id: number) => {
    if (window.confirm('Are you sure you want to delete this property listing?')) {
      const updated = listings.filter(l => l.id !== id);
      setListings(updated);
      localStorage.setItem('sharma_prop_listings', JSON.stringify(updated));
    }
  };

  // Start editing a property
  const startEditProperty = (item: PropertyItem) => {
    setEditingPropertyId(item.id);
    setNewProp({
      region: item.region,
      sector: item.sector,
      details: item.details,
      blocks: item.blocks,
      size: item.size || '',
      price: item.price || '',
      photoUrl: item.photoUrl || '',
      purpose: item.purpose || 'Both'
    });
  };

  // Save edited property
  const saveEditProperty = (id: number) => {
    const updated = listings.map(l => {
      if (l.id === id) {
        return {
          ...l,
          region: newProp.region,
          sector: newProp.sector.toUpperCase(),
          details: newProp.details,
          blocks: newProp.blocks,
          size: newProp.region === 'Yamuna Expressway' ? newProp.size : undefined,
          price: newProp.price?.trim() || undefined,
          photoUrl: newProp.photoUrl?.trim() || undefined,
          purpose: newProp.purpose
        };
      }
      return l;
    });

    setListings(updated);
    localStorage.setItem('sharma_prop_listings', JSON.stringify(updated));
    setEditingPropertyId(null);
  };

  // Update Inquiry Status
  const handleInquiryStatusChange = (inqId: string, status: 'New' | 'Contacted' | 'Closed') => {
    const updated = inquiries.map(inq => {
      if (inq.id === inqId) {
        return { ...inq, status };
      }
      return inq;
    });
    setInquiries(updated);
    localStorage.setItem('sharma_prop_inquiries', JSON.stringify(updated));
  };

  // Delete Inquiry
  const handleDeleteInquiry = (inqId: string) => {
    if (window.confirm('Delete this inquiry record from history?')) {
      const updated = inquiries.filter(inq => inq.id !== inqId);
      setInquiries(updated);
      localStorage.setItem('sharma_prop_inquiries', JSON.stringify(updated));
    }
  };

  // Edit WhatsApp helper numbers
  const saveContactEdit = (id: string) => {
    const updated = whatsappNumbers.map(c => {
      if (c.id === id) {
        return {
          ...c,
          name: editContactVal.name,
          phone: editContactVal.phone,
          raw: editContactVal.phone.replace(/[^0-9]/g, ''),
          purpose: editContactVal.purpose
        };
      }
      return c;
    });
    setWhatsappNumbers(updated);
    localStorage.setItem('sharma_whatsapp_numbers', JSON.stringify(updated));
    setEditingContactId(null);
  };

  // Set default lists back to mock configuration
  const handleResetToDefault = () => {
    if (window.confirm('Reset all listings and configuration back to system default values? Your customized listings will be cleared.')) {
      localStorage.removeItem('sharma_prop_listings');
      localStorage.removeItem('sharma_whatsapp_numbers');
      localStorage.removeItem('sharma_prop_inquiries');
      window.location.reload();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4" id="admin-auth-container">
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Admin Authentication</h2>
            <p className="text-xs text-slate-400">
              Access the Sharma Prop Mart properties manager & inquiry logs portal.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="passcode" className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Passcode / Pin (Type <span className="text-emerald-400 font-mono">1234</span>)
              </label>
              <input
                type="password"
                id="passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter password (default: 1234)"
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center font-mono tracking-widest text-slate-200 placeholder-slate-700"
              />
            </div>

            {errorMsg && (
              <p className="text-red-500 text-xs font-medium text-center flex items-center gap-1 justify-center">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm py-3.5 px-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="border-t border-slate-800/60 pt-4 text-center">
            <p className="text-[10px] text-slate-500">
              Development mode is ACTIVE. Leaving the password field blank also bypasses the lock safely.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="admin-dashboard">
      {/* Top Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 text-slate-950 p-3 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Sharma Prop Mart Admin Control Panel</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Secure live management of authority sector listings, client inquiries, and WhatsApp contact numbers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-amber-500 hover:text-amber-400 py-2.5 px-4 rounded-xl font-bold transition-all"
            title="Reset to default original spreadsheet values"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default Data</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 text-xs bg-red-650/10 hover:bg-red-650 text-red-400 hover:text-white py-2.5 px-4 rounded-xl font-bold border border-red-500/20 hover:border-transparent transition-all"
          >
            <span>Lock & Logout</span>
          </button>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex border-b border-slate-850 gap-2">
        <button
          onClick={() => setAdminTab('properties')}
          className={`py-3 px-5 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            adminTab === 'properties'
              ? 'border-emerald-500 text-emerald-400 bg-slate-900/40 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Properties ({listings.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('inquiries')}
          className={`py-3 px-5 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            adminTab === 'inquiries'
              ? 'border-emerald-500 text-emerald-400 bg-slate-900/40 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clipboard className="w-4 h-4" />
          <span>Submitted Inquiries ({inquiries.length})</span>
          {inquiries.filter(i => i.status === 'New').length > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black animate-pulse">
              {inquiries.filter(i => i.status === 'New').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('whatsapp')}
          className={`py-3 px-5 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            adminTab === 'whatsapp'
              ? 'border-emerald-500 text-emerald-400 bg-slate-900/40 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>WhatsApp Chat Settings</span>
        </button>

        <button
          onClick={() => setAdminTab('brokers')}
          className={`py-3 px-5 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            adminTab === 'brokers'
              ? 'border-emerald-500 text-emerald-400 bg-slate-900/40 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4 text-amber-400" />
          <span>Master Broker Roster 👑</span>
        </button>
      </div>

      {/* SUBTAB 1: PROPERTY MANAGER */}
      {adminTab === 'properties' && (
        <div className="space-y-6">
          {/* Quick Header and Add trigger */}
          <div className="flex justify-between items-center bg-slate-900/40 px-6 py-4 rounded-xl border border-slate-900">
            <div>
              <h3 className="font-bold text-white text-base">Active Sector Database</h3>
              <p className="text-xs text-slate-500">Live modifications take place immediately for clients browsing listings.</p>
            </div>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-xl cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Sector Listing</span>
              </button>
            )}
          </div>

          {/* Add Property Form */}
          {isAdding && (
            <form onSubmit={handleAddProperty} className="bg-slate-900 border-2 border-emerald-500/20 p-6 rounded-2xl space-y-4 animate-in slide-in-from-top duration-200">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h4 className="font-extrabold text-white text-sm">Create New Property Listing</h4>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Region</label>
                  <select
                    value={newProp.region}
                    onChange={(e) => setNewProp(prev => ({ ...prev, region: e.target.value as any }))}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 focus:outline-none"
                  >
                    <option value="Yamuna Expressway">Yamuna Expressway</option>
                    <option value="Greater Noida">Greater Noida</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Sector Name</label>
                  <input
                    type="text"
                    placeholder="e.g. SEC-18 PKT-8"
                    value={newProp.sector}
                    onChange={(e) => setNewProp(prev => ({ ...prev, sector: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 focus:outline-none placeholder-slate-700"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Details Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Sector 18, Pocket 8, Yamuna Authority Plots"
                    value={newProp.details}
                    onChange={(e) => setNewProp(prev => ({ ...prev, details: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 focus:outline-none placeholder-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Blocks (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. A, B, C"
                    value={newProp.blocks}
                    onChange={(e) => setNewProp(prev => ({ ...prev, blocks: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 focus:outline-none placeholder-slate-700"
                    required
                  />
                </div>

                {newProp.region === 'Yamuna Expressway' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Standard Size</label>
                    <input
                      type="text"
                      placeholder="e.g. 300 MTR"
                      value={newProp.size}
                      onChange={(e) => setNewProp(prev => ({ ...prev, size: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 focus:outline-none placeholder-slate-700"
                    />
                  </div>
                )}
              </div>

              {/* Second row of new optional inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800/60 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Price Estimate</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹ 1.25 Cr, ₹ 45 Lakhs"
                    value={newProp.price || ''}
                    onChange={(e) => setNewProp(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 focus:outline-none placeholder-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Photo Image URL</label>
                  <input
                    type="url"
                    placeholder="e.g. https://images.unsplash.com/..."
                    value={newProp.photoUrl || ''}
                    onChange={(e) => setNewProp(prev => ({ ...prev, photoUrl: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 focus:outline-none placeholder-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Listing Option (Purpose)</label>
                  <select
                    value={newProp.purpose || 'Both'}
                    onChange={(e) => setNewProp(prev => ({ ...prev, purpose: e.target.value as any }))}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 focus:outline-none"
                  >
                    <option value="Both">Both Buy & Sell</option>
                    <option value="Buy">Only Buy</option>
                    <option value="Sell">Only Sell</option>
                    <option value="Rent">Only Rent</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Save Property
                </button>
              </div>
            </form>
          )}

          {/* Database Listings Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-850">
                  <th className="py-4 px-6">Region</th>
                  <th className="py-4 px-6">Sector / Code</th>
                  <th className="py-4 px-6">Details Description</th>
                  <th className="py-4 px-6">Blocks</th>
                  <th className="py-4 px-6">Sizing</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Photo URL</th>
                  <th className="py-4 px-6">Purpose</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-xs text-slate-300">
                {listings.map(item => {
                  const isEditing = editingPropertyId === item.id;
                  return (
                    <tr key={item.id} className="hover:bg-slate-850/20 transition-all">
                      <td className="py-4 px-6 font-bold text-slate-400">
                        {isEditing ? (
                          <select
                            value={newProp.region}
                            onChange={(e) => setNewProp(prev => ({ ...prev, region: e.target.value as any }))}
                            className="bg-slate-950 border border-slate-800 rounded text-xs p-1"
                          >
                            <option value="Yamuna Expressway">Yamuna Expressway</option>
                            <option value="Greater Noida">Greater Noida</option>
                          </select>
                        ) : (
                          item.region
                        )}
                      </td>

                      <td className="py-4 px-6 font-extrabold text-white">
                        {isEditing ? (
                          <input
                            type="text"
                            value={newProp.sector}
                            onChange={(e) => setNewProp(prev => ({ ...prev, sector: e.target.value }))}
                            className="bg-slate-950 border border-slate-800 rounded text-xs px-2 py-1 uppercase w-28"
                          />
                        ) : (
                          item.sector
                        )}
                      </td>

                      <td className="py-4 px-6 text-slate-400">
                        {isEditing ? (
                          <input
                            type="text"
                            value={newProp.details}
                            onChange={(e) => setNewProp(prev => ({ ...prev, details: e.target.value }))}
                            className="bg-slate-950 border border-slate-800 rounded text-xs px-2 py-1 w-full min-w-[120px]"
                          />
                        ) : (
                          item.details
                        )}
                      </td>

                      <td className="py-4 px-6">
                        {isEditing ? (
                          <input
                            type="text"
                            value={newProp.blocks}
                            onChange={(e) => setNewProp(prev => ({ ...prev, blocks: e.target.value }))}
                            className="bg-slate-950 border border-slate-800 rounded text-xs px-2 py-1 w-16"
                          />
                        ) : (
                          <span className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-[10px] font-mono text-emerald-400 font-bold">
                            {item.blocks}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        {isEditing ? (
                          item.region === 'Yamuna Expressway' ? (
                            <input
                              type="text"
                              value={newProp.size}
                              onChange={(e) => setNewProp(prev => ({ ...prev, size: e.target.value }))}
                              className="bg-slate-950 border border-slate-800 rounded text-xs px-2 py-1 w-20"
                            />
                          ) : (
                            <span className="text-slate-600">-</span>
                          )
                        ) : (
                          item.size || <span className="text-slate-600 italic">No sizing</span>
                        )}
                      </td>

                      {/* Price Estimate */}
                      <td className="py-4 px-6 font-extrabold text-emerald-400 font-mono">
                        {isEditing ? (
                          <input
                            type="text"
                            placeholder="e.g. ₹ 1.25 Cr"
                            value={newProp.price || ''}
                            onChange={(e) => setNewProp(prev => ({ ...prev, price: e.target.value }))}
                            className="bg-slate-950 border border-slate-800 rounded text-xs px-2 py-1 w-24"
                          />
                        ) : (
                          item.price || <span className="text-slate-600 italic">On Request</span>
                        )}
                      </td>

                      {/* Photo Image URL */}
                      <td className="py-4 px-6">
                        {isEditing ? (
                          <input
                            type="url"
                            placeholder="https://..."
                            value={newProp.photoUrl || ''}
                            onChange={(e) => setNewProp(prev => ({ ...prev, photoUrl: e.target.value }))}
                            className="bg-slate-950 border border-slate-800 rounded text-xs px-2 py-1 w-28 text-slate-400"
                          />
                        ) : (
                          item.photoUrl ? (
                            <span className="text-emerald-400 font-mono text-[10px] truncate block max-w-[80px]" title={item.photoUrl}>
                              Custom URL
                            </span>
                          ) : (
                            <span className="text-slate-600 italic">Fallback</span>
                          )
                        )}
                      </td>

                      {/* Purpose badge */}
                      <td className="py-4 px-6">
                        {isEditing ? (
                          <select
                            value={newProp.purpose || 'Both'}
                            onChange={(e) => setNewProp(prev => ({ ...prev, purpose: e.target.value as any }))}
                            className="bg-slate-950 border border-slate-800 rounded text-xs p-1"
                          >
                            <option value="Both">Both</option>
                            <option value="Buy">Buy</option>
                            <option value="Sell">Sell</option>
                            <option value="Rent">Rent</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.purpose === 'Buy' ? 'bg-emerald-500/10 text-emerald-400' :
                            item.purpose === 'Sell' ? 'bg-red-500/10 text-red-400' :
                            item.purpose === 'Rent' ? 'bg-blue-500/10 text-blue-400' :
                            'bg-slate-850 text-slate-400'
                          }`}>
                            {item.purpose || 'Both'}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => saveEditProperty(item.id)}
                                className="p-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded"
                                title="Save property changes"
                              >
                                <Save className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingPropertyId(null)}
                                className="p-1.5 bg-slate-950 text-slate-400 hover:text-white rounded"
                                title="Discard edit"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEditProperty(item)}
                                className="p-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded hover:text-emerald-400"
                                title="Edit sector entry"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProperty(item.id)}
                                className="p-1.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded"
                                title="Delete sector"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 2: SUBMITTED INQUIRY RECORDS */}
      {adminTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="bg-slate-900/40 px-6 py-4 rounded-xl border border-slate-900">
            <h3 className="font-bold text-white text-base">Client Requirement Inquiries Log</h3>
            <p className="text-xs text-slate-500">
              This log gathers client submissions created in the requirement forms in the current session (persisted via localStorage).
            </p>
          </div>

          {inquiries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inquiries.map((inq) => (
                <div 
                  key={inq.id}
                  className={`bg-slate-900 border rounded-2xl p-6 space-y-4 relative ${
                    inq.status === 'New' 
                      ? 'border-emerald-500/30 shadow-emerald-500/5' 
                      : inq.status === 'Contacted' 
                      ? 'border-blue-500/20' 
                      : 'border-slate-800 opacity-60'
                  }`}
                >
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      inq.status === 'New' 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 animate-pulse' 
                        : inq.status === 'Contacted' 
                        ? 'bg-blue-500/15 text-blue-400 border border-blue-500/10' 
                        : 'bg-slate-950 text-slate-500 border border-slate-800'
                    }`}>
                      {inq.status}
                    </span>
                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-red-400 transition-colors"
                      title="Delete record"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 block font-mono">{inq.date}</span>
                    <h4 className="font-extrabold text-white text-lg">{inq.name || 'Anonymous User'}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>{inq.phone}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-slate-850 py-3">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Type</span>
                      <span className="font-bold text-emerald-400">{inq.type}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">Location</span>
                      <span className="font-bold text-slate-200 truncate block">{inq.location}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase mb-1">Details</span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-850 whitespace-pre-wrap">
                      {inq.message}
                    </p>
                  </div>

                  {/* Assign Broker dropdown */}
                  <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl flex items-center justify-between text-xs gap-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Assign Broker:</span>
                    <select
                      value={(inq as any).assignedBroker || ''}
                      onChange={(e) => handleAssignBroker(inq.id, e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded px-2.5 py-1 focus:outline-none"
                    >
                      <option value="">Unassigned</option>
                      {brokersList.map((b: any) => (
                        <option key={b.id} value={b.name}>
                          {b.name} ({b.specialization.split(' ')[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Actions to update progress status */}
                  <div className="flex gap-2 pt-2 justify-end">
                    <button
                      onClick={() => handleInquiryStatusChange(inq.id, 'New')}
                      className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                        inq.status === 'New' ? 'bg-emerald-500 text-slate-950 font-extrabold' : 'bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      New
                    </button>
                    <button
                      onClick={() => handleInquiryStatusChange(inq.id, 'Contacted')}
                      className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                        inq.status === 'Contacted' ? 'bg-blue-500 text-white font-extrabold' : 'bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      Contacted
                    </button>
                    <button
                      onClick={() => handleInquiryStatusChange(inq.id, 'Closed')}
                      className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                        inq.status === 'Closed' ? 'bg-slate-800 text-slate-400' : 'bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      Closed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-500 space-y-3">
              <Clipboard className="w-10 h-10 text-slate-700 mx-auto" />
              <p className="font-bold text-slate-300">No client inquiry submissions logged yet.</p>
              <p className="text-xs max-w-sm mx-auto">When clients fill and submit the requirement forms, they will be logged here in addition to opening WhatsApp!</p>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: WHATSAPP DESKS CONFIGURATION */}
      {adminTab === 'whatsapp' && (
        <div className="space-y-6">
          <div className="bg-slate-900/40 px-6 py-4 rounded-xl border border-slate-900">
            <h3 className="font-bold text-white text-base">Inquiry WhatsApp Helplines Config</h3>
            <p className="text-xs text-slate-500">
              Customize the titles and numbers connected to each active helpline on the website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatsappNumbers.map((c) => {
              const isEditing = editingContactId === c.id;
              return (
                <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    {isEditing ? (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => saveContactEdit(c.id)}
                          className="bg-emerald-500 text-slate-950 p-1 rounded font-bold hover:bg-emerald-400 text-xs"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingContactId(null)}
                          className="bg-slate-950 text-slate-400 p-1 rounded hover:text-white text-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingContactId(c.id);
                          setEditContactVal({ name: c.name, phone: c.phone, raw: c.raw, purpose: c.purpose });
                        }}
                        className="bg-slate-950 hover:bg-slate-800 text-slate-300 py-1.5 px-3 rounded-lg text-xs font-bold transition-all"
                      >
                        Modify Number
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Desk Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editContactVal.name}
                          onChange={(e) => setEditContactVal(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 text-white rounded text-xs px-2 py-1.5"
                        />
                      ) : (
                        <h4 className="font-extrabold text-white text-base">{c.name}</h4>
                      )}
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Inquiry Purpose</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editContactVal.purpose}
                          onChange={(e) => setEditContactVal(prev => ({ ...prev, purpose: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800 text-white rounded text-xs px-2 py-1.5"
                        />
                      ) : (
                        <p className="text-xs text-slate-400">{c.purpose}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">WhatsApp Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editContactVal.phone}
                          onChange={(e) => setEditContactVal(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="e.g. +91 81780 97230"
                          className="w-full bg-slate-950 border border-slate-800 text-white rounded text-xs px-2 py-1.5 font-mono"
                        />
                      ) : (
                        <p className="text-emerald-400 font-extrabold font-mono text-sm">{c.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-850 text-slate-500 text-[10px]">
                    Routing URL: <span className="font-mono bg-slate-950 p-1 rounded">https://wa.me/{c.raw}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 4: MASTER AGENTS / BROKERS ROSTER */}
      {adminTab === 'brokers' && (
        <MasterBrokerRoster />
      )}
    </div>
  );
}
