
import { UserEntity } from "../../entities/users";
import { AccessTokenEntity } from "../../entities/access_token";
import { RefreshTokenEntity } from "../../entities/refresh_token";
import {
  IAccessToken,
  ICreateAccessTokenArgs,
} from "./types";
import { entityToOutType } from "./entityToOutType";
import { generateRandomToken } from "../../../utils";


export async function create(args: ICreateAccessTokenArgs): Promise<IAccessToken> {
  const {
    refresh_token_id,
    user_id,
    expiry_date,
  } = args;

  const ref_token = await RefreshTokenEntity.Repository.findOne({
    where: {
      id: refresh_token_id,
    }
  });

  if (ref_token === null) {
    throw new Error("Refresh token nor exists");
  }

  const user = await UserEntity.Repository.findOne({
    where: {
      id: user_id,
    }
  });

  if (user === null) {
    throw new Error("Can't find user");
  }

  const token = await generateRandomToken();

  const access_token = new AccessTokenEntity();
  access_token.user = user;
  access_token.refresh_token = ref_token;
  access_token.value = token;
  access_token.expiry_date = expiry_date;

  await AccessTokenEntity.Repository.save(access_token);

  return entityToOutType(access_token);
}
