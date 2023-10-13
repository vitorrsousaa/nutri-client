import HttpClient from '../HttpClient';

import { AuthService as Service } from './AuthService';

const AuthService = new Service(new HttpClient('/auth'));

export default AuthService;
