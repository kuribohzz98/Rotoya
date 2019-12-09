import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableUserMeta1575463295294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user_meta",
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
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "avatar",
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
                    name: 'user-user_meta',
                    columnNames: ['userId'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("user_meta");
    }

}
