import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAuthorEntity1757866368722 implements MigrationInterface {
    name = 'UpdateAuthorEntity1757866368722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`authors\` DROP COLUMN \`isApproved\``);
        await queryRunner.query(`ALTER TABLE \`authors\` ADD \`isApproved\` enum ('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`authors\` DROP COLUMN \`isApproved\``);
        await queryRunner.query(`ALTER TABLE \`authors\` ADD \`isApproved\` tinyint NOT NULL DEFAULT '0'`);
    }

}
