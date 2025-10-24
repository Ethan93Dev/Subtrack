export type AuthType = {
  username: string;
  email: string;
  password: string;
};

export type ProfileType = {
  firstName: string;
  lastName: string;
  avatarUrl: string;
};
export type SubscriptionType = {
  name: string;
  category?: string;
  cost: number;
  frequency: "monthly" | "yearly";
  nextPayment: Date;
};
