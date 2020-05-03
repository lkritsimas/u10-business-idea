const { v1: uuidv1 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Matches', {
    id: {
      type: Sequelize.UUID,
      defaultValue: uuidv1(),
      primaryKey: true,
    },
    fromUserId: Sequelize.UUID,
    toUserId: Sequelize.UUID,

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
        fields: ['fromUserId', 'toUserId'],
      },
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('Matches'),
};
