import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import { iLogin, iLoginService } from '../utils/interfaces';

export default class LoginService implements iLoginService {
  validateUser = async (user: iLogin): Promise<iLogin[]> => {
    const userModel = UserModel;
    const userLogin = await userModel.findAll({
      where: {
        email: user.email,
      },
    });
    return userLogin;
  };
}
