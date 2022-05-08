import { TagEntity } from "../../entities/tag";
import { ITag } from "./type";

export function entityToOutType(entity: TagEntity): ITag {
  return {
    id: entity.id,
    name: entity.name,
  };
}
