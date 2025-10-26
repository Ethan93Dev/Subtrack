export type AuthType = {
  username: string;
  email: string;
  password: string;
};

export type ProfileType = {
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  county: string;
};
export type SubscriptionType = {
  name: string;
  category?: string;
  cost: number;
  frequency: "monthly" | "yearly";
  nextPayment: Date;
};

export type UserData = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  isOnline: boolean;
};

export type ProfileData = {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  county: string;
  createdAt: string;
  updatedAt: string;
};
