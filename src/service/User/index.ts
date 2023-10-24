import HttpClient from '../HttpClient';

import { Service } from './UserService';

const instance = new HttpClient('/user');

const UserService = new Service(instance);

export default UserService;
