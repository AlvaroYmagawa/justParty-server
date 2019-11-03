import { Router } from 'express';
import Cors from 'cors';

import multer from 'multer';
import multerConfig from './config/multer';
import auth from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SesstionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import EventController from './app/controllers/EventController';
import WishListController from './app/controllers/WishListController';
import EvaluationController from './app/controllers/EvaluationController';

const routes = Router();
const cors = Cors();

const upload = multer(multerConfig);

// Middleware to enable the same origin access the server
routes.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, HEAD');
  next();
});
routes.options('*', Cors());

routes.get('/users/:userId', UserController.index);
routes.post('/sessions', SesstionController.store);
routes.post('/users', UserController.store);

// Midleware login authentication
routes.use(auth);

// Users
routes.put('/users', UserController.update);

// Files
routes.post('/files', upload.single('file'), FileController.store);

// Events
routes.post('/events', EventController.store);
routes.get('/events', EventController.index);
routes.get('/events/:eventId', EventController.show);
routes.put('/events/:eventId', EventController.update);
routes.delete('/events/:eventId', EventController.delete);

// Wishlist
routes.post('/wishlists', WishListController.store);
routes.get('/wishlists', WishListController.index);
routes.delete('/wishlists/:wishlistId', WishListController.delete);

// Evaluation
routes.post('/evaluations/:promoterId', EvaluationController.store);

export default routes;
