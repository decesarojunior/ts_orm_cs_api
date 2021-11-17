import {Router} from 'express';

import JogadorController from './app/controllers/JogadorController';
import AuthController from './app/controllers/AuthController';
import EnderecoController from './app/controllers/EnderecoController';

const router = Router();

router.post('/jogador/store', JogadorController.store);
router.post('/jogador/update', JogadorController.update);
router.post('/jogador/delete', JogadorController.delete);
router.post('/jogador/list', JogadorController.list);

router.post('/auth', AuthController.authenticate);


router.post('/endereco/store', EnderecoController.store);
router.post('/endereco/list', EnderecoController.list);


export default router;