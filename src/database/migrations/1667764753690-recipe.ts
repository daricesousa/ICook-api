import {MigrationInterface, QueryRunner} from "typeorm";

export class recipe1667764753690 implements MigrationInterface {
    name = 'recipe1667764753690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "picture_ilustration" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "picture_ilustration"`);
    }

}
