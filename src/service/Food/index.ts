import HttpClient from '../HttpClient';

import { Service } from './FoodService';

const FoodService = new Service(new HttpClient('/food'));

export default FoodService;
