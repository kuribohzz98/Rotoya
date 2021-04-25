import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableSportEquipment1576615308131
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'sport_equipment',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            width: 11,
            isNullable: false,
          },
          {
            name: 'sportId',
            type: 'int',
            width: 11,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '45',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            name: 'sport_center-sport',
            columnNames: ['sportId'],
            referencedTableName: 'sport',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('sport_equipment', true, true);
  }
}
