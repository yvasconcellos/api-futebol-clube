import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import { iLogin, iLoginService } from '../utils/interfaces';

export default class LoginService implements iLoginService {
  validateUser = async (user: iLogin): Promise<boolean> => {
    const userModel = UserModel;
    const userLogin = await userModel.findAll({
      where: {
        email: user.email,
      },
    });
    if (userLogin[0]) {
      const result = bcrypt.compareSync(user.password, userLogin[0].password);
      return result;
    }
    return false;
  };
}
