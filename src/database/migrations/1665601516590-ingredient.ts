import {MigrationInterface, QueryRunner} from "typeorm";

export class ingredient1665601516590 implements MigrationInterface {
    name = 'ingredient1665601516590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "groupa" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "groupa"`);
    }

}
