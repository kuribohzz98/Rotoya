import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSportCenterFavorite1588944439383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "sport_center_favorite",
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
                    name: "sportCenterId",
                    type: "int",
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
                    name: "createdAt",
                    type: "datetime",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP"
                }
            ],
            foreignKeys: [
                {
                    name: 'sport_center_favorite-sport_center',
                    columnNames: ['sportCenterId'],
                    referencedTableName: 'sport_center',
                    referencedColumnNames: ['id']
                },
                {
                    name: 'sport_center_favorite-user',
                    columnNames: ['userId'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('sport_center_favorite', true, true);
    }

}
