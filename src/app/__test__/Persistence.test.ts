
import {app, setup} from "../../index"
import { afterAll, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import { getConnection} from "typeorm"


describe("persistence test", () => {
  
    beforeAll(async () => {      
      //antes de iniciar a execução do teste, estabelece a conexao com o BD.
      await setup()
    });


    afterAll(async () => {      
      //fecha a conexao com o banco de dados.
      await getConnection().close()      
      
    });

    
    it('teste /endereco/list e /endereco/delete', async () => {
      
      var agent = supertest(app);

      const postList = await agent.post('/endereco/list');

      //ponto de checagem - tem que retornar o codigo 200 para considerar o teste como válido/passou.
      expect(postList.statusCode).toEqual(200);

      console.log(`Encontrou ${postList.body.length} enderecos cadastrados.`);

      if (postList.body.length > 0){
     
        for(const e of postList.body){            

            const data = { "id" : e.id };

            const postDelete =  await agent.post('/endereco/delete').send(data);

            expect(postDelete.statusCode).toEqual(204);
        }
     
      }else{

        console.log("Não encontrou enderecos cadastrados, cadastrando novo ...");

        const data = { "cep" : "99010250", "complemento" : "402" };

        const postCreate =  await agent.post('/endereco/store').send(data);

        expect(postCreate.statusCode).toEqual(200);

      }  
    
    });


    it('teste /jogador/list e /jogador/delete', async () => {
      
      var agent = supertest(app);

      const ret = await agent.post('/jogador/list');

      expect(ret.statusCode).toEqual(200);

      if (ret.body.length > 0){

        console.log(`Encontrou ${ret.body.length} jogadores cadastrados.`);
     
        for(const p of ret.body){

            console.log(p);

            const data = { "nickname" : p.nickname };

            console.log(`Removendo o jogador ${data.nickname}.`);

            const postDeleteJogador =  await agent.post('/jogador/delete').send(data);
            expect(postDeleteJogador.statusCode).toEqual(204);

            //esse remocao pode gerar alguma violacao de chave, caso o endereco esteja sendo referenciado por outro jogador.
            //ou aplicar a estratégia de cascade no ManytoOne
            console.log(`Removendo o endereco ${p.endereco.id}.`);
            const postDeleteEndereco =  await agent.post('/endereco/delete').send({ "id" : p.endereco.id});
            expect(postDeleteEndereco.statusCode).toEqual(204);

        }
     
      }else{

        console.log("Não encontrou jogadores cadastrados, cadastrando novo jogador e endereco.");

        const postCreateEndereco =  await agent.post('/endereco/store').send({"cep" : "99010010"});

        expect(postCreateEndereco.statusCode).toEqual(200);

        const postFindEndereco =  await agent.post('/endereco/find').send({"cep" : "99010010"});

        expect(postFindEndereco.statusCode).toEqual(200);

        //console.log(postFindEndereco.body);

        const data = {	
          "nickname": "t@g1.com",
          "senha": "11111",
          "pontos": 10,
          "endereco" : postFindEndereco.body          
          };

          const postCreateJogador =  await agent.post('/jogador/store').send(data);

          expect(postCreateJogador.statusCode).toEqual(200);

      }  
    
    });

  });