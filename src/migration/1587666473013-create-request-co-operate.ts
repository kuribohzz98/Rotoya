import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRequestCoOperate1587666473013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'request_co_operate',
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
            name: 'status',
            type: 'enum',
            enum: ['REJECTED', 'APPROVED', 'WAITTING'],
            isNullable: false,
            default: "'WAITTING'",
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'district',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'commune',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'note',
            type: 'varchar',
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
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('request_co_operate', true, true);
  }
}
