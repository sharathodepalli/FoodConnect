export type UserRole = "recipient" | "restaurant" | "mart" | "volunteer" | "admin";

export interface VolunteerMetrics {
  hoursVolunteered: number;
  deliveriesCompleted: number;
  communitiesServed: number;
  co2Saved: number;
  nextMilestone: number;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string | null;
  notifications: number;  // Added this property
  email?: string;
  phone?: string;
  address?: string;
  businessName?: string;
  businessType?: string;
  storageCapacity?: string;
  operatingHours?: string;
  totalDonations?: number;
  rating?: number;
  volunteerMetrics?: VolunteerMetrics; // Added volunteerMetrics property
}
