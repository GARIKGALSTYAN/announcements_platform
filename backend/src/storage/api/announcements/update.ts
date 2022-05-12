import { In } from "typeorm";
import { CityEntity } from "../../entities/city";
import { CategoryEntity } from "../../entities/category";
import { TagEntity } from "../../entities/tag";
import { CategoriesToAnnouncementsEntity } from "../../entities/categories_to_announcements";
import { TagsToAnnouncementsEntity } from "../../entities/tags_to_announcements";
import { ImagesToAnnouncementsEntity } from "../../entities/images_to_announcements";
import { getMany } from "./getMany";
import {
  IAnnouncement,
  IUpdateAnnouncementArgs,
} from "./types";
import { AnnouncementEntity } from "../../entities";


export async function update(args: IUpdateAnnouncementArgs): Promise<IAnnouncement> {
  const {
    id,

    description,
    price,

    region,
    city,
    categories,
    tags,
    images,
  } = args;

  const announcement = await AnnouncementEntity.Repository.findOne({
    where: {
      id,
    }
  });

  if (announcement === null) {
    throw new Error("Announcement not found")
  }

  if (description) {
    announcement.description = description;
  }

  if (price) {
    announcement.price = price;
  }

  if (city !== undefined) {
    const city_entity = await CityEntity.Repository.findOne({
      where: {
        id: city,
      }
    });
    if (city_entity === null) {
      throw new Error("City not found");
    }

    announcement.city = city_entity;
  }

  if (region !== undefined) {
    const region_entity = await CityEntity.Repository.findOne({
      where: {
        id: region,
      }
    });
    if (region_entity === null) {
      throw new Error("Region not found");
    }

    announcement.region = region_entity;
  }

  await AnnouncementEntity.Repository.save(announcement);

  if (categories !== undefined) {
    const update_categories = await CategoryEntity.Repository.find({
      where: {
        id: In(categories),
      }
    });

    await CategoriesToAnnouncementsEntity.Repository
    .createQueryBuilder()
    .delete()
    .from(CategoriesToAnnouncementsEntity)
    .where("announcement_id = :id", { id })
    .execute();

    await CategoriesToAnnouncementsEntity.Repository
      .createQueryBuilder()
      .insert()
      .into(CategoriesToAnnouncementsEntity)
      .values(update_categories.map((c) => ({
        created_at: new Date(),
        updated_at: new Date(),
        category: c,
        announcement: announcement,
      })))
      .execute();

  }

  if (tags !== undefined) {
    const update_tags = await TagEntity.Repository.find({
      where: {
        id: In(tags),
      }
    });

    await TagsToAnnouncementsEntity.Repository
      .createQueryBuilder()
      .delete()
      .from(TagsToAnnouncementsEntity)
      .where("announcement_id = :id", { id })
      .execute();

    await TagsToAnnouncementsEntity.Repository
      .createQueryBuilder()
      .insert()
      .into(TagsToAnnouncementsEntity)
      .values(update_tags.map((t) => ({
        created_at: new Date(),
        updated_at: new Date(),
        tag: t,
        announcement: announcement,
      })))
      .execute();
  }

  if (images !== undefined) {
    const update_images = await TagEntity.Repository.find({
      where: {
        id: In(images),
      }
    });

    await ImagesToAnnouncementsEntity.Repository
      .createQueryBuilder()
      .delete()
      .from(ImagesToAnnouncementsEntity)
      .where("announcement_id = :id", { id })
      .execute();

    await ImagesToAnnouncementsEntity.Repository
      .createQueryBuilder()
      .insert()
      .into(ImagesToAnnouncementsEntity)
      .values(update_images.map((i) => ({
        created_at: new Date(),
        updated_at: new Date(),
        image: i,
        announcement: announcement,
      })))
      .execute();
  }


  // using getMany to correctly recalculate mapped props
  const ann = await getMany({
    ids: [announcement.id],
    user_id: undefined,
    price_min: undefined,
    price_max: undefined,
    city_ids: undefined,
    region_ids: undefined,
    tag_ids: undefined,
    category_ids: undefined,
    search_query: undefined,
  })

  return ann[0];
}
