import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRejectReasonToPost1758271615319 implements MigrationInterface {
    name = 'AddRejectReasonToPost1758271615319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`rejectionReason\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`rejectionReason\``);
    }

}
