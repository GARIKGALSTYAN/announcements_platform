export interface IRefreshToken {
  id: number;
  user_id: number;
  value: string;
}

export interface ICreateRefreshTokenArgs {
  user_id: number;
}

export interface IGetManyRefreshTokenArgs {
  id: undefined | number,
  user_id: undefined | number,
  token: undefined | string
}
