import express from 'express';

import DevController from './controllers/DevController';
import LikeController from './controllers/LikeController';
import DislikeController from './controllers/DislikeController';

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:id/likes', LikeController.store);
routes.post('/devs/:id/dislikes', DislikeController.store);

export default routes;
