import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSportGroundTimeSlot1579176044563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "sport_ground_time_slot",
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
                    name: "sportGroundId",
                    type: "int",
                    width: 11,
                    isNullable: false
                },
                {
                    name: "startTime",
                    type: "float",
                    precision: 4,
                    scale: 2,
                    isNullable: true
                },
                {
                    name: "endTime",
                    type: "float",
                    precision: 4,
                    scale: 2,
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
                    name: 'sport_ground-sport_ground_slot_time',
                    columnNames: ['sportGroundId'],
                    referencedTableName: 'sport_ground',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('sport_ground_time_slot', true, true);
    }

}
