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
export type BillType = {
  id?: number;
  name: string;
  category: string;
  amount: number;
  dueDate: string;
  status?: string;
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
