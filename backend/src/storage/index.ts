import { DataSource } from 'typeorm';
import { app_environment_variables } from '../env.config';
import {
  AnnouncementEntity,
  CategoriesToAnnouncementsEntity,
  CategoryEntity,
  CityEntity,
  ImageEntity,
  ImagesToAnnouncementsEntity,
  RegionEntity,
  TagEntity,
  TagsToAnnouncementsEntity,
  UserEntity,
  AccessTokenEntity,
  RefreshTokenEntity,
} from './entities';
import { InitialTablesCreate_1651874067707 } from './migrations';

const { database } = app_environment_variables;

export const data_source: DataSource = new DataSource({
  type: "postgres",
  synchronize: false,

  name: database.connection_name,
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.database_name,

  entities: [
    AnnouncementEntity,
    CategoriesToAnnouncementsEntity,
    CategoryEntity,
    CityEntity,
    ImageEntity,
    ImagesToAnnouncementsEntity,
    RegionEntity,
    TagEntity,
    TagsToAnnouncementsEntity,
    UserEntity,
    AccessTokenEntity,
    RefreshTokenEntity,
  ],
  migrations: [
    InitialTablesCreate_1651874067707,
  ],
  extra: {
    max: database.connection_limit,
  },
});


export async function initStorageConnection() {
  await data_source.initialize();
  await data_source.runMigrations();
}

export * as StorageAPI from "./api";
