export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
