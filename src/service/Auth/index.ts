import HttpClient from '../HttpClient';

import { AuthService } from './AuthService';

export default new AuthService(new HttpClient('/auth'));
