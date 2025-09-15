import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostEntity1757916092778 implements MigrationInterface {
    name = 'UpdatePostEntity1757916092778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`imageUrl\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`imageUrl\``);
    }

}
