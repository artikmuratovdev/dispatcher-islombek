export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

export interface UpdateAvatarRequest {
  avatar: string;
}

export interface UpdateAvatarResponse {
  _id: string;
  role: string;
  status: number;
  branch: string;
  fullName: string;
  avatar: string;
  username: sardor;
  supplierProducts: {
    [supplierId: string]: number;
  };
  sessions: [
    {
      _id: string;
      userAgent: string;
      ip: string;
      approved: boolean;
      createdAt: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
  balance: number;
  breadPrices: [];
  salaryBalance: number;
}

export interface StaffProfileReceivedMoneyResponse {
  _id: string;
  amount: number;
  fromUser: {
    _id: string;
    role: string;
    fullName: string;
  };
  toUser: string;
  expenseId: string;
  totalAmount: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  branch: string;
}

export interface StaffProfileCalculatedMoneyResponse {
  _id: string;
  branch: string;
  amount: number;
  toUser: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}