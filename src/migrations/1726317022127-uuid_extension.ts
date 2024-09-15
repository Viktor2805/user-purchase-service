import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUUIDExtension1618507248881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
