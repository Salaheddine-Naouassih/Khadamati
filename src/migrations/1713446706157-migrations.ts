import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1713446706157 implements MigrationInterface {
    name = 'Migrations1713446706157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "city_id" integer NOT NULL, "rating" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "service"`);
    }

}
