import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/matches', async (req: Request, res: Response) => {
  if (req.query.inProgress) {
    const result = await matchController.getAllMatchesFiltered(req.query.inProgress as string);
    res.status(200).json(result);
  } else {
    const result = await matchController.getAllMatches();
    res.status(200).json(result);
  }
});

export default matchRouter;
