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
}

export interface InquiryFormData {
  name: string;
  phone: string;
  type: 'Buy' | 'Sell' | 'Rent' | 'Construction';
  location: string;
  message: string;
}

export type ActiveTab = 'home' | 'yamuna' | 'noida' | 'inquiry' | 'contact' | 'admin';
