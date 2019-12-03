module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('events', 'price', {
      type: Sequelize.FLOAT,
      allowNull: true,
    }),
  down: queryInterface => queryInterface.removeColumn('events', 'price'),
};
