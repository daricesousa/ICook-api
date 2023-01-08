import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationname1664467273134 implements MigrationInterface {
    name = 'migrationname1664467273134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "group" integer NOT NULL, "associates" character varying NOT NULL, "valid" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groupIngredients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6da9bf0db88136640f339b085ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hashs" ("id" character varying NOT NULL, "email" character varying NOT NULL, "hash" character varying NOT NULL, "valid" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1f21b655ec0f9cd59d30688fef0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "ingredients" text NOT NULL, "method" text NOT NULL DEFAULT '[]', "difficulty" integer NOT NULL DEFAULT '2', "creator" integer NOT NULL, "valid" boolean NOT NULL DEFAULT false, "avaliations" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "picture" character varying NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "rule" character varying NOT NULL DEFAULT 'user', "valid_sign" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "hashs"`);
        await queryRunner.query(`DROP TABLE "groupIngredients"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
    }

}
