import { MigrationInterface, QueryRunner } from "typeorm";

export class LableTest1692377393743 implements MigrationInterface {
    name = 'LableTest1692377393743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entities" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_8640855ae82083455cbb806173d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lables" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_6c352769b19bb8c67c1ba5efdfe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lables_entities_entities" ("lablesId" integer NOT NULL, "entitiesId" integer NOT NULL, CONSTRAINT "PK_e76573c969c7243a8b70324ea7c" PRIMARY KEY ("lablesId", "entitiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2e17b30a5df90e540e47449eaa" ON "lables_entities_entities" ("lablesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_29ded47acaaf9fafb0b9d40a02" ON "lables_entities_entities" ("entitiesId") `);
        await queryRunner.query(`ALTER TABLE "lables_entities_entities" ADD CONSTRAINT "FK_2e17b30a5df90e540e47449eaaf" FOREIGN KEY ("lablesId") REFERENCES "lables"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lables_entities_entities" ADD CONSTRAINT "FK_29ded47acaaf9fafb0b9d40a02c" FOREIGN KEY ("entitiesId") REFERENCES "entities"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`INSERT INTO "entities" ("type") VALUES ('Company'), ('Site'), ('User')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lables_entities_entities" DROP CONSTRAINT "FK_29ded47acaaf9fafb0b9d40a02c"`);
        await queryRunner.query(`ALTER TABLE "lables_entities_entities" DROP CONSTRAINT "FK_2e17b30a5df90e540e47449eaaf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29ded47acaaf9fafb0b9d40a02"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2e17b30a5df90e540e47449eaa"`);
        await queryRunner.query(`DROP TABLE "lables_entities_entities"`);
        await queryRunner.query(`DROP TABLE "lables"`);
        await queryRunner.query(`DROP TABLE "entities"`);
    }

}
