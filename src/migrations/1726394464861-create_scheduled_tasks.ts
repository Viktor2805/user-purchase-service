import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateScheduledTask1726394464861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'scheduled_tasks',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                default: 'uuid_generate_v4()',
              },
              {
                name: 'type',
                type: 'varchar',
              },
              {
                name: 'payload',
                type: 'jsonb',
                isNullable: true,
              },
              {
                name: 'error',
                type: 'text',
                isNullable: true, 
              },
              {
                name: 'scheduledTime',
                type: 'timestamp',
              },
              {
                name: 'isExecuted',
                type: 'boolean',
                default: false,
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP', 
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP', 
                onUpdate: 'CURRENT_TIMESTAMP', 
              },
            ],
          }),
          true
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('scheduled_task');
    }

}
