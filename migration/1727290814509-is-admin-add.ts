import { MigrationInterface, QueryRunner } from "typeorm";

export class IsAdminAdd1727290814509 implements MigrationInterface {
    name = 'IsAdminAdd1727290814509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_admin"`);
    }

}
