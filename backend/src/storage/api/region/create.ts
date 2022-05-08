import { entityToOutType } from "./entityToOutType";
import { ICreateRegionArgs, IRegion } from "./type";
import { RegionEntity } from "../../entities/region";

export async function create(args: ICreateRegionArgs): Promise<IRegion> {
  const { name } = args;

  const region = new RegionEntity();
  region.name = name;

  await RegionEntity.Repository.save(region);

  return entityToOutType(region);
}
