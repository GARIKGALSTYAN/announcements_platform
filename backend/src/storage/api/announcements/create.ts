
import { UserEntity } from "../../entities/users";
import { CityEntity } from "../../entities/city";
import { RegionEntity } from "../../entities/region";

import { CategoryEntity } from "../../entities/category";
import { TagEntity } from "../../entities/tag";
import { ImageEntity } from "../../entities/image";

import { CategoriesToAnnouncementsEntity } from "../../entities/categories_to_announcements";
import { TagsToAnnouncementsEntity } from "../../entities/tags_to_announcements";
import { ImagesToAnnouncementsEntity } from "../../entities/images_to_announcements";

import { data_source } from "../../";

import {
  IAnnouncement,
  ICreateAnnouncementArgs,
} from "./types";
import { entityToOutType } from "./entityToOutType";
import { AnnouncementEntity } from "../../entities";

export async function create(args: ICreateAnnouncementArgs): Promise<IAnnouncement> {
  const {
    user_id,

    description,
    price,

    region_id,
    city_id,
    categories,
    tags,
    images,
  } = args;

  const user = await UserEntity.Repository.findOne({
    where: {
      id: user_id,
    }
  });
  if (!user) {
    throw new Error("User not found");
  }

  const city = await CityEntity.Repository.findOne({
    where: {
      id: city_id,
    }
  });
  if (!city) {
    throw new Error("City not found");
  }

  const region = await RegionEntity.Repository.findOne({
    where: {
      id: region_id,
    }
  });
  if (!region) {
    throw new Error("Region not found");
  }

  const announcement = new AnnouncementEntity();
  announcement.user = user;
  announcement.description = description;
  announcement.price = price;
  announcement.region = region;
  announcement.city = city;

  await AnnouncementEntity.Repository.save(announcement);

  console.log("le announcement id: ", announcement.id)

  const ann_id = announcement.id;

  console.log({ ann_id });




  /*
    insert into tags_to_announcements
    (created_at, updated_at, tag_id, announcement_id)
    values (now(), now(), 100, 100), (now(), now(), 101, 101);
  */

  // announcement_id
  //tag_id
  //
  //

  const categories_relations = categories.map((c_id) => ({ c_id, ann_id }));
  const tags_relations = tags.map((t_id) => ({ t_id, ann_id }));
  const images_relations = images.map((i_id) => ({ i_id, ann_id }));

  console.log("categories_relations: ", categories_relations);
  console.log("tags_relations: ", tags_relations, );
  console.log("images_relations: ", images_relations);

  const tags_insert_value =
    tags_relations
      .map(({ t_id, ann_id }) => `(now(), now(), ${t_id}, ${ann_id})`)
      .join(", ");

  console.log("tags_insert_value: ", tags_insert_value);

  const images_insert_value =
  images_relations
    .map(({ i_id, ann_id }) => `(now(), now(), ${i_id}, ${ann_id})`)
    .join(", ");

  console.log("images_insert_value: ", images_insert_value);

  const categories_insert_value =
  categories_relations
    .map(({ c_id, ann_id }) => `(now(), now(), ${c_id}, ${ann_id})`)
    .join(", ");

  console.log("categories_insert_value: ", categories_insert_value);

  await data_source.query(`
    INSERT INTO ${TagsToAnnouncementsEntity.Repository.metadata.tableName}
    (created_at, updated_at, tag_id, announcement_id)
    VALUES
    ${tags_insert_value}
  `);

  await data_source.query(`
    INSERT INTO ${CategoriesToAnnouncementsEntity.Repository.metadata.tableName}
    (created_at, updated_at, category_id, announcement_id)
    VALUES
    ${categories_insert_value}
  `);

  await data_source.query(`
    INSERT INTO ${ImagesToAnnouncementsEntity.Repository.metadata.tableName}
    (created_at, updated_at, image_id, announcement_id)
    VALUES
    ${images_insert_value}
  `);

  // CategoriesToAnnouncementsEntity.Repository.createQueryBuilder()
  //   .insert()
  //   .values({
  //     id: 0,
  //   })
  // categories
  // tags
  // images

  // CategoriesToAnnouncementsEntity
  // TagsToAnnouncementsEntity
  // ImagesToAnnouncementsEntity

  // CategoryEntity
  // TagEntity
  // ImageEntity

  return entityToOutType(announcement);
}
