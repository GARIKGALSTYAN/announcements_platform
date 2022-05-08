export interface IImage {
  id: number,
  url: string;
}

export interface ICreateImageArgs {
  url: string;
}

export interface IGetManyImageArgs {
  ids: undefined | number[];
}
