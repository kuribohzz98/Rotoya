import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableSportCentre1576608865717 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "sport_centre",
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
                    name: "name",
                    type: "varchar",
                    length: "45",
                    isNullable: false
                },
                {
                    name: "code",
                    type: "varchar",
                    length: "45",
                    isNullable: true
                },
                {
                    name: "country",
                    type: "varchar",
                    length: "45",
                    isNullable: false
                },
                {
                    name: "city",
                    type: "varchar",
                    length: "45",
                    isNullable: false
                },
                {
                    name: "district",
                    type: "varchar",
                    length: "45",
                    isNullable: false
                },
                {
                    name: "commune",
                    type: "varchar",
                    length: "45",
                    isNullable: true
                },
                {
                    name: "address",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "latitude",
                    type: "float",
                    precision: 12,
                    scale: 8,
                    isNullable: true
                },
                {
                    name: "longitude",
                    type: "float",
                    precision: 12,
                    scale: 8,
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
                    name: 'user-sport_centre',
                    columnNames: ['userId'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("sport_centre", true, true);
    }

}
