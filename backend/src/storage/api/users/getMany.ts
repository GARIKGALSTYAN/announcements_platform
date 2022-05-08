
import { UserEntity } from "../../entities/users";
import {
  IStorageUser,
  IGetManyUserArgs,
} from "./types";
import { entityToOutType } from "./entityToOutType";

export async function getMany(args: IGetManyUserArgs): Promise<IStorageUser[]> {
  const {
    user_id,
  } = args;

  const users = await UserEntity.Repository.find({
    where: {
      id: user_id,
    }
  });

  return users.map(entityToOutType);
}
