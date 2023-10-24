import HttpClient from '../HttpClient';

import { Service } from './AuthService';

const instance = new HttpClient('/auth');
const AuthService = new Service(instance);

export default AuthService;
