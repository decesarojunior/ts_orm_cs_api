import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Patente from '../models/Patente';
	
class PatenteController {
    
    async list(req: Request, res: Response){

        const repository = getRepository(Patente);

        const lista = await repository.find();

        return res.json(lista);

    }
    
    async store(req: Request, res: Response){
    
        const repository = getRepository(Patente);

        const p = repository.create(req.body); //cria a entidade Endereco

        await repository.save(p); //persiste a entidade na tabela.

        return res.json(p);
                
    }

}

export default new PatenteController();