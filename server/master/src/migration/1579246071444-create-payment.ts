import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPayment1579246071444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "payment",
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
                    name: "bookingId",
                    type: "int",
                    width: 11,
                    isNullable: false
                },
                {
                    name: "amount",
                    type: "float",
                    precision: 12,
                    scale: 2,
                    isNullable: false,
                    default: 0
                },
                {
                    name: "currency",
                    type: "varchar",
                    length: "15",
                    isNullable: false,
                    default: "'VND'"
                },
                {
                    name: "qrCode",
                    type: "varchar",
                    length: '255',
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
                    name: 'booking-payment',
                    columnNames: ['bookingId'],
                    referencedTableName: 'booking',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('payment', true, true);
    }

}
