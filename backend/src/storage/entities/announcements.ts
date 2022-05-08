import {
  Entity,
  Column,
  ManyToOne,
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

  @ManyToOne(type => UserEntity, user => user)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @Column({ type: "text", nullable: false })
  description!: string;

  @Column({ type: "double precision", nullable: false })
  price!: number;

  @ManyToOne(type => RegionEntity, user => user)
  @JoinColumn({ name: "region_id" })
  region!: RegionEntity;

  @ManyToOne(type => CityEntity, user => user)
  @JoinColumn({ name: "city_id" })
  city!: CityEntity;
}
