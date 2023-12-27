import HttpClient from '../HttpClient';

import { Service } from './PlanningService';

const PlanningMealService = new Service(new HttpClient('/planning'));

export default PlanningMealService;
