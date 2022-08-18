import {MigrationInterface, QueryRunner} from "typeorm";

export class ingredient1660852928145 implements MigrationInterface {
    name = 'ingredient1660852928145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "valid" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "valid"`);
    }

}
