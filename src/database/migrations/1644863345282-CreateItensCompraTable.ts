import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateItensCompraTable1644863345282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'tb_itenscompra',
            columns: [
                {
                   name: 'id',	
                   type: 'serial',
                   isPrimary: true
                },
                {
                   name: 'quantidade',	
                   type: 'int',
                   isNullable: false
                },
                {
                   name: 'valor',
                   type: 'numeric(10,2)',
                   isNullable: false
                },
                {
		            name: 'artefato_id',
		            type: 'int',
		            isNullable: false
		         },
                 {
		            name: 'compra_id',
		            type: 'int',
		            isNullable: false
		         }			
            ]			
        }));

        await queryRunner.createForeignKey(
		    'tb_itenscompra',
		    new TableForeignKey({
              name: 'fk_itenscompra_artefato',
		      columnNames: ['artefato_id'],
		      referencedTableName: 'tb_artefato',
		      referencedColumnNames: ['id']
		    })
        );

        await queryRunner.createForeignKey(
		    'tb_itenscompra',
		    new TableForeignKey({
              name: 'fk_itenscompra_compra',
		      columnNames: ['compra_id'],
		      referencedTableName: 'tb_compra',
		      referencedColumnNames: ['id']
		    })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey('tb_itenscompra', "fk_itenscompra_artefato");     
        await queryRunner.dropForeignKey('tb_itenscompra', "fk_itenscompra_compra");           
        await queryRunner.dropTable('tb_itenscompra');
    }

}
