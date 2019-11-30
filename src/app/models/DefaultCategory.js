/* eslint-disable no-param-reassign */
const Sequelize = require('sequelize');

class DefaultCategory extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        color: Sequelize.STRING,
      },
      { sequelize, }
    );
    return this;
  }
}

module.exports = DefaultCategory;
