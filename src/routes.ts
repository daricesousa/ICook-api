import { auth } from './utils/auth';
import { Router, Response } from 'express'
import { ControllerUser } from './controllers/controllerUser';
import { Examples } from './controllers/controllerExamples';
import { userResponse401, adminResponse401 } from './utils/response401';
import { ControllerGroupIngredients } from './controllers/controllerGroupIngredients';
import { ControllerIngredient } from './controllers/controllerIngredient';

const router = Router();

const controllerUser = new ControllerUser();
const controllerGroupIngredients = new ControllerGroupIngredients();
const examples = new Examples();
const controllerIngredient = new ControllerIngredient();


router.get('/', (req, res) => {
    return res.json({ok: 'Server is running'});
});

router.post('/sign', controllerUser.sign);
router.post('/register', controllerUser.create);
router.get('/users',adminResponse401 , controllerUser.listUsers);

router.post('/new-group', adminResponse401, controllerGroupIngredients.create);
router.get('/groups', controllerGroupIngredients.listGroups);
// router.delete('/delete-all-users', controllerUser.deleteAllUsers);

router.post('/new-ingredient', adminResponse401, controllerIngredient.create);
router.get('/ingredients', controllerIngredient.listIngredients);
router.delete('/delete-ingredient/:id', adminResponse401, controllerIngredient.delete);
router.put('/associate',adminResponse401, controllerIngredient.updateAssociate)



// exemplos de rotas
// get, post, put e delete
// pega, posta, altera e deleta
router.post('/teste', examples.teste);
router.post('/teste/body', examples.testeWithParams);
router.post('/teste/auth', userResponse401, examples.testeAuth);



router.use(auth().initialize());
// exemplo de rota que precisa de autenticação
// router.get('/my-account', patterResponse401, yourController.method)
// use a função "patterResponse401" entre a rota que vc quer que seja segura, e o método dessa classe 

export { router }