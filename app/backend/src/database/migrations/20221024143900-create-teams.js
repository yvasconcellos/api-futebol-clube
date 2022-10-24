module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      teamName: {
        allowNull: false,
        type: Sequelize.STRING(100),
        field: 'team_name'
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};