import React from 'react';
import { 
  ActiveTab, 
  PropertyItem 
} from '../types';
import { 
  PlusCircle, 
  MessageSquare, 
  Crown, 
  TrendingUp, 
  Hammer, 
  Building2, 
  Map, 
  Home, 
  Layers, 
  Bed, 
  Trees, 
  Sofa, 
  DoorOpen, 
  Store, 
  Briefcase, 
  Layout, 
  Grid, 
  Factory, 
  Warehouse, 
  HelpCircle, 
  Users, 
  LineChart, 
  Calculator, 
  Maximize2, 
  FileText, 
  Key, 
  Sparkles, 
  Tag, 
  PhoneCall, 
  Heart, 
  Eye, 
  LogIn, 
  Headphones, 
  MessageCircle, 
  Search,
  CheckCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { OFFICE_CONTACT } from '../data';

interface AllCategoriesProps {
  setActiveTab: (tab: ActiveTab) => void;
  setQuickSearch: (query: string) => void;
}

interface CategoryCard {
  title: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  iconBg: string;
  action: {
    type: 'tab' | 'search' | 'whatsapp' | 'alert';
    value: string;
  };
}

interface CategoryGroup {
  headerName: string;
  items: CategoryCard[];
}

interface MainCategory {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  subgroups: CategoryGroup[];
}

export default function AllCategories({ setActiveTab, setQuickSearch }: AllCategoriesProps) {
  const [activeSubTab, setActiveSubTab] = React.useState<string>('sell-rent');
  const [localSearch, setLocalSearch] = React.useState<string>('');
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const categoriesData: MainCategory[] = [
    {
      id: 'sell-rent',
      label: 'Sell/Rent',
      icon: PlusCircle,
      subgroups: [
        {
          headerName: 'Property posting options',
          items: [
            {
              title: 'Post Property',
              icon: PlusCircle,
              iconColor: 'text-blue-500',
              iconBg: 'bg-blue-500/10',
              action: { type: 'tab', value: 'inquiry' }
            },
            {
              title: 'Post via WhatsApp',
              icon: MessageSquare,
              iconColor: 'text-emerald-500',
              iconBg: 'bg-emerald-500/10',
              action: { type: 'whatsapp', value: 'Hello Sharma Prop Mart, I want to list/post my property with you.' }
            }
          ]
        },
        {
          headerName: 'Stand out with higher visibility',
          items: [
            {
              title: 'Owner Plans',
              icon: Crown,
              iconColor: 'text-amber-500',
              iconBg: 'bg-amber-500/10',
              action: { type: 'whatsapp', value: 'Hello, I want to know about premium Owner marketing plans.' }
            },
            {
              title: 'Dealer Plans',
              icon: TrendingUp,
              iconColor: 'text-emerald-500',
              iconBg: 'bg-emerald-500/10',
              action: { type: 'whatsapp', value: 'Hello, please share details of Dealer subscription packages.' }
            },
            {
              title: 'Builder Plans',
              icon: Hammer,
              iconColor: 'text-orange-500',
              iconBg: 'bg-orange-500/10',
              action: { type: 'whatsapp', value: 'Hello, I want to inquire about custom Builder advertising schemes.' }
            }
          ]
        }
      ]
    },
    {
      id: 'buy-residential',
      label: 'Buy Residential',
      icon: Building2,
      subgroups: [
        {
          headerName: 'Property Options',
          items: [
            {
              title: 'Flat / Apartment',
              icon: Building2,
              iconColor: 'text-blue-500',
              iconBg: 'bg-blue-500/10',
              action: { type: 'search', value: 'Apartment' }
            },
            {
              title: 'Residential Land',
              icon: Map,
              iconColor: 'text-emerald-500',
              iconBg: 'bg-emerald-500/10',
              action: { type: 'search', value: 'Plot' }
            },
            {
              title: 'Independent House / Villa',
              icon: Home,
              iconColor: 'text-yellow-500',
              iconBg: 'bg-yellow-500/10',
              action: { type: 'search', value: 'Villa' }
            },
            {
              title: 'Builder Floor',
              icon: Layers,
              iconColor: 'text-indigo-500',
              iconBg: 'bg-indigo-500/10',
              action: { type: 'search', value: 'Floor' }
            },
            {
              title: 'Studio Apartment',
              icon: Bed,
              iconColor: 'text-teal-500',
              iconBg: 'bg-teal-500/10',
              action: { type: 'search', value: 'Studio' }
            },
            {
              title: 'Farm House',
              icon: Trees,
              iconColor: 'text-green-500',
              iconBg: 'bg-green-500/10',
              action: { type: 'search', value: 'Farm' }
            },
            {
              title: 'Serviced Apartments',
              icon: Sofa,
              iconColor: 'text-red-500',
              iconBg: 'bg-red-500/10',
              action: { type: 'search', value: 'Serviced' }
            }
          ]
        }
      ]
    },
    {
      id: 'rent-pg',
      label: 'Rent / PG',
      icon: Key,
      subgroups: [
        {
          headerName: 'Property Options',
          items: [
            {
              title: 'Flat / Apartment',
              icon: Building2,
              iconColor: 'text-blue-500',
              iconBg: 'bg-blue-500/10',
              action: { type: 'search', value: 'Apartment' }
            },
            {
              title: 'Independent House / Villa',
              icon: Home,
              iconColor: 'text-yellow-500',
              iconBg: 'bg-yellow-500/10',
              action: { type: 'search', value: 'Villa' }
            },
            {
              title: 'Builder Floor',
              icon: Layers,
              iconColor: 'text-indigo-500',
              iconBg: 'bg-indigo-500/10',
              action: { type: 'search', value: 'Floor' }
            },
            {
              title: 'Studio Apartment',
              icon: Bed,
              iconColor: 'text-teal-500',
              iconBg: 'bg-teal-500/10',
              action: { type: 'search', value: 'Studio' }
            },
            {
              title: 'Serviced Apartments',
              icon: Sofa,
              iconColor: 'text-red-500',
              iconBg: 'bg-red-500/10',
              action: { type: 'search', value: 'Serviced' }
            },
            {
              title: 'Farm House',
              icon: Trees,
              iconColor: 'text-green-500',
              iconBg: 'bg-green-500/10',
              action: { type: 'search', value: 'Farm' }
            }
          ]
        },
        {
          headerName: 'PG/Co-living options',
          items: [
            {
              title: 'PG/Co-living properties',
              icon: DoorOpen,
              iconColor: 'text-blue-600',
              iconBg: 'bg-blue-600/10',
              action: { type: 'search', value: 'PG' }
            }
          ]
        }
      ]
    },
    {
      id: 'buy-commercial',
      label: 'Buy Commercial',
      icon: Store,
      subgroups: [
        {
          headerName: 'Property Options',
          items: [
            {
              title: 'Retail Shops / Showrooms',
              icon: Store,
              iconColor: 'text-blue-500',
              iconBg: 'bg-blue-500/10',
              action: { type: 'search', value: 'Retail' }
            },
            {
              title: 'Ready to move Offices',
              icon: Briefcase,
              iconColor: 'text-purple-500',
              iconBg: 'bg-purple-500/10',
              action: { type: 'search', value: 'Office' }
            },
            {
              title: 'Bare shell Offices',
              icon: Layout,
              iconColor: 'text-teal-500',
              iconBg: 'bg-teal-500/10',
              action: { type: 'search', value: 'Office' }
            },
            {
              title: 'Plot / Land',
              icon: Grid,
              iconColor: 'text-green-500',
              iconBg: 'bg-green-500/10',
              action: { type: 'search', value: 'Plot' }
            },
            {
              title: 'Factory Manufacturing',
              icon: Factory,
              iconColor: 'text-amber-500',
              iconBg: 'bg-amber-500/10',
              action: { type: 'search', value: 'Factory' }
            },
            {
              title: 'Warehouse',
              icon: Warehouse,
              iconColor: 'text-emerald-500',
              iconBg: 'bg-emerald-500/10',
              action: { type: 'search', value: 'Warehouse' }
            },
            {
              title: 'Others',
              icon: HelpCircle,
              iconColor: 'text-slate-400',
              iconBg: 'bg-slate-400/10',
              action: { type: 'search', value: 'Commercial' }
            }
          ]
        }
      ]
    },
    {
      id: 'lease-commercial',
      label: 'Lease Commercial',
      icon: Briefcase,
      subgroups: [
        {
          headerName: 'Property Options',
          items: [
            {
              title: 'Ready to move Offices',
              icon: Briefcase,
              iconColor: 'text-purple-500',
              iconBg: 'bg-purple-500/10',
              action: { type: 'search', value: 'Office' }
            },
            {
              title: 'Bare shell Offices',
              icon: Layout,
              iconColor: 'text-teal-500',
              iconBg: 'bg-teal-500/10',
              action: { type: 'search', value: 'Office' }
            },
            {
              title: 'Co-working Offices',
              icon: Users,
              iconColor: 'text-pink-500',
              iconBg: 'bg-pink-500/10',
              action: { type: 'search', value: 'Co-working' }
            },
            {
              title: 'Retail Shops / Showrooms',
              icon: Store,
              iconColor: 'text-blue-500',
              iconBg: 'bg-blue-500/10',
              action: { type: 'search', value: 'Shop' }
            },
            {
              title: 'Warehouse',
              icon: Warehouse,
              iconColor: 'text-amber-500',
              iconBg: 'bg-amber-500/10',
              action: { type: 'search', value: 'Warehouse' }
            },
            {
              title: 'Factory / Manufacturing',
              icon: Factory,
              iconColor: 'text-red-500',
              iconBg: 'bg-red-500/10',
              action: { type: 'search', value: 'Factory' }
            },
            {
              title: 'Plot / Land',
              icon: Grid,
              iconColor: 'text-green-500',
              iconBg: 'bg-green-500/10',
              action: { type: 'search', value: 'Plot' }
            },
            {
              title: 'Others',
              icon: HelpCircle,
              iconColor: 'text-slate-400',
              iconBg: 'bg-slate-400/10',
              action: { type: 'search', value: 'Commercial' }
            }
          ]
        }
      ]
    },
    {
      id: 'price-insights',
      label: 'Price & Insights',
      icon: TrendingUp,
      subgroups: [
        {
          headerName: 'Insights',
          items: [
            {
              title: 'Real Estate Insights',
              icon: LineChart,
              iconColor: 'text-blue-500',
              iconBg: 'bg-blue-500/10',
              action: { type: 'alert', value: 'Latest Real Estate Insights: Greater Noida and Yamuna Expressway authority files are showing strong appreciation due to upcoming Noida International Airport (Jewar). Sector 20 is particularly high in demand.' }
            },
            {
              title: 'Price Trends',
              icon: TrendingUp,
              iconColor: 'text-emerald-500',
              iconBg: 'bg-emerald-500/10',
              action: { type: 'alert', value: 'Price Trends: Average rates have increased by 18.4% annually across major sectors in Greater Noida. Pocket-wise data lists Sector 20 and Alpha-2 as major hot spots.' }
            }
          ]
        },
        {
          headerName: 'Tools',
          items: [
            {
              title: 'Budget Calculator',
              icon: Calculator,
              iconColor: 'text-emerald-500',
              iconBg: 'bg-emerald-500/10',
              action: { type: 'whatsapp', value: 'Hello Sharma Prop Mart, please help me calculate my real estate budget estimate.' }
            },
            {
              title: 'Area Converter',
              icon: Maximize2,
              iconColor: 'text-red-500',
              iconBg: 'bg-red-500/10',
              action: { type: 'alert', value: 'Quick Conversion Tool:\n\n1 Sq. Meter = 1.196 Sq. Yards\n1 Sq. Yard = 9 Sq. Feet\n300 Sq. Meter = 358.8 Sq. Yards' }
            }
          ]
        },
        {
          headerName: 'Articles & Guides',
          items: [
            {
              title: 'Articles',
              icon: FileText,
              iconColor: 'text-emerald-500',
              iconBg: 'bg-emerald-500/10',
              action: { type: 'alert', value: 'Read "YEIDA Plot Allotment Schemes 2026 Guidelines" and "Noida Metro Corridor Extension Progress" directly. Connect on WhatsApp for premium copies.' }
            },
            {
              title: 'Home Buying Guide',
              icon: Key,
              iconColor: 'text-blue-500',
              iconBg: 'bg-blue-500/10',
              action: { type: 'alert', value: 'Home Buying Guide: Check verified authority transfers, ensure legal registry, and confirm there are no outstanding utility or development fees before purchasing.' }
            },
            {
              title: 'Home Interiors Guide',
              icon: Sparkles,
              iconColor: 'text-teal-500',
              iconBg: 'bg-teal-500/10',
              action: { type: 'alert', value: 'Home Interiors Guide: Maximize lighting and space efficiency. Sharma Prop Mart offers complete architecture consultancy services on request.' }
            },
            {
              title: 'Seller Guide',
              icon: Tag,
              iconColor: 'text-amber-500',
              iconBg: 'bg-amber-500/10',
              action: { type: 'alert', value: 'Seller Guide: How to safely advertise your YEIDA plots to genuine premium buyers. Contact our desk for swift list services.' }
            }
          ]
        }
      ]
    },
    {
      id: 'activity-support',
      label: 'Activity & Support',
      icon: Headphones,
      subgroups: [
        {
          headerName: 'Activity',
          items: [
            {
              title: 'Contacted',
              icon: PhoneCall,
              iconColor: 'text-blue-500',
              iconBg: 'bg-blue-500/10',
              action: { type: 'whatsapp', value: 'Hello Sharma Prop Mart, I am checking on my previous inquiries.' }
            },
            {
              title: 'Shortlisted',
              icon: Heart,
              iconColor: 'text-red-500',
              iconBg: 'bg-red-500/10',
              action: { type: 'alert', value: 'Shortlisted Properties: Your starred properties can be saved. Let us know which block or sector you wish to tour!' }
            },
            {
              title: 'Viewed',
              icon: Eye,
              iconColor: 'text-amber-500',
              iconBg: 'bg-amber-500/10',
              action: { type: 'alert', value: 'Recently Viewed: Check out our listings on Yamuna Expressway (Sector 20, 18) and Greater Noida (Alpha, Delta, Beta).' }
            }
          ]
        },
        {
          headerName: 'Support & Settings',
          items: [
            {
              title: 'Log in',
              icon: LogIn,
              iconColor: 'text-slate-200',
              iconBg: 'bg-slate-700/30',
              action: { type: 'tab', value: 'admin' }
            },
            {
              title: 'Customer Service',
              icon: Headphones,
              iconColor: 'text-blue-500',
              iconBg: 'bg-blue-500/10',
              action: { type: 'whatsapp', value: `Hello Sharma Prop Mart Customer Support, I need assistance.` }
            },
            {
              title: 'Contact Us',
              icon: MessageCircle,
              iconColor: 'text-emerald-500',
              iconBg: 'bg-emerald-500/10',
              action: { type: 'tab', value: 'contact' }
            },
            {
              title: 'Request Info',
              icon: HelpCircle,
              iconColor: 'text-slate-400',
              iconBg: 'bg-slate-400/10',
              action: { type: 'whatsapp', value: 'Hello Sharma Prop Mart, I want to request details for verified investment plots.' }
            }
          ]
        }
      ]
    }
  ];

  const handleCardClick = (card: CategoryCard) => {
    const { type, value } = card.action;
    if (type === 'tab') {
      setActiveTab(value as ActiveTab);
      showToast(`Redirecting to ${value === 'admin' ? 'Admin Portal' : value === 'inquiry' ? 'Post Requirement' : 'Contact Support'}...`);
    } else if (type === 'search') {
      setQuickSearch(value);
      // Determine region or just search globally. Let's redirect to Noida as default search target or show search context
      setActiveTab('noida');
      showToast(`Filtering Greater Noida / Yamuna listings by "${value}"...`);
    } else if (type === 'whatsapp') {
      const url = `https://wa.me/${OFFICE_CONTACT.rawPhone2}?text=${encodeURIComponent(value)}`;
      window.open(url, '_blank');
      showToast('Opening official WhatsApp desk...');
    } else if (type === 'alert') {
      showToast(value);
    }
  };

  const activeCategory = categoriesData.find(c => c.id === activeSubTab) || categoriesData[0];

  // Search filter matching categories
  const filteredCategories = categoriesData.map(category => {
    const matchedSubgroups = category.subgroups.map(group => {
      const matchedItems = group.items.filter(item => 
        item.title.toLowerCase().includes(localSearch.toLowerCase())
      );
      return { ...group, items: matchedItems };
    }).filter(group => group.items.length > 0);

    return { ...category, subgroups: matchedSubgroups };
  }).filter(category => category.subgroups.length > 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-8 space-y-8" id="all-categories-container">
      
      {/* Search Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-10 rounded-2xl border border-slate-800 text-center space-y-4">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <span className="text-xs font-black tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block">
          Explore Hub
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Find Everything at Sharma Prop Mart
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Search over 40+ dynamic categories, residential blocks, authority plots, budget tools, and guides directly. Choose an option to search or connect on WhatsApp instantly.
        </p>

        {/* Categories Search Bar */}
        <div className="max-w-md mx-auto relative pt-2">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 pt-2">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search categories (e.g. Villa, Office, Trends, Plans...)"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-slate-950/80 hover:bg-slate-950 text-white text-sm rounded-xl pl-11 pr-4 py-3 border border-slate-800 focus:outline-none focus:border-emerald-500/50 transition-all placeholder-slate-700 shadow-inner"
          />
        </div>
      </div>

      {/* Interactive Dual Column Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: SIDEBAR TABS */}
        <div className="lg:col-span-1 space-y-2 lg:border-r lg:border-slate-800/80 lg:pr-6" id="categories-sidebar">
          {/* Scrollable categories for mobile, vertical stack for desktop */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none snap-x">
            {categoriesData.map((category) => {
              const IconComp = category.icon;
              const isActive = activeSubTab === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveSubTab(category.id);
                    setLocalSearch(''); // Reset local filter when category switches
                  }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer shrink-0 snap-center ${
                    isActive 
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10 font-black scale-[1.02]' 
                      : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800/60'
                  }`}
                >
                  <IconComp className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'text-slate-500'}`} />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC GRID CONTENT */}
        <div className="lg:col-span-3 space-y-8" id="categories-grid-content">
          {filteredCategories.length > 0 ? (
            // Search or select-specific active categories
            (localSearch ? filteredCategories : [activeCategory]).map((category) => (
              <div key={category.id} className="space-y-6 animate-in fade-in duration-300">
                {localSearch && (
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">
                    Result from: {category.label}
                  </h3>
                )}
                
                {category.subgroups.map((group, gi) => (
                  <div key={gi} className="space-y-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {group.headerName}
                    </h4>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {group.items.map((card, ci) => {
                        const CardIcon = card.icon;
                        
                        return (
                          <div
                            key={ci}
                            onClick={() => handleCardClick(card)}
                            className="bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 hover:border-emerald-500/30 rounded-2xl p-5 flex flex-col justify-between items-start gap-4 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 group shadow-lg"
                          >
                            <div className="flex items-center gap-3 w-full">
                              <div className={`p-3 rounded-xl ${card.iconBg} ${card.iconColor} group-hover:scale-110 transition-transform`}>
                                <CardIcon className="w-6 h-6" />
                              </div>
                              <h5 className="font-extrabold text-slate-200 group-hover:text-white text-sm transition-colors leading-tight">
                                {card.title}
                              </h5>
                            </div>
                            
                            <div className="w-full flex justify-between items-center pt-2 text-[10px] text-slate-500 group-hover:text-emerald-400 transition-colors">
                              <span className="font-mono tracking-wider">
                                {card.action.type === 'tab' ? 'VISIT FORM' : 
                                 card.action.type === 'search' ? 'FILTER PLOTS' : 
                                 card.action.type === 'whatsapp' ? 'WHATSAPP DESK' : 'QUICK VIEW'}
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-slate-950/20 border border-slate-800 rounded-2xl">
              <p className="text-slate-400 font-bold">No categories or tools matching "{localSearch}"</p>
              <button 
                onClick={() => setLocalSearch('')}
                className="mt-3 text-emerald-400 text-xs font-bold hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Floating Interactive Alert Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] bg-slate-950 border border-emerald-500/30 text-white rounded-2xl p-4 max-w-sm shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h6 className="text-xs font-black uppercase text-emerald-400 tracking-wider">Information Desk</h6>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{toastMessage}</p>
          </div>
        </div>
      )}

    </div>
  );
}
