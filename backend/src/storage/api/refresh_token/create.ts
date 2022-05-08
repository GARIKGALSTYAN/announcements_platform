
import { UserEntity } from "../../entities/users";
import { RefreshTokenEntity } from "../../entities/refresh_token";
import {
  ICreateRefreshTokenArgs,
  IRefreshToken,
} from "./types";
import { entityToOutType } from "./entityToOutType";
import { generateRandomToken } from "../../../shared/utils";


export async function create(args: ICreateRefreshTokenArgs): Promise<IRefreshToken> {
  const {
    user_id,
  } = args;

  console.log('stoage cre ref tok args: ', args)

  const user = await UserEntity.Repository.findOne({
    where: {
      id: user_id,
    }
  });

  if (user === null) {
    throw new Error("Can't find user");
  }

  console.log('stoage cre ref tok usr: ', user)

  const token = await generateRandomToken();

  console.log('stoage cre ref tok vsl: ', token)

  const refresh_token = new RefreshTokenEntity();
  refresh_token.user = user;
  refresh_token.value = token;

  console.log('stoage cre  bf save: ', JSON.stringify(refresh_token, null, 2))

  await RefreshTokenEntity.Repository.save(refresh_token);

  console.log('stoage cre AAF save: ', JSON.stringify(refresh_token, null, 2))

  return entityToOutType(refresh_token);
}
