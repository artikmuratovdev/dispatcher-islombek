export interface activeOrder {
  _id: string;
  client:
    | {
        _id: string;
        fullName: string;
      }
    | string;
  branch: string;
  status: number;
  address: string | {lat:number,lng:number};
  paidAmount: number;
  totalAmount: number;
  debtAmount: number;
  deliveryTime?: string;
  acceptedDriver?: {
    _id: string;
    fullName: string;
  };
  acceptedTimeDriver?: string;
  commit: string;
  phone: string;
  approval: string;
  deliveryStatus: string;
  breadsInfo: breadInfo[];
  isClient: boolean;
  isChangePrice: boolean;
  type: string;
  fromStaff: string;
  paymentHistory: Payment[] | [];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface preOrder extends activeOrder {}

export interface breadInfo {
  _id: string;
  title: string;
  amount: number;
  breadPrice: number;
  breadSoldPrice: number;
}

type Payment = {
  _id: string;
  amount: number;
  fromUser: FromUser | null;
  paymentDate: Date | string;
};

type FromUser = {
  _id: string;
  role: string;
  fullName: string;
};

export interface GetActiveResponse {
  orders: activeOrder[];
}

export interface GetPreResponse {
  orders: preOrder[];
}

export interface GetRequest {
  id?: string;
}
export interface ClientQuery {
  client?: string;
}

export interface Clients {
  clients: client[];
}
export interface client {
  _id: string;
  fullName: string;
  hasOrder: boolean;
  phone?: string;
}

export interface AddActiveOrderReq {
  client: string;
  breadsInfo: breadInfo[];
  commit: string;
  address: string;
  phone: string;
}

export interface AddPreOrderReq {
  client: string;
  paidAmount: number;
  breadsInfo: breadInfo[];
  fromStaff: string;
  commit: string;
  deliveryTime: string;
  address: string;
  phone: string;
}

export interface AddActiveOrderRes {
  message: string;
}

export interface DeleteReq {
  id: string;
}
export interface DeleteRes extends AddActiveOrderRes {}

export interface UpdateReq extends AddActiveOrderReq {
  _id:string;
}
export interface UpdateRes extends AddActiveOrderRes {
  order: activeOrder;
}