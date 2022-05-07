import { UserEntity } from "../../entities/users";
import { IStorageUser } from "./types";

export function entityToOutType(entity: UserEntity): IStorageUser {
  return {
    id: entity.id,
    name: entity.name,
    last_name: entity.last_name,
    phone_number: entity.phone_number,
    email: entity.email,
    is_verified: entity.is_verified,
    role: entity.role,
  };
}
