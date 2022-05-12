declare module "common" {
  export interface IAnnouncement {
    id: number;
    description: string;
    price: number;
    region: string;
    city: string;
    images: IImage[];
    tags: ITag[];
    categories: ICategory[];
  }

  interface AnnouncementCreateRequest {
    description: string;
    price: number;
    city: number;
    region: number;
    images: number[];
    tags: number[];
    categories: number[];
  }

  interface AnnouncementGetQueryRequest {
    price_min: undefined | string;
    price_max: undefined | string;

    city_ids: undefined | string[];
    region_ids: undefined | string[];
    tag_ids: undefined | string[];
    category_ids: undefined | string[];

    search_query: undefined | string;
  }

  export interface LoginResponse {
    refresh_token: string;
    access_token: string;
    access_token_expiry_date: string;
    role: string;
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

  export interface UserRegisterRequest {
    email: string,
    last_name: string,
    name: string,
    password: string,
    phone_number: undefined | string,
  }

  export interface IImage {
    id: number;
    url: string;
  }

  export interface CreateImage {
    image_base_64: string;
  }

  export interface RevalidateRequest {
    refresh_token: string;
  }

  export interface RevalidateResult {
    access_token: string;
    access_token_expiry_date: string;
  }

  export interface IUserCreateBody {
    email: string,
    last_name: string,
    name: string,
    password: string,
    phone_number: undefined | string,
  }

  export interface IUserLoginBody {
    email: string,
    password: string,
  }

  export interface IAnnouncementCreateBody {
    description: string;
    price: number;
    city: number;
    region: number;
    images: number[];
    tags: number[];
    categories: number[];
  }

  export interface IAnnouncementUpdateBody {
    description: undefined | string;
    price: undefined | number;
    city: undefined | number;
    region: undefined | number;
    images: undefined | number[];
    tags: undefined | number[];
    categories: undefined | number[];
  }

}
