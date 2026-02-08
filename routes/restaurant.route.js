import { Router } from 'express';
import { getRestaurants, getSuggestions  } from '../controllers/restaurant.controller.js';

const router = Router();

router.route('/').get(getRestaurants);
router.route('/suggestions').get(getSuggestions);

export default router;