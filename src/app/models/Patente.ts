import {Entity, Column, PrimaryColumn} from 'typeorm';
	
@Entity('tb_patente')
class Patente {
    
    @PrimaryColumn('int')
    id: number;
    
    @Column('varchar')
    nome: string;
    
    @Column('varchar')
    cor: string;
       
} 	

export default Patente;