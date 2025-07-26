import { MeResponse } from '../authApi/types';

export interface ComplaintRequest {
  to?: string;
  content?: string;
}

export interface ComplaintGetRequest {
  _id?: string;
  to?: string;
  content?: string;
}

export interface ComplaintResponse {
  _id: string;
  from: MeResponse;
  to: MeResponse;
  content: string;
  createdAt: string;
}
