import { FindOptionsWhere, In } from "typeorm";
import { IGetManyCategoryArgs, ICategory } from "./type";
import { entityToOutType } from "./entityToOutType";
import { CategoryEntity } from "../../entities/category";

export async function getMany(args: IGetManyCategoryArgs): Promise<ICategory[]> {
  const {
    ids,
    name,
  } = args;

  const options: FindOptionsWhere<CategoryEntity> = {
  };

  if (ids !== undefined) {
    options.id = In(ids);
  }

  if (name !== undefined) {
    options.name = name;
  }

  const categories = await CategoryEntity.Repository.find({
    where: options,
  });

  return categories.map(entityToOutType);
}
