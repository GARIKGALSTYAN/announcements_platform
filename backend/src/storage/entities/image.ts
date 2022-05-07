import {
  Entity,
  Column,
} from "typeorm";
import { BaseEntity } from "./base";
import { data_source } from "../";


@Entity({ name: "images" })
export class ImageEntity extends BaseEntity {
  public static get Repository() {
    return data_source.getRepository(this);
  }

  @Column({ type: "varchar", length: 256, nullable: false })
  url!: string;
}
