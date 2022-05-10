
import { AnnouncementEntity } from "../../entities/announcements";
import { CityEntity } from "../../entities/city";
import { RegionEntity } from "../../entities/region";
import {
  IAnnouncement,
  IGetManyAnnouncementArgs,
} from "./types";
import { entityToOutType } from "./entityToOutType";

export async function getMany(args: IGetManyAnnouncementArgs): Promise<IAnnouncement[]> {
  const {
    user_id,
    cities,
    ids,
    regions,
    tags,
  } = args;

  const query = AnnouncementEntity.Repository.createQueryBuilder('anmnt');

  query.leftJoinAndMapOne(
    'anmnt.city',
    CityEntity,
    'city',
    'anmnt.city_id = city.id',
  );

  query.leftJoinAndMapOne(
    'anmnt.region',
    RegionEntity,
    'region',
    'anmnt.region_id = region.id',
  );

  if (user_id !== undefined) {
    query.andWhere('anmnt.user_id = :user_id', { user_id });
  }

  const announcements = await query.getMany();

  return announcements.map(entityToOutType);
}
