import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';		

import Artefato from './Artefato';
import Compra from './Compra';


@Entity('tb_itenscompra')
export default class ItensCompra {

    @PrimaryColumn('int')
    id: number;

    @Column('int')
    quantidade: number;

    @Column()
    valor: number;

    //associação.
    @ManyToOne(type => Artefato)
    @JoinColumn({name: "artefato_id", referencedColumnName: "id"})
    artefato: Artefato;

    @ManyToOne(type => Compra)
    @JoinColumn({name: "compra_id", referencedColumnName: "id"})
    compra: Compra;

}