
import { UserEntity } from "../../entities/users";
import { RefreshTokenEntity } from "../../entities/refresh_token";
import {
  IGetManyRefreshTokenArgs,
  IRefreshToken,
} from "./types";
import { entityToOutType } from "./entityToOutType";


export async function getMany(args: IGetManyRefreshTokenArgs): Promise<IRefreshToken[]> {
  const {
    user_id,
    id,
    token,
  } = args;

  const query = RefreshTokenEntity.Repository.createQueryBuilder('ref_token');

  query.leftJoinAndMapOne(
    "ref_token.user",
    UserEntity,
    'user',
    'ref_token.user_id = user.id',
  );

  if (user_id !== undefined) {
    query.andWhere("user.id = :user_id", { user_id });
  }

  if (id !== undefined) {
    query.andWhere("ref_token.id = :ref_token_id", { ref_token_id: id });
  }

  if (token !== undefined) {
    query.andWhere("ref_token.value = :token", { token });
  }

  const tokens = await query.getMany();

  return tokens.map(entityToOutType);
}
