import { AnnouncementEntity } from "../../entities/announcements";
import { IAnnouncement } from "./types";

export function entityToOutType(entity: AnnouncementEntity): IAnnouncement {
  return {
    id: entity.id,
    description: entity.description,
    price: entity.price,
    region: entity.region.name,
    city: entity.city.name,
    // images: entity.
    // tags: entity.
  };
}
