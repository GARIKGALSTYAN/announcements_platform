import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "./base";
import { UserEntity } from "./users";
import { RegionEntity } from "./region";
import { CityEntity } from "./city";
import { data_source } from "../";


@Entity({ name: "announcements" })
export class AnnouncementEntity extends BaseEntity {
  public static get Repository() {
    return data_source.getRepository(this);
  }

  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @Column({ type: "text", nullable: false })
  description!: string;

  @Column({ type: "double precision", nullable: false })
  price!: string;

  @JoinColumn({ name: "region_id" })
  region!: RegionEntity;

  @JoinColumn({ name: "city_id" })
  city!: CityEntity;
}
