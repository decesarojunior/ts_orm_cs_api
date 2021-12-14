import {Request, Response} from 'express';
import {getRepository, getConnectionManager} from 'typeorm';
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

    async delete(req: Request, res: Response){


        try{

            const repository = getRepository(Patente);

            const {id} = req.body;
    
            const pt = await repository.findOne({where : {"id" : id }}); 
    
            if(pt){
    
                await repository.remove(pt); 
    
                return res.sendStatus(204);
    
            }else{
    
                return res.sendStatus(404);
            }


        }catch(e:unknown){

            console.log(e);
            return res.sendStatus(500);

        }

    }

}

export default new PatenteController();