import { auth } from './utils/auth';
import { Router, Response } from 'express'
import { ControllerUser } from './controllers/controllerUser';
import { ControllerRecipe } from './controllers/controllerRecipe';
import { Examples } from './controllers/controllerExamples';
import { userResponse401, adminResponse401, identifyUser } from './utils/response401';
import { ControllerGroupIngredients } from './controllers/controllerGroupIngredients';
import { ControllerIngredient } from './controllers/controllerIngredient';
import { getRepository } from 'typeorm';
import { User } from './models/modelUser';

const router = Router();

const controllerUser = new ControllerUser();
const controllerGroupIngredients = new ControllerGroupIngredients();
const examples = new Examples();
const controllerIngredient = new ControllerIngredient();
const controllerRecipe = new ControllerRecipe();


router.get('/', async (req, res) => {
    const port = process.env.PORT|| 3000
    return res.json({ ok: `Server is running - port: ${port}` });
});


router.post('/sign', controllerUser.sign);
router.post('/register', controllerUser.create);
router.get('/users', controllerUser.listUsers);

router.post('/new-group', adminResponse401, controllerGroupIngredients.create);
router.get('/groups', controllerGroupIngredients.listGroups);
// router.delete('/delete-all-users', controllerUser.deleteAllUsers);

router.post('/new-ingredient', userResponse401, controllerIngredient.create);
router.get('/ingredients', identifyUser, controllerIngredient.listIngredients);
router.delete('/ingredient/delete/:id', adminResponse401, controllerIngredient.delete);
router.put('/ingredient/associate', adminResponse401, controllerIngredient.updateAssociate)
router.put('/ingredient/update', adminResponse401, controllerIngredient.update)

router.post('/recipe/create', userResponse401, controllerRecipe.create);
router.put('/recipe/new-avaliation', userResponse401, controllerRecipe.newAvaliation);
router.get('/recipes', identifyUser, controllerRecipe.listRecipes);

router.put('/validate/ingredient', adminResponse401, controllerIngredient.validateIngredient);
router.put('/validate/recipe', adminResponse401, controllerRecipe.validateRecipe);
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