import { UserRole } from "../../../shared";

export interface IStorageUser {
  id: number,
  name: string;
  last_name: string;
  phone_number: null | string;
  email: string;
  is_verified: boolean;
  role: UserRole;
}

export interface IStorageCreateUserArgs {
  name: string;
  last_name: string;
  phone_number: null | string;
  email: string;
  password: string;
  is_verified: boolean;
  role: UserRole
}
