import { CityEntity } from "../../entities/city";
import { ICity } from "./type";

export function entityToOutType(entity: CityEntity): ICity {
  return {
    id: entity.id,
    name: entity.name,
  };
}
