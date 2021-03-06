import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { BaseEntity } from "./base";
import { UserEntity } from "./users";
import { data_source } from "../";


@Entity({ name: "refresh_tokens" })
export class RefreshTokenEntity extends BaseEntity {
  public static get Repository() {
    return data_source.getRepository(this);
  }

  @ManyToOne(type => UserEntity, user => user)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @Column({ type: "varchar", length: 124, nullable: false })
  value!: string;
}
