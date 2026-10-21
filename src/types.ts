export interface PotatoMenu {
  id: string;
  name: string;
  tagline: string;
  price: number;
  description: string;
  ingredients: string[];
  image: string;
  badge?: string;
  spicy?: boolean;
  bestseller?: boolean;
  calories?: string;
}

export interface DrinkOption {
  id: string;
  name: string;
  brand: string;
  category: 'refrigerante' | 'cha' | 'agua' | 'cerveja';
  icon: string;
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartId: string;
  menu: PotatoMenu;
  selectedDrink: string;
  selectedExtras: ExtraOption[];
  notes?: string;
  quantity: number;
  unitPrice: number;
}

export interface DeliveryCalculation {
  distanceKm: number;
  fee: number; // 0, 1.50, or -1 (to be arranged)
  status: 'free' | 'standard' | 'custom' | 'uncalculated';
  statusText: string;
  calculatedVia: 'gps' | 'address' | 'preset' | null;
  addressSummary?: string;
}

export interface VipMember {
  id?: string;
  name: string;
  phone: string;
  address: string;
  birthdayMonth: string;
  favoriteFlavor: string;
  source: 'vip_modal' | 'checkout_optin' | 'admin_entry';
  createdAt: string;
}

export interface CustomerOrder {
  id?: string;
  customerName: string;
  customerPhone: string;
  address: string;
  itemsSummary: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'MBWAY' | 'DINHEIRO';
  changeFor?: string;
  distanceKm?: number;
  createdAt: string;
  vipOptIn?: boolean;
}
