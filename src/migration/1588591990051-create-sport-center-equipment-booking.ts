import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createSportCenterEquipmentBooking1588591990051
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'sport_center_equipment_booking',
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
            name: 'sportCenterEquipmentId',
            type: 'int',
            width: 11,
            isNullable: false,
          },
          {
            name: 'bookingId',
            type: 'int',
            width: 11,
            isNullable: false,
          },
          {
            name: 'price',
            type: 'int',
            width: 11,
            isNullable: false,
          },
          {
            name: 'amount',
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
            name: 'sport_center_equipment_booking-sport_center_equipment',
            columnNames: ['sportCenterEquipmentId'],
            referencedTableName: 'sport_center_equipment',
            referencedColumnNames: ['id'],
          },
          {
            name: 'sport_center_equipment_booking-booking',
            columnNames: ['bookingId'],
            referencedTableName: 'booking',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('sport_center_equipment_booking', true, true);
  }
}
