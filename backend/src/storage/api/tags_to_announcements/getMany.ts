import { IGetManyTagsToAnnouncementsArgs } from "./type";
import { entityToOutType } from "../tag/entityToOutType";
import { TagEntity } from "../../entities/tag";
import { TagsToAnnouncementsEntity } from "../../entities/tags_to_announcements";
import { ITag } from "../tag/type";

export async function getMany(args: IGetManyTagsToAnnouncementsArgs): Promise<ITag[]> {
  const {
    announcement_id,
  } = args;

  const query = TagEntity.Repository.createQueryBuilder("tag")
    .leftJoin(
      TagsToAnnouncementsEntity,
      't_to_ann',
      't_to_ann.tag_id = tag.id',
    );

  query.andWhere(`t_to_ann.announcement_id = :ann_id`, { ann_id: announcement_id });

  const tags = await query.getMany()

  return tags.map(entityToOutType);
}
