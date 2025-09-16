import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostDeleteLock1758006165793 implements MigrationInterface {
    name = 'UpdatePostDeleteLock1758006165793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`deletedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`status\` \`status\` enum ('pending', 'published', 'locked') NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`status\` \`status\` enum ('draft', 'pending', 'published') NOT NULL DEFAULT 'draft'`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`deletedAt\``);
    }

}
