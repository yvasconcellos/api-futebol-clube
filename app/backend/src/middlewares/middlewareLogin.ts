import { NextFunction, Request, Response } from 'express';

export default class LoginMiddleware {
  validateFields = (request: Request, response: Response, next: NextFunction): Response | void => {
    if (!request.body.password || !request.body.email) {
      return response.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  };
}
