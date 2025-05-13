import { Router } from 'express'
import { getLogin, postLogin } from '../controllers/loginController.js';

const loginRouter = Router();

loginRouter.get('/', getLogin)
loginRouter.post('/', postLogin)

export default loginRouter;