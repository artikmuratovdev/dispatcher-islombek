import { OrderStatus, Role, Status, Type } from '@/constants';
import { MeResponse } from '../authApi/types';

export interface CreateOrderRequest {
  amount: number;
  cost?: string;
  customer?: string;
  location?: string;
  debt?: string;
}

export interface CreateOrderResponse {
  _id?: string;
  branch?: string;
  status?: OrderStatus;
  amount: number;
  debt?: string;
  location?: string;
  customer?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetAllOrdersRequest {
  status?: OrderStatus[];
}

export interface GetAllOrdersResponse {
  _id: string;
  branch?: string;
  location?: string;
  status?: OrderStatus;
  oldAmount?: number;
  amount: number;
  debt?: number;
  customer?: MeResponse;
  createdAt: string;
  updatedAt?: string;
}

export interface EditOrdersRequest {
  id: string;
  body: {
    amount?: number;
    oldAmount?: number;
    cost?: number;
    status?: OrderStatus;
  };
}

export interface DeleteOrdersRequest {
  id?: string;
}

export interface CreateNotificationRequest {
  type?: Type;
  role?: Role;
  users?: string[];
  order?: string;
}

export interface CreateNotificationResponse {
  _id?: stirng;
  users?: string[];
  status?: Status;
  type?: Type;
  order?: string;
  from?: string;
  createdAt?: string;
  updatedAt?: string;
}
