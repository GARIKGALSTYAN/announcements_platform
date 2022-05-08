import { RegionEntity } from "../../entities/region";
import { IRegion } from "./type";

export function entityToOutType(entity: RegionEntity): IRegion {
  return {
    id: entity.id,
    name: entity.name,
  };
}
