import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/teams', async (req: Request, res: Response) => {
  const result = await teamController.getAllTeams();
  return res.status(200).json(result);
});

teamRouter.get('/teams/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await teamController.getTeamById(id);
  return res.status(200).json(result);
});

export default teamRouter;
