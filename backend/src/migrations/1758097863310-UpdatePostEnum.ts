import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostEnum1758097863310 implements MigrationInterface {
    name = 'UpdatePostEnum1758097863310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`status\` \`status\` enum ('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`status\` \`status\` enum ('pending', 'published', 'locked') NOT NULL DEFAULT 'pending'`);
    }

}
