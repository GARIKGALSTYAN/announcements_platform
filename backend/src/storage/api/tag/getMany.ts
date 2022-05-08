import { FindOptionsWhere, In } from "typeorm";
import { IGetManyTagArgs, ITag } from "./type";
import { entityToOutType } from "./entityToOutType";
import { TagEntity } from "../../entities/tag";

export async function getMany(args: IGetManyTagArgs): Promise<ITag[]> {
  const {
    ids,
    name,
  } = args;

  const options: FindOptionsWhere<TagEntity> = {
  };

  if (ids !== undefined) {
    options.id = In(ids);
  }

  if (name !== undefined) {
    options.name = name;
  }

  const tags = await TagEntity.Repository.find({
    where: options,
  });

  return tags.map(entityToOutType);
}
