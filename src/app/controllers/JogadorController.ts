import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Jogador from '../models/Jogador';			
import Endereco from '../models/Endereco';			
	
class JogadorController {
    
    async delete(req: Request, res: Response){

        const repository = getRepository(Jogador);

        const {nickname, endereco} = req.body;

        const nicknameExists = await repository.findOne({where : {"nickname" : nickname }}); 

        if(nicknameExists){

            await repository.remove(nickname); 

            return res.sendStatus(204);

        }else{

            return res.sendStatus(404);
        }

    }
    
    async store(req: Request, res: Response){
    
        const repository = getRepository(Jogador);

        const {nickname, endereco} = req.body;

        const nicknameExists = await repository.findOne({where : {nickname}}); 

        if(nicknameExists){

            return res.sendStatus(409);//duplicidade de registro/source/informação.

        }

        if(!endereco){

            return res.sendStatus(404);//registrou ou recurso nao encontrado.

        }

        const j = repository.create(req.body); //cria a entidade Jogador

        await repository.save(j); //persiste a entidade na tabela.

        return res.json(j);
                
    }

    async update(req: Request, res: Response){
    
        const repository = getRepository(Jogador);

        const {nickname, endereco} = req.body;

        const nicknameExists = await repository.findOne({where : {nickname}}); 

        const enderecoExists = await getRepository(Endereco).findOne({where : {"id" : endereco.id}}); 

        if(!endereco || !nicknameExists || !enderecoExists){

            return res.sendStatus(404);

        }

        const j = repository.create(req.body); //cria a entidade Jogador

        await repository.save(j); //persiste a entidade na tabela.

        return res.json(j);
                
    }

    async list(req: Request, res: Response){

        const repository = getRepository(Jogador);

        const lista = await repository.createQueryBuilder('tb_jogador').getMany();        

        return res.json(lista);

    }

}

export default new JogadorController();