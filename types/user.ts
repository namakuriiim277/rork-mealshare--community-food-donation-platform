export interface User {
  id: string;
  email: string;
  name: string;
  profileImageUrl?: string;
  role: 'donor' | 'recipient' | 'restaurant' | 'admin';
  points: number;
  donationCount: number;
  receivedCount: number;
  createdAt: string;
}