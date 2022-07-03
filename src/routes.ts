import { auth } from './utils/auth';
import { Router } from 'express'
import { ControllerUser } from './controllers/controllerUser';
import { Examples } from './controllers/controllerExamples';
import { patterResponse401 } from './utils/response401';

const router = Router();

const controllerUser = new ControllerUser();
const examples = new Examples();

router.post('/aaa', controllerUser.sign);
router.post('/users', controllerUser.create);



// exemplos de rotas
// get, post, put e delete
// pega, posta, altera e deleta
router.post('/teste', examples.teste);
router.post('/teste/body', examples.testeWithParams);
router.post('/teste/auth', patterResponse401, examples.testeAuth);



router.use(auth().initialize());
// exemplo de rota que precisa de autenticação
// router.get('/my-account', patterResponse401, yourController.method)
// use a função "patterResponse401" entre a rota que vc quer que seja segura, e o método dessa classe 

export { router }