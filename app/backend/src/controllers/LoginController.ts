import * as bcrypt from 'bcryptjs';
import LoginService from '../services/LoginService';
import { iLogin, iLoginService } from '../utils/interfaces';
import * as jwtFunction from '../utils/jwt-function';

export default class LoginController {
  constructor(private _loginService: iLoginService = new LoginService()) {
  }

  validateUser = async (user: iLogin) => {
    const result = await this._loginService.validateUser(user);
    let decodedPassword = false;
    if (result[0]) {
      decodedPassword = bcrypt.compareSync(user.password, result[0].password);
    }

    if (decodedPassword) {
      const token = jwtFunction.genetareToken(user);
      return { token };
    }

    return { message: 'Incorrect email or password' };
  };

  findUser = async (user: iLogin): Promise<string | undefined> => {
    const result = await this._loginService.validateUser(user);
    return result[0].role;
  };
}
