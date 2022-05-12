import {
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "./base";
import { TagEntity } from "./tag";
import { AnnouncementEntity } from "./announcements";
import { data_source } from "../";


@Entity({ name: "tags_to_announcements" })
export class TagsToAnnouncementsEntity extends BaseEntity {
  public static get Repository() {
    return data_source.getRepository(this);
  }

  @ManyToOne(() => TagEntity)
  @JoinColumn({ name: 'tag_id' })
  tag!: TagEntity;

  @ManyToOne(() => AnnouncementEntity)
  @JoinColumn({ name: 'announcement_id' })
  announcement!: AnnouncementEntity;
}
