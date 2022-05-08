import { FindOptionsWhere, In } from "typeorm";
import { IGetManyRegionArgs, IRegion } from "./type";
import { entityToOutType } from "./entityToOutType";
import { RegionEntity } from "../../entities/region";


export async function getMany(args: IGetManyRegionArgs): Promise<IRegion[]> {
  const {
    ids,
    name,
  } = args;

  const options: FindOptionsWhere<RegionEntity> = {
  };

  if (ids !== undefined) {
    options.id = In(ids);
  }

  if (name !== undefined) {
    options.name = name;
  }

  const regions = await RegionEntity.Repository.find({
    where: options,
  });

  return regions.map(entityToOutType);
}
