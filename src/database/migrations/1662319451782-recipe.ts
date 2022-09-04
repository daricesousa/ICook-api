import {MigrationInterface, QueryRunner} from "typeorm";

export class recipe1662319451782 implements MigrationInterface {
    name = 'recipe1662319451782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "difficulty"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "difficulty" integer NOT NULL DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "difficulty"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "difficulty" character varying NOT NULL DEFAULT 'médio'`);
    }

}
