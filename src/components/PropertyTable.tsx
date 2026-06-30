import React from 'react';
import { PropertyItem } from '../types';
import { Search, Info, CheckCircle, ArrowRight, CircleDot, HelpCircle, Heart, Eye } from 'lucide-react';

interface PropertyTableProps {
  region: 'Yamuna Expressway' | 'Greater Noida';
  listings: PropertyItem[];
  onActionClick: (type: 'Buy' | 'Sell' | 'Rent', item: PropertyItem) => void;
  searchFilter: string;
}

const FALLBACK_PHOTOS = [
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=300&q=80', // modern villa
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=300&q=80', // luxury house
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80', // contemporary house
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80', // exterior
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80', // luxury home
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=300&q=80'  // beautiful residence
];

const getFallbackPhoto = (id: number) => {
  return FALLBACK_PHOTOS[id % FALLBACK_PHOTOS.length];
};

export default function PropertyTable({ 
  region, 
  listings, 
  onActionClick,
  searchFilter 
}: PropertyTableProps) {
  const [searchTerm, setSearchTerm] = React.useState(searchFilter);
  const [selectedBlock, setSelectedBlock] = React.useState<string>('All');
  
  // Real-time activity tracking inspired by 99acres screenshots
  const [shortlisted, setShortlisted] = React.useState<number[]>(() => {
    const saved = localStorage.getItem('sharma_shortlisted_properties');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleShortlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (shortlisted.includes(id)) {
      updated = shortlisted.filter(item => item !== id);
    } else {
      updated = [...shortlisted, id];
    }
    setShortlisted(updated);
    localStorage.setItem('sharma_shortlisted_properties', JSON.stringify(updated));
  };

  const trackView = (id: number) => {
    const viewed = JSON.parse(localStorage.getItem('spm_viewed_properties') || '[]');
    if (!viewed.includes(id)) {
      const updated = [...viewed, id];
      localStorage.setItem('spm_viewed_properties', JSON.stringify(updated));
    }
  };

  const trackContact = (id: number) => {
    const contacted = JSON.parse(localStorage.getItem('sharma_contacted_properties') || '[]');
    if (!contacted.includes(id)) {
      const updated = [...contacted, id];
      localStorage.setItem('sharma_contacted_properties', JSON.stringify(updated));
    }
  };

  // Sync state if prop changes (e.g. from hero input)
  React.useEffect(() => {
    setSearchTerm(searchFilter);
  }, [searchFilter]);

  // Extract unique blocks for dropdown filtering
  const allBlocks = React.useMemo(() => {
    const blocksSet = new Set<string>();
    listings.forEach(item => {
      if (item.blocks && item.blocks !== '-') {
        // Split by comma & clean values
        item.blocks.split(',').forEach(b => {
          const trimmed = b.trim();
          if (trimmed) blocksSet.add(trimmed);
        });
      }
    });
    return ['All', ...Array.from(blocksSet).sort()];
  }, [listings]);

  // Clean filters
  const filteredListings = React.useMemo(() => {
    return listings.filter(item => {
      // Search matches
      const matchesSearch = 
        item.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.blocks && item.blocks.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.size && item.size.toLowerCase().includes(searchTerm.toLowerCase()));

      // Dropdown block matches
      let matchesBlock = true;
      if (selectedBlock !== 'All') {
        matchesBlock = item.blocks !== '-' && item.blocks.split(',').map(b => b.trim()).includes(selectedBlock);
      }

      return matchesSearch && matchesBlock;
    });
  }, [listings, searchTerm, selectedBlock]);

  // Highlights search matches
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <mark key={i} className="bg-emerald-400/30 text-emerald-200 px-0.5 rounded font-bold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden" id={`${region.toLowerCase().replace(/\s+/g, '-')}-listings-container`}>
      {/* Header section styled nicely */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 px-6 py-8 border-b border-slate-800/60">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {region}: Property Listings
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select Sector details to browse and send precise buy/sell requirements on WhatsApp.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700 max-w-max text-xs text-slate-300 font-bold">
            <CircleDot className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>Showing {filteredListings.length} of {listings.length} Sectors</span>
          </div>
        </div>

        {/* Search controls inside table */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-6">
          <div className="sm:col-span-8 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by sector, pocket, blocks or sizing..."
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500 text-slate-300"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Block Selection */}
          <div className="sm:col-span-4">
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
            >
              <option value="All">Filter by Block (All)</option>
              {allBlocks.filter(b => b !== 'All').map(block => (
                <option key={block} value={block}>
                  Block {block}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" id={`${region.toLowerCase().replace(/\s+/g, '-')}-data-table`}>
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-black uppercase text-slate-400 tracking-wider">
              <th className="py-4 px-6 text-center w-16">S.No</th>
              <th className="py-4 px-6 text-center w-24">Photo</th>
              <th className="py-4 px-6 min-w-[150px]">Sector / Details</th>
              <th className="py-4 px-6 text-center">Blocks Allowed</th>
              {region === 'Yamuna Expressway' && (
                <th className="py-4 px-6 text-center">Standard Size</th>
              )}
              <th className="py-4 px-6 text-center">Price Estimate</th>
              <th className="py-4 px-6 text-right w-56">Action Actionable</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredListings.length > 0 ? (
              filteredListings.map((item, index) => {
                const showBuy = !item.purpose || item.purpose === 'Buy' || item.purpose === 'Both';
                const showSell = !item.purpose || item.purpose === 'Sell' || item.purpose === 'Both';
                const showRent = item.purpose === 'Rent';

                return (
                  <tr 
                    key={item.id} 
                    className="hover:bg-slate-850/50 transition-colors group cursor-pointer"
                    onMouseEnter={() => trackView(item.id)}
                    onClick={() => trackView(item.id)}
                  >
                    {/* Serial Number */}
                    <td className="py-4 px-6 text-center font-mono text-sm text-slate-500 group-hover:text-slate-300">
                      {index + 1}
                    </td>

                    {/* Property Photo */}
                    <td className="py-4 px-4 text-center">
                      <div className="relative w-16 h-12 mx-auto rounded-lg overflow-hidden border border-slate-800 shadow-md group-hover:border-emerald-500/30 group-hover:scale-105 transition-all">
                        <img 
                          src={item.photoUrl || getFallbackPhoto(item.id)} 
                          alt={item.sector} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {item.purpose && (
                          <span className={`absolute bottom-0 inset-x-0 text-[8px] font-black tracking-widest uppercase text-center py-0.5 text-white ${
                            item.purpose === 'Buy' ? 'bg-emerald-600' :
                            item.purpose === 'Sell' ? 'bg-red-650' :
                            item.purpose === 'Rent' ? 'bg-blue-600' : 'bg-slate-800'
                          }`}>
                            {item.purpose}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Sector & Details */}
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-slate-200 group-hover:text-white transition-colors flex items-center gap-2">
                        <span>{highlightText(item.sector, searchTerm)}</span>
                        {item.sector.includes('SEC-20') && (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/10">
                            Premium Wide Lane
                          </span>
                        )}
                        {item.sector.includes('ALPHA') && (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/10">
                            Metro Belt
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 max-w-sm line-clamp-1 group-hover:line-clamp-none transition-all">
                        {item.details}
                      </div>
                    </td>

                    {/* Blocks */}
                    <td className="py-4 px-6 text-center">
                      {item.blocks === '-' ? (
                        <span className="text-slate-600 text-sm italic font-medium">No subdivisions</span>
                      ) : (
                        <div className="flex flex-wrap gap-1 justify-center max-w-xs mx-auto">
                          {item.blocks.split(',').map((b, bi) => {
                            const cleaned = b.trim();
                            const isMatch = selectedBlock === cleaned;
                            return (
                              <span 
                                key={bi} 
                                className={`text-xs px-2.5 py-1 rounded font-bold border transition-colors ${
                                  isMatch 
                                    ? 'bg-emerald-500 border-emerald-600 text-slate-950 font-black' 
                                    : 'bg-slate-950 border-slate-800 text-slate-300 group-hover:border-slate-700'
                                }`}
                              >
                                {cleaned}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </td>

                    {/* Size (only for Yamuna) */}
                    {region === 'Yamuna Expressway' && (
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block px-3 py-1 bg-slate-950 text-slate-300 border border-slate-800 text-xs font-mono font-bold rounded-lg group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all">
                          {item.size || '300 MTR'}
                        </span>
                      </td>
                    )}

                    {/* Price Estimate */}
                    <td className="py-4 px-6 text-center">
                      <span className="font-extrabold text-emerald-400 font-mono tracking-tight">
                        {item.price || 'Call for Price'}
                      </span>
                    </td>

                    {/* Buy / Sell / Rent buttons with Heart shortlist */}
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {/* Heart icon bookmark shortlist */}
                        <button
                          onClick={(e) => toggleShortlist(item.id, e)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer ${
                            shortlisted.includes(item.id)
                              ? 'bg-red-500/10 border-red-500/30 text-red-500'
                              : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
                          }`}
                          title={shortlisted.includes(item.id) ? 'Remove Shortlist' : 'Shortlist Property'}
                        >
                          <Heart className={`w-4 h-4 ${shortlisted.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>

                        {showBuy && (
                          <button
                            onClick={() => {
                              trackContact(item.id);
                              onActionClick('Buy', item);
                            }}
                            className="bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/20 hover:border-emerald-500 text-emerald-400 hover:text-white px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer transform active:scale-95 duration-700"
                            title={`Inquire about buying property in ${item.sector}`}
                          >
                            Buy
                          </button>
                        )}
                        {showSell && (
                          <button
                            onClick={() => {
                              trackContact(item.id);
                              onActionClick('Sell', item);
                            }}
                            className="bg-red-650/10 hover:bg-red-600 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer transform active:scale-95 duration-700"
                            title={`Inquire about selling property in ${item.sector}`}
                          >
                            Sell
                          </button>
                        )}
                        {showRent && (
                          <button
                            onClick={() => {
                              trackContact(item.id);
                              onActionClick('Rent', item);
                            }}
                            className="bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 text-blue-400 hover:text-white px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer transform active:scale-95 duration-700"
                            title={`Inquire about renting property in ${item.sector}`}
                          >
                            Rent
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={region === 'Yamuna Expressway' ? 7 : 6} className="py-12 px-6 text-center text-slate-500">
                  <div className="max-w-md mx-auto space-y-3">
                    <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="font-bold text-slate-300">No properties match your filter criteria.</p>
                    <p className="text-xs">Try clearing your search query or setting the Block dropdown filter back to "All". Or get live support below.</p>
                    <button 
                      onClick={() => { setSearchTerm(''); setSelectedBlock('All'); }}
                      className="text-xs text-emerald-500 hover:underline font-bold mt-2 cursor-pointer"
                    >
                      Clear Search Filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Helpful alert block */}
      <div className="bg-slate-950 px-6 py-4 border-t border-slate-800/40 text-xs text-slate-500 flex items-center gap-2">
        <Info className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>All plots displayed above fall under structural authority compliance layouts. Real sizes & block maps are accessible upon requesting on WhatsApp.</span>
      </div>
    </div>
  );
}
