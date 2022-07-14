import {MigrationInterface, QueryRunner} from "typeorm";

export class users1657797662717 implements MigrationInterface {
    name = 'users1657797662717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "picture"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "picture" character varying`);
    }

}
