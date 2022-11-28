import {MigrationInterface, QueryRunner} from "typeorm";

export class timerRecipe1669591976269 implements MigrationInterface {
    name = 'timerRecipe1669591976269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "time_setup"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "time_setup" integer NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "time_cooking" SET DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "time_cooking" SET DEFAULT '11-30 min'`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "time_setup"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "time_setup" character varying NOT NULL DEFAULT '11-30 min'`);
    }

}
