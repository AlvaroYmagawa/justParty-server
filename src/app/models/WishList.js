/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';

class Wishlist extends Model {
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

export default Wishlist;
