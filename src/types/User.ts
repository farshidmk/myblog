type LoggedInUser = {
  id: number;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: UserRole;
};

export type LoginResponse = {
  access_token: string;
  user: LoggedInUser;
};

export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Writer = "WRITER",
}
