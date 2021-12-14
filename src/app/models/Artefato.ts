import {Entity, Column, PrimaryColumn, TableInheritance} from 'typeorm';
	
@Entity('tb_artefato')
@TableInheritance({ column: { type: "varchar", name: "type" } })
export default abstract class Artefato {
    
    @PrimaryColumn('int')
    id: number;
    
    @Column('varchar')
    nome: string;

    @Column()
    peso: number;
    
    @Column()
    valor: number;
       
} 