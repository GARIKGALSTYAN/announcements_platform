import { AnnouncementEntity } from "../../entities/announcements";
import { IAnnouncement } from "./types";
import { entityToOutType as categoryOutType } from "../category/entityToOutType";
import {  entityToOutType as tagOutType } from "../tag/entityToOutType";
import {  entityToOutType as imageOutType } from "../image/entityToOutType";

export function entityToOutType(entity: AnnouncementEntity): IAnnouncement {
  return {
    id: entity.id,
    description: entity.description,
    price: entity.price,
    region: entity.region.name,
    city: entity.city.name,

    images: entity.images !== undefined ? (entity.images.map(imageOutType)) : [],
    tags: entity.tags !== undefined ? (entity.tags.map(tagOutType)) : [],
    categories: entity.categories !== undefined ? (entity.categories.map(categoryOutType)) : [],
  };
}
