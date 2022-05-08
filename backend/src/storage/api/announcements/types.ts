import { CityEntity } from "../../entities/city";
import { TagEntity } from "../../entities/tag";
import { RegionEntity } from "../../entities/region";
import { CategoryEntity } from "../../entities/category";
import { ImageEntity } from "../../entities/image";

import { IImage } from "../image";
import { ITag } from "../tag";

export interface IAnnouncement {
  id: number;
  description: string;
  price: number;
  region: string;
  city: string;
  // images: IImage[];
  // tags: ITag[];
}

export interface ICreateAnnouncementArgs {
  user_id: number;
  description: string;
  price: number;
  city_id: number;
  region_id: number;
  images: number[];
  tags: number[];
  categories: number[];
}

export interface IGetManyAnnouncementArgs {
  ids: undefined | number[];
  user_id: undefined | number;
  cities: undefined | number[];
  tags: undefined | number[];
  regions: undefined | number[];
}

export interface IUpdateAnnouncementArgs {
  id: number;
  description: undefined | string;
  price: undefined | number;
  city: undefined | number;
  region: undefined | number;
  images: undefined | number[];
  tags: undefined | number[];
  categories: undefined | number[];
}

export interface IDeleteAnnouncementArgs {
  id: number;
}
