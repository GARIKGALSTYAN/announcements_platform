import { UserEntity } from "../../entities/users";
import { IStorageLoginArgs, IStorageUser } from "./types";
import { entityToOutType } from "./entityToOutType";


export async function userLogin(args: IStorageLoginArgs): Promise<null | IStorageUser> {
  const users = await UserEntity.Repository.find({
    where: {
      email: args.email,
      password: args.password,
    }
  });

  if (users[0] === undefined) {
    throw new Error("no user");
  }

  const user = entityToOutType(users[0])

  return user || null;
}
