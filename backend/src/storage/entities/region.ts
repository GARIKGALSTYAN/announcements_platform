import {
  Entity,
  Column,
} from "typeorm";
import { BaseEntity } from "./base";
import { data_source } from "../";


@Entity({ name: "regions" })
export class RegionEntity extends BaseEntity {
  public static get Repository() {
    return data_source.getRepository(this);
  }

  @Column({ type: "varchar", length: 36, nullable: false })
  name!: string;
}
