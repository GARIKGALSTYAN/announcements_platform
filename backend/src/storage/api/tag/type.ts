export interface ITag {
  id: number;
  name: string;
}

export interface ICreateTagArgs {
  name: string;
}

export interface IGetManyTagArgs {
  ids: undefined | number[];
  name: undefined | string;
}
