import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEarthquakesImportAuditTable1714572706319 implements MigrationInterface {
    name = 'AddEarthquakesImportAuditTable1714572706319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "earthquake_import_audit" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "info" jsonb NOT NULL, CONSTRAINT "PK_1c6d787985361ebcb44b99efcae" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "earthquake_import_audit"`);
    }

}
