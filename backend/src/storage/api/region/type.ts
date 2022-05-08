export interface IRegion {
  id: number;
  name: string;
}

export interface ICreateRegionArgs {
  name: string;
}

export interface IGetManyRegionArgs {
  ids: undefined | number[];
  name: undefined | string;
}
