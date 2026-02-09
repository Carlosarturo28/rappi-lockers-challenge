export interface Locker {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  distance?: number;
}

export interface CreateLockerPayload {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
