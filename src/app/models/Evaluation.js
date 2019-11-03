/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';

class Evaluation extends Model {
  static init(sequelize) {
    super.init(
      {
        comment: Sequelize.STRING,
        note: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'promoter_id', as: 'promoter' });
  }
}

export default Evaluation;
