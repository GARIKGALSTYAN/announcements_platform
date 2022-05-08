export interface ICity {
  id: number;
  name: string;
}

export interface ICreateCityArgs {
  name: string;
}

export interface IGetManyCityArgs {
  ids: undefined | number[];
  name: undefined | string;
}
