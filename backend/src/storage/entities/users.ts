import {
  Entity,
  Column,
} from "typeorm";
import { BaseEntity } from "./base";
import { UserRole } from "../../shared";
import { data_source } from "../";


@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  public static get Repository() {
    return data_source.getRepository(this);
  }

  @Column({ type: "varchar", length: 64, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  last_name!: string;

  @Column({ type: "varchar", length: 32, nullable: true })
  phone_number!: null | string;

  @Column({ type: "varchar", length: 124, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  password!: string;

  @Column({ type: "boolean", nullable: false })
  is_verified!: boolean;

  @Column({ type: "varchar", length: 32, nullable: false })
  role!: UserRole
}
