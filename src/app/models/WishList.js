/* eslint-disable no-param-reassign */
const Sequelize =  require('sequelize');

class Wishlist extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Event, { foreignKey: 'event_id' });
  }
}

module.exports = Wishlist;
