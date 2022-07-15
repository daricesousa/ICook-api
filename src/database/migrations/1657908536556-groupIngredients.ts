import {MigrationInterface, QueryRunner} from "typeorm";

export class groupIngredients1657908536556 implements MigrationInterface {
    name = 'groupIngredients1657908536556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "groupIngredients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6da9bf0db88136640f339b085ec" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "groupIngredients"`);
    }

}
