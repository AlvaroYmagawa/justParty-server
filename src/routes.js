const express = require('express');
const Cors = require('cors');

const multer = require('multer');
const multerConfig = require('./config/multer');
const auth = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SesstionController = require('./app/controllers/SessionController');
const FileController = require('./app/controllers/FileController');
const EventController = require('./app/controllers/EventController');
const WishListController = require('./app/controllers/WishListController');
const EvaluationController = require('./app/controllers/EvaluationController');
const FilterController = require('./app/controllers/FilterController');

const routes = express.Router();
const cors = Cors();

const upload = multer(multerConfig);

// Middleware to enable the same origin access the server
routes.use(function(req, res, next) {
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
routes.get('/:promoterId/events', EventController.index);
routes.get('/events', EventController.indexAll);
routes.get('/events/:eventId', EventController.show);
routes.put('/events/:eventId', EventController.update);
routes.delete('/events/:eventId', EventController.delete);

// Filter Events
routes.get('/filter/developers/:search', FilterController.filterPromoterEvents);

// Wishlist
routes.post('/wishlists', WishListController.store);
routes.get('/wishlists', WishListController.index);
routes.delete('/wishlists/:eventId', WishListController.delete);
routes.get('/wishlists/:eventId', WishListController.show);

// Evaluation
routes.post('/evaluations/:promoterId', EvaluationController.store);
routes.get('/evaluations/:promoterId', EvaluationController.index);
routes.put('/evaluations/:promoterId', EvaluationController.update);
routes.delete('/evaluations/:evaluationId', EvaluationController.delete);

module.exports = routes;
