import { entityToOutType } from "./entityToOutType";
import { ICreateCategoryArgs, ICategory } from "./type";
import { CategoryEntity } from "../../entities/category";

export async function create(args: ICreateCategoryArgs): Promise<ICategory> {
  const { name } = args;

  const category = new CategoryEntity();
  category.name = name;

  await CategoryEntity.Repository.save(category);

  return entityToOutType(category);
}
