import {Entity, Column, PrimaryColumn, ManyToMany, JoinTable, ChildEntity} from 'typeorm';

@Entity('tb_local')
export default class Local{

    @PrimaryColumn('int')
    id: number;

    @Column('text')
    nome: string;

    @Column('text')
    latitute: string;
    
    @Column('text')
    longitude: string;    
    
}