import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateMapaLocalTable1644866125203 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'tb_mapa_local',
            columns: [
                {
                   name: 'mapa_id',	
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
		    'tb_mapa_local',
		    new TableForeignKey({
              name: 'fk_mapalocal_mapa_id',
		      columnNames: ['mapa_id'],
		      referencedTableName: 'tb_mapa',
		      referencedColumnNames: ['id']
		    })
        );

        await queryRunner.createForeignKey(
		    'tb_mapa_local',
		    new TableForeignKey({
              name: 'fk_mapalocal_local_id',
		      columnNames: ['local_id'],
		      referencedTableName: 'tb_local',
		      referencedColumnNames: ['id']
		    })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey('tb_mapa_local', "fk_mapalocal_mapa_id");     
        await queryRunner.dropForeignKey('tb_mapa_local', "fk_mapalocal_local_id");           
        await queryRunner.dropTable('tb_mapa_local');
    }

}
