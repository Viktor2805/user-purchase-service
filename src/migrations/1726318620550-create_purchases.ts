import { MigrationInterface, type QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreatePurchase1726318620550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'purchases',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'offerId',
                    type: 'uuid',
                },
                {
                    name: 'userId',
                    type: 'uuid',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }));

        await queryRunner.createForeignKey('purchases', new TableForeignKey({
            columnNames: ['offerId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'offers',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('purchases', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createIndex('purchases', new TableIndex({
            name: 'IDX_OFFER_ID',
            columnNames: ['offerId'],
        }));

        await queryRunner.createIndex('purchases', new TableIndex({
            name: 'IDX_USER_ID',
            columnNames: ['userId'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('purchases');

        if (table) {
            const foreignKey1 = table.foreignKeys.find(fk => fk.columnNames.includes('offerId'));
            const foreignKey2 = table.foreignKeys.find(fk => fk.columnNames.includes('userId'));

            if (foreignKey1) {
                await queryRunner.dropForeignKey('purchases', foreignKey1);
            }

            if (foreignKey2) {
                await queryRunner.dropForeignKey('purchases', foreignKey2);
            }

            await queryRunner.dropIndex('purchases', 'IDX_OFFER_ID');
            await queryRunner.dropIndex('purchases', 'IDX_USER_ID');
            await queryRunner.dropTable('purchases');
        }
    }
}
