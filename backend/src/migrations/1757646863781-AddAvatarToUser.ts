import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarToUser1757646863781 implements MigrationInterface {
    name = 'AddAvatarToUser1757646863781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatarUrl\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatarUrl\``);
    }

}
