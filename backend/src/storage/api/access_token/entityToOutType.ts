import { AccessTokenEntity } from "../../entities/access_token";
import { IAccessToken } from "./types";

export function entityToOutType(entity: AccessTokenEntity): IAccessToken {
  return {
    id: entity.id,
    refresh_token_id: entity.refresh_token.id,
    user_id: entity.user.id,
    value: entity.value,
    expiry_date: entity.expiry_date,
  };
}
