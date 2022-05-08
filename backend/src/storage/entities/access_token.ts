import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(type => UserEntity, user => user)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @ManyToOne(type => RefreshTokenEntity, refresh_token => refresh_token)
  @JoinColumn({ name: "refresh_token_id" })
  refresh_token!: RefreshTokenEntity;

  @Column({ type: "varchar", length: 124, nullable: false })
  value!: string;

  @Column({ type: "timestamp without time zone", nullable: false })
  expiry_date!: Date;
}
