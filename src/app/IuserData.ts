import { usersType } from './usersType';

export interface Iuser {
  id: string;
  name: string;
  email: string;
  password: string;

  authLevel: usersType;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;

  authLevel: usersType;
}
