
import { AnnouncementEntity } from "../../entities/announcements";
import { CityEntity } from "../../entities/city";
import { RegionEntity } from "../../entities/region";

import { TagsToAnnouncementsEntity } from "../../entities/tags_to_announcements";
import { ImagesToAnnouncementsEntity } from "../../entities/images_to_announcements";
import { CategoriesToAnnouncementsEntity } from "../../entities/categories_to_announcements";

import { Brackets } from "typeorm";
import {
  IAnnouncement,
  IGetManyAnnouncementArgs,
} from "./types";
import { entityToOutType } from "./entityToOutType";

import { CategoryEntity } from "../../entities/category";
import { TagEntity } from "../../entities/tag";
import { ImageEntity } from "../../entities/image";
import console from "console";

export async function getMany(args: IGetManyAnnouncementArgs): Promise<IAnnouncement[]> {
  const {
    ids,
    user_id,
    price_min,
    price_max,
    city_ids,
    region_ids,
    tag_ids,
    category_ids,
    search_query,
  } = args;

  const query = AnnouncementEntity.Repository.createQueryBuilder('ann');

  query.leftJoinAndMapOne(
    'ann.city',
    CityEntity,
    'city',
    'ann.city_id = city.id',
  );

  query.leftJoinAndMapOne(
    'ann.region',
    RegionEntity,
    'region',
    'ann.region_id = region.id',
  );

  query.leftJoin(
    TagsToAnnouncementsEntity,
    't_to_ann',
    't_to_ann.announcement_id = ann.id',
  );

  query.leftJoinAndMapMany(
    'ann.tags',
    TagEntity,
    'tags',
    'tags.id = t_to_ann.tag_id',
  );

  query.leftJoin(
    ImagesToAnnouncementsEntity,
    't_to_img',
    't_to_img.announcement_id = ann.id',
  );

  query.leftJoinAndMapMany(
    'ann.images',
    ImageEntity,
    'images',
    'images.id = t_to_img.image_id',
  );

  query.leftJoin(
    CategoriesToAnnouncementsEntity,
    't_to_ctg',
    't_to_ctg.announcement_id = ann.id',
  );

  query.leftJoinAndMapMany(
    'ann.categories',
    CategoryEntity,
    'categories',
    'categories.id = t_to_ctg.category_id',
  );

  if (price_min !== undefined) {
    query.andWhere('ann.price >= :min', { min: price_min });
  }

  if (price_max !== undefined) {
    query.andWhere('ann.price <= :max', { max: price_max });
  }

  if (search_query !== undefined) {
    query.andWhere(new Brackets(qb => {
      query.orWhere(`ann.description ILIKE '%${search_query}%'`);
      query.orWhere(`city.name ILIKE '%${search_query}%'`);
      query.orWhere(`region.name ILIKE '%${search_query}%'`);
      query.orWhere(`categories.name ILIKE '%${search_query}%'`);
      query.orWhere(`tags.name ILIKE '%${search_query}%'`);
    }));
  }

  if (city_ids !== undefined) {
    query.andWhere('ann.city_id IN (:...city_ids)', { city_ids });
  }

  if (region_ids !== undefined) {
    query.andWhere('ann.region_id IN (:...region_ids)', { region_ids });
  }

  if (tag_ids !== undefined) {
    query.andWhere('tags.id IN (:...tag_ids)', { tag_ids });
  }

  if (category_ids !== undefined) {
    query.andWhere('categories.id IN (:...category_ids)', { category_ids });
  }

  if (ids !== undefined) {
    query.andWhere('ann.id IN (:...ids)', { ids });
  }

  if (user_id !== undefined) {
    query.andWhere('ann.user_id = :user_id', { user_id });
  }

  console.log("console.loh(): ", query.getQueryAndParameters())

  const announcements = await query.getMany();

  return announcements.map(entityToOutType);
}
