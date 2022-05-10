declare module "common" {
  export interface IAnnouncement {
    id: number;
    description: string;
    price: number;
    region: string;
    city: string;
    // images: IImage[];
    // tags: ITag[];
    // categories: ICategories[];
  }

  export interface LoginResponse {
    refresh_token: string;
    access_token: string;
    access_token_expiry_date: string
  }

  export interface LoginRequest {
    email: string;
    password: string;
  }

  export interface CreateCityRequest {
    name: string;
  }

  export interface CreateRegionRequest {
    name: string;
  }

  export interface CreateCategoryRequest {
    name: string;
  }

  export interface CreateTagRequest {
    name: string;
  }

  export interface ICity {
    id: number;
    name: string;
  }

  export interface IRegion {
    id: number;
    name: string;
  }

  export interface ICategory {
    id: number;
    name: string;
  }

  export interface ITag {
    id: number;
    name: string;
  }
}
