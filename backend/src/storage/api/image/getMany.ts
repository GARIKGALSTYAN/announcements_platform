import { FindOptionsWhere, In } from "typeorm";
import { IGetManyImageArgs, IImage } from "./type";
import { entityToOutType } from "./entityToOutType";
import { ImageEntity } from "../../entities/image";

export async function getMany(args: IGetManyImageArgs): Promise<IImage[]> {
  const {
    ids,
  } = args;

  const options: FindOptionsWhere<ImageEntity> = {
  };

  if (ids !== undefined) {
    options.id = In(ids);
  }

  const images = await ImageEntity.Repository.find({
    where: options,
  });

  return images.map(entityToOutType);
}
