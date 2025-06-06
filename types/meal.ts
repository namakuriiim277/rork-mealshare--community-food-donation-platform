export interface Meal {
  id: string;
  name: string;
  description: string;
  restaurantId: string;
  restaurantName: string;
  imageUrl: string;
  price: number;
  points: number;
  distance: string;
  expiresIn: string;
  latitude: number;
  longitude: number;
  isSponsored: boolean;
  donorId?: string;
  recipientId?: string;
  status: 'available' | 'reserved' | 'completed' | 'expired';
  createdAt: string;
  expiresAt: string;
}