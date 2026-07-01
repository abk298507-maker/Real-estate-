export interface PropertyItem {
  id: number;
  region: 'Yamuna Expressway' | 'Greater Noida';
  sector: string;
  details: string;
  blocks: string;
  size?: string;
  coordinates?: string; // dummy for interactive map simulation if we want
  price?: string; // Optional price (e.g. ₹ 1.2 Cr, ₹ 45 Lakhs, etc.)
  photoUrl?: string; // Property photograph URL
  purpose?: 'Buy' | 'Sell' | 'Rent' | 'Both'; // Listing category/purpose options
  contactNumber?: string; // Contact phone number for this listing
  postedDate?: string; // Post timestamp, e.g. "Posted Today", "2 hrs ago"
  beds?: string; // e.g. "3 BHK", "Plot", "Commercial"
  agentName?: string; // Associated handling agent
}

export interface InquiryFormData {
  name: string;
  phone: string;
  type: 'Buy' | 'Sell' | 'Rent' | 'Construction';
  location: string;
  message: string;
}

export type ActiveTab = 'home' | 'categories' | 'services' | 'yamuna' | 'noida' | 'inquiry' | 'contact' | 'admin' | 'seo';
