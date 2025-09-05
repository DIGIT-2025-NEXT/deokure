export type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthResponse = {
  user: User | null;
  error: string | null;
};