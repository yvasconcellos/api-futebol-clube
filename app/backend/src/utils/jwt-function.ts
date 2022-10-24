import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { iLogin } from './interfaces';

dotenv.config();

const secret: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';
const genetareToken = (body: iLogin) => jwt.sign(body, secret);

export default genetareToken;
