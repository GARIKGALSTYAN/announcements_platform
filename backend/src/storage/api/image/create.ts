import { entityToOutType } from "./entityToOutType";
import { ICreateImageArgs, IImage } from "./type";
import { ImageEntity } from "../../entities/image";

export async function create(args: ICreateImageArgs): Promise<IImage> {
  const { url } = args;

  const image = new ImageEntity();
  image.url = url;

  await ImageEntity.Repository.save(image);

  return entityToOutType(image);
}
