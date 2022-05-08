import { entityToOutType } from "./entityToOutType";
import { ICreateCityArgs, ICity } from "./type";
import { CityEntity } from "../../entities/city";

export async function create(args: ICreateCityArgs): Promise<ICity> {
  const { name } = args;

  const city = new CityEntity();
  city.name = name;

  await CityEntity.Repository.save(city);

  return entityToOutType(city);
}
