import { CategoryEntity } from "../../entities/category";
import { ICategory } from "./type";

export function entityToOutType(entity: CategoryEntity): ICategory {
  return {
    id: entity.id,
    name: entity.name,
  };
}
