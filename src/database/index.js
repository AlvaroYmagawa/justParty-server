const Sequelize = require('sequelize');
const dataBaseConfig = require('../config/database');

const User = require('../app/models/User');
const File = require('../app/models/File');
const Event = require('../app/models/Event');
const WishList = require('../app/models/WishList');
const Evaluation = require('../app/models/Evaluation');
const Category = require('../app/models/Category');
const DefaultCategory = require('../app/models/DefaultCategory');

const models = [User, File, Event, WishList, Evaluation, Category, DefaultCategory];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

module.exports = new Database();
