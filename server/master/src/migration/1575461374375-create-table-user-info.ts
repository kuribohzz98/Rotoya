import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableUserInfo1575461374375 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user_info",
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
                    name: "firstName",
                    type: "varchar",
                    length: "45",
                    isNullable: false
                },
                {
                    name: "lastName",
                    type: "varchar",
                    length: "45",
                    isNullable: false
                },
                {
                    name: "gender",
                    type: "enum",
                    enum: ["Other", "Male", "Female"],
                    isNullable: true,
                    default: "'Other'"
                },
                {
                    name: "phone",
                    type: "int",
                    width: 11,
                    isNullable: true
                },
                {
                    name: "address",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "email",
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
                    name: 'user-user_info',
                    columnNames: ['userId'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user_info', true, true);
    }

}
