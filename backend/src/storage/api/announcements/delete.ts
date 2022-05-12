import { CategoriesToAnnouncementsEntity } from "../../entities/categories_to_announcements";
import { TagsToAnnouncementsEntity } from "../../entities/tags_to_announcements";
import { ImagesToAnnouncementsEntity } from "../../entities/images_to_announcements";
import { IDeleteAnnouncementArgs } from "./types";
import { AnnouncementEntity } from "../../entities";

export async function deleteById(args: IDeleteAnnouncementArgs): Promise<void> {
  const {
    id,
  } = args;

  await AnnouncementEntity.Repository
    .createQueryBuilder()
    .delete()
    .from(AnnouncementEntity)
    .where("id = :id", { id })
    .execute();

  await Promise.all([
    CategoriesToAnnouncementsEntity.Repository
    .createQueryBuilder()
    .delete()
    .from(CategoriesToAnnouncementsEntity)
    .where("announcement_id = :id", { id })
    .execute(),

    TagsToAnnouncementsEntity.Repository
    .createQueryBuilder()
    .delete()
    .from(TagsToAnnouncementsEntity)
    .where("announcement_id = :id", { id })
    .execute(),

    ImagesToAnnouncementsEntity.Repository
    .createQueryBuilder()
    .delete()
    .from(ImagesToAnnouncementsEntity)
    .where("announcement_id = :id", { id })
    .execute(),
  ]);

  return;
}
