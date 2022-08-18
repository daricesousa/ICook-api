import {MigrationInterface, QueryRunner} from "typeorm";

export class recipe1660852873846 implements MigrationInterface {
    name = 'recipe1660852873846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "valid" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "valid"`);
    }

}
