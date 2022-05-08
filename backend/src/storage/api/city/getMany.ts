import { FindOptionsWhere, In } from "typeorm";
import { IGetManyCityArgs, ICity } from "./type";
import { entityToOutType } from "./entityToOutType";
import { CityEntity } from "../../entities/city";


export async function getMany(args: IGetManyCityArgs): Promise<ICity[]> {
  const {
    ids,
    name,
  } = args;

  const options: FindOptionsWhere<CityEntity> = {
  };

  if (ids !== undefined) {
    options.id = In(ids);
  }

  if (name !== undefined) {
    options.name = name;
  }

  const cities = await CityEntity.Repository.find({
    where: options,
  });

  return cities.map(entityToOutType);
}
