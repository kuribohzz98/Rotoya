import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableSports1576608856020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "sport",
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
                    name: "name",
                    type: "varchar",
                    length: "45",
                    isNullable: false
                },
                {
                    name: "code",
                    type: "varchar",
                    isUnique: true,
                    length: "45",
                    isNullable: true
                },
                {
                    name: "createdAt",
                    type: "datetime",
                    isNullable: false,
                    default: "CURRENT_TIMESTAMP"
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("sport", true, true);
    }

}
