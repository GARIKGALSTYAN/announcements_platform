
import { UserEntity } from "../../entities/users";
import { CityEntity } from "../../entities/city";
import { RegionEntity } from "../../entities/region";
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

  return entityToOutType(announcement);
}
