export interface MessageResponse {
  user: {
    _id: string;
    fullName: string;
    username: string;
    avatar: string;
  };
  lastMessage: {
    content: string;
    sender: string;
    createdAt: Date;
  };
  unreadCount: number;
  lastMessageAt: Date;
}

export interface ChatResponse {
  user: {
    _id: string;
    fullName: string;
    username: string;
  },
  messages:{
    _id:string;
    sender:string;
    receiver:string;
    content:string;
    isRead:boolean;
    createdAt:Date
  }[],
  lastMessage: Date
}

export interface MessageRequest {
  receiverId  : string;
  content: string;
}

export interface AddMessageRes {
  success: Boolean;
  message: string;
}

export type GetOneUserRequest = string | undefined;

export interface AllUsersRequest {
  roles: Role[];
}

export interface MeResponse {
  _id?: string;
  fullName?: string;
  username?: string;
  role?: Role;
  avatar?: string;
}

export interface readMessages {
  receiverId: string;
  messageId: string
}
