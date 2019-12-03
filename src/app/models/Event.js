/* eslint-disable no-param-reassign */
const Sequelize = require('sequelize');
const { isBefore, subHours } = require('date-fns');
const Wishlist = require('../models/WishList');

class Event extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.FLOAT,
        description: Sequelize.STRING,
        localization: Sequelize.STRING,
        date: Sequelize.DATE,
        sales_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 24));
          },
        },
        selling: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.sales_date, new Date());
          }
        }
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
    this.belongsTo(models.User, { foreignKey: 'promoter_id', as: 'promoter' });
  }
}

module.exports = Event;
