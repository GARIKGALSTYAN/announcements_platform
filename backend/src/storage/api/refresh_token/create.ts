
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

  const user = await UserEntity.Repository.findOne({
    where: {
      id: user_id,
    }
  });

  if (user === null) {
    throw new Error("Can't find user");
  }

  const token = await generateRandomToken();

  const refresh_token = new RefreshTokenEntity();
  refresh_token.user = user;
  refresh_token.value = token;

  await RefreshTokenEntity.Repository.save(refresh_token);

  return entityToOutType(refresh_token);
}
