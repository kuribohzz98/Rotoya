import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableRole1575451606018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
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
            name: 'name',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'code',
            type: 'varchar',
            isUnique: true,
            length: '45',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('role', true, true);
  }
}
