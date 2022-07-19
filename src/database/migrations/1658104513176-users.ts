import {MigrationInterface, QueryRunner} from "typeorm";

export class users1658104513176 implements MigrationInterface {
    name = 'users1658104513176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groupIngredients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6da9bf0db88136640f339b085ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hashs" ("id" character varying NOT NULL, "email" character varying NOT NULL, "hash" character varying NOT NULL, "valid" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1f21b655ec0f9cd59d30688fef0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "rule" character varying NOT NULL DEFAULT 'user', "valid_sign" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "hashs"`);
        await queryRunner.query(`DROP TABLE "groupIngredients"`);
    }

}
