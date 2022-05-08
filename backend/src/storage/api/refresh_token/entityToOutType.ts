import { RefreshTokenEntity } from "../../entities/refresh_token";
import { IRefreshToken } from "./types";

export function entityToOutType(entity: RefreshTokenEntity): IRefreshToken {
  return {
    id: entity.id,
    user_id: entity.user.id,
    value: entity.value,
  };
}
