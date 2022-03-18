import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateRoundObjetivoTable1645127110085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'tb_round_objetivo',
            columns: [
                {
                   name: 'round_id',	
                   type: 'int',
                   isPrimary: true
                },
                {
                   name: 'objetivo_id',	
                   type: 'int',
                   isNullable: false
                }			
            ]			
        }));

        await queryRunner.createForeignKey(
		    'tb_round_objetivo',
		    new TableForeignKey({
              name: 'fk_ro_round_id',
		      columnNames: ['round_id'],
		      referencedTableName: 'tb_round',
		      referencedColumnNames: ['id']
		    })
        );

        await queryRunner.createForeignKey(
		    'tb_round_objetivo',
		    new TableForeignKey({
              name: 'fk_ro_objetivo_id',
		      columnNames: ['objetivo_id'],
		      referencedTableName: 'tb_objetivo',
		      referencedColumnNames: ['id']
		    })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey('tb_round_objetivo', "fk_ro_round_id");     
        await queryRunner.dropForeignKey('tb_round_objetivo', "fk_ro_objetivo_id");           
        await queryRunner.dropTable('tb_round_objetivo');
    }

}
