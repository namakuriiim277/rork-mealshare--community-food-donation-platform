export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  imageUrl: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: string;
  rating: number;
  reviewCount: number;
  donationCount: number;
  campaignActive: boolean;
  menuItems: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isPopular: boolean;
}