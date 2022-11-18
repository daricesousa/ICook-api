import {MigrationInterface, QueryRunner} from "typeorm";

export class recipe1668773936526 implements MigrationInterface {
    name = 'recipe1668773936526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "time_setup" character varying NOT NULL DEFAULT '11-30 min'`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "time_cooking" character varying NOT NULL DEFAULT '11-30 min'`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "difficulty" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "difficulty" SET DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "time_cooking"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "time_setup"`);
    }

}
