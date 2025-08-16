export interface Notification {
  _id: string;
  title: string;
  branch: string;
  saleId?:string;
  approval?: string;
  sale_type?:string;
  notification_type?:string;
  body: string;
  from: string;
  toUser: string;
  createdAt: Date;
  updatedAt: Date;
}