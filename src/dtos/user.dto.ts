export interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
  avatarUrl: string;
  bio: string;
  isVerified: boolean;
  roles: string[];
  createAt: string;
  updateAt: string;
}
