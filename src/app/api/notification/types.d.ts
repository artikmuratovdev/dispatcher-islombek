export interface Notification {
  _id: string;
  title: string;
  branch: string;
  body: string;
  from: string;
  toUser: string;
  createdAt: Date;
  updatedAt: Date;
}