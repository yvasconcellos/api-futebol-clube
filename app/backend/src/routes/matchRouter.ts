import { Request, Response, Router } from 'express';
import MatchMiddleware from '../middlewares/middlewareMatches';
import { validateToken } from '../utils/jwt-function';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();
const matchController = new MatchController();
const middlewareMatches = new MatchMiddleware();

matchRouter.get('/matches', async (req: Request, res: Response) => {
  if (req.query.inProgress) {
    const result = await matchController.getAllMatchesFiltered(req.query.inProgress as string);
    return res.status(200).json(result);
  }
  const result = await matchController.getAllMatches();
  return res.status(200).json(result);
});

matchRouter.post(
  '/matches',
  validateToken,
  middlewareMatches.validateFields,
  async (req: Request, res: Response) => {
    const result = await matchController.createMatch(req.body);
    if (result) {
      return res.status(201).json(result);
    }
    return res.status(404).json({ message: 'There is no team with such id!' });
  },
);

matchRouter.patch(
  '/matches/:id/finish',
  validateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await matchController.finalizeMatch(id);
    return res.status(200).json({ message: 'Finished' });
  },
);

matchRouter.patch(
  '/matches/:id',
  validateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await matchController.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Updated' });
  },
);

export default matchRouter;
