export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserData {
  name: string;
  email: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
}

export type CreateUserResponse = User;

export type UpdateUserResponse = User;

export interface DeleteUserResponse {
  message: string;
  user: User;
}
