import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableSportGround1576608872715 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "sport_ground",
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
                    name: "sportCentreId",
                    type: "int",
                    width: 11,
                    isNullable: false
                },
                {
                    name: "sportId",
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
                    name: "type",
                    type: "varchar",
                    length: "45",
                    isNullable: true
                },
                {
                    name: "avatar",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "quantity",
                    type: "int",
                    width: 4,
                    isNullable: false,
                    default: 0
                },
                {
                    name: "quantityInStock",
                    type: "int",
                    width: 4,
                    isNullable: false,
                    default: 0
                },
                {
                    name: "description",
                    type: "varchar",
                    length: "255",
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
                    name: 'sport_centre-sport_ground',
                    columnNames: ['sportCentreId'],
                    referencedTableName: 'sport_centre',
                    referencedColumnNames: ['id']
                },
                {
                    name: 'sport-sport_ground',
                    columnNames: ['sportId'],
                    referencedTableName: 'sport',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("sport_ground", true, true);
    }

}
