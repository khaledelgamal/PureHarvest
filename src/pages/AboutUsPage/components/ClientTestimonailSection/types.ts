export type Role = 'Customer' | 'Partner' | 'Employee' | 'Little Critic';
export type User = {
  name: string;
  image: string;
  role: Role;
};
export type Testimonail = {
  id: number;
  comment: string;
  user: User;
  rate: number;
};
