
import { UserEntity } from "../../entities/users";
import {
  IStorageUser,
  IStorageCreateUserArgs,
} from "./types";
import { entityToOutType } from "./entityToOutType";

export async function create(args: IStorageCreateUserArgs): Promise<IStorageUser> {
  const {
    email,
    is_verified,
    last_name,
    name,
    password,
    phone_number,
    role,
  } = args;

  const user = new UserEntity();
  user.name = name;
  user.last_name = last_name;
  user.phone_number = phone_number;
  user.email = email;
  user.password = password;
  user.is_verified = is_verified;
  user.role = role;

  await UserEntity.Repository.save(user);

  return entityToOutType(user);
}
