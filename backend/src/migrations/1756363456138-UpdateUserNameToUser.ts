import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserNameToUser1756363456138 implements MigrationInterface {
    name = 'UpdateUserNameToUser1756363456138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`username\``);
    }

}
