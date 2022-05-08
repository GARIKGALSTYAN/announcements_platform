import { entityToOutType } from "./entityToOutType";
import { ICreateTagArgs, ITag } from "./type";
import { TagEntity } from "../../entities/tag";

export async function create(args: ICreateTagArgs): Promise<ITag> {
  const { name } = args;

  const tag = new TagEntity();
  tag.name = name;

  await TagEntity.Repository.save(tag);

  return entityToOutType(tag);
}
