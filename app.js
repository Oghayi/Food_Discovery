import express from 'express';

const app = express();

app.use(express.json());

import restaurantRoutes from './routes/restaurant.route.js';

app.use('/api/restaurants', restaurantRoutes);

export default app;