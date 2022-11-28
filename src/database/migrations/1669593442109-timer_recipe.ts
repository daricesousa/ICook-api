import {MigrationInterface, QueryRunner} from "typeorm";

export class timerRecipe1669593442109 implements MigrationInterface {
    name = 'timerRecipe1669593442109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "ingredients" text NOT NULL, "method" text NOT NULL DEFAULT '[]', "difficulty" integer NOT NULL DEFAULT '1', "time_setup" integer NOT NULL DEFAULT '10', "time_cooking" integer NOT NULL DEFAULT '10', "creator" integer NOT NULL, "valid" boolean NOT NULL DEFAULT false, "avaliations" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "picture" character varying NOT NULL, "picture_ilustration" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recipe"`);
    }

}
