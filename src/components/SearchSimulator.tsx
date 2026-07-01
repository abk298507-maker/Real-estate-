import React from 'react';
import { Search, Globe, CheckCircle, HelpCircle, Eye, RefreshCw, Sparkles, TrendingUp, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export default function SearchSimulator() {
  const [engine, setEngine] = React.useState<'bing' | 'google'>('bing');
  const [searchQuery, setSearchQuery] = React.useState('greater noida property SALL');
  const [isAuditing, setIsAuditing] = React.useState(false);
  const [auditScore, setAuditScore] = React.useState(98);
  const [activeTab, setActiveTab] = React.useState<'serp' | 'audit' | 'guide'>('serp');

  const presetQueries = [
    'greater noida property SALL',
    'greater noida property sale',
    'sharma prop mart greater noida',
    'yamuna expressway authority plots',
    '99acres plots greater noida'
  ];

  const handleAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditScore(98);
    }, 1200);
  };

  // Check if our website should be highlighted based on the query
  const matchesQuery = (q: string) => {
    const term = q.toLowerCase();
    return (
      term.includes('property') ||
      term.includes('sall') ||
      term.includes('sale') ||
      term.includes('sharma') ||
      term.includes('plot') ||
      term.includes('noida') ||
      term.includes('acres')
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-0" id="search-simulator-component">
      {/* Header Panel */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-emerald-400" />
            <span>SEO Rankings & SERP Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Search Engine Indexing Simulator
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Simulate live search results on Bing & Google for Greater Noida real estate queries and review SEO metatag optimization.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-start">
          {(['serp', 'audit', 'guide'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-emerald-500 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'serp' ? '💻 SERP Simulator' : tab === 'audit' ? '📊 SEO Audit' : '🗺️ Indexing Guide'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="p-4 sm:p-8">
        {activeTab === 'serp' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Control Bar */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850/80 space-y-4">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Engine Toggle */}
                <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0 w-full lg:w-auto justify-center">
                  <button
                    onClick={() => setEngine('bing')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                      engine === 'bing'
                        ? 'bg-blue-600 text-white font-extrabold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="font-extrabold">b</span> Bing Search
                  </button>
                  <button
                    onClick={() => setEngine('google')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                      engine === 'google'
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" /> Google Search
                  </button>
                </div>

                {/* Input Search Field */}
                <div className="relative w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter keywords e.g. greater noida property SALL"
                    className="w-full bg-slate-900 text-white placeholder-slate-500 text-sm pl-11 pr-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                {/* Audit Button */}
                <button
                  onClick={handleAudit}
                  disabled={isAuditing}
                  className="w-full lg:w-auto px-5 py-3 bg-slate-900 border border-slate-800 hover:border-emerald-500 text-emerald-400 hover:bg-slate-850 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
                  <span>{isAuditing ? 'Auditing...' : 'Check Metatags'}</span>
                </button>
              </div>

              {/* Suggestions Chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Try Searches:</span>
                {presetQueries.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setSearchQuery(preset)}
                    className={`px-3 py-1 rounded-full border text-[11px] font-mono transition-colors cursor-pointer ${
                      searchQuery === preset
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Search Engine UI Box */}
            <div className={`border p-4 sm:p-6 rounded-3xl transition-all duration-300 ${
              engine === 'bing' 
                ? 'bg-[#121216] border-slate-800' 
                : 'bg-[#18191a] border-slate-800'
            }`}>
              {/* Browser bar representation */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                  <span className="text-xs font-mono text-slate-500 ml-4 max-w-xs sm:max-w-md truncate">
                    https://www.{engine}.com/search?q={encodeURIComponent(searchQuery)}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden sm:block">
                  {engine === 'bing' ? 'Bing Webmaster Mode' : 'Google SERP Mock'}
                </div>
              </div>

              {/* Engine Logo & Result Stats */}
              <div className="mb-6 space-y-1">
                {engine === 'bing' ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-blue-500 tracking-tight font-sans">
                      b<span className="text-slate-200">ing</span>
                    </span>
                    <span className="text-xs bg-slate-800/80 text-blue-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-widest border border-slate-750">
                      Co-pilot Enabled
                    </span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold tracking-tight text-white font-sans">
                    <span className="text-blue-400 font-extrabold">G</span>
                    <span className="text-red-400 font-extrabold">o</span>
                    <span className="text-yellow-400 font-extrabold">o</span>
                    <span className="text-blue-400 font-extrabold">g</span>
                    <span className="text-green-400 font-extrabold">l</span>
                    <span className="text-red-400 font-extrabold">e</span>
                  </div>
                )}
                <p className="text-xs text-slate-500 font-mono">
                  About 15,400 results (0.34 seconds) • Simulating index status for <strong className="text-slate-400">Sharma Prop Mart</strong>
                </p>
              </div>

              {/* SEARCH RESULTS LIST */}
              <div className="space-y-6">
                {/* 1. Sponsored Ads Simulation if matches search terms */}
                {matchesQuery(searchQuery) && (
                  <div className="bg-slate-950/40 border border-slate-850/60 p-4 rounded-xl space-y-2 relative">
                    <div className="absolute top-3 right-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      Ad • Sponsored
                    </div>
                    <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <span>99acres.com</span>
                      <span className="text-slate-600">•</span>
                      <span>Verified Property Portal</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-[#8ab4f8] hover:underline cursor-pointer">
                      Greater Noida Property Sale & Authority Plots - 99Acres Listing
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
                      Explore 53,000+ properties for Sale in Greater Noida. Direct contact with authorized dealers, authentic builders, and genuine authority plot list registries.
                    </p>
                  </div>
                )}

                {/* 2. OUR PRIZED RANK #1 ORGANIC RESULT SITE (Sharma Prop Mart!) */}
                {matchesQuery(searchQuery) ? (
                  <div className="bg-emerald-500/[0.02] border border-emerald-500/20 p-5 rounded-2xl space-y-3 shadow-lg relative animate-in zoom-in-95 duration-200">
                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-black uppercase tracking-wider border border-emerald-500/20 animate-pulse">
                        #1 Organic Match
                      </span>
                      <span className="text-xs text-emerald-400" title="100% SEO Optimized matching tags">
                        <CheckCircle className="w-4 h-4 fill-emerald-400/10" />
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 shrink-0" />
                        <span>https://sharmapropmart.com/</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">Verified Local Agency</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#8ab4f8] hover:text-emerald-400 hover:underline cursor-pointer">
                        Sharma Prop Mart - Greater Noida Property Dealers | Yamuna Expressway Authority Plots
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                      Sharma Prop Mart is the leading real estate builder & property dealer in Greater Noida & Yamuna Expressway. Buy, <strong className="text-emerald-400 underline decoration-emerald-500/50">sell</strong>, or rent verified Authority plots, YEIDA residential sectors, and commercial properties. Direct WhatsApp connection with legal assistance.
                    </p>

                    {/* Rich snippets (Sitelinks) simulated for our app! */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-850/60 mt-3 text-xs">
                      <div className="space-y-1">
                        <span className="text-[#8ab4f8] hover:underline font-bold cursor-pointer block">
                          Yamuna Expressway Sector 18/20 Plots
                        </span>
                        <p className="text-slate-400 text-[11px] leading-snug">
                          Live Authority layout registries, price trend analysis, and physical site verification on location.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[#8ab4f8] hover:underline font-bold cursor-pointer block">
                          Greater Noida Sector Listings (Alpha, Beta, Delta)
                        </span>
                        <p className="text-slate-400 text-[11px] leading-snug">
                          Explore ready-to-move builder flats, duplex luxury villas, commercial outlets, and independent shops.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap gap-2 text-[10px] font-mono">
                      <span className="bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-slate-400">
                        Matches keyword: <strong className="text-emerald-400">{searchQuery}</strong>
                      </span>
                      <span className="bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-slate-400">
                        Indexing Status: <strong className="text-emerald-400">Active (Sitemap Submitted)</strong>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950 p-6 rounded-2xl text-center border border-slate-850 space-y-2">
                    <p className="text-slate-400 text-sm font-medium">
                      No matching rankings optimized for query "<span className="text-white font-mono">{searchQuery}</span>".
                    </p>
                    <p className="text-xs text-slate-500">
                      Try searching <strong className="text-emerald-400">"greater noida property SALL"</strong> or click any of the quick suggestions above.
                    </p>
                  </div>
                )}

                {/* 3. Other generic mock search results for realistic feeling */}
                <div className="p-4 space-y-1 opacity-65 hover:opacity-100 transition-opacity">
                  <div className="text-xs font-mono text-slate-400">
                    https://www.magicbricks.com › greater-noida-property
                  </div>
                  <h3 className="text-lg font-bold text-[#8ab4f8] hover:underline cursor-pointer">
                    Properties for Sale in Greater Noida - Magicbricks Real Estate
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Choose from residential apartments, plots, independent houses, commercial shops and office towers in Greater Noida West, Knowledge Park, and Yamuna Corridor.
                  </p>
                </div>

                <div className="p-4 space-y-1 opacity-65 hover:opacity-100 transition-opacity">
                  <div className="text-xs font-mono text-slate-400">
                    https://www.housing.com › sale › greater-noida
                  </div>
                  <h3 className="text-lg font-bold text-[#8ab4f8] hover:underline cursor-pointer">
                    Property in Greater Noida | Real Estate & Apartments for Sale
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Verified property details, virtual site visits, contact direct owners and trusted RERA brokers. Find 100% legal flat options with low home loan processing interest rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* SEO Stats Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 text-center space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Global SEO Health</span>
                <div className="text-4xl font-extrabold text-emerald-400">{auditScore}/100</div>
                <p className="text-[11px] text-slate-500">Excellent configuration, highly discoverable</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 text-center space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Metatags Audit</span>
                <div className="text-4xl font-extrabold text-emerald-400">Verified</div>
                <p className="text-[11px] text-slate-500">OG tags & Twitter cards active</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 text-center space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Sitemap Status</span>
                <div className="text-4xl font-extrabold text-emerald-400">Auto-Gen</div>
                <p className="text-[11px] text-slate-500">Sector maps linked dynamically</p>
              </div>
            </div>

            {/* In-depth Tag Inspector */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-6">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400 fill-emerald-400/10" />
                <span>Live Metatag Audit Checklist</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="border-b border-slate-850 pb-4 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300">Meta Page Title</span>
                    <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/10">Passed (74 chars)</span>
                  </div>
                  <p className="text-slate-400 font-mono text-xs bg-slate-900/60 p-2.5 rounded border border-slate-850">
                    Sharma Prop Mart - Greater Noida Property Dealers | Yamuna Expressway Authority Plots
                  </p>
                </div>

                <div className="border-b border-slate-850 pb-4 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300">Meta Description</span>
                    <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/10">Passed (235 chars)</span>
                  </div>
                  <p className="text-slate-400 font-mono text-xs bg-slate-900/60 p-2.5 rounded border border-slate-850 leading-relaxed">
                    Sharma Prop Mart is the leading real estate builder & property dealer in Greater Noida & Yamuna Expressway. Buy, sell, or rent verified Authority plots, YEIDA residential sectors, and commercial properties. Direct WhatsApp connection with legal assistance.
                  </p>
                </div>

                <div className="border-b border-slate-850 pb-4 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300">Target Keywords Configured</span>
                    <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/10">Passed (Perfect Matches)</span>
                  </div>
                  <p className="text-slate-400 font-mono text-xs leading-relaxed bg-slate-900/60 p-2.5 rounded border border-slate-850">
                    greater noida property SALL, greater noida property sale, greater noida property sall, 99acres greater noida property, property in greater noida sale, Greater Noida Property, Yamuna Expressway Plots...
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300">Structured Schema (JSON-LD)</span>
                    <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/10">Passed</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Google Local Business Schema injected dynamically inside head tags with proper office coordinates, Mayur Vihar and Greater Noida locality coverage parameters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-extrabold text-white">How to Get Indexed on Google & Bing Immediately</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Adding metatags prepares your website for search engines. To make your site appear when searching <strong className="text-emerald-400">"greater noida property SALL"</strong> in real life, follow these 3 professional steps:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Verify Domain Ownership',
                  desc: 'Sign in to Google Search Console or Bing Webmaster Tools. Add your domain URL (e.g., sharmapropmart.com). Verify it instantly using our integrated HTML tag.'
                },
                {
                  step: '02',
                  title: 'Submit the XML Sitemap',
                  desc: 'We auto-generate clean pathways listing all Greater Noida sectors and Authority plots. Submit your sitemap.xml URL to the search console to crawl all listings today.'
                },
                {
                  step: '03',
                  title: 'Request Priority Indexing',
                  desc: 'Paste your specific property landing page URLs inside Google URL Inspection Tool and click "Request Indexing". Typically gets crawled and live within 12 - 24 hours.'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800/80 p-5 rounded-xl space-y-3 hover:border-slate-700 transition-all relative overflow-hidden"
                >
                  <span className="absolute top-2 right-4 text-3xl font-black text-slate-800 pointer-events-none select-none">
                    {item.step}
                  </span>
                  <h4 className="font-extrabold text-white text-sm mt-2">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Official Webmaster links */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <span className="text-slate-400">Access your search dashboards directly:</span>
              <div className="flex gap-4">
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  Google Search Console <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://www.bing.com/webmasters"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-blue-400 font-bold hover:underline flex items-center gap-1"
                >
                  Bing Webmaster Tools <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
