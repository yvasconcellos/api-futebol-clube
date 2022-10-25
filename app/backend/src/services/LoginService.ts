import UserModel from '../database/models/UserModel';
import { iLogin, iLoginService } from '../utils/interfaces';

export default class LoginService implements iLoginService {
  validateUser = async (user: iLogin): Promise<iLogin[]> => {
    const userLogin = await UserModel.findAll({
      where: {
        email: user.email,
      },
    });
    return userLogin;
  };
}
