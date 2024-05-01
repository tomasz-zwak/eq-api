import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEarthquakesTable1714571718312 implements MigrationInterface {
    name = 'AddEarthquakesTable1714571718312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "external_id" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "geometry" jsonb, "mag" double precision, "place" character varying, "time" TIMESTAMP, "updated" TIMESTAMP, "tz" character varying, "url" character varying, "detail" character varying, "felt" double precision, "cdi" double precision, "mmi" double precision, "alert" character varying, "status" character varying, "tsunami" integer, "sig" double precision, "net" character varying, "code" character varying, "ids" character varying, "sources" character varying, "types" character varying, "nst" double precision, "dmin" double precision, "rms" double precision, "gap" double precision, "mag_type" character varying, "type" character varying, "title" character varying, CONSTRAINT "UQ_4847aeb8b0e54a723c92038d223" UNIQUE ("external_id"), CONSTRAINT "PK_a0e19a3fc6bdeeab552e1ceba90" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "earthquake"`);
    }

}
