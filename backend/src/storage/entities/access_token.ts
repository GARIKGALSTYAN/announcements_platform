import {
  Entity,
  Column,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "./base";
import { UserEntity } from "./users";
import { RefreshTokenEntity } from "./refresh_token";
import { data_source } from "../";


@Entity({ name: "access_tokens" })
export class AccessTokenEntity extends BaseEntity {
  public static get Repository() {
    return data_source.getRepository(this);
  }

  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @JoinColumn({ name: "refresh_token_id" })
  refresh_token!: RefreshTokenEntity;

  @Column({ type: "varchar", length: 124, nullable: false })
  value!: string;
}
