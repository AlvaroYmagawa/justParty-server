/* eslint-disable no-param-reassign */
const Sequelize = require('sequelize');

class Category extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {

      },
      { sequelize, }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Event, { foreignKey: 'event_id' });
    this.belongsTo(models.DefaultCategory, { foreignKey: 'default_category_id' });
  }
}

module.exports = Category;
