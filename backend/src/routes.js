import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import auth from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SesstionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import EventController from './app/controllers/EventController';
import WishController from './app/controllers/WishListController';
import WishListController from './app/controllers/WishListController';

const routes = Router();
const upload = multer(multerConfig);

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
routes.put('/events/:eventId', EventController.update);
routes.delete('/events/:eventId', EventController.delete);

//Wishlist
routes.post('/wishlists', WishController.store);
routes.get('/wishlists', WishListController.index);
routes.delete('/wishlists/:wishlistId', WishListController.delete);

export default routes;
