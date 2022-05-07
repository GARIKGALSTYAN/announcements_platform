import {
  Entity,
  Column,
} from "typeorm";
import { BaseEntity } from "./base";
import { data_source } from "../";


@Entity({ name: "tags" })
export class TagEntity extends BaseEntity {
  public static get Repository() {
    return data_source.getRepository(this);
  }

  @Column({ type: "varchar", length: 36, nullable: false })
  name!: string;
}
