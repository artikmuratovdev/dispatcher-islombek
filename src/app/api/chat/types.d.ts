export interface MessageResponse {
    _id?: string;
    from?: string;
    to?: string;
    content?: string;
    createdAt?: string;
  }
  
  export interface MessageRequest {
    to: string;
    content: string;
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