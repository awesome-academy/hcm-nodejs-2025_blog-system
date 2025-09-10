import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForgotPasswordEntity1757491066721 implements MigrationInterface {
    name = 'AddForgotPasswordEntity1757491066721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`password_reset_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`tokenHash\` varchar(255) NOT NULL, \`expiresAt\` datetime NOT NULL, \`used\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_2ecfa961f2f3e33fff8e19b6c7\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2ecfa961f2f3e33fff8e19b6c7\` ON \`password_reset_tokens\``);
        await queryRunner.query(`DROP TABLE \`password_reset_tokens\``);
    }

}
