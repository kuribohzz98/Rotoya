import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createBooking1579245839951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "booking",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                    width: 11,
                    isNullable: false
                },
                {
                    name: "userId",
                    type: "int",
                    width: 11,
                    isNullable: false
                },
                {
                    name: "sportGroundId",
                    type: "int",
                    width: 11,
                    isNullable: false
                },
                {
                    name: "timeSlotId",
                    type: "int",
                    width: 11,
                    isNullable: false
                },
                {
                    name: "bookingDate",
                    type: "date",
                    isNullable: true
                },
                {
                    name: "equipment",
                    type: "json",
                    isNullable: true
                },
                {
                    name: "detail",
                    type: "json",
                    isNullable: true
                },
                {
                    name: "createdAt",
                    type: "datetime",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "datetime",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                }
            ],
            foreignKeys: [
                {
                    name: 'sport_ground-booking',
                    columnNames: ['sportGroundId'],
                    referencedTableName: 'sport_ground',
                    referencedColumnNames: ['id']
                },
                {
                    name: 'user-booking',
                    columnNames: ['userId'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id']
                },
                {
                    name: 'sport_ground_time_slot-booking',
                    columnNames: ['timeSlotId'],
                    referencedTableName: 'sport_ground_time_slot',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('booking', true, true);
    }

}
