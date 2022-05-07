import {
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "./base";
import { ImageEntity } from "./image";
import { AnnouncementEntity } from "./announcements";
import { data_source } from "../";


@Entity({ name: "images_to_announcements" })
export class ImagesToAnnouncementsEntity extends BaseEntity {
  public static get Repository() {
    return data_source.getRepository(this);
  }

  @ManyToOne(() => ImageEntity)
  @JoinColumn({ name: 'image_id' })
  image!: ImageEntity;

  @ManyToOne(() => AnnouncementEntity)
  @JoinColumn({ name: 'announcement_id' })
  announcement!: AnnouncementEntity;
}
