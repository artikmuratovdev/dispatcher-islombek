import { Status } from '@/constants';
import { MeResponse } from '../authApi/types';

export interface GetAllExpenceRequest {
  branch?: string;
}

export interface GetAllExpenceResponse {
  _id?: string;
  branch?: string;
  status?: Status;
  users?: MeResponse;
  receiver?: MeResponse;
  reason: {
    _id?: string;
    branch?: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  amount: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
}
