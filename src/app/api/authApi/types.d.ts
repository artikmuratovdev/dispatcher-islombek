import { Role } from "@/constants";

export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  user: string;
}

export interface MeResponse {
  _id?: string;
  fullName?: string;
  username?: string;
  role?: Role;
  branch?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  debt?: number;
  subsription?: {
    endpoint: string;
    keys: {
      auth: string;
      p256dh: string;
    };
  };
}
export interface MeRequest {}
export interface AllUsersRequest {
  roles: Role[];
}

export type GetOneUserRequest = string | undefined;

export interface UpdateMeRequest {
  _id?: string;
  fullName?: string;
  username?: string;
  avatar?: string;
}

export interface UpdateMeResponse {
  fullName?: string;
  username?: string;
  avatar?: string;
}

export interface EditPasswordRequest {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface EditPasswordResponse {
  newPassword?: string;
}

export interface GetSalaryResponse {
  _id?: string;
  day?: string;
  staff?: string;
  salary?: {
    _id?: string;
    role: Role;
    amount: number;
    createdAt?: string;
    updatedAt?: string;
  };
}
