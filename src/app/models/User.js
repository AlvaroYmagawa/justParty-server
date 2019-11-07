/* eslint-disable no-param-reassign */
const Sequelize =  require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        promoter: Sequelize.BOOLEAN,
        adress: Sequelize.STRING,
        contact: Sequelize.STRING,
        description: Sequelize.STRING,
        likes: Sequelize.INTEGER,
        dislikes: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }
}

module.exports = User;
