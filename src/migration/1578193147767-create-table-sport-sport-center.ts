import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableSportSportCenter1578193147767
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'sport_sportcenter',
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
            name: 'sportCenterId',
            type: 'int',
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
            name: 'sport_sportCenter-sport_center',
            columnNames: ['sportCenterId'],
            referencedTableName: 'sport_center',
            referencedColumnNames: ['id'],
          },
          {
            name: 'sport_sportCenter-sport',
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
    await queryRunner.dropTable('sport_sportcenter', true, true);
  }
}
