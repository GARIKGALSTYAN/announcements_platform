import { CityEntity } from "../../entities/city";
import { TagEntity } from "../../entities/tag";
import { RegionEntity } from "../../entities/region";
import { CategoryEntity } from "../../entities/category";
import { ImageEntity } from "../../entities/image";

import { IImage } from "../image";
import { ITag } from "../tag";
import { ICategory } from "../category";

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

  price_min: undefined | number;
  price_max: undefined | number;

  city_ids: undefined | number[];
  region_ids: undefined | number[];
  tag_ids: undefined | number[];
  category_ids: undefined | number[];

  search_query: undefined | string;
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
