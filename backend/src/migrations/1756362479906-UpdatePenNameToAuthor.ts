import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePenNameToAuthor1756362479906 implements MigrationInterface {
    name = 'UpdatePenNameToAuthor1756362479906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`authors\` ADD \`penName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`authors\` ADD UNIQUE INDEX \`IDX_3c6e8af01b86dccf2d64e13199\` (\`penName\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`authors\` DROP INDEX \`IDX_3c6e8af01b86dccf2d64e13199\``);
        await queryRunner.query(`ALTER TABLE \`authors\` DROP COLUMN \`penName\``);
    }

}
