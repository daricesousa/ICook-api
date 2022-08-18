import {MigrationInterface, QueryRunner} from "typeorm";

export class recipe1660846167861 implements MigrationInterface {
    name = 'recipe1660846167861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "ingredients" text NOT NULL, "method" character varying NOT NULL, "picture" character varying NOT NULL, "difficulty" character varying NOT NULL DEFAULT 'médio', "creator" integer NOT NULL, "avaliations" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recipe"`);
    }

}
