import { NextFunction, Request, Response } from 'express';

export default class MatchMiddleware {
  validateFields = (request: Request, response: Response, next: NextFunction): Response | void => {
    if (!request.body.homeTeam || !request.body.homeTeamGoals
      || !request.body.awayTeam || !request.body.awayTeamGoals) {
      return response.status(400).json({ message: 'All fields must be filled' });
    }
    if (request.body.homeTeam === request.body.awayTeam) {
      return response.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  };
}
