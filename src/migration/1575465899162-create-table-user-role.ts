import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableUserRole1575465899162 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'user_role',
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
            name: 'userId',
            type: 'int',
            width: 11,
            isNullable: false,
          },
          {
            name: 'roleId',
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
        ],
        foreignKeys: [
          {
            name: 'user-user_role',
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
          {
            name: 'role-user_role',
            columnNames: ['roleId'],
            referencedTableName: 'role',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user_role', true, true);
  }
}
