import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSportGroundImage1588603991701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "sport_ground_image",
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
                    name: "image",
                    type: "varchar",
                    length: '255',
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "datetime",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP"
                }
            ],
            foreignKeys: [
                {
                    name: 'sport_ground_image-sport_ground',
                    columnNames: ['sportGroundId'],
                    referencedTableName: 'sport_ground',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('sport_ground_image', true, true);
    }

}
