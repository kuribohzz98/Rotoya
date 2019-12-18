import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableSportGroundEquipment1576616087183 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "sport_ground_equipment",
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
                    name: "sportEquipmentId",
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
                    name: "quantity",
                    type: "int",
                    width: 4,
                    isNullable: false,
                    default: 0
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
                    name: 'sport_equipment-sport_ground_equipment',
                    columnNames: ['sportEquipmentId'],
                    referencedTableName: 'sport_equipment',
                    referencedColumnNames: ['id']
                },
                {
                    name: 'sport_ground-sport_ground_equipment',
                    columnNames: ['sportGroundId'],
                    referencedTableName: 'sport_ground',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('sport_ground_equipment');
    }

}
