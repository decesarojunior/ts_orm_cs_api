import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateObjetivoLocalTable1644871604444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'tb_objetivo_local',
            columns: [
                {
                   name: 'objetivo_id',	
                   type: 'int',
                   isPrimary: true
                },
                {
                   name: 'local_id',	
                   type: 'int',
                   isNullable: false
                }			
            ]			
        }));

        await queryRunner.createForeignKey(
		    'tb_objetivo_local',
		    new TableForeignKey({
              name: 'fk_objetivolocal_mapa_id',
		      columnNames: ['objetivo_id'],
		      referencedTableName: 'tb_objetivo',
		      referencedColumnNames: ['id']
		    })
        );

        await queryRunner.createForeignKey(
		    'tb_objetivo_local',
		    new TableForeignKey({
              name: 'fk_objetivolocal_local_id',
		      columnNames: ['local_id'],
		      referencedTableName: 'tb_local',
		      referencedColumnNames: ['id']
		    })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey('tb_objetivo_local', "fk_objetivolocal_mapa_id");     
        await queryRunner.dropForeignKey('tb_objetivo_local', "fk_objetivolocal_local_id");           
        await queryRunner.dropTable('tb_objetivo_local');
    }

}
