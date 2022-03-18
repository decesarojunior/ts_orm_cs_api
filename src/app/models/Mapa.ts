import {Entity, Column, PrimaryColumn, ManyToMany, JoinTable, ChildEntity} from 'typeorm';

import Local from './Local';

@Entity('tb_mapa')
export default class Mapa{

    @PrimaryColumn('int')
    id: number;

    @Column('text')
    nome: string;

    //agregacao, remove em cascata.
    @ManyToMany(() => Local, { cascade: true})
    @JoinTable({name : "tb_mapa_local", joinColumn: {name: "mapa_id", referencedColumnName: "id"}, inverseJoinColumn: {name: "local_id", referencedColumnName: "id"}})
    locais: Local[];
    
}