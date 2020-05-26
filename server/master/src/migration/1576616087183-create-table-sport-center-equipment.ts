import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableSportCenterEquipment1576616087183 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "sport_center_equipment",
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
                    name: "sportCenterId",
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
                    name: "price",
                    type: "int",
                    width: 11,
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
                    name: 'sport_equipment-sport_center_equipment',
                    columnNames: ['sportCenterId'],
                    referencedTableName: 'sport_equipment',
                    referencedColumnNames: ['id']
                },
                {
                    name: 'sport_center_equipment-sport_center',
                    columnNames: ['sportCenterId'],
                    referencedTableName: 'sport_center',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('sport_center_equipment');
    }

}
