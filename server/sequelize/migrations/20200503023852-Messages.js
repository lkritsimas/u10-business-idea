const { v1: uuidv1 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
    id: {
      type: Sequelize.UUID,
      defaultValue: uuidv1(),
      primaryKey: true,
    },
    matchId: Sequelize.UUID,
    fromUserId: Sequelize.UUID,
    toUserId: Sequelize.UUID,
    message: Sequelize.STRING(2000),
    read: Sequelize.DATEONLY,

    // Timestamps
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  },
  {
    // Should not be unique - Needs fix
    uniqueKeys: {
      users: {
        customIndex: true,
        fields: ['matchId', 'fromUserId', 'toUserId'],
      },
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Messages'),
};
