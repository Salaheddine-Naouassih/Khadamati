import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1713706903425 implements MigrationInterface {
    name = 'Migrations1713706903425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "rating" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buisness_user" ("id" SERIAL NOT NULL, "contactNumber" character varying NOT NULL, "address" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_09d280bb2ff550e4e67587faa5" UNIQUE ("userId"), CONSTRAINT "PK_46abd4993a227382894408b1903" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service" ("buisnessUserId" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "city_id" integer NOT NULL, "rating" integer NOT NULL DEFAULT '0', "buisnessId" integer, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "buisness_user" ADD CONSTRAINT "FK_09d280bb2ff550e4e67587faa5c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_dad490e12cf80187791700e1e72" FOREIGN KEY ("buisnessId") REFERENCES "buisness_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_dad490e12cf80187791700e1e72"`);
        await queryRunner.query(`ALTER TABLE "buisness_user" DROP CONSTRAINT "FK_09d280bb2ff550e4e67587faa5c"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "buisness_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
