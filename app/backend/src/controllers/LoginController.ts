import LoginService from '../services/LoginService';
import { iLogin, iLoginService } from '../utils/interfaces';
import generateToken from '../utils/jwt-function';

export default class LoginController {
  constructor(private _loginService: iLoginService = new LoginService()) {
  }

  validateUser = async (user: iLogin) => {
    const result = await this._loginService.validateUser(user);

    if (result) {
      const token = generateToken(user);
      return { token };
    }

    return { message: 'Incorrect email or password' };
  };
}
