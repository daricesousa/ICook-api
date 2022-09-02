import {MigrationInterface, QueryRunner} from "typeorm";

export class recipe1662082468592 implements MigrationInterface {
    name = 'recipe1662082468592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "method"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "method" text NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "method"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "method" character varying NOT NULL`);
    }

}
