import { ImageEntity } from "../../entities/image";
import { IImage } from "./type";

export function entityToOutType(entity: ImageEntity): IImage {
  return {
    id: entity.id,
    url: entity.url,
  };
}
