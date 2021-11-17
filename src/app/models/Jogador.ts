import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';

import Endereco from './Endereco';
	
@Entity('tb_jogador')
class Jogador {
    
    @PrimaryColumn('text')
    nickname: string;
    
    @Column('text')
    senha: string;
    
    @Column('int')
    pontos: number;
    
    @Column('date')
    data_cadastro: Date;
    
    @Column('date')
    data_ultimo_login: Date;

    @ManyToOne(type => Endereco)
    @JoinColumn({name: "endereco_id", referencedColumnName: "id"})
    endereco: Endereco;
} 	

export default Jogador;