import { UserRole } from "../../../shared";


export interface IAccessToken {
  id: number;
  user_id: number;
  refresh_token_id: number;
  value: string;
  expiry_date: Date;
}

export interface ICreateAccessTokenArgs {
  user_id: number;
  refresh_token_id: number;
  expiry_date: Date;
}

export interface IGetManyAccessTokenArgs {
  user_id: undefined | number;
  token: undefined | string
}
