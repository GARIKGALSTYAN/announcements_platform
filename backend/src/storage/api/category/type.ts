export interface ICategory {
  id: number;
  name: string;
}

export interface ICreateCategoryArgs {
  name: string;
}

export interface IGetManyCategoryArgs {
  ids: undefined | number[];
  name: undefined | string;
}
