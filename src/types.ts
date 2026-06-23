export interface PropertyItem {
  id: number;
  region: 'Yamuna Expressway' | 'Greater Noida';
  sector: string;
  details: string;
  blocks: string;
  size?: string;
  coordinates?: string; // dummy for interactive map simulation if we want
}

export interface InquiryFormData {
  name: string;
  phone: string;
  type: 'Buy' | 'Sell' | 'Rent' | 'Construction';
  location: string;
  message: string;
}

export type ActiveTab = 'home' | 'yamuna' | 'noida' | 'inquiry' | 'contact';
