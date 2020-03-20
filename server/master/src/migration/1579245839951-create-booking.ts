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
                    name: "timeSlotId",
                    type: "int",
                    width: 11,
                    isNullable: false
                },
                {
                    name: "paymentId",
                    type: "int",
                    width: 11,
                    isNullable: true
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
                    name: 'sport_ground_time_slot-booking',
                    columnNames: ['timeSlotId'],
                    referencedTableName: 'sport_ground_time_slot',
                    referencedColumnNames: ['id']
                },
                {
                    name: 'booking-payment',
                    columnNames: ['paymentId'],
                    referencedTableName: 'payment',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('booking', true, true);
    }

}
