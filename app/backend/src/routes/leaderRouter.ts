import { Request, Response, Router } from 'express';
import LeaderController from '../controllers/LeaderController';

const leaderRouter = Router();
const leaderController = new LeaderController();

leaderRouter.get('/leaderboard', async (req: Request, res: Response) => {
  const result = await leaderController.getLeaderBoard();
  return res.status(200).json(result);
});

leaderRouter.get('/leaderboard/home', async (req: Request, res: Response) => {
  const result = await leaderController.getLeaderBoardHome();
  return res.status(200).json(result);
});

leaderRouter.get('/leaderboard/away', async (req: Request, res: Response) => {
  const result = await leaderController.getLeaderBoardAway();
  return res.status(200).json(result);
});

export default leaderRouter;
