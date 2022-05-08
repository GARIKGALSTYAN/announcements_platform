import { MigrationInterface, QueryRunner } from "typeorm"

export class InitialTablesCreate_1651874067707 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                name varchar(64) not null,
                last_name varchar(64) not null,
                phone_number varchar(32),
                email varchar(124) not null,
                password varchar(64) not null,
                is_verified boolean not null,
                role varchar(32) not null
            );

            CREATE TABLE IF NOT EXISTS access_tokens (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                user_id integer not null,
                refresh_token_id integer not null,
                value varchar(124) not null,
                expiry_date timestamp with time zone not null
            );

            CREATE TABLE IF NOT EXISTS announcements (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                user_id integer not null,
                description text not null,
                price double precision not null,
                region_id integer not null,
                city_id integer not null
            );

            CREATE TABLE IF NOT EXISTS categories_to_announcements (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                category_id integer not null,
                announcement_id integer not null
            );

            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                name varchar(36) not null
            );

            CREATE TABLE IF NOT EXISTS cities (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                name varchar(36) not null
            );

            CREATE TABLE IF NOT EXISTS images (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                url varchar(256) not null
            );

            CREATE TABLE IF NOT EXISTS images_to_announcements (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                image_id integer not null,
                announcement_id integer not null
            );

            CREATE TABLE IF NOT EXISTS refresh_tokens (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                user_id integer not null,
                value varchar(124) not null
            );

            CREATE TABLE IF NOT EXISTS regions (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                name varchar(36) not null
            );

            CREATE TABLE IF NOT EXISTS tags (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                name varchar(36) not null
            );

            CREATE TABLE IF NOT EXISTS tags_to_announcements (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                tag_id integer not null,
                announcement_id integer not null
            );

            `,
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS access_tokens;
            DROP TABLE IF EXISTS announcements;
            DROP TABLE IF EXISTS categories_to_announcements;
            DROP TABLE IF EXISTS categories;
            DROP TABLE IF EXISTS cities;
            DROP TABLE IF EXISTS images;
            DROP TABLE IF EXISTS images_to_announcements;
            DROP TABLE IF EXISTS refresh_tokens;
            DROP TABLE IF EXISTS regions;
            DROP TABLE IF EXISTS tags;
            DROP TABLE IF EXISTS tags_to_announcements;
            `,
        )
    }
}