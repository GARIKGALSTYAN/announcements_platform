import {
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "./base";
import { CategoryEntity } from "./category";
import { AnnouncementEntity } from "./announcements";
import { data_source } from "../";


@Entity({ name: "categories_to_announcements" })
export class CategoriesToAnnouncementsEntity extends BaseEntity {
  public static get Repository() {
    return data_source.getRepository(this);
  }

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @ManyToOne(() => AnnouncementEntity)
  @JoinColumn({ name: 'announcement_id' })
  announcement!: AnnouncementEntity;
}
