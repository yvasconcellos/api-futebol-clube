import { Request, Response, Router } from 'express';
import { validateToken } from '../utils/jwt-function';
import LoginMiddleware from '../middlewares/middlewareLogin';
import LoginController from '../controllers/LoginController';

const loginRouter = Router();
const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();

loginRouter.get('/login', validateToken, async (req: Request, res: Response) => {
  const result = await loginController.findUser(req.body.token);
  res.status(200).json({ role: result });
});

loginRouter.post('/login', loginMiddleware.validateFields, async (req: Request, res: Response) => {
  const result = await loginController.validateUser(req.body);
  if (result.token) {
    return res.status(200).json(result);
  }
  return res.status(401).json(result);
});

export default loginRouter;
